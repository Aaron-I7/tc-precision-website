import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { submitMessage } from '../api/contact';
import { getContentBySection, ContentItem } from '../api/content';
import { uploadFile } from '../api/file';
import { useToast } from '../components/Toast';
import PageLoading from '../components/PageLoading';

import icon from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const Contact: React.FC = () => {
  const { success, error } = useToast();
  const [form, setForm] = useState({ name: '', phone: '', email: '', content: '', attachment: '' });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContentItem[]>([]);
  const [fileUploading, setFileUploading] = useState(false);
  // Default coordinates (Suzhou) - initialized as [0, 0] to indicate not ready
  const [mapCenter, setMapCenter] = useState<[number, number]>([0, 0]);

  // Create a custom component to update map center and handle resize
  const ChangeView = ({ center }: { center: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center, map.getZoom());
      // Force map to invalidate size after a short delay to fix rendering issues
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    }, [center, map]);
    return null;
  };

  useEffect(() => {
    getContentBySection('contact_info').then(data => {
      setContactInfo(data);
      // Try to find coordinates from the address item (stored in image field)
      const addressItem = data.find(i => i.title.includes('地址') || i.icon === 'location_on');
      if (addressItem && addressItem.image && addressItem.image.includes(',')) {
        const [lat, lng] = addressItem.image.split(',').map(Number);
        if (!isNaN(lat) && !isNaN(lng)) {
          setMapCenter([lat, lng]);
        } else {
          setMapCenter([31.365372, 120.782874]);
        }
      } else {
        setMapCenter([31.365372, 120.782874]);
      }
    }).catch(() => {
      console.error('Failed to fetch contact info');
      setMapCenter([31.365372, 120.782874]);
    }).finally(() => {
      setPageLoading(false);
    });
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileUploading(true);
    try {
      const url = await uploadFile(file);
      setForm({ ...form, attachment: url });
      success('文件上传成功');
    } catch (err) {
      error('文件上传失败，请重试');
    } finally {
      setFileUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitMessage(form);
      setIsSubmitted(true);
      success('留言提交成功');
      setForm({ name: '', phone: '', email: '', content: '', attachment: '' });
    } catch (err) {
      error('提交失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return <PageLoading />;
  }

  return (
    <div className="min-h-screen bg-paper-white dark:bg-zinc-950 py-20 animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-12 text-precision-blue dark:text-white">联系我们</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info & Map */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-precision-blue dark:text-white">联系方式</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">如果您有任何疑问或合作意向，请随时联系我们。</p>
            </div>
            
            <div className="space-y-6">
              {contactInfo.length > 0 ? (
                contactInfo.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4">
                    <span className="material-symbols-outlined text-2xl text-warning-orange">{item.icon}</span>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{item.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                // Fallback hardcoded info if API is empty
                <>
                   <div className="flex items-start space-x-4">
                    <span className="material-symbols-outlined text-2xl text-warning-orange">location_on</span>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">地址</h4>
                      <p className="text-gray-600 dark:text-gray-400">xxx</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <span className="material-symbols-outlined text-2xl text-warning-orange">call</span>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">电话</h4>
                      <p className="text-gray-600 dark:text-gray-400">xxx</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Map */}
            <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-zinc-800 mt-8 relative z-0">
               {/* Only render MapContainer when coordinates are ready to avoid center offset issues */}
               {mapCenter[0] !== 0 && (
                 <MapContainer 
                   center={mapCenter} 
                   zoom={15} 
                   scrollWheelZoom={false} 
                   style={{ height: '100%', width: '100%' }}
                 >
                    <ChangeView center={mapCenter} />
                    <TileLayer
                      attribution='&copy; 高德地图'
                      url="http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
                    />
                    <Marker position={mapCenter}>
                     <Popup>
                       <div className="font-bold">腾昌精密机械</div>
                       <div className="text-xs">
                          {contactInfo.find(i => i.title.includes('地址'))?.description || '江苏省苏州市工业园区科技大道88号'}
                       </div>
                     </Popup>
                   </Marker>
                 </MapContainer>
               )}
            </div>
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-zinc-800">
            {isSubmitted ? (
              <div className="text-center py-12">
                <span className="material-symbols-outlined text-6xl text-green-500 mb-4">check_circle</span>
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">提交成功</h3>
                <p className="text-gray-600 dark:text-gray-400">我们会尽快与您联系。</p>
                <button onClick={() => setIsSubmitted(false)} className="mt-6 text-precision-blue dark:text-blue-400 font-bold hover:underline">返回</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">姓名</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 focus:border-precision-blue focus:ring-1 focus:ring-precision-blue outline-none transition-all dark:text-white"
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">电话</label>
                  <input 
                    type="tel" 
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 focus:border-precision-blue focus:ring-1 focus:ring-precision-blue outline-none transition-all dark:text-white"
                    value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">邮箱</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 focus:border-precision-blue focus:ring-1 focus:ring-precision-blue outline-none transition-all dark:text-white"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">图纸/附件上传</label>
                  <div className="relative">
                    <input 
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                      accept="image/png,image/jpeg,image/jpg,.pdf,.doc,.docx"
                    />
                    <div className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-dashed border-gray-300 dark:border-zinc-600 flex items-center justify-between pointer-events-none">
                      <span className="text-gray-500 dark:text-gray-400 truncate">
                        {form.attachment ? '文件已上传' : (fileUploading ? '上传中...' : '点击选择文件 (支持 PNG/JPG/PDF)')}
                      </span>
                      <span className="material-symbols-outlined text-gray-400">upload_file</span>
                    </div>
                  </div>
                  {form.attachment && <p className="text-xs text-green-600 mt-1">✓ 文件已就绪</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">留言内容</label>
                  <textarea 
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 focus:border-precision-blue focus:ring-1 focus:ring-precision-blue outline-none transition-all resize-none dark:text-white"
                    value={form.content}
                    onChange={e => setForm({...form, content: e.target.value})}
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={loading || fileUploading}
                  className="w-full bg-warning-orange text-white py-4 rounded-lg font-bold hover:bg-orange-600 transition-colors disabled:opacity-50 shadow-lg shadow-orange-500/20"
                >
                  {loading ? '提交中...' : '提交留言'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
