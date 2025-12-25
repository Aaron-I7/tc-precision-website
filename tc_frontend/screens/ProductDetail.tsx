import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../api/product';
import { Product } from '../types';
import PageLoading from '../components/PageLoading';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    setLoading(true);
    try {
      const res = await getProductById(productId);
      setProduct(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <PageLoading />;
  if (!product) return <div className="min-h-screen flex items-center justify-center">产品不存在</div>;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 py-12 animate-in fade-in duration-500">
      <div className="max-w-[1280px] mx-auto px-6">
        <Link to="/products" className="inline-flex items-center text-gray-500 hover:text-black mb-8">
          <span className="material-symbols-outlined mr-2">arrow_back</span>
          返回产品列表
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-[4/3]">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full uppercase">
              {product.category}
            </div>
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">¥{product.price}</p>
            
            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
              <p>{product.description}</p>
            </div>

            {product.specs && (
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-lg font-bold mb-4">规格参数</h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <dt className="text-sm text-gray-500">{key}</dt>
                      <dd className="font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            <div className="pt-8">
              <Link to="/contact" className="w-full md:w-auto bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors inline-block text-center">
                立即咨询
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
