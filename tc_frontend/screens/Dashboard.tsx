
import React, { useEffect, useState } from 'react';
import { getDashboardStats, DashboardStats } from '../api/dashboard';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    productCount: 0,
    inquiryCount: 0,
    visitCount: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await getDashboardStats();
      setStats(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 pt-2">
      <div className="max-w-7xl mx-auto flex flex-col gap-8 pb-12">
        <header className="h-20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="material-symbols-outlined text-[20px]">home</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span>系统管理</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-black dark:text-white font-semibold bg-white dark:bg-zinc-800 px-2 py-0.5 rounded-md shadow-sm border border-gray-100 dark:border-zinc-700">首页数据</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="size-10 rounded-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined">notifications</span>
            </button>
          </div>
        </header>

        <div className="flex flex-wrap justify-between items-end gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-[32px] font-bold tracking-tight text-[#181811] dark:text-white leading-tight">首页数据概览</h2>
            <p className="text-gray-500 text-sm font-medium">实时数据统计</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-full text-sm font-bold hover:bg-gray-50 transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[20px]">download</span>
              导出报表
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-industrial-grey text-white rounded-full text-sm font-bold hover:bg-zinc-800 transition-all shadow-sm">
              <span className="material-symbols-outlined text-[20px]">add</span>
              新建工单
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="产品总数 (件)" value={stats.productCount} trend="Total" icon="inventory_2" progress={100} />
          <StatCard title="总询盘数 (个)" value={stats.inquiryCount} trend="Total" icon="mark_email_unread" progress={100} />
          <StatCard title="用户访问量 (PV)" value={stats.visitCount} trend="Total" icon="visibility" progress={100} isGreen />
          <StatCard title="系统状态" value="运行中" trend="Healthy" icon="dns" progress={100} isGreen />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend, icon, progress, isGreen }: any) => (
  <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm flex flex-col justify-between group hover:border-gray-300 transition-all relative overflow-hidden">
    <div className="absolute right-0 top-0 p-4 opacity-[0.03] transform scale-150 group-hover:scale-125 transition-transform duration-500 origin-top-right">
      <span className="material-symbols-outlined text-[120px]">{icon}</span>
    </div>
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className="flex flex-col gap-1">
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <h3 className={`text-3xl font-bold tracking-tight mt-1 ${isGreen ? 'text-green-600' : ''}`}>{value}</h3>
      </div>
      <span className={`flex items-center gap-1 ${isGreen ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'} px-2.5 py-1 rounded-full text-xs font-bold border border-black/5`}>
        {trend}
      </span>
    </div>
    <div className="h-1.5 w-full bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden relative z-10">
      <div 
        className={`h-full ${isGreen ? 'bg-green-500' : 'bg-industrial-grey dark:bg-zinc-600'} rounded-full transition-all duration-1000`} 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  </div>
);

export default Dashboard;
