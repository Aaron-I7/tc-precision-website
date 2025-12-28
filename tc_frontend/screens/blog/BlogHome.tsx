import React from 'react';
import { blogConfig, blogPosts, projects } from '../../data/blogData';
import { ArticleCard } from '../../components/blog/ArticleCard';
import { Link } from 'react-router-dom';

const BlogHome: React.FC = () => {
  const featuredPost = blogPosts[0];
  const latestPosts = blogPosts.slice(1, 4);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20 animate-fade-in">
        <div className="relative inline-block mb-6">
           <img 
            src={blogConfig.avatar} 
            alt="Profile" 
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg mx-auto"
           />
           <div className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Hello, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{blogConfig.name.split(' ')[0]}</span> 👋
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {blogConfig.description}
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/about" className="px-6 py-3 rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
            了解更多
          </Link>
          <Link to="/projects" className="px-6 py-3 rounded-full bg-white text-gray-900 border border-gray-200 font-medium hover:bg-gray-50 transition-colors">
            查看项目
          </Link>
        </div>
      </section>

      {/* Featured Post */}
      <section>
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">精选文章</h2>
        </div>
        <ArticleCard post={featuredPost} featured />
      </section>

      {/* Latest Posts */}
      <section>
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">最新发布</h2>
            <Link to="/articles" className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
                查看全部 <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map(post => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>
      </section>
      
      {/* Mini Projects Showcase */}
      <section className="bg-gradient-to-br from-indigo-50 to-blue-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16 rounded-3xl">
         <div className="max-w-5xl mx-auto">
             <div className="text-center mb-12">
                 <h2 className="text-3xl font-bold text-gray-900 mb-4">我的作品</h2>
                 <p className="text-gray-600">这里有一些我近期开发的有趣项目</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {projects.slice(0, 3).map(project => (
                     <a 
                        key={project.id} 
                        href={project.link} 
                        className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                     >
                         <div className="h-40 rounded-xl bg-gray-100 mb-6 overflow-hidden">
                             <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                         </div>
                         <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                         <p className="text-sm text-gray-500 mb-4 line-clamp-2">{project.description}</p>
                         <div className="flex flex-wrap gap-2">
                             {project.tags.map(tag => (
                                 <span key={tag} className="text-[10px] px-2 py-1 bg-gray-50 text-gray-500 rounded-md border border-gray-100">
                                     {tag}
                                 </span>
                             ))}
                         </div>
                     </a>
                 ))}
             </div>
             <div className="text-center mt-10">
                 <Link to="/projects" className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-800">
                     浏览所有项目 <span className="material-symbols-outlined text-sm">arrow_forward</span>
                 </Link>
             </div>
         </div>
      </section>
    </div>
  );
};

export default BlogHome;
