import React from 'react';

export const AdvantageCard = ({ icon, title, desc }: { icon: string, title: string, desc: string }) => (
  <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-transparent hover:border-gray-300 dark:hover:border-zinc-700 transition-all duration-300 shadow-sm hover:shadow-md group">
    <div className="w-14 h-14 rounded-full bg-metal-gray/30 dark:bg-zinc-800 flex items-center justify-center text-precision-blue dark:text-white mb-6 group-hover:bg-precision-blue group-hover:text-white transition-colors">
      <span className="material-symbols-outlined text-[32px]">{icon}</span>
    </div>
    <h3 className="text-xl font-bold mb-3 text-precision-blue dark:text-white">{title}</h3>
    <p className="text-steel-blue dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
  </div>
);
