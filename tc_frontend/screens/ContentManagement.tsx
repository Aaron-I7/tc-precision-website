import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllContent, updateContent, ContentItem, getCases, saveCase, deleteCase, CustomerCase } from '../api/content';
import { uploadFile } from '../api/file';
import { AdvantageCard } from '../components/AdvantageCard';
import { useConfirm } from '../components/ConfirmDialog';
import { useToast } from '../components/Toast';
import LocationPicker from '../components/LocationPicker';

const ICONS = [
  'precision_manufacturing', 'factory', 'engineering', 'settings', 'build',
  'local_shipping', 'inventory_2', 'architecture', 'design_services',
  'verified', 'security', 'shield', 'psychology', 'smart_toy',
  'location_on', 'phone', 'mail', 'language', 'schedule',
  'bolt', 'water_drop', 'eco'
];

const ContentManagement: React.FC = () => {
  const { confirm } = useConfirm();
  const { success, error } = useToast();
  const location = useLocation();
  const [items, setItems] = useState<ContentItem[]>([]);
  const [cases, setCases] = useState<CustomerCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  // Case Edit State
  const [isEditingCase, setIsEditingCase] = useState(false);
  const [editingCase, setEditingCase] = useState<CustomerCase | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'contact' | 'cases' | 'global'>('home');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchData();
    // Parse query params for active tab
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab && ['home', 'about', 'contact', 'cases', 'global'].includes(tab)) {
      setActiveTab(tab as any);
    }
  }, [location.search]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [contentRes, casesRes] = await Promise.all([
        getAllContent(),
        getCases({ size: 100 })
      ]);
      setItems(contentRes);
      setCases(casesRes.records);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: ContentItem) => {
    setEditingItem({ ...item });
  };

  const handleLocationSelect = (location: { lat: number; lng: number; address: string }) => {
    if (!editingItem) return;
    const latLng = `${location.lat},${location.lng}`;
    setEditingItem({ ...editingItem, image: latLng });
    setShowLocationPicker(false);
    success('坐标已更新: ' + latLng);
  };

  const handleSave = async () => {
    if (!editingItem) return;
    try {
      await updateContent(editingItem);
      success('保存成功');
      setEditingItem(null);
      fetchData();
    } catch (err) {
      error('保存失败');
    }
  };

  const handleCaseSave = async () => {
    if (!editingCase) return;
    try {
      // Ensure id is undefined if it's 0 or empty string (for new cases)
      const caseToSave = { ...editingCase };
      if (!caseToSave.id) {
        delete caseToSave.id;
      }
      
      await saveCase(caseToSave);
      success('保存成功');
      setEditingCase(null);
      setIsEditingCase(false);
      fetchData();
    } catch (err) {
      error('保存失败');
      console.error(err);
    }
  };

  const handleCaseDelete = async (id: number) => {
    confirm({
      title: '确认删除',
      content: '确定要删除这个案例吗？此操作无法撤销。',
      onConfirm: async () => {
        try {
          await deleteCase(id);
          success('删除成功');
          fetchData();
        } catch (err) {
          error('删除失败');
        }
      }
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, onSuccess: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadFile(file);
      onSuccess(url);
    } catch (err) {
      error('图片上传失败');
    } finally {
      setUploading(false);
    }
  };

  const homeHero = items.find(i => i.section === 'home_hero');
  const homeAdvantages = items.filter(i => i.section === 'home_advantage');
  const aboutHero = items.find(i => i.section === 'about_hero');
  const aboutIntro = items.find(i => i.section === 'about_intro');
  const contactInfos = items.filter(i => i.section === 'contact_info');
  const globalConfig = items.find(i => i.section === 'global_config');

  return (
    <div className="flex-1 p-8 bg-paper-white dark:bg-zinc-950">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
          <span>工作台</span>
          <span className="material-symbols-outlined text-lg">chevron_right</span>
          <span className="text-industrial-grey dark:text-white font-medium">内容管理</span>
        </nav>

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">网站内容管理</h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl">可视化管理网站各板块的文案与图片。</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 border-b border-gray-200 dark:border-zinc-800">
          <button 
            onClick={() => setActiveTab('home')}
            className={`px-4 py-3 font-bold text-sm transition-colors border-b-2 ${activeTab === 'home' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'}`}
          >
            首页管理
          </button>
          <button 
            onClick={() => setActiveTab('about')}
            className={`px-4 py-3 font-bold text-sm transition-colors border-b-2 ${activeTab === 'about' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'}`}
          >
            关于我们
          </button>
          <button 
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-3 font-bold text-sm transition-colors border-b-2 ${activeTab === 'contact' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'}`}
          >
            联系我们
          </button>
          <button 
            onClick={() => setActiveTab('cases')}
            className={`px-4 py-3 font-bold text-sm transition-colors border-b-2 ${activeTab === 'cases' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'}`}
          >
            客户案例
          </button>
          <button 
            onClick={() => setActiveTab('global')}
            className={`px-4 py-3 font-bold text-sm transition-colors border-b-2 ${activeTab === 'global' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'}`}
          >
            全局配置
          </button>
        </div>

        {loading ? (
          <div>加载中...</div>
        ) : (
          <div className="py-8">
            {/* Home Tab */}
            {activeTab === 'home' && (
              <div className="space-y-12">
                {/* Home Hero */}
                {homeHero && (
                  <div className="relative h-[400px] w-full bg-cover bg-center rounded-2xl overflow-hidden group shadow-xl" style={{ backgroundImage: `url('${homeHero.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80'}')` }}>
                     <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-12 text-white">
                        <h2 className="text-5xl font-bold whitespace-pre-wrap">{homeHero.title}</h2>
                        <p className="mt-4 text-xl max-w-2xl">{homeHero.description}</p>
                     </div>
                     <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" onClick={() => handleEdit(homeHero)}>
                        <span className="bg-white text-black px-6 py-2 rounded-full font-bold">编辑首页大图与文案</span>
                     </div>
                  </div>
                )}
                
                {/* Advantages */}
                <div>
                   <h3 className="text-xl font-bold mb-6">核心优势板块</h3>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {homeAdvantages.map((item) => (
                      <div key={item.id} className="relative group">
                        <AdvantageCard 
                          icon={item.icon} 
                          title={item.title} 
                          desc={item.description}
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                          <button 
                            onClick={() => handleEdit(item)}
                            className="bg-white text-black px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform"
                          >
                            编辑内容
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="space-y-12">
                 {/* About Hero */}
                 {aboutHero && (
                  <div className="relative h-[300px] w-full bg-cover bg-center rounded-2xl overflow-hidden group shadow-lg" style={{ backgroundImage: `url('${aboutHero.image || 'https://picsum.photos/seed/about_hero/1920/600'}')` }}>
                     <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center">
                        <h2 className="text-4xl font-bold">{aboutHero.title}</h2>
                        <p className="mt-4 text-xl">{aboutHero.description}</p>
                     </div>
                     <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" onClick={() => handleEdit(aboutHero)}>
                        <span className="bg-white text-black px-6 py-2 rounded-full font-bold">编辑顶部Banner</span>
                     </div>
                  </div>
                )}

                {aboutIntro && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white p-8 rounded-2xl shadow-sm">
                    <div className="relative group">
                       <div className="space-y-4">
                          <h2 className="text-3xl font-bold mb-6 text-industrial-grey">{aboutIntro.title}</h2>
                          <div className="text-steel-blue leading-relaxed whitespace-pre-wrap">{aboutIntro.description}</div>
                       </div>
                       <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl cursor-pointer" onClick={() => handleEdit(aboutIntro)}>
                          <span className="bg-white text-black px-6 py-2 rounded-full font-bold">点击编辑文案</span>
                       </div>
                    </div>
                    <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl group">
                      <img 
                        src={aboutIntro.image} 
                        alt="Factory" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" onClick={() => handleEdit(aboutIntro)}>
                          <span className="bg-white text-black px-6 py-2 rounded-full font-bold">点击更换图片</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contactInfos.map((item) => (
                   <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm flex items-start space-x-4 relative group">
                      <span className="material-symbols-outlined text-2xl text-blue-600">{item.icon}</span>
                      <div>
                        <h4 className="font-bold">{item.title}</h4>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                      <button 
                        onClick={() => handleEdit(item)}
                        className="absolute top-4 right-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                   </div>
                ))}
              </div>
            )}

            {/* Cases Tab */}
            {activeTab === 'cases' && !isEditingCase && (
              <div>
                <div className="flex justify-end mb-6">
                  <button 
                    onClick={() => {
                      setEditingCase({ id: 0, title: '', industry: '', description: '', image: '' } as any);
                      setIsEditingCase(true);
                    }}
                    className="flex items-center gap-2 bg-industrial-grey text-white px-6 py-3 rounded-lg font-bold hover:bg-black"
                  >
                    <span className="material-symbols-outlined">add</span>
                    新增案例
                  </button>
                </div>
                <div className="space-y-6">
                  {cases.map((item) => (
                    <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm flex gap-6 items-center">
                      <div className="w-40 h-24 rounded-lg overflow-hidden shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                         <div className="text-blue-600 text-sm font-bold uppercase mb-1">{item.industry}</div>
                         <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                         <p className="text-gray-500 text-sm line-clamp-2">{item.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setEditingCase({...item});
                            setIsEditingCase(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button 
                          onClick={() => handleCaseDelete(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Case Editor View (Independent View) */}
            {activeTab === 'cases' && isEditingCase && editingCase && (
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-sm animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center justify-between mb-8 border-b border-gray-100 dark:border-zinc-800 pb-6">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => {
                        setIsEditingCase(false);
                        setEditingCase(null);
                      }}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                    >
                      <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h2 className="text-2xl font-bold">{editingCase.id ? '编辑案例' : '新增案例'}</h2>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        setIsEditingCase(false);
                        setEditingCase(null);
                      }}
                      className="px-6 py-2.5 rounded-lg font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      取消
                    </button>
                    <button 
                      onClick={handleCaseSave}
                      className="px-6 py-2.5 rounded-lg font-bold bg-industrial-grey text-white hover:bg-black transition-colors shadow-lg"
                    >
                      保存案例
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div>
                      <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">案例标题</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-900 transition-all outline-none"
                        value={editingCase.title}
                        onChange={(e) => setEditingCase({...editingCase, title: e.target.value})}
                        placeholder="输入案例标题"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">所属行业</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-900 transition-all outline-none"
                        value={editingCase.industry}
                        onChange={(e) => setEditingCase({...editingCase, industry: e.target.value})}
                        placeholder="例如：汽车制造、医疗器械"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">案例描述</label>
                      <textarea 
                        rows={8}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-900 transition-all outline-none resize-none"
                        value={editingCase.description}
                        onChange={(e) => setEditingCase({...editingCase, description: e.target.value})}
                        placeholder="详细描述案例背景、解决方案及成果..."
                      ></textarea>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">案例封面图</label>
                    <div className="bg-gray-50 dark:bg-zinc-800 rounded-2xl p-6 border-2 border-dashed border-gray-200 dark:border-zinc-700 hover:border-blue-500 transition-colors">
                      <div className="aspect-video w-full rounded-xl overflow-hidden bg-white dark:bg-zinc-900 mb-6 flex items-center justify-center relative group">
                        {editingCase.image ? (
                          <img src={editingCase.image} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-center text-gray-400">
                            <span className="material-symbols-outlined text-6xl mb-2">image</span>
                            <p>暂无图片预览</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <input 
                            type="file" 
                            accept="image/*"
                            id="case-image-upload"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, (url) => setEditingCase({...editingCase, image: url}))}
                          />
                          <label 
                            htmlFor="case-image-upload"
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors font-bold text-sm"
                          >
                            <span className="material-symbols-outlined">cloud_upload</span>
                            {uploading ? '上传中...' : '上传本地图片'}
                          </label>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="relative">
                          <input 
                            type="text" 
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 focus:border-blue-500 outline-none text-sm"
                            value={editingCase.image || ''}
                            onChange={(e) => setEditingCase({...editingCase, image: e.target.value})}
                            placeholder="或输入网络图片 URL"
                          />
                          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">link</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Global Config Tab */}
            {activeTab === 'global' && globalConfig && (
              <div className="max-w-2xl bg-white p-8 rounded-2xl shadow-sm space-y-8">
                 <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-xl">
                    <div className="size-16 flex items-center justify-center bg-industrial-grey rounded-xl text-white">
                      <span className="material-symbols-outlined text-4xl">{globalConfig.icon}</span>
                    </div>
                    <div>
                       <h3 className="text-xl font-bold">{globalConfig.title} <span className="text-gray-400">//</span> {globalConfig.description}</h3>
                       <p className="text-sm text-gray-500 mt-1">当前全局 Logo 与品牌标识预览</p>
                    </div>
                 </div>
                 
                 <div className="flex justify-end">
                    <button 
                      onClick={() => handleEdit(globalConfig)}
                      className="bg-industrial-grey text-white px-8 py-3 rounded-lg font-bold hover:bg-black transition-colors"
                    >
                      修改全局配置
                    </button>
                 </div>
              </div>
            )}
          </div>
        )}

        {/* Content Edit Modal */}
        {editingItem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 w-full max-w-2xl shadow-2xl animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">
                {editingItem.section === 'global_config' ? '修改全局配置' : '编辑内容'}
              </h2>
              
              <div className="space-y-6 max-h-[70vh] overflow-y-auto px-1">
                <div>
                  <label className="block text-sm font-bold mb-2">标题</label>
                  <input
                    type="text"
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-0 outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2">内容描述</label>
                  <textarea
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-0 outline-none transition-colors"
                    rows={4}
                  />
                </div>

                {/* Geo Location Input - Only show for address related items or items with coordinates */}
                {(editingItem.title.includes('地址') || (editingItem.image && editingItem.image.includes(','))) && (
                  <div>
                    <label className="block text-sm font-bold mb-2">地图坐标 (纬度,经度)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editingItem.image || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-0 outline-none transition-colors font-mono text-sm"
                        placeholder="例如: 31.365372,120.782874"
                      />
                      <button 
                        onClick={() => setShowLocationPicker(true)}
                        className="px-4 py-2 bg-blue-50 text-blue-600 font-bold rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2 whitespace-nowrap"
                        title="在地图上选择位置"
                      >
                        <span className="material-symbols-outlined">map</span>
                        地图选点
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      点击“地图选点”打开地图选择器，支持搜索和拖拽定位。
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold mb-2">图标 (Material Symbols)</label>
                  <div className="grid grid-cols-6 gap-2 p-4 border border-gray-200 rounded-xl max-h-40 overflow-y-auto">
                    {ICONS.map((icon) => (
                      <button
                        key={icon}
                        onClick={() => setEditingItem({ ...editingItem, icon })}
                        className={`p-2 rounded-lg flex items-center justify-center transition-colors ${
                          editingItem.icon === icon
                            ? 'bg-black text-white'
                            : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        <span className="material-symbols-outlined">{icon}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="text"
                      value={editingItem.icon || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, icon: e.target.value })}
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-200 text-sm"
                      placeholder="自定义图标代码..."
                    />
                    {editingItem.icon && (
                      <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg">
                        <span className="material-symbols-outlined">{editingItem.icon}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <button 
                  onClick={() => setEditingItem(null)}
                  className="px-6 py-3 rounded-lg font-bold text-gray-600 hover:bg-gray-100"
                >
                  取消
                </button>
                <button 
                  onClick={handleSave}
                  className="px-6 py-3 rounded-lg font-bold bg-industrial-grey text-white hover:bg-black"
                >
                  保存
                </button>
              </div>
            </div>
          </div>
        )}
        {showLocationPicker && editingItem && (
          <LocationPicker
            initialLocation={
              editingItem.image && editingItem.image.includes(',') 
                ? { 
                    lat: parseFloat(editingItem.image.split(',')[0]), 
                    lng: parseFloat(editingItem.image.split(',')[1]) 
                  }
                : undefined
            }
            onConfirm={handleLocationSelect}
            onCancel={() => setShowLocationPicker(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ContentManagement;
