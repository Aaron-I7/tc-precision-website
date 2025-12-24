
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-[280px] bg-white dark:bg-zinc-900 h-full flex flex-col border-r border-gray-200 dark:border-zinc-800 shrink-0 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-colors">
      <div className="p-8 pb-6 flex items-center gap-4">
        <div className="size-10 rounded-full bg-industrial-grey flex items-center justify-center shrink-0 border border-gray-100">
          <span className="material-symbols-outlined text-white text-[24px]">precision_manufacturing</span>
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg font-bold leading-tight tracking-tight">腾昌精密机械</h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest mt-0.5 font-medium">TC Precision</p>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-4 flex flex-col gap-1.5 overflow-y-auto">
        <Link 
          to="/admin" 
          className={`group flex items-center gap-3.5 px-5 py-3.5 rounded-full transition-all ${isActive('/admin') ? 'bg-primary text-black font-medium shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800'}`}
        >
          <span className={`material-symbols-outlined ${isActive('/admin') ? 'fill-1' : ''}`}>dashboard</span>
          <span className="tracking-wide text-sm">首页数据</span>
        </Link>
        <Link 
          to="/admin/inventory" 
          className={`group flex items-center gap-3.5 px-5 py-3.5 rounded-full transition-all ${isActive('/admin/inventory') ? 'bg-primary text-black font-medium shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800'}`}
        >
          <span className={`material-symbols-outlined ${isActive('/admin/inventory') ? 'fill-1' : ''}`}>inventory_2</span>
          <span className="text-sm font-medium">产品管理</span>
        </Link>
        <Link 
          to="/admin/contacts" 
          className={`group flex items-center gap-3.5 px-5 py-3.5 rounded-full transition-all ${isActive('/admin/contacts') ? 'bg-primary text-black font-medium shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800'}`}
        >
          <span className={`material-symbols-outlined ${isActive('/admin/contacts') ? 'fill-1' : ''}`}>mark_email_unread</span>
          <span className="text-sm font-medium">联系方式管理</span>
        </Link>
        <Link 
          to="/admin/content" 
          className={`group flex items-center gap-3.5 px-5 py-3.5 rounded-full transition-all ${isActive('/admin/content') ? 'bg-primary text-black font-medium shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800'}`}
        >
          <span className={`material-symbols-outlined ${isActive('/admin/content') ? 'fill-1' : ''}`}>edit_document</span>
          <span className="text-sm font-medium">网站内容管理</span>
        </Link>
        <div className="my-4 h-px bg-gray-100 dark:bg-zinc-800"></div>
        <Link to="/" className="group flex items-center gap-3.5 px-5 py-3.5 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all">
          <span className="material-symbols-outlined">logout</span>
          <span className="text-sm font-medium">退出后台</span>
        </Link>
      </nav>

      <div className="p-4 mt-auto border-t border-gray-100 dark:border-zinc-800">
        <div className="w-full flex items-center gap-3 p-2 rounded-full hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors text-left cursor-pointer">
          <div className="size-10 rounded-full overflow-hidden border border-gray-100 bg-gray-200">
            <img 
              alt="Admin" 
              className="w-full h-full object-cover" 
              src="https://picsum.photos/seed/admin/100/100" 
            />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <p className="text-sm font-bold truncate">系统管理员</p>
            <p className="text-xs text-gray-500 truncate font-mono">ID: 882103</p>
          </div>
          <span className="material-symbols-outlined text-gray-400">unfold_more</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
