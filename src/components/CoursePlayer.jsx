import { useState, useEffect } from 'react';
import { X, Loader, ListVideo, SkipForward, ChevronRight, ChevronLeft } from 'lucide-react';
import PlaylistItem from './PlaylistItem';

export default function CoursePlayer({ isOpen, onClose, course }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [playlistOpen, setPlaylistOpen] = useState(true);

  // Reset state when course changes / modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setIsLoading(true);
      setPlaylistOpen(true);
    }
  }, [isOpen, course?.id]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !course) return null;

  const videos = course.videos || [];
  const currentVideo = videos[currentIndex];

  const handleVideoChange = (index) => {
    if (index !== currentIndex) {
      setIsLoading(true);
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    if (currentIndex < videos.length - 1) {
      handleVideoChange(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      handleVideoChange(currentIndex - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md animate-fade-in" onClick={onClose}></div>

      {/* Player Container */}
      <div className="relative w-full max-w-[1200px] h-[90vh] max-h-[700px] bg-[var(--surface-color)] rounded-2xl shadow-2xl overflow-hidden animate-zoom-in border border-white/10 flex flex-col">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-color)] bg-[var(--bg-color)]/60 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shrink-0">
              <ListVideo className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-[var(--text-color)] text-sm sm:text-base truncate">{course.name}</h3>
              <p className="text-[11px] text-[var(--text-muted)] font-medium">{videos.length} lessons • {course.trainer}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-3">
            <button
              onClick={() => setPlaylistOpen(!playlistOpen)}
              className="p-2 text-[var(--text-muted)] hover:text-violet-500 hover:bg-violet-500/10 rounded-xl transition-all cursor-pointer hidden md:flex"
              title={playlistOpen ? 'Hide Playlist' : 'Show Playlist'}
            >
              <ListVideo className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[var(--text-muted)] hover:text-white hover:bg-rose-500 rounded-xl transition-all cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content: Video + Playlist */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* Left: Video Player */}
          <div className="flex-1 flex flex-col bg-black min-w-0">
            {/* Video iframe area */}
            <div className="relative flex-1">
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-10">
                  <div className="relative">
                    <div className="w-14 h-14 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-5 h-5 text-violet-400" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-white/50 mt-4">Loading lesson...</p>
                </div>
              )}
              
              <iframe
                key={currentVideo?.id}
                src={`${currentVideo?.url}?autoplay=1&rel=0&modestbranding=1`}
                title={currentVideo?.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                onLoad={() => setIsLoading(false)}
                className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              ></iframe>
            </div>

            {/* Bottom control strip */}
            <div className="px-4 py-3 bg-[#0c0c0c] border-t border-white/5 flex items-center justify-between gap-3 shrink-0">
              <div className="min-w-0 flex-1">
                <p className="text-white text-sm font-bold truncate">{currentVideo?.title}</p>
                <p className="text-white/40 text-xs font-medium mt-0.5">
                  Lesson {currentIndex + 1} of {videos.length} • {currentVideo?.duration}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Previous Lesson"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex >= videos.length - 1}
                  className="flex items-center gap-1.5 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-violet-500/20 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Next Lesson"
                >
                  Next <SkipForward className="w-4 h-4" />
                </button>
                {/* Mobile playlist toggle */}
                <button
                  onClick={() => setPlaylistOpen(!playlistOpen)}
                  className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all md:hidden"
                  title="Toggle Playlist"
                >
                  <ListVideo className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Playlist Panel */}
          <div className={`${playlistOpen ? 'w-[320px]' : 'w-0'} transition-all duration-300 border-l border-[var(--border-color)] bg-[var(--surface-color)] flex flex-col overflow-hidden shrink-0 absolute md:relative inset-y-0 right-0 z-20 md:z-0 ${playlistOpen ? '' : 'md:border-l-0'}`}>
            
            <div className="px-4 py-3 border-b border-[var(--border-color)] bg-[var(--bg-color)]/40 shrink-0 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-[var(--text-color)] text-sm">Course Playlist</h4>
                <p className="text-[11px] text-[var(--text-muted)] font-medium mt-0.5">{videos.length} video lessons</p>
              </div>
              {/* Progress badge */}
              <div className="flex items-center gap-1.5 bg-violet-500/10 text-violet-500 px-2 py-1 rounded-lg">
                <span className="text-[11px] font-bold">{currentIndex + 1}/{videos.length}</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5 custom-scrollbar">
              {videos.map((video, idx) => (
                <PlaylistItem
                  key={video.id}
                  video={video}
                  index={idx}
                  isActive={idx === currentIndex}
                  onClick={() => handleVideoChange(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
