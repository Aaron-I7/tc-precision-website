import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/product';
import { getContentBySection, getCases, ContentItem, CustomerCase } from '../api/content';
import { Product } from '../types';
import { AdvantageCard } from '../components/AdvantageCard';
import { ProductPreviewCard } from '../components/ProductPreviewCard';
import PageLoading from '../components/PageLoading';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [advantages, setAdvantages] = useState<ContentItem[]>([]);
  const [hero, setHero] = useState<ContentItem | null>(null);
  const [cases, setCases] = useState<CustomerCase[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [prodRes, advRes, heroRes, caseRes] = await Promise.all([
        getProducts({ featured: true, size: 4 }),
        getContentBySection('home_advantage'),
        getContentBySection('home_hero'),
        getCases({ size: 3 })
      ]);
      setProducts(prodRes.records);
      setAdvantages(advRes);
      setCases(caseRes.records);
      if (heroRes && heroRes.length > 0) {
        setHero(heroRes[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-500">
      {/* Hero Section */}
      <header className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${hero?.image || 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=2000&auto=format&fit=crop'}')` }}>
          <div className="absolute inset-0 bg-gradient-to-r from-precision-blue/90 to-black/40"></div>
        </div>
        <div className="relative h-full max-w-[1280px] mx-auto px-6 flex flex-col justify-center text-white">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white w-fit">
              <span className="w-2 h-2 rounded-full bg-warning-orange animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider">Established Since 1990</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight whitespace-pre-wrap font-display">
              {hero?.title || '精工细作\n匠心筑梦'}
            </h2>
            <p className="text-lg md:text-xl text-gray-200 max-w-lg leading-relaxed font-light">
              {hero?.description || '致力成为行业领先的精密机械制造专家。我们提供高精度零部件加工与定制化机械解决方案。'}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/products" className="bg-warning-orange text-white px-8 py-4 rounded-full font-bold text-base hover:bg-orange-600 transition-all flex items-center gap-2 shadow-xl shadow-warning-orange/20 transform hover:-translate-y-1">
                了解更多
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
              <button className="bg-white/10 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-full font-bold text-base hover:bg-white hover:text-precision-blue transition-colors">
                观看工厂视频
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Products Sneak Peek */}
      <section className="py-20 bg-white dark:bg-zinc-900">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h3 className="text-warning-orange font-bold text-sm tracking-widest uppercase mb-2">产品中心</h3>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-precision-blue dark:text-white">精选产品系列</h2>
            </div>
            <Link to="/products" className="hidden md:flex items-center gap-2 font-bold text-precision-blue dark:text-white hover:text-warning-orange transition-colors group">
              查看全部产品 <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductPreviewCard 
                key={product.id}
                id={String(product.id)}
                image={product.image}
                title={product.name}
                subtitle={product.category}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Customer Cases */}
      <section className="py-20 bg-gray-50 dark:bg-zinc-900/50">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
             <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-precision-blue dark:text-white">成功案例</h2>
             <p className="text-steel-blue dark:text-gray-400">携手全球客户，共创精密制造新高度</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cases.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 shadow-md">
                   <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                   <div className="absolute bottom-4 left-4 text-white">
                     <div className="text-xs font-bold uppercase tracking-wider mb-1 bg-warning-orange px-2 py-0.5 rounded-md w-fit">{item.industry}</div>
                   </div>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-precision-blue dark:text-white dark:group-hover:text-warning-orange transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/cases" className="inline-flex items-center gap-2 font-bold text-precision-blue dark:text-white hover:text-warning-orange transition-colors border-b-2 border-transparent hover:border-warning-orange pb-0.5">
              查看更多案例
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Advantages (Moved to Bottom) */}
      <section className="py-20 bg-paper-white dark:bg-zinc-950">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-precision-blue dark:text-white">核心优势</h2>
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
    </div>
  );
};

export default Home;
