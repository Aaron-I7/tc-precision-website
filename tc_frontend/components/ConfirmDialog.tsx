import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ConfirmOptions {
  title: string;
  content: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => Promise<void> | void;
}

interface ConfirmContextType {
  confirm: (options: ConfirmOptions) => void;
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export const ConfirmProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const [loading, setLoading] = useState(false);

  const confirm = (opts: ConfirmOptions) => {
    setOptions(opts);
    setIsOpen(true);
  };

  const handleConfirm = async () => {
    if (options) {
      setLoading(true);
      try {
        await options.onConfirm();
        setIsOpen(false);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {isOpen && options && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all scale-100 opacity-100">
            <div className="p-6">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
                <span className="material-symbols-outlined text-red-600 text-2xl">warning</span>
              </div>
              <h3 className="text-lg font-bold text-center text-gray-900 dark:text-white mb-2">
                {options.title}
              </h3>
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                {options.content}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-zinc-800/50 px-6 py-4 flex gap-3">
              <button
                type="button"
                className="flex-1 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                onClick={() => setIsOpen(false)}
                disabled={loading}
              >
                {options.cancelText || '取消'}
              </button>
              <button
                type="button"
                className="flex-1 rounded-lg border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
                onClick={handleConfirm}
                disabled={loading}
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                ) : (
                  options.confirmText || '确认删除'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('useConfirm must be used within a ConfirmProvider');
  }
  return context;
};