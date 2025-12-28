import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../data/blogData';

interface ArticleCardProps {
  post: BlogPost;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ post, featured = false }) => {
  if (featured) {
    return (
      <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col md:flex-row h-full md:h-[400px]">
        <div className="md:w-1/2 h-64 md:h-full overflow-hidden">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4 text-sm">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-semibold">{post.category}</span>
            <span className="text-gray-400">{post.date}</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-400">{post.readTime}</span>
          </div>
          <Link to={`/article/${post.id}`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
              {post.title}
            </h2>
          </Link>
          <p className="text-gray-600 text-lg mb-6 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="mt-auto flex items-center gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
             <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold text-gray-900 shadow-sm">
                {post.category}
             </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
        <Link to={`/article/${post.id}`} className="block mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {post.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
              #{tag}
            </span>
          ))}
          {post.tags.length > 2 && (
             <span className="text-xs text-gray-400 px-1 py-1">+ {post.tags.length - 2}</span>
          )}
        </div>
      </div>
    </div>
  );
};
