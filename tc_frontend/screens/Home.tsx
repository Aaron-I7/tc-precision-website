import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/product';
import { getContentBySection, ContentItem } from '../api/content';
import { Product } from '../types';
import { AdvantageCard } from '../components/AdvantageCard';
import { ProductPreviewCard } from '../components/ProductPreviewCard';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [advantages, setAdvantages] = useState<ContentItem[]>([]);
  const [hero, setHero] = useState<ContentItem | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [prodRes, advRes, heroRes] = await Promise.all([
        getProducts({ featured: true, size: 4 }),
        getContentBySection('home_advantage'),
        getContentBySection('home_hero')
      ]);
      setProducts(prodRes.records);
      setAdvantages(advRes);
      if (heroRes && heroRes.length > 0) {
        setHero(heroRes[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <header className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${hero?.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80'}')` }}>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative h-full max-w-[1280px] mx-auto px-6 flex flex-col justify-center text-white">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/30 text-white w-fit">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider">Established Since 1990</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight whitespace-pre-wrap">
              {hero?.title || '精工细作\n匠心筑梦'}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-lg leading-relaxed">
              {hero?.description || '致力成为行业领先的精密机械制造专家。我们提供高精度零部件加工与定制化机械解决方案。'}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/products" className="bg-white text-industrial-grey px-8 py-4 rounded-full font-bold text-base hover:bg-gray-200 transition-colors flex items-center gap-2 shadow-xl shadow-black/20">
                了解更多
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
              <button className="bg-white/10 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-full font-bold text-base hover:bg-white hover:text-industrial-grey transition-colors">
                观看工厂视频
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Core Advantages */}
      <section className="py-20 bg-paper-white dark:bg-zinc-950">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">核心优势</h2>
            <p className="text-steel-blue dark:text-gray-400">依托先进技术与管理体系，为客户创造更大价值</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((item) => (
              <AdvantageCard 
                key={item.id}
                icon={item.icon} 
                title={item.title} 
                desc={item.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Products Sneak Peek */}
      <section className="py-20 bg-white dark:bg-zinc-900">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h3 className="text-steel-blue font-bold text-sm tracking-widest uppercase mb-2">产品中心</h3>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">精选产品系列</h2>
            </div>
            <Link to="/products" className="hidden md:flex items-center gap-2 font-bold hover:text-steel-blue transition-colors group">
              查看全部产品 <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductPreviewCard 
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.name}
                subtitle={product.category}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
