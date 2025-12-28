
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardStats, getGeoStats, getTrendStats, DashboardStats } from '../api/dashboard';
import { getUnreadCount } from '../api/inquiry';
import { getSystemConfig, updateSiteMode, ContentItem } from '../api/content';
import { Switch } from '../components/Switch';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    productCount: 0,
    inquiryCount: 0,
    visitCount: 0
  });
  const [unreadCount, setUnreadCount] = useState(0);
  const [geoData, setGeoData] = useState<any[]>([]);
  const [trendData, setTrendData] = useState<any[]>([]);
  const [siteConfig, setSiteConfig] = useState<ContentItem | null>(null);
  const [isBlogMode, setIsBlogMode] = useState(false);

  useEffect(() => {
    fetchStats();
    fetchUnread();
    fetchCharts();
    fetchSiteConfig();
  }, []);

  const fetchSiteConfig = async () => {
    try {
      const items = await getSystemConfig();
      const config = items.find((item: ContentItem) => item.title === 'site_mode');
      if (config) {
        setSiteConfig(config);
        setIsBlogMode(config.description === 'blog');
      }
    } catch (error) {
      console.error("Failed to fetch site config", error);
    }
  };

  const handleModeToggle = async (checked: boolean) => {
    if (!siteConfig) return;
    const newMode = checked ? 'blog' : 'default';
    try {
      await updateSiteMode(siteConfig, newMode);
      setIsBlogMode(checked);
      // Refresh to apply changes globally
      window.location.reload();
    } catch (error) {
      console.error("Failed to update site mode", error);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await getDashboardStats();
      setStats(res);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUnread = async () => {
    try {
      const count = await getUnreadCount();
      setUnreadCount(count);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCharts = async () => {
    try {
      const [geo, trend] = await Promise.all([getGeoStats(), getTrendStats()]);
      setGeoData(geo);
      setTrendData(trend);
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
            <button className="size-10 rounded-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 flex items-center justify-center shadow-sm relative">
              <span className="material-symbols-outlined">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 size-2.5 bg-red-500 rounded-full border border-white dark:border-zinc-800"></span>
              )}
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

        {/* Site Mode Switch */}
        {siteConfig && (
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm flex items-center justify-between">
              <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">网站模式</h3>
                  <p className="text-gray-500 text-sm">切换“企业官网”与“个人博客”模式</p>
              </div>
              <div className="flex items-center gap-3">
                  <span className={`text-sm font-medium ${!isBlogMode ? 'text-blue-600' : 'text-gray-400'}`}>企业官网</span>
                  <Switch checked={isBlogMode} onChange={handleModeToggle} />
                  <span className={`text-sm font-medium ${isBlogMode ? 'text-blue-600' : 'text-gray-400'}`}>个人博客</span>
              </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/admin/inventory">
            <StatCard title="产品总数 (件)" value={stats.productCount} trend="Total" icon="inventory_2" progress={100} />
          </Link>
          <Link to="/admin/contacts">
            <StatCard 
              title="总询盘数 (个)" 
              value={stats.inquiryCount} 
              trend="Total" 
              icon="mark_email_unread" 
              progress={100} 
              unread={unreadCount}
            />
          </Link>
          <div className="cursor-default">
            <StatCard title="用户访问量 (PV)" value={stats.visitCount} trend="Total" icon="visibility" progress={100} isGreen />
          </div>
          <div className="cursor-default">
            <StatCard title="系统状态" value="运行中" trend="Healthy" icon="dns" progress={100} isGreen />
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trend Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm">
            <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">近7日访问趋势</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                    cursor={{stroke: '#8884d8', strokeWidth: 1, strokeDasharray: '5 5'}}
                  />
                  <Area type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Geo Pie Chart */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm">
            <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">访客地域分布</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={geoData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {geoData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend, icon, progress, isGreen, unread }: any) => (
  <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm flex flex-col justify-between group hover:border-gray-300 transition-all relative overflow-hidden h-full">
    <div className="absolute right-0 top-0 p-4 opacity-[0.03] transform scale-150 group-hover:scale-125 transition-transform duration-500 origin-top-right">
      <span className="material-symbols-outlined text-[120px]">{icon}</span>
    </div>
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className="flex flex-col gap-1">
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <div className="flex items-center gap-2">
           <h3 className={`text-3xl font-bold tracking-tight mt-1 ${isGreen ? 'text-green-600' : ''}`}>{value}</h3>
           {unread > 0 && (
             <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold animate-pulse">
               {unread} 新
             </span>
           )}
        </div>
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
