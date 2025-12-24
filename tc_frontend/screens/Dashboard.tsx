
import React from 'react';

const Dashboard: React.FC = () => {
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
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
              <input className="pl-10 pr-4 py-2.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-full text-sm w-64 focus:outline-none transition-all shadow-sm" placeholder="输入关键词搜索..." type="text"/>
            </div>
            <button className="size-10 rounded-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined">notifications</span>
            </button>
          </div>
        </header>

        <div className="flex flex-wrap justify-between items-end gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-[32px] font-bold tracking-tight text-[#181811] dark:text-white leading-tight">首页数据概览</h2>
            <p className="text-gray-500 text-sm font-medium">最后更新: 2024年10月25日 14:30</p>
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
          <StatCard title="本月总产量 (件)" value="1,240" trend="+12%" icon="factory" progress={75} />
          <StatCard title="待处理询盘 (个)" value="8" trend="+2" icon="mark_email_unread" progress={25} />
          <StatCard title="设备运行效率" value="98.5%" trend="-0.5%" icon="precision_manufacturing" progress={98.5} />
          <StatCard title="库存状态" value="正常" trend="Healthy" icon="inventory" progress={100} isGreen />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-100 dark:border-zinc-800 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-bold tracking-tight">月度生产趋势图</h3>
                <p className="text-gray-400 text-sm mt-1">展示最近30天的产量波动情况</p>
              </div>
              <div className="flex bg-gray-50 dark:bg-zinc-800 p-1 rounded-full border border-gray-100 dark:border-zinc-700">
                <button className="px-4 py-1.5 bg-white dark:bg-zinc-700 shadow-sm rounded-full text-xs font-bold text-black dark:text-white border border-gray-100 dark:border-zinc-600">产量</button>
                <button className="px-4 py-1.5 text-xs font-medium text-gray-500 hover:text-black transition-colors rounded-full">销量</button>
              </div>
            </div>
            
            <div className="flex-1 w-full min-h-[300px] flex items-end justify-between gap-4 px-2 pb-6 border-b border-gray-100 dark:border-zinc-800 relative">
              {[40, 65, 50, 85, 60, 75, 45].map((h, i) => (
                <div 
                  key={i} 
                  className={`relative w-full rounded-t-lg group cursor-pointer transition-all duration-300 ${i === 3 ? 'bg-industrial-grey h-[85%]' : 'bg-gray-100 dark:bg-zinc-800 h-['+h+'%] hover:bg-zinc-400'}`}
                  style={{ height: `${h}%` }}
                >
                   <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                     {h * 15} 件
                   </div>
                   {i === 6 && (
                     <div className="absolute inset-0 border-2 border-dashed border-gray-300 dark:border-zinc-600 bg-gray-50/50 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                       <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider -rotate-90">Forecast</span>
                     </div>
                   )}
                </div>
              ))}
            </div>
            <div className="flex justify-between px-2 pt-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span className="text-industrial-grey dark:text-white">Current</span>
              <span>Week 5</span>
              <span>Week 6</span>
              <span>Next</span>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-100 dark:border-zinc-800 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold tracking-tight">系统通知</h3>
              <button className="text-sm font-bold text-gray-400 hover:text-black transition-colors">全部清除</button>
            </div>
            <div className="flex flex-col gap-4">
              <NotificationItem 
                icon="warning" 
                title="库存预警: 合金钢材" 
                desc="库存量低于安全阈值 (15%), 建议尽快补货。" 
                action="立即查看"
              />
              <NotificationItem 
                icon="check_circle" 
                title="订单 #39021 已完成" 
                desc="客户: 宏力汽车配件。质检已通过。" 
                isGreen
              />
              <div className="mt-auto p-5 rounded-2xl bg-industrial-grey text-white relative overflow-hidden group cursor-pointer">
                <div className="absolute -right-4 -bottom-4 opacity-20 transform rotate-12 group-hover:scale-110 transition-transform duration-500">
                  <span className="material-symbols-outlined text-[100px]">rocket_launch</span>
                </div>
                <h4 className="font-bold text-sm relative z-10">系统版本升级 v2.4</h4>
                <p className="text-xs text-gray-400 mt-1 mb-3 relative z-10">包含新的AI排产算法。</p>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-primary relative z-10 group-hover:gap-2 transition-all">
                  查看详情 <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </div>
              </div>
            </div>
          </div>
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

const NotificationItem = ({ icon, title, desc, action, isGreen }: any) => (
  <div className="p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 flex gap-4 items-start shadow-sm hover:shadow-md transition-shadow">
    <div className={`size-10 rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center shrink-0 border border-gray-100 dark:border-zinc-700 shadow-sm ${isGreen ? 'text-green-600' : 'text-gray-700 dark:text-gray-300'}`}>
      <span className="material-symbols-outlined filled fill-1">{icon}</span>
    </div>
    <div>
      <h4 className="font-bold text-sm">{title}</h4>
      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{desc}</p>
      {action && (
        <button className="mt-2 text-xs font-bold text-black dark:text-white border-b border-black/20 hover:border-black pb-0.5 transition-colors">
          {action}
        </button>
      )}
    </div>
  </div>
);

export default Dashboard;
