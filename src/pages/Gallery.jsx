import { useState } from 'react';
import { Upload, X, Trash2, Image as ImageIcon } from 'lucide-react';
import { showToast } from '../components/Toast';

export default function Gallery() {
  const [images, setImages] = useState([
    'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1504609774659-138d821361aa?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516131206-8d6268ebfb15?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1549420054-ff1082ce7fdb?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1470468969717-61d5d54fd036?q=80&w=600&auto=format&fit=crop',
  ]);
  const [isUploading, setIsUploading] = useState(false);

  const handleDelete = (index) => {
    setImages(images.filter((_, i) => i !== index));
    showToast('Image deleted successfully.', 'success');
  };

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setImages([
        'https://images.unsplash.com/photo-1518834107812-6a881248724e?q=80&w=600&auto=format&fit=crop',
        ...images
      ]);
      setIsUploading(false);
      showToast('Media uploaded successfully!', 'success');
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-color)]">Academy Gallery</h1>
          <p className="text-[var(--text-muted)] text-sm mt-1">Manage and showcase academy photos and class videos.</p>
        </div>
        <button 
          onClick={handleUpload}
          disabled={isUploading}
          className="btn-primary flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isUploading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Upload className="w-5 h-5" />}
          {isUploading ? 'Uploading...' : 'Upload Media'}
        </button>
      </div>

      {isUploading && (
        <div className="card border border-violet-500/20 bg-violet-500/5 animate-fade-in flex items-center justify-center py-10">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="font-semibold text-[var(--text-color)]">Uploading 1 file...</p>
            <p className="text-sm text-[var(--text-muted)]">Please wait while we process your media.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {images.map((img, idx) => (
          <div key={idx} className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-[#131c31] shadow-sm border border-[var(--border-color)]">
            <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
              <div className="flex justify-end">
                <button 
                  onClick={() => handleDelete(idx)}
                  className="p-2.5 bg-rose-500/90 text-white rounded-xl hover:bg-rose-500 transition-all transform -translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg cursor-pointer"
                  title="Delete Image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-white text-xs font-medium transform translate-y-4 group-hover:translate-y-0 duration-300 transition-all">
                Added {idx === 0 ? 'Recently' : `${idx + 1} days ago`}
              </p>
            </div>
          </div>
        ))}
        {images.length === 0 && !isUploading && (
          <div className="col-span-full py-20 text-center flex flex-col items-center card border-dashed border-2">
            <div className="p-4 bg-violet-500/10 rounded-full mb-4">
              <ImageIcon className="w-8 h-8 text-violet-500" />
            </div>
            <p className="text-lg font-bold text-[var(--text-color)]">Your gallery is empty</p>
            <p className="text-[var(--text-muted)] mt-1">Upload photos to showcase your studio.</p>
            <button onClick={handleUpload} className="mt-6 font-semibold text-violet-500 hover:text-violet-600">
              Browse Files to Upload
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
