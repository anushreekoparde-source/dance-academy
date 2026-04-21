import { useState } from 'react';
import { Calendar, Save, CheckCircle2 } from 'lucide-react';
import { mockStudents } from '../data/mockData';
import { showToast } from '../components/Toast';

export default function Attendance() {
  const [selectedBatch, setSelectedBatch] = useState('Evening');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSaving, setIsSaving] = useState(false);

  const batchStudents = mockStudents.filter(s => s.batch === selectedBatch);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast('Attendance recorded successfully!', 'success');
    }, 800);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-color)]">Attendance System</h1>
          <p className="text-[var(--text-muted)] text-sm mt-1">Mark daily attendance for batches.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-auto">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-500" />
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input-field pl-9 py-2 text-sm font-medium w-full"
            />
          </div>
          <select 
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="input-field py-2 text-sm font-medium w-full sm:w-auto bg-transparent border-violet-500/30 text-violet-600 dark:text-violet-400 focus:ring-violet-500"
          >
            <option value="Morning">Morning Batch</option>
            <option value="Evening">Evening Batch</option>
            <option value="Weekend">Weekend Batch</option>
          </select>
        </div>
      </div>

      <div className="card overflow-hidden !p-0 border border-[var(--border-color)] shadow-sm">
        <div className="p-4 bg-[var(--surface-color)] border-b border-[var(--border-color)] flex justify-between items-center">
          <h3 className="font-semibold text-[var(--text-color)]">Student List ({batchStudents.length})</h3>
          <span className="text-sm font-medium text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">
            All Present Default
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[var(--bg-color)] border-b border-[var(--border-color)] text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Dance Style</th>
                <th className="px-6 py-4 text-right">Mark Attendance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {batchStudents.map((student) => (
                <tr key={student.id} className="hover:bg-[var(--bg-color)] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-violet-500/10 text-violet-500 flex items-center justify-center font-bold text-xs shrink-0">
                        {student.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-[var(--text-color)]">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-[var(--text-muted)]">{student.style}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3 text-sm">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="radio" name={`att-${student.id}`} value="present" defaultChecked className="hidden peer" />
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center border-2 border-[var(--border-color)] peer-checked:border-emerald-500 peer-checked:bg-emerald-500 peer-checked:text-white transition-all text-[var(--text-muted)] font-bold shadow-sm peer-checked:shadow-emerald-500/20">
                          P
                        </div>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="radio" name={`att-${student.id}`} value="absent" className="hidden peer" />
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center border-2 border-[var(--border-color)] peer-checked:border-rose-500 peer-checked:bg-rose-500 peer-checked:text-white transition-all text-[var(--text-muted)] font-bold shadow-sm peer-checked:shadow-rose-500/20">
                          A
                        </div>
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
              {batchStudents.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-6 py-12 text-center text-[var(--text-muted)]">
                    No students found in this batch.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-5 border-t border-[var(--border-color)] flex justify-end gap-3 bg-[var(--bg-color)]/50">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20 disabled:opacity-70"
          >
            {isSaving ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            {isSaving ? 'Saving...' : 'Save Attendance'}
          </button>
        </div>
      </div>
    </div>
  );
}
