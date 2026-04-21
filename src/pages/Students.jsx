import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, X } from 'lucide-react';
import { mockStudents } from '../data/mockData';
import { showToast } from '../components/Toast';

export default function Students() {
  const [students, setStudents] = useState(mockStudents);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', style: 'Hip-Hop', batch: 'Morning' });

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.style.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    setStudents(students.filter(s => s.id !== id));
    showToast('Student removed successfully!', 'success');
  };

  const handleSave = () => {
    if (!formData.name || !formData.phone) {
      showToast('Please fill all required fields.', 'error');
      return;
    }
    const newStudent = {
      id: Date.now(),
      ...formData,
      status: 'Active'
    };
    setStudents([newStudent, ...students]);
    setIsModalOpen(false);
    setFormData({ name: '', phone: '', style: 'Hip-Hop', batch: 'Morning' });
    showToast('Student added successfully!', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-color)]">Students Management</h1>
          <p className="text-[var(--text-muted)] text-sm mt-1">Manage enrollments, edit details, and track progress.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <Plus className="w-5 h-5" />
          Add Student
        </button>
      </div>

      <div className="card overflow-hidden !p-0">
        <div className="p-4 border-b border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search by name or style..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-muted)]">
            Total Students: <span className="text-[var(--text-color)]">{students.length}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[var(--bg-color)] border-b border-[var(--border-color)] text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                <th className="px-6 py-4">Student Info</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Dance Style</th>
                <th className="px-6 py-4">Batch</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-[var(--bg-color)] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-violet-500/10 text-violet-500 flex items-center justify-center font-bold text-sm shrink-0">
                        {student.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-[var(--text-color)]">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--text-color)]">{student.phone}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-violet-500/10 text-violet-500 border border-violet-500/20">
                      {student.style}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--text-muted)]">{student.batch}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                      student.status === 'Active' 
                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                        : 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-[var(--text-muted)] hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors cursor-pointer" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(student.id)} 
                        className="p-2 text-[var(--text-muted)] hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer" 
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-[var(--text-muted)]">
                    No students found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[var(--surface-color)] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-zoom-in border border-[var(--border-color)]">
            <div className="flex items-center justify-between p-5 border-b border-[var(--border-color)]">
              <h2 className="text-xl font-bold text-[var(--text-color)]">Add New Student</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text-color)] transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[var(--text-color)] mb-1.5">Full Name</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="e.g. Arjun Das" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-color)] mb-1.5">Dance Style</label>
                  <select 
                    className="input-field"
                    value={formData.style}
                    onChange={e => setFormData({...formData, style: e.target.value})}
                  >
                    <option value="Hip-Hop">Hip-Hop</option>
                    <option value="Bollywood">Bollywood</option>
                    <option value="Contemporary">Contemporary</option>
                    <option value="Kathak">Kathak</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-color)] mb-1.5">Batch</label>
                  <select 
                    className="input-field"
                    value={formData.batch}
                    onChange={e => setFormData({...formData, batch: e.target.value})}
                  >
                    <option value="Morning">Morning</option>
                    <option value="Evening">Evening</option>
                    <option value="Weekend">Weekend</option>
                  </select>
                </div>
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
                Save Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
