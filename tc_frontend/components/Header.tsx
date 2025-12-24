import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getContentBySection, ContentItem } from '../api/content';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [config, setConfig] = useState<ContentItem | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    getContentBySection('global_config').then(res => {
      if (res && res.length > 0) {
        setConfig(res[0]);
      }
    });
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800">
      <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="size-9 flex items-center justify-center bg-industrial-grey dark:bg-primary rounded-lg text-primary dark:text-industrial-grey group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[24px]">{config?.icon || 'precision_manufacturing'}</span>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-wide uppercase hidden sm:block">
            {config ? `${config.title} // ${config.description}` : 'Tengchang // Precision'}
          </h2>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-industrial-grey' : 'text-steel-blue hover:text-industrial-grey'}`}>首页</Link>
          <Link to="/about" className={`text-sm font-medium transition-colors ${isActive('/about') ? 'text-industrial-grey' : 'text-steel-blue hover:text-industrial-grey'}`}>关于我们</Link>
          <Link to="/products" className={`text-sm font-medium transition-colors ${isActive('/products') ? 'text-industrial-grey' : 'text-steel-blue hover:text-industrial-grey'}`}>产品中心</Link>
          <Link to="/cases" className={`text-sm font-medium transition-colors ${isActive('/cases') ? 'text-industrial-grey' : 'text-steel-blue hover:text-industrial-grey'}`}>客户案例</Link>
          <Link to="/contact" className={`text-sm font-medium transition-colors ${isActive('/contact') ? 'text-industrial-grey' : 'text-steel-blue hover:text-industrial-grey'}`}>联系方式</Link>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {isLoggedIn && (
            <Link to="/admin" className="hidden sm:flex items-center justify-center h-10 px-6 bg-industrial-grey text-white rounded-full text-sm font-bold hover:bg-zinc-800 transition-colors">
              后台管理
            </Link>
          )}
          <button className="md:hidden">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
