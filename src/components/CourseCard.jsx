import { Clock, MapPin, User, Tag, CheckCircle, Play, ListVideo } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/formatters';
import { useState } from 'react';
import CoursePlayer from './CoursePlayer';

export default function CourseCard({ course }) {
  const { enrolledCourses, enrollInCourse } = useAuth();
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const isEnrolled = enrolledCourses.includes(course.id);

  const getLevelStyle = (level) => {
    switch(level) {
      case 'Beginner': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'Intermediate': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Advanced': return 'bg-violet-500/10 text-violet-500 border-violet-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const videoCount = course.videos?.length || 0;

  return (
    <>
      <div className="card group hover:-translate-y-1 transition-all duration-300 border border-[var(--border-color)] hover:border-violet-500/50 hover:shadow-[0_8px_30px_rgb(139,92,246,0.12)] overflow-hidden flex flex-col p-0 relative">
        {/* Thumbnail with play overlay */}
        <div 
          className="h-48 overflow-hidden relative cursor-pointer"
          onClick={() => setIsPlayerOpen(true)}
        >
          <img 
            src={course.image} 
            alt={course.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
          
          {/* Centered Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
            <div className="w-14 h-14 bg-violet-600/90 text-white rounded-full flex items-center justify-center pl-1 shadow-[0_0_20px_rgba(139,92,246,0.5)] transform scale-90 group-hover:scale-100 transition-all duration-300 backdrop-blur-sm">
              <Play className="w-6 h-6 fill-current" />
            </div>
          </div>

          {/* Top badges */}
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            {isEnrolled && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/20">
                <CheckCircle className="w-3.5 h-3.5" /> Enrolled
              </span>
            )}
          </div>

          {/* Video count badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 text-white/90 text-[11px] font-bold backdrop-blur-md border border-white/10">
              <ListVideo className="w-3.5 h-3.5" /> {videoCount} Lessons
            </span>
          </div>
          
          {/* Bottom course info */}
          <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] uppercase font-bold tracking-wider mb-2 border backdrop-blur-md ${getLevelStyle(course.level)}`}>
              {course.level}
            </span>
            <h3 className="text-xl font-bold text-white leading-tight drop-shadow-md">{course.name}</h3>
          </div>
        </div>

        {/* Card body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div className="space-y-3.5 mb-6">
            <div className="flex items-center text-sm font-medium text-[var(--text-color)]">
              <Tag className="w-4 h-4 mr-3 text-fuchsia-500 shrink-0" />
              <span className="text-[var(--text-muted)] mr-1">Style:</span> {course.type}
            </div>
            <div className="flex items-center text-sm font-medium text-[var(--text-color)]">
              <User className="w-4 h-4 mr-3 text-blue-500 shrink-0" />
              <span className="text-[var(--text-muted)] mr-1">Trainer:</span> {course.trainer}
            </div>
            <div className="flex items-center text-sm font-medium text-[var(--text-color)] leading-snug">
              <Clock className="w-4 h-4 mr-3 text-violet-500 shrink-0" />
              <span>{course.schedule} • {course.duration}</span>
            </div>
            <div className="flex items-center text-sm font-medium text-[var(--text-color)]">
              <MapPin className="w-4 h-4 mr-3 text-rose-500 shrink-0" />
              {course.location}
            </div>
          </div>

          {/* Footer: Price + Actions */}
          <div className="border-t border-[var(--border-color)] pt-5 mt-auto flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Course Fee</span>
              <span className="font-bold text-xl text-[var(--text-color)]">{formatCurrency(course.fees)}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsPlayerOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-[var(--text-muted)] hover:text-violet-500 hover:bg-violet-500/10 transition-colors border border-[var(--border-color)] hover:border-violet-500/30"
                title="Watch Course"
              >
                <Play className="w-4 h-4" />
                <span className="hidden sm:inline">Watch</span>
              </button>
              <button 
                onClick={() => enrollInCourse(course.id)}
                disabled={isEnrolled}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all active:scale-95 ${
                  isEnrolled 
                    ? 'bg-[var(--surface-color)] text-[var(--text-muted)] border border-[var(--border-color)] cursor-not-allowed shadow-none'
                    : 'bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-violet-500/20 hover:shadow-lg hover:-translate-y-0.5'
                }`}
              >
                {isEnrolled ? 'Purchased' : 'Enroll Now'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Course Player Modal */}
      <CoursePlayer
        isOpen={isPlayerOpen}
        onClose={() => setIsPlayerOpen(false)}
        course={course}
      />
    </>
  );
}
