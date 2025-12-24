import React, { useEffect, useState } from 'react';
import { getContentBySection, ContentItem } from '../api/content';

const About: React.FC = () => {
  const [intro, setIntro] = useState<ContentItem | null>(null);
  const [hero, setHero] = useState<ContentItem | null>(null);

  useEffect(() => {
    Promise.all([
      getContentBySection('about_intro'),
      getContentBySection('about_hero')
    ]).then(([introRes, heroRes]) => {
      if (introRes && introRes.length > 0) setIntro(introRes[0]);
      if (heroRes && heroRes.length > 0) setHero(heroRes[0]);
    });
  }, []);

  return (
    <div className="flex flex-col w-full bg-paper-white dark:bg-zinc-950">
      {/* Hero */}
      <div className="relative h-[400px] w-full bg-industrial-grey text-white flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: hero?.image ? `url('${hero.image}')` : undefined }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center max-w-4xl px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{hero?.title || '关于腾昌'}</h1>
          <p className="text-xl text-gray-200">{hero?.description || '三十年专注精密机械制造，铸就行业标杆'}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1280px] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-industrial-grey dark:text-white">{intro?.title || '公司简介'}</h2>
            <div className="space-y-4 text-steel-blue dark:text-gray-400 leading-relaxed whitespace-pre-wrap">
               {intro ? intro.description : '加载中...'}
            </div>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
            <img 
              src={intro?.image || "https://picsum.photos/seed/factory/800/600"}
              alt="Factory" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
