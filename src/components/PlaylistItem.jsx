import { Play, CheckCircle2 } from 'lucide-react';

export default function PlaylistItem({ video, index, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 cursor-pointer group border ${
        isActive
          ? 'bg-violet-500/15 border-violet-500/30 shadow-sm'
          : 'border-transparent hover:bg-[var(--bg-color)] hover:border-[var(--border-color)]'
      }`}
    >
      {/* Index / Now Playing indicator */}
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold transition-all ${
        isActive
          ? 'bg-violet-500 text-white shadow-md shadow-violet-500/30'
          : 'bg-[var(--bg-color)] text-[var(--text-muted)] group-hover:bg-violet-500/10 group-hover:text-violet-500'
      }`}>
        {isActive ? (
          <div className="flex gap-[2px] items-end h-3">
            <span className="w-[3px] bg-white rounded-full animate-pulse" style={{ height: '8px', animationDelay: '0ms' }}></span>
            <span className="w-[3px] bg-white rounded-full animate-pulse" style={{ height: '12px', animationDelay: '150ms' }}></span>
            <span className="w-[3px] bg-white rounded-full animate-pulse" style={{ height: '6px', animationDelay: '300ms' }}></span>
          </div>
        ) : (
          index + 1
        )}
      </div>

      {/* Video info */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold truncate transition-colors ${
          isActive ? 'text-violet-500' : 'text-[var(--text-color)] group-hover:text-violet-400'
        }`}>
          {video.title}
        </p>
        <p className="text-[11px] font-medium text-[var(--text-muted)] mt-0.5">
          {video.duration}
        </p>
      </div>

      {/* Play icon on hover / active label */}
      <div className="shrink-0">
        {isActive ? (
          <span className="text-[10px] font-bold uppercase tracking-wider text-violet-500 bg-violet-500/10 px-2 py-1 rounded-md">
            Playing
          </span>
        ) : (
          <Play className="w-4 h-4 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
    </button>
  );
}
