import React from 'react';

const PageLoading: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-paper-white dark:bg-zinc-950">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-industrial-grey border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">加载中...</p>
      </div>
    </div>
  );
};

export default PageLoading;
