import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/product';
import { getCategories, Category } from '../api/category';
import { Product } from '../types';
import PageLoading from '../components/PageLoading';

const ProductCenter: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchData = async () => {
    try {
      const res = await getCategories();
      setCategories(res);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts({ 
        category: category || undefined,
        status: 'In Stock'
      });
      setProducts(res.records);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && products.length === 0) {
    return <PageLoading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-12 animate-in fade-in duration-500">
      <div className="max-w-[1280px] mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8 text-center">产品中心</h1>
        
        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setCategory('')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              !category
                ? 'bg-industrial-grey text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            全部
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.name)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                category === cat.name
                  ? 'bg-industrial-grey text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat.name}
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
                  {product.showPrice !== false ? (
                    <span className="text-sm font-bold text-gray-900 dark:text-white">参考价：¥{product.price}</span>
                  ) : (
                    <span></span>
                  )}
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
