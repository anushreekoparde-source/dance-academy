import { useState, useMemo } from 'react';
import { Search, Filter, BookHeart } from 'lucide-react';
import { mockCourses } from '../data/courses';
import CourseCard from '../components/CourseCard';

export default function UserCourses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Styles');
  const [levelFilter, setLevelFilter] = useState('All Levels');

  // Extract unique styles and levels for dynamic filters
  const uniqueStyles = useMemo(() => ['All Styles', ...new Set(mockCourses.map(c => c.type))], []);
  const uniqueLevels = useMemo(() => ['All Levels', ...new Set(mockCourses.map(c => c.level))], []);

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.trainer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All Styles' || course.type === typeFilter;
    const matchesLevel = levelFilter === 'All Levels' || course.level === levelFilter;
    
    return matchesSearch && matchesType && matchesLevel;
  });

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border-color)] pb-6">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-color)] flex items-center gap-3">
            <BookHeart className="w-8 h-8 text-fuchsia-500" />
            Academy Courses
          </h1>
          <p className="text-[var(--text-muted)] mt-1.5">Discover new dance styles and augment your skills.</p>
        </div>
      </div>

      <div className="card p-4 border border-[var(--border-color)] sticky top-20 z-20 shadow-sm backdrop-blur-xl bg-[var(--surface-color)]/90">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
            <input 
              type="text" 
              placeholder="Search by course name or trainer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 w-full h-11"
            />
          </div>
          <div className="flex gap-4 md:w-auto overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
            <div className="relative min-w-[150px] shrink-0">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <select 
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="input-field pl-9 h-11 w-full appearance-none cursor-pointer"
              >
                {uniqueStyles.map(st => <option key={st} value={st}>{st}</option>)}
              </select>
            </div>
            <div className="relative min-w-[150px] shrink-0">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <select 
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="input-field pl-9 h-11 w-full appearance-none cursor-pointer"
              >
                {uniqueLevels.map(lv => <option key={lv} value={lv}>{lv}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-2">
          {filteredCourses.map((course) => (
             <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="card border-dashed border-2 py-20 text-center flex flex-col items-center justify-center">
          <div className="p-4 bg-violet-500/10 rounded-full mb-4">
            <Search className="w-8 h-8 text-violet-500" />
          </div>
          <p className="text-xl font-bold text-[var(--text-color)]">No courses found</p>
          <p className="text-[var(--text-muted)] mt-2">Try adjusting your filters or search terms.</p>
          <button 
            onClick={() => {setSearchTerm(''); setTypeFilter('All Styles'); setLevelFilter('All Levels');}}
            className="mt-6 text-sm font-bold text-violet-500 hover:text-violet-600 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
