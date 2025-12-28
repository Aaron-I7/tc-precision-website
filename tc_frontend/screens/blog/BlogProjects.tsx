import React from 'react';
import { projects } from '../../data/blogData';

const BlogProjects: React.FC = () => {
  return (
    <div>
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">项目展示</h1>
        <p className="text-gray-500 max-w-2xl">
          这些是我在业余时间或工作中构建的一些项目。包含开源库、Web 应用和实验性 Demo。
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
          >
            {/* Image Side */}
            <div className="w-full md:w-1/2">
               <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 group">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                  />
               </div>
            </div>
            
            {/* Content Side */}
            <div className="w-full md:w-1/2 space-y-4">
               <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
               <div className="flex flex-wrap gap-2">
                 {project.tags.map(tag => (
                   <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded">
                     {tag}
                   </span>
                 ))}
               </div>
               <p className="text-gray-600 leading-relaxed">
                 {project.description}
               </p>
               <div className="pt-4 flex gap-4">
                 <a 
                    href={project.link} 
                    className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm flex items-center gap-2"
                 >
                    访问项目 <span className="material-symbols-outlined text-sm">open_in_new</span>
                 </a>
                 <a 
                    href={project.github} 
                    className="px-6 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm flex items-center gap-2"
                 >
                    查看源码
                 </a>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogProjects;
