import React from 'react';
import { Link } from 'react-router-dom';

export const ProductPreviewCard = ({ id, image, title, subtitle }: { id: string, image: string, title: string, subtitle: string }) => (
  <div className="group cursor-pointer">
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 dark:bg-zinc-800 mb-4">
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url('${image}')` }}></div>
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
    </div>
    <h4 className="text-lg font-bold mb-1 group-hover:text-steel-blue transition-colors">{title}</h4>
    <p className="text-sm text-steel-blue mb-3">{subtitle}</p>
    <Link to={`/product/${id}`} className="text-xs font-bold uppercase tracking-wider border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-steel-blue dark:text-gray-300 rounded-full px-3 py-1 group-hover:bg-industrial-grey group-hover:text-white group-hover:border-industrial-grey transition-colors inline-block">
      详情
    </Link>
  </div>
);
