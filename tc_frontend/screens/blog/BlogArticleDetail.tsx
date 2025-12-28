import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { blogPosts, blogConfig } from '../../data/blogData';

const BlogArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(p => p.id === Number(id));

  if (!post) {
    return <Navigate to="/articles" replace />;
  }

  return (
    <article className="max-w-3xl mx-auto animate-fade-in">
      {/* Header */}
      <header className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-6">
           <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-semibold text-sm">
             {post.category}
           </span>
           <span className="text-gray-400 text-sm">•</span>
           <span className="text-gray-500 text-sm">{post.date}</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center justify-center gap-3">
           <img 
             src={blogConfig.avatar} 
             alt="Author" 
             className="w-10 h-10 rounded-full border border-gray-200"
           />
           <div className="text-left">
              <p className="text-sm font-medium text-gray-900">{blogConfig.name}</p>
              <p className="text-xs text-gray-500">{post.readTime}</p>
           </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="rounded-2xl overflow-hidden shadow-lg mb-12">
         <img 
           src={post.coverImage} 
           alt={post.title} 
           className="w-full h-auto object-cover max-h-[500px]"
         />
      </div>

      {/* Content Body (Mock) */}
      <div className="prose prose-lg prose-indigo mx-auto text-gray-700">
        <p className="lead text-xl text-gray-600 mb-8">{post.excerpt}</p>
        
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        
        <h2>为什么选择这个技术？</h2>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        
        <blockquote>
          <p>"编程不仅是关于代码，更是关于解决问题的方式。"</p>
        </blockquote>

        <h2>深入分析</h2>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
          totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>

        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <code>{`// 示例代码
function helloWorld() {
  console.log("Hello, Blog!");
}`}</code>
        </pre>

        <h3>总结</h3>
        <p>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </p>
      </div>

      {/* Tags */}
      <div className="mt-12 pt-8 border-t border-gray-100">
         <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                #{tag}
              </span>
            ))}
         </div>
         
         <div className="flex justify-between items-center">
            <Link to="/articles" className="text-blue-600 font-medium hover:underline flex items-center gap-1">
               <span className="material-symbols-outlined text-sm">arrow_back</span> 返回文章列表
            </Link>
            <div className="flex gap-4">
               <button className="text-gray-400 hover:text-red-500 transition-colors">
                  <span className="material-symbols-outlined">favorite</span>
               </button>
               <button className="text-gray-400 hover:text-blue-500 transition-colors">
                  <span className="material-symbols-outlined">share</span>
               </button>
            </div>
         </div>
      </div>
    </article>
  );
};

export default BlogArticleDetail;
