import React, { useEffect, useState } from 'react';
import { getCases } from '../api/content';

const Cases: React.FC = () => {
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    setLoading(true);
    try {
      const res = await getCases({});
      setCases(res.records);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 py-12">
      <div className="max-w-[1280px] mx-auto px-6">
        <h1 className="text-4xl font-bold mb-12 text-center">客户案例</h1>

        {loading ? (
          <div className="text-center">加载中...</div>
        ) : (
          <div className="space-y-12">
            {cases.map((item, index) => (
              <div key={item.id} className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden shadow-lg">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="w-full md:w-1/2 space-y-4">
                  <div className="text-blue-600 font-bold uppercase tracking-wider text-sm">{item.industry}</div>
                  <h2 className="text-3xl font-bold">{item.title}</h2>
                  <p className="text-gray-600 text-lg leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cases;
