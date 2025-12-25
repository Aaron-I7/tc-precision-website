import React, { useEffect, useState } from 'react';
import { getCases, CustomerCase } from '../api/content';
import PageLoading from '../components/PageLoading';
import CaseDetailModal from '../components/CaseDetailModal';

const Cases: React.FC = () => {
  const [cases, setCases] = useState<CustomerCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCase, setSelectedCase] = useState<CustomerCase | null>(null);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const res = await getCases({});
      setCases(res.records);
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
    <div className="min-h-screen bg-white dark:bg-zinc-950 py-12 animate-in fade-in duration-500">
      <div className="max-w-[1280px] mx-auto px-6">
        <h1 className="text-4xl font-bold mb-12 text-center">客户案例</h1>

        <div className="space-y-12">
          {cases.map((item, index) => (
            <div 
              key={item.id} 
              onClick={() => setSelectedCase(item)}
              className={`flex flex-col md:flex-row gap-8 items-center cursor-pointer group ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4 group-hover:translate-x-2 transition-transform duration-300">
                <div className="text-blue-600 font-bold uppercase tracking-wider text-sm">{item.industry}</div>
                <h2 className="text-3xl font-bold group-hover:text-blue-600 transition-colors">{item.title}</h2>
                <p className="text-gray-600 text-lg leading-relaxed line-clamp-3">{item.description}</p>
                <div className="text-blue-600 font-bold text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  查看详情 <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CaseDetailModal 
        item={selectedCase} 
        onClose={() => setSelectedCase(null)} 
      />
    </div>
  );
};

export default Cases;
