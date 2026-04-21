import { useAuth } from '../context/AuthContext';
import { Users, Clock, CheckSquare } from 'lucide-react';

export default function TrainerDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[var(--border-color)] pb-6">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-color)]">Trainer Portal</h1>
          <p className="text-[var(--text-muted)] text-sm font-medium mt-1">Manage your schedules and mark attendance.</p>
        </div>
        <div className="flex items-center gap-4 bg-[var(--surface-color)] p-3 rounded-2xl border border-[var(--border-color)] shadow-sm">
          <img src={`https://i.pravatar.cc/150?u=${user?.email || 'trainer'}`} alt="Profile" className="w-12 h-12 rounded-full ring-2 ring-emerald-500/50" />
          <div className="pr-2">
            <p className="text-sm font-bold text-[var(--text-color)]">{user?.name || 'Trainer'}</p>
            <p className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 inline-block px-2 py-0.5 rounded-lg mt-0.5">Instructor</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card space-y-4 md:col-span-2">
          <h2 className="text-xl font-bold text-[var(--text-color)]">Today's Schedule</h2>
          
          <div className="space-y-4">
            <div className="flex gap-4 p-5 bg-[var(--bg-color)] rounded-xl border border-[var(--border-color)] relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500"></div>
              <div className="text-center min-w-[80px] shrink-0 border-r border-[var(--border-color)] pr-4 flex flex-col justify-center">
                <span className="text-lg font-bold text-[var(--text-color)]">05:00</span>
                <span className="text-xs font-bold text-[var(--text-muted)]">PM</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[var(--text-color)]">Advanced Hip-Hop</h3>
                <div className="flex items-center gap-4 mt-2">
                  <span className="flex items-center text-sm font-medium text-[var(--text-muted)]">
                    <Users className="w-4 h-4 mr-1.5 text-blue-500" /> 22 Students
                  </span>
                  <span className="flex items-center text-sm font-medium text-[var(--text-muted)]">
                    <Clock className="w-4 h-4 mr-1.5 text-violet-500" /> 1.5 Hours
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center shrink-0 pl-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 active:scale-95 transition-all">
                  Start Class
                </button>
              </div>
            </div>

            <div className="flex gap-4 p-5 bg-[var(--bg-color)] rounded-xl border border-[var(--border-color)] relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-violet-500"></div>
              <div className="text-center min-w-[80px] shrink-0 border-r border-[var(--border-color)] pr-4 flex flex-col justify-center opacity-50">
                <span className="text-lg font-bold text-[var(--text-color)]">07:00</span>
                <span className="text-xs font-bold text-[var(--text-muted)]">PM</span>
              </div>
              <div className="flex-1 opacity-50">
                <h3 className="text-lg font-bold text-[var(--text-color)]">Beginner Routine</h3>
                <div className="flex items-center gap-4 mt-2">
                  <span className="flex items-center text-sm font-medium text-[var(--text-muted)]">
                    <Users className="w-4 h-4 mr-1.5 text-blue-500" /> 15 Students
                  </span>
                  <span className="flex items-center text-sm font-medium text-[var(--text-muted)]">
                    <Clock className="w-4 h-4 mr-1.5 text-violet-500" /> 1.5 Hours
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-violet-500 border-none text-white shadow-xl shadow-violet-500/20 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
              <CheckSquare className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Pending Actions</h2>
            <p className="text-violet-100 font-medium leading-relaxed">You haven't marked attendance for yesterday's Evening Batch.</p>
          </div>
          <button className="w-full py-3 bg-white text-violet-600 font-bold rounded-xl mt-6 hover:bg-violet-50 active:scale-95 transition-all outline-none">
            Mark Now
          </button>
        </div>
      </div>
    </div>
  );
}
