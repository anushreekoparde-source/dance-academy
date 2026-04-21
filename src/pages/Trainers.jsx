import { useState } from 'react';
import { Plus, Phone, Edit2, Trash2, X } from 'lucide-react';
import { mockTrainers } from '../data/mockData';
import { showToast } from '../components/Toast';

export default function Trainers() {
  const [trainers, setTrainers] = useState(mockTrainers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', expertise: '', phone: '' });

  const handleDelete = (id) => {
    setTrainers(trainers.filter(t => t.id !== id));
    showToast('Trainer removed successfully!', 'success');
  };

  const handleSave = () => {
    if (!formData.name || !formData.expertise || !formData.phone) {
      showToast('Please fill all required fields.', 'error');
      return;
    }
    const newTrainer = {
      id: Date.now(),
      ...formData,
      classes: 0
    };
    setTrainers([...trainers, newTrainer]);
    setIsModalOpen(false);
    setFormData({ name: '', expertise: '', phone: '' });
    showToast('Trainer added successfully!', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-color)]">Trainers Management</h1>
          <p className="text-[var(--text-muted)] text-sm mt-1">Manage instructor details and assigned classes.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <Plus className="w-5 h-5" />
          Add Trainer
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {trainers.map((trainer) => (
          <div key={trainer.id} className="card text-center group hover:-translate-y-1 hover:shadow-lg transition-all duration-300 relative border border-[var(--border-color)]">
            <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 text-[var(--text-muted)] hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors cursor-pointer text-sm" title="Edit">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(trainer.id)} className="p-1.5 text-[var(--text-muted)] hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer text-sm" title="Delete">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="relative mx-auto w-24 h-24 mb-5 mt-2">
              <img 
                src={`https://i.pravatar.cc/150?u=${trainer.id}`} 
                alt={trainer.name}
                className="w-full h-full rounded-full object-cover border-4 border-[var(--surface-color)] shadow-md"
              />
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-[var(--surface-color)] rounded-full"></div>
            </div>
            
            <h3 className="text-lg font-bold text-[var(--text-color)]">{trainer.name}</h3>
            <p className="text-sm font-semibold text-violet-500 mt-1.5 bg-violet-500/10 inline-block px-3 py-1 rounded-full">{trainer.expertise}</p>
            
            <div className="mt-6 pt-5 border-t border-[var(--border-color)] grid grid-cols-2 gap-4 divide-x divide-[var(--border-color)]">
              <div>
                <p className="text-[var(--text-muted)] text-xs font-semibold uppercase tracking-wider">Classes</p>
                <p className="font-bold text-lg text-[var(--text-color)] mt-1">{trainer.classes}</p>
              </div>
              <div className="flex items-center justify-center">
                <a href={`tel:${trainer.phone}`} className="p-3 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all shadow-sm">
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[var(--surface-color)] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-zoom-in border border-[var(--border-color)]">
            <div className="flex items-center justify-between p-5 border-b border-[var(--border-color)]">
              <h2 className="text-xl font-bold text-[var(--text-color)]">Add New Trainer</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text-color)] transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[var(--text-color)] mb-1.5">Trainer Name</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="e.g. Rahul Verma" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--text-color)] mb-1.5">Expertise</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="e.g. Hip-Hop, Urban" 
                  value={formData.expertise}
                  onChange={e => setFormData({...formData, expertise: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--text-color)] mb-1.5">Phone Number</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="+91 " 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
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
                Save Trainer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
