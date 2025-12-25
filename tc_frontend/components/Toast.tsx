import React, { createContext, useContext, useState, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const success = (message: string) => addToast(message, 'success');
  const error = (message: string) => addToast(message, 'error');
  const info = (message: string) => addToast(message, 'info');

  return (
    <ToastContext.Provider value={{ success, error, info }}>
      {children}
      <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              pointer-events-auto min-w-[300px] max-w-md p-4 rounded-xl shadow-lg border flex items-center gap-3 animate-in slide-in-from-right-full duration-300
              ${toast.type === 'success' ? 'bg-white border-green-100 text-green-800 dark:bg-zinc-900 dark:border-green-900 dark:text-green-400' : ''}
              ${toast.type === 'error' ? 'bg-white border-red-100 text-red-800 dark:bg-zinc-900 dark:border-red-900 dark:text-red-400' : ''}
              ${toast.type === 'info' ? 'bg-white border-blue-100 text-blue-800 dark:bg-zinc-900 dark:border-blue-900 dark:text-blue-400' : ''}
            `}
          >
            <span className="material-symbols-outlined text-xl">
              {toast.type === 'success' && 'check_circle'}
              {toast.type === 'error' && 'error'}
              {toast.type === 'info' && 'info'}
            </span>
            <p className="text-sm font-bold flex-1">{toast.message}</p>
            <button 
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined text-lg opacity-50">close</span>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};