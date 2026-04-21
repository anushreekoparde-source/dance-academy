import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, UserCog } from 'lucide-react';

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === 'admin') navigate('/admin');
      if (user.role === 'student') navigate('/user');
      if (user.role === 'trainer') navigate('/trainer');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const success = await login(email, password, role);
    setIsSubmitting(false);

    if (success) {
      // Redirect to original requested page if it exists, otherwise to dashboard
      const from = location.state?.from?.pathname;
      if (from) {
        navigate(from, { replace: true });
      } else {
        if (role === 'admin') navigate('/admin');
        if (role === 'student') navigate('/user');
        if (role === 'trainer') navigate('/trainer');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-color)] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-violet-600/30 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-fuchsia-600/30 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-pulse" style={{animationDelay: '2s'}}></div>
      
      <div className="w-full max-w-md card border border-[var(--border-color)]/60 shadow-2xl relative z-10 p-8 sm:p-10 animate-slide-in backdrop-blur-xl bg-[var(--surface-color)]/90">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-violet-500/30 mb-4 transform rotate-3">
            R
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-color)] tracking-tight">Welcome Back</h1>
          <p className="text-[var(--text-muted)] text-sm mt-2">Sign in to your Rhythm Academy account.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-[var(--text-color)]">Select Role</label>
            <div className="relative">
              <UserCog className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
              <select 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="input-field pl-10 h-12 w-full appearance-none bg-[var(--bg-color)] border-[var(--border-color)]"
                required
              >
                <option value="admin">Administrator</option>
                <option value="student">Student / User</option>
                <option value="trainer">Trainer</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-[var(--text-color)]">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-10 h-12"
                placeholder={role === 'admin' ? 'admin@gmail.com' : role === 'student' ? 'student@gmail.com' : 'trainer@gmail.com'}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-[var(--text-color)]">Password</label>
              <a href="#" className="flex text-xs font-semibold text-violet-500 hover:text-violet-600 transition-colors">Forgot?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-10 pr-10 h-12"
                placeholder="••••••••"
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-color)] transition-colors p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn-primary w-full h-12 flex items-center justify-center gap-2 text-base shadow-xl shadow-violet-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Sign In Now'
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-xs text-[var(--text-muted)] space-y-1 bg-[var(--bg-color)]/50 p-4 rounded-xl border border-[var(--border-color)]">
          <p className="font-semibold text-[var(--text-color)] mb-2">Dev Test Credentials:</p>
          <p>Admin: admin@gmail.com</p>
          <p>Student: student@gmail.com</p>
          <p>Trainer: trainer@gmail.com</p>
          <p className="italic opacity-70 mt-1">(Any password works)</p>
        </div>
      </div>
    </div>
  );
}
