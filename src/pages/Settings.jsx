import { useState } from 'react';
import { User, Lock, Moon, Sun, Globe, Upload, Save } from 'lucide-react';
import { showToast } from '../components/Toast';

export default function Settings({ darkMode, toggleTheme }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@rhythmacademy.in'
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast('Settings saved successfully!', 'success');
    }, 800);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-color)]">Platform Settings</h1>
        <p className="text-[var(--text-muted)] text-sm mt-1">Manage academy preferences, appearance, and your admin profile.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-2">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer font-medium text-sm ${
              activeTab === 'profile' 
                ? 'bg-[var(--surface-color)] shadow-sm border border-[var(--border-color)] text-violet-500' 
                : 'text-[var(--text-muted)] hover:text-[var(--text-color)] hover:bg-[var(--surface-color)]/50 border border-transparent'
            }`}
          >
            <User className={`w-5 h-5 ${activeTab === 'profile' ? 'text-violet-500' : ''}`} />
            Profile Settings
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer font-medium text-sm ${
              activeTab === 'security' 
                ? 'bg-[var(--surface-color)] shadow-sm border border-[var(--border-color)] text-violet-500' 
                : 'text-[var(--text-muted)] hover:text-[var(--text-color)] hover:bg-[var(--surface-color)]/50 border border-transparent'
            }`}
          >
            <Lock className={`w-5 h-5 ${activeTab === 'security' ? 'text-violet-500' : ''}`} />
            Security
          </button>
          <button 
            onClick={() => setActiveTab('appearance')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer font-medium text-sm ${
              activeTab === 'appearance' 
                ? 'bg-[var(--surface-color)] shadow-sm border border-[var(--border-color)] text-violet-500' 
                : 'text-[var(--text-muted)] hover:text-[var(--text-color)] hover:bg-[var(--surface-color)]/50 border border-transparent'
            }`}
          >
            {darkMode ? <Moon className={`w-5 h-5 ${activeTab === 'appearance' ? 'text-violet-500' : ''}`} /> : <Sun className={`w-5 h-5 ${activeTab === 'appearance' ? 'text-violet-500' : ''}`} />}
            Appearance
          </button>
        </div>

        <div className="md:col-span-3 space-y-6">
          {activeTab === 'profile' && (
            <div className="card border border-[var(--border-color)] animate-fade-in shadow-sm">
              <h2 className="text-lg font-bold text-[var(--text-color)] mb-6">Personal Profile</h2>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8 pb-8 border-b border-[var(--border-color)]">
                <div className="relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" 
                    alt="Profile" 
                    className="w-24 h-24 rounded-2xl object-cover ring-4 ring-[var(--bg-color)] shadow-md"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text-color)]">Profile Picture</h3>
                  <p className="text-sm text-[var(--text-muted)] mt-1 mb-3">PNG, JPEG under 5MB</p>
                  <button className="px-4 py-2 border-2 border-[var(--border-color)] rounded-xl text-sm font-semibold hover:bg-[var(--bg-color)] transition-colors cursor-pointer text-[var(--text-color)]">
                    Upload New
                  </button>
                </div>
              </div>

              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-[var(--text-color)] mb-1.5">First Name</label>
                    <input 
                      type="text" 
                      className="input-field" 
                      value={formData.firstName}
                      onChange={e => setFormData({...formData, firstName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[var(--text-color)] mb-1.5">Last Name</label>
                    <input 
                      type="text" 
                      className="input-field" 
                      value={formData.lastName}
                      onChange={e => setFormData({...formData, lastName: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-color)] mb-1.5">Email Address</label>
                  <input 
                    type="email" 
                    className="input-field" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="pt-4 flex flex-col sm:flex-row justify-end gap-3">
                  <button type="button" className="px-5 py-2.5 border-2 border-[var(--border-color)] rounded-xl text-sm font-semibold hover:bg-[var(--bg-color)] transition-colors cursor-pointer text-[var(--text-color)]">
                    Discard Changes
                  </button>
                  <button 
                    type="button" 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20 disabled:opacity-70"
                  >
                    {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Profile
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="card border border-[var(--border-color)] animate-fade-in shadow-sm">
              <h2 className="text-lg font-bold text-[var(--text-color)] mb-6">Appearance Settings</h2>
              
              <div className="p-5 border border-[var(--border-color)] rounded-2xl flex items-center justify-between bg-[var(--bg-color)]/50">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${darkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-amber-500/10 text-amber-500'}`}>
                    {darkMode ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                  </div>
                  <div>
                    <p className="font-bold text-[var(--text-color)] text-base">Dark Mode</p>
                    <p className="text-sm font-medium text-[var(--text-muted)] mt-0.5">Switch between light and dark themes</p>
                  </div>
                </div>
                
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={darkMode} onChange={toggleTheme} />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 dark:peer-focus:ring-violet-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-violet-600"></div>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="card border border-[var(--border-color)] animate-fade-in shadow-sm flex items-center justify-center h-64 text-center">
              <div>
                <Lock className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-bold text-[var(--text-color)]">Password & Security</h3>
                <p className="text-[var(--text-muted)] text-sm max-w-md mx-auto mt-2">Security settings are managed through your identity provider.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
