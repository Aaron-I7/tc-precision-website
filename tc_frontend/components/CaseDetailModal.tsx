import React from 'react';
import { CustomerCase } from '../api/content';

interface CaseDetailModalProps {
  item: CustomerCase | null;
  onClose: () => void;
}

const CaseDetailModal: React.FC<CaseDetailModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="bg-white dark:bg-zinc-900 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative aspect-video w-full bg-gray-100">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-md"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="p-8 max-h-[60vh] overflow-y-auto">
          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full uppercase mb-4">
            {item.industry}
          </div>
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{item.title}</h2>
          
          <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
            {item.description}
          </div>

          {item.createTime && (
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-800 text-sm text-gray-400">
              发布时间: {item.createTime}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseDetailModal;
