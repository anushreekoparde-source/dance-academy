import { X, Loader } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function VideoModal({ isOpen, onClose, videoUrl, courseName }) {
  const [isLoading, setIsLoading] = useState(true);

  // Reset loading state every time the modal opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
    }
  }, [isOpen]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      {/* Dark overlay backdrop */}
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-[var(--surface-color)] rounded-2xl shadow-2xl overflow-hidden animate-zoom-in border border-white/10 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)] bg-[var(--bg-color)]/50">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-violet-400" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <h3 className="font-bold text-[var(--text-color)] text-lg truncate">
              {courseName}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-[var(--text-muted)] hover:text-white hover:bg-rose-500 rounded-xl transition-all cursor-pointer shrink-0 ml-3"
            title="Close Video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Container (16:9 Aspect Ratio) */}
        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
          {/* Loading spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-10">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-5 h-5 text-violet-400" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
              <p className="text-sm font-medium text-white/60 mt-4">Loading tutorial...</p>
            </div>
          )}
          
          {/* YouTube iframe — re-mounts each time modal opens, ensuring auto-pause on close */}
          <iframe 
            src={`${videoUrl}?autoplay=1&rel=0&modestbranding=1`} 
            title={`${courseName} Dance Tutorial`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
            allowFullScreen
            onLoad={() => setIsLoading(false)}
            className={`absolute top-0 left-0 w-full h-full border-0 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          ></iframe>
        </div>

        {/* Footer hint */}
        <div className="px-4 py-2.5 bg-[var(--bg-color)]/50 border-t border-[var(--border-color)] flex items-center justify-between">
          <p className="text-xs text-[var(--text-muted)] font-medium">Press <kbd className="px-1.5 py-0.5 bg-[var(--surface-color)] border border-[var(--border-color)] rounded text-[10px] font-bold mx-0.5">Esc</kbd> to close</p>
          <p className="text-xs text-[var(--text-muted)] font-medium">Use player controls for volume & fullscreen</p>
        </div>
      </div>
    </div>
  );
}
