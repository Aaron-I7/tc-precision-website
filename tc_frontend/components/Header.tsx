import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getContentBySection, ContentItem } from '../api/content';
import { getUnreadCount } from '../api/inquiry';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [config, setConfig] = useState<ContentItem | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    getContentBySection('global_config').then(res => {
      if (res && res.length > 0) {
        setConfig(res[0]);
      }
    });

    if (token) {
      // Poll unread count if logged in (simple implementation, ideally use websocket or context)
      getUnreadCount().then(setUnreadCount).catch(console.error);
      const interval = setInterval(() => {
         getUnreadCount().then(setUnreadCount).catch(console.error);
      }, 30000); // Poll every 30s
      return () => clearInterval(interval);
    }
  }, [location.pathname]); // Re-check on navigation

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800">
      <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="size-9 flex items-center justify-center bg-precision-blue dark:bg-white rounded-lg text-white dark:text-precision-blue group-hover:scale-105 transition-transform shadow-lg shadow-precision-blue/20">
            <span className="material-symbols-outlined text-[24px]">{config?.icon || 'precision_manufacturing'}</span>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-wide uppercase hidden sm:block text-precision-blue dark:text-white">
            {config ? `${config.title} // ${config.description}` : 'Tengchang // Precision'}
          </h2>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-precision-blue font-bold' : 'text-steel-blue hover:text-precision-blue'}`}>首页</Link>
          <Link to="/about" className={`text-sm font-medium transition-colors ${isActive('/about') ? 'text-precision-blue font-bold' : 'text-steel-blue hover:text-precision-blue'}`}>关于我们</Link>
          <Link to="/products" className={`text-sm font-medium transition-colors ${isActive('/products') ? 'text-precision-blue font-bold' : 'text-steel-blue hover:text-precision-blue'}`}>产品中心</Link>
          <Link to="/cases" className={`text-sm font-medium transition-colors ${isActive('/cases') ? 'text-precision-blue font-bold' : 'text-steel-blue hover:text-precision-blue'}`}>客户案例</Link>
          <Link to="/contact" className={`text-sm font-medium transition-colors ${isActive('/contact') ? 'text-precision-blue font-bold' : 'text-steel-blue hover:text-precision-blue'}`}>联系方式</Link>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {isLoggedIn && (
            <Link to="/admin" className="hidden sm:flex items-center justify-center h-10 px-6 bg-precision-blue text-white rounded-full text-sm font-bold hover:bg-blue-900 transition-colors relative">
              后台管理
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 size-3 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900"></span>
              )}
            </Link>
          )}
          <button className="md:hidden text-precision-blue dark:text-white">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
