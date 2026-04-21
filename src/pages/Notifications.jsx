import { useState } from 'react';
import { BellRing, Send, Info, AlertTriangle } from 'lucide-react';
import { showToast } from '../components/Toast';

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Holiday Announcement', message: 'Studio will remain closed tomorrow on account of Diwali.', date: 'Oct 23, 2023', type: 'Announcement' },
    { id: 2, title: 'Fee Reminder Required', message: '12 students have pending fees for this month.', date: 'Oct 20, 2023', type: 'Alert' },
    { id: 3, title: 'New Workshop Scheduled', message: 'Salsa bootcamp scheduled for next weekend.', date: 'Oct 18, 2023', type: 'System' },
  ]);

  const [formData, setFormData] = useState({ title: '', message: '', target: 'All Students' });

  const handleSend = () => {
    if (!formData.title || !formData.message) {
      showToast('Please fill all required fields.', 'error');
      return;
    }
    const newNote = {
      id: Date.now(),
      title: formData.title,
      message: formData.message,
      date: 'Just now',
      type: 'Announcement'
    };
    setNotifications([newNote, ...notifications]);
    setFormData({ title: '', message: '', target: 'All Students' });
    showToast('Notification broadcasted successfully!', 'success');
  };

  const getTypeStyles = (type) => {
    switch(type) {
      case 'Alert': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      case 'System': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-violet-500/10 text-violet-500 border-violet-500/20';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Alert': return <AlertTriangle className="w-5 h-5" />;
      case 'System': return <Info className="w-5 h-5" />;
      default: return <BellRing className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-color)]">Notifications Center</h1>
          <p className="text-[var(--text-muted)] text-sm mt-1">Send announcements and view academy alerts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="card sticky top-6 border border-[var(--border-color)]">
            <h2 className="text-lg font-bold text-[var(--text-color)] mb-5 flex items-center gap-2">
              <Send className="w-5 h-5 text-violet-500" />
              New Broadcast
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[var(--text-color)] mb-1.5">Send To</label>
                <select 
                  className="input-field"
                  value={formData.target}
                  onChange={e => setFormData({...formData, target: e.target.value})}
                >
                  <option value="All Students">All Students</option>
                  <option value="All Trainers">All Trainers</option>
                  <option value="Morning Batch">Morning Batch Only</option>
                  <option value="Evening Batch">Evening Batch Only</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--text-color)] mb-1.5">Subject Title</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="e.g. Holiday Alert" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--text-color)] mb-1.5">Message</label>
                <textarea 
                  className="input-field min-h-[120px] resize-none" 
                  placeholder="Type your announcement here..."
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button 
                type="button" 
                onClick={handleSend}
                className="btn-primary w-full flex items-center justify-center gap-2 mt-2 shadow-lg shadow-violet-500/20"
              >
                <Send className="w-4 h-4" />
                Broadcast Now
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-color)] flex items-center gap-2 mb-2">
            <BellRing className="w-5 h-5 text-[var(--text-muted)]" />
            Recent History
          </h2>
          {notifications.map((note) => (
            <div key={note.id} className="card p-5 border border-[var(--border-color)] hover:border-violet-500/30 transition-colors flex gap-4 items-start group">
              <div className={`p-3 rounded-xl shrink-0 ${getTypeStyles(note.type)}`}>
                {getTypeIcon(note.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-bold text-[var(--text-color)] text-base truncate">{note.title}</h3>
                  <span className="text-xs font-medium text-[var(--text-muted)] whitespace-nowrap bg-[var(--bg-color)] px-2 py-1 rounded-md">{note.date}</span>
                </div>
                <p className="text-sm font-medium text-[var(--text-muted)] mt-1.5 leading-relaxed">{note.message}</p>
                <div className="mt-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold border ${getTypeStyles(note.type)}`}>
                    {note.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
