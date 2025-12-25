import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/product';
import { Product } from '../types';
import PageLoading from '../components/PageLoading';

const ProductCenter: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts({ category: category || undefined });
      setProducts(res.records);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['全部', '工业传动', '航空航天', '医疗设备', '液压系统', '精密组件'];

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-12 animate-in fade-in duration-500">
      <div className="max-w-[1280px] mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8 text-center">产品中心</h1>
        
        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat === '全部' ? '' : cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                (category === cat || (cat === '全部' && !category))
                  ? 'bg-industrial-grey text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="text-xs font-bold text-blue-600 mb-2 uppercase tracking-wider">{product.category}</div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">¥{product.price}</span>
                  <span className="text-sm text-gray-500">详情 &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCenter;
