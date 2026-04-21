import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, Users, BookOpen, CreditCard, CalendarCheck, 
  UserSquare2, Image as ImageIcon, Bell, Settings,
  ChevronLeft, ChevronRight, X
} from 'lucide-react';
import { classNames } from '../utils/formatters';

const getNavigationByRole = (role) => {
  const basePath = `/${role}`;
  if (role === 'admin') {
    return [
      { name: 'Dashboard', href: basePath, icon: LayoutDashboard },
      { name: 'Students', href: `${basePath}/students`, icon: Users },
      { name: 'Classes', href: `${basePath}/classes`, icon: BookOpen },
      { name: 'Payments', href: `${basePath}/payments`, icon: CreditCard },
      { name: 'Attendance', href: `${basePath}/attendance`, icon: CalendarCheck },
      { name: 'Trainers', href: `${basePath}/trainers`, icon: UserSquare2 },
      { name: 'Gallery', href: `${basePath}/gallery`, icon: ImageIcon },
      { name: 'Notifications', href: `${basePath}/notifications`, icon: Bell },
      { name: 'Settings', href: `${basePath}/settings`, icon: Settings },
    ];
  }
  if (role === 'student') {
    return [
      { name: 'My Dashboard', href: basePath, icon: LayoutDashboard },
      { name: 'Courses', href: `${basePath}/courses`, icon: BookOpen },
      { name: 'Settings', href: `${basePath}/settings`, icon: Settings },
    ];
  }
  if (role === 'trainer') {
    return [
      { name: 'Trainer Portal', href: basePath, icon: LayoutDashboard },
      { name: 'Mark Attendance', href: `${basePath}/attendance`, icon: CalendarCheck },
      { name: 'Settings', href: `${basePath}/settings`, icon: Settings },
    ];
  }
  return [];
};

export default function Sidebar({ isOpen, setIsOpen, isMobileOpen, setIsMobileOpen }) {
  const { user } = useAuth();
  const navigation = getNavigationByRole(user?.role || 'admin');

  return (
    <>
      <div className={classNames(
        "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden",
        isMobileOpen ? "block" : "hidden"
      )} onClick={() => setIsMobileOpen(false)} />

      <aside className={classNames(
        'fixed inset-y-0 left-0 z-50 w-72 bg-[var(--surface-color)] border-r border-[var(--border-color)] flex flex-col md:hidden transition-transform duration-300',
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-violet-500/20">
              R
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-violet-500 to-fuchsia-400 bg-clip-text text-transparent">
              Rhythm Academy
            </span>
          </div>
          <button onClick={() => setIsMobileOpen(false)} className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-color)] rounded-lg hover:bg-[var(--bg-color)] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === `/${user?.role}`}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                classNames(
                  isActive
                    ? 'bg-violet-500/10 text-violet-500 font-semibold'
                    : 'text-[var(--text-muted)] hover:bg-[var(--bg-color)] hover:text-[var(--text-color)]',
                  'group flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200'
                )
              }
            >
              <item.icon className="flex-shrink-0 h-5 w-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
        <SidebarFooter isOpen={true} user={user} />
      </aside>

      <aside
        className={classNames(
          isOpen ? 'w-64' : 'w-[72px]',
          'relative hidden md:flex flex-col bg-[var(--surface-color)] border-r border-[var(--border-color)] transition-all duration-300 ease-in-out'
        )}
      >
        <div className="flex items-center h-16 px-4 border-b border-[var(--border-color)]">
          {isOpen ? (
            <div className="flex items-center gap-2.5 overflow-hidden whitespace-nowrap">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-lg shadow-violet-500/20">
                R
              </div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-violet-500 to-fuchsia-400 bg-clip-text text-transparent">
                Rhythm Academy
              </span>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-violet-500/20">
                R
              </div>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === `/${user?.role}`}
              className={({ isActive }) =>
                classNames(
                  isActive
                    ? 'bg-violet-500/10 text-violet-500 font-semibold'
                    : 'text-[var(--text-muted)] hover:bg-[var(--bg-color)] hover:text-[var(--text-color)]',
                  'group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200',
                  !isOpen && 'justify-center'
                )
              }
              title={!isOpen ? item.name : undefined}
            >
              <item.icon className={classNames('flex-shrink-0 h-5 w-5', isOpen && 'mr-3')} />
              {isOpen && <span className="truncate">{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-3 top-20 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-full p-1 shadow-md text-[var(--text-muted)] hover:text-violet-500 transition-colors z-10"
        >
          {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        <SidebarFooter isOpen={isOpen} user={user} />
      </aside>
    </>
  );
}

function SidebarFooter({ isOpen, user }) {
  const getBadgeColor = (role) => {
    switch(role) {
      case 'admin': return 'bg-rose-500/10 text-rose-500';
      case 'trainer': return 'bg-emerald-500/10 text-emerald-500';
      default: return 'bg-blue-500/10 text-blue-500';
    }
  };

  return (
    <div className="p-4 border-t border-[var(--border-color)]">
      <div className={classNames('flex items-center gap-3', !isOpen && 'justify-center')}>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-400 flex items-center justify-center text-white font-bold text-sm shrink-0">
          {user?.name?.charAt(0) || 'A'}
        </div>
        {isOpen && (
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-[var(--text-color)] truncate">{user?.name || 'Administrator'}</span>
            <div className="flex items-center mt-0.5">
              <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-md ${getBadgeColor(user?.role)}`}>
                {user?.role || 'Admin'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
