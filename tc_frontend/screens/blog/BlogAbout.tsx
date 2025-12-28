import React from 'react';
import { blogConfig } from '../../data/blogData';

const BlogAbout: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
       <div className="text-center mb-16">
          <img 
            src={blogConfig.avatar} 
            alt="Profile" 
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg mx-auto mb-6"
           />
           <h1 className="text-3xl font-bold text-gray-900 mb-2">关于我</h1>
           <p className="text-gray-500">{blogConfig.role}</p>
       </div>

       <div className="prose prose-lg prose-indigo mx-auto text-gray-600 space-y-8">
           <section>
               <h2 className="text-2xl font-bold text-gray-900 mb-4">👋 Hello World</h2>
               <p>
                   我是张三，一名充满激情的全栈开发者。我喜欢探索新技术，构建能解决实际问题的软件产品。
                   目前，我专注于 React 生态系统和云原生架构。
               </p>
               <p>
                   在编码之外，我还是一个摄影爱好者和咖啡依赖者。我相信技术应该服务于人，而好的设计能让世界变得更美好。
               </p>
           </section>

           <section>
               <h2 className="text-2xl font-bold text-gray-900 mb-4">🛠 技术栈</h2>
               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                   {[
                       "JavaScript (ES6+)", "TypeScript", "React & Next.js", 
                       "Node.js", "Java & Spring Boot", "PostgreSQL & MySQL",
                       "Docker & K8s", "AWS / Azure", "Tailwind CSS"
                   ].map(skill => (
                       <div key={skill} className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 border border-gray-100">
                           <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                           <span className="text-sm font-medium">{skill}</span>
                       </div>
                   ))}
               </div>
           </section>

           <section>
               <h2 className="text-2xl font-bold text-gray-900 mb-4">📬 联系我</h2>
               <p>
                   如果你对我的项目感兴趣，或者有任何合作意向，欢迎通过以下方式联系我：
               </p>
               <ul className="list-none pl-0 space-y-2">
                   {Object.entries(blogConfig.social).map(([key, url]) => (
                       <li key={key} className="flex items-center gap-3">
                           <span className="capitalize w-20 font-medium text-gray-900">{key}:</span>
                           <a href={url} className="text-blue-600 hover:underline break-all">{url}</a>
                       </li>
                   ))}
               </ul>
           </section>
       </div>
    </div>
  );
};

export default BlogAbout;
