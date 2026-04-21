import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, X, Info } from 'lucide-react';

let toastId = 0;
let addToastFn = null;

export function showToast(message, type = 'success') {
  if (addToastFn) {
    addToastFn({ id: ++toastId, message, type });
  }
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    addToastFn = (toast) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 3500);
    };
    return () => { addToastFn = null; };
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'error': return <XCircle className="w-5 h-5 text-rose-400" />;
      default: return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getBorder = (type) => {
    switch (type) {
      case 'success': return 'border-l-emerald-500';
      case 'error': return 'border-l-rose-500';
      default: return 'border-l-blue-500';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center gap-3 px-4 py-3 bg-[var(--surface-color)] border border-[var(--border-color)] border-l-4 ${getBorder(toast.type)} rounded-xl shadow-2xl min-w-[300px] max-w-md animate-slide-in`}
        >
          {getIcon(toast.type)}
          <p className="text-sm font-medium text-[var(--text-color)] flex-1">{toast.message}</p>
          <button onClick={() => removeToast(toast.id)} className="text-[var(--text-muted)] hover:text-[var(--text-color)] transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
