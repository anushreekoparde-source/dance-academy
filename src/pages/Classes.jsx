import { useState } from 'react';
import { Plus, Users, Clock, Edit2, Trash2, X } from 'lucide-react';
import { mockClasses } from '../data/mockData';
import { showToast } from '../components/Toast';

export default function Classes() {
  const [classes, setClasses] = useState(mockClasses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', trainer: '', time: '', level: 'Beginner' });

  const handleDelete = (id) => {
    setClasses(classes.filter(c => c.id !== id));
    showToast('Class removed successfully!', 'success');
  };

  const handleSave = () => {
    if (!formData.name || !formData.trainer || !formData.time) {
      showToast('Please fill all required fields.', 'error');
      return;
    }
    const newClass = {
      id: Date.now(),
      ...formData,
      studentsCount: 0
    };
    setClasses([...classes, newClass]);
    setIsModalOpen(false);
    setFormData({ name: '', trainer: '', time: '', level: 'Beginner' });
    showToast('Class created successfully!', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-color)]">Classes Management</h1>
          <p className="text-[var(--text-muted)] text-sm mt-1">Manage ongoing and upcoming dance batches.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <Plus className="w-5 h-5" />
          Create Class
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {classes.map((c) => (
          <div key={c.id} className="card group hover:-translate-y-1 hover:shadow-lg transition-all duration-300 border border-[var(--border-color)]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold mb-3 border
                  ${c.level === 'Beginner' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                    c.level === 'Intermediate' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 
                    'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}
                >
                  {c.level}
                </span>
                <h3 className="text-xl font-bold text-[var(--text-color)]">{c.name}</h3>
                <p className="text-sm font-medium text-[var(--text-muted)] mt-1">by <span className="text-violet-500">{c.trainer}</span></p>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-[var(--text-muted)] hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors cursor-pointer text-sm" title="Edit">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(c.id)} className="p-2 text-[var(--text-muted)] hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer text-sm" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3 pt-5 mt-2 border-t border-[var(--border-color)]">
              <div className="flex items-center text-sm font-medium text-[var(--text-color)]">
                <Clock className="w-5 h-5 mr-3 text-violet-400" />
                {c.time}
              </div>
              <div className="flex items-center text-sm font-medium text-[var(--text-color)]">
                <Users className="w-5 h-5 mr-3 text-emerald-400" />
                {c.studentsCount} Students Enrolled
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[var(--surface-color)] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-zoom-in border border-[var(--border-color)]">
            <div className="flex items-center justify-between p-5 border-b border-[var(--border-color)]">
              <h2 className="text-xl font-bold text-[var(--text-color)]">Create New Class</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text-color)] transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[var(--text-color)] mb-1.5">Class Name</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="e.g. Advanced Salsa" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--text-color)] mb-1.5">Trainer Name</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="e.g. Neha Kapoor" 
                  value={formData.trainer}
                  onChange={e => setFormData({...formData, trainer: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--text-color)] mb-1.5">Timing</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="e.g. 05:00 PM - 06:30 PM" 
                  value={formData.time}
                  onChange={e => setFormData({...formData, time: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--text-color)] mb-1.5">Level</label>
                <select 
                  className="input-field"
                  value={formData.level}
                  onChange={e => setFormData({...formData, level: e.target.value})}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>
            
            <div className="p-5 border-t border-[var(--border-color)] flex justify-end gap-3 bg-[var(--bg-color)]/50">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text-color)] hover:bg-[var(--border-color)] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="btn-primary"
              >
                Save Class
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
