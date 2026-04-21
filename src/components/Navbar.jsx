import { useState, useRef, useEffect } from 'react';
import { Menu, Search, Sun, Moon, Bell, ChevronDown, LogOut, User, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ toggleSidebar, darkMode, toggleTheme }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setProfileOpen(false);
    logout();
    navigate('/login');
  };

  const getBadgeColor = (role) => {
    switch(role) {
      case 'admin': return 'bg-rose-500/10 text-rose-500';
      case 'trainer': return 'bg-emerald-500/10 text-emerald-500';
      default: return 'bg-blue-500/10 text-blue-500';
    }
  };

  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-6 bg-[var(--surface-color)] border-b border-[var(--border-color)] z-10">
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={toggleSidebar}
          className="p-2 text-[var(--text-muted)] hover:text-violet-500 rounded-xl hover:bg-violet-500/10 transition-all cursor-pointer"
        >
          <Menu className="h-5 w-5" />
        </button>
        
        <div className={`hidden sm:flex relative max-w-md w-full transition-all duration-300 ${searchFocused ? 'max-w-lg' : ''}`}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className={`h-4 w-4 transition-colors ${searchFocused ? 'text-violet-500' : 'text-gray-400'}`} />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-[var(--border-color)] rounded-xl leading-5 bg-[var(--bg-color)] text-[var(--text-color)] placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 text-sm transition-all"
            placeholder="Search classes, trainers..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 text-[var(--text-muted)] hover:text-amber-500 hover:bg-amber-500/10 rounded-xl transition-all cursor-pointer"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        
        <button className="p-2 relative text-[var(--text-muted)] hover:text-violet-500 hover:bg-violet-500/10 rounded-xl transition-all cursor-pointer">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-rose-500 rounded-full ring-2 ring-[var(--surface-color)]"></span>
        </button>

        {/* Profile dropdown */}
        <div className="relative ml-1" ref={dropdownRef}>
          <button 
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-[var(--bg-color)] transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-400 flex items-center justify-center text-white font-bold text-xs">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="hidden md:flex flex-col items-start px-1">
              <span className="text-sm font-semibold text-[var(--text-color)] leading-none">{user?.name || 'Admin'}</span>
              <span className={`text-[9px] uppercase font-bold mt-1 ${getBadgeColor(user?.role)} px-1 rounded`}>{user?.role || 'admin'}</span>
            </div>
            <ChevronDown className={`hidden md:block w-4 h-4 text-[var(--text-muted)] transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-xl shadow-2xl py-1 animate-zoom-in z-50">
              <div className="px-4 py-3 border-b border-[var(--border-color)]">
                <p className="text-sm font-semibold text-[var(--text-color)]">{user?.name}</p>
                <p className="text-xs text-[var(--text-muted)] truncate">{user?.email}</p>
              </div>
              <button 
                onClick={() => { navigate(`/${user?.role}/settings`); setProfileOpen(false); }} 
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-color)] hover:bg-[var(--bg-color)] transition-colors cursor-pointer"
              >
                <User className="w-4 h-4" /> My Profile
              </button>
              <button 
                onClick={() => { navigate(`/${user?.role}/settings`); setProfileOpen(false); }} 
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-color)] hover:bg-[var(--bg-color)] transition-colors cursor-pointer"
              >
                <Settings className="w-4 h-4" /> Settings
              </button>
              <div className="border-t border-[var(--border-color)] mt-1">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
