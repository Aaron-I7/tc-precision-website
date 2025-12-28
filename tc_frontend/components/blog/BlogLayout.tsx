import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { blogConfig } from '../../data/blogData';

const BlogHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 border-b border-gray-100 transition-all duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
                <img 
                    src={blogConfig.avatar} 
                    alt="Logo" 
                    className="h-9 w-9 rounded-full ring-2 ring-white relative z-10"
                />
            </div>
            <span className="text-lg font-bold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">
              {blogConfig.name}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {blogConfig.nav.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-gray-100 text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button (Simple implementation) */}
          <div className="md:hidden">
             <span className="material-symbols-outlined text-gray-600">menu</span>
          </div>
        </div>
      </div>
    </header>
  );
};

const BlogFooter: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} {blogConfig.name}. All rights reserved.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Built with React & Tailwind CSS
            </p>
          </div>
          <div className="flex items-center gap-6">
            {Object.entries(blogConfig.social).map(([key, url]) => (
              <a 
                key={key} 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors capitalize"
              >
                {key}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export const BlogLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      <BlogHeader />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {children}
      </main>
      <BlogFooter />
    </div>
  );
};
