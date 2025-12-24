import React, { useState, useEffect } from 'react';
import { submitMessage } from '../api/contact';
import { getContentBySection, ContentItem } from '../api/content';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContentItem[]>([]);

  useEffect(() => {
    getContentBySection('contact_info').then(setContactInfo);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitMessage(form);
      setSuccess(true);
      setForm({ name: '', phone: '', email: '', content: '' });
    } catch (error) {
      alert('提交失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper-white dark:bg-zinc-950 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-12">联系我们</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-4">联系方式</h3>
              <p className="text-gray-600 mb-2">如果您有任何疑问或合作意向，请随时联系我们。</p>
            </div>
            
            {contactInfo.length > 0 ? (
              contactInfo.map((item) => (
                <div key={item.id} className="flex items-start space-x-4">
                  <span className="material-symbols-outlined text-2xl text-blue-600">{item.icon}</span>
                  <div>
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500">加载中...</div>
            )}
          </div>

          {/* Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            {success ? (
              <div className="text-center py-12">
                <span className="material-symbols-outlined text-6xl text-green-500 mb-4">check_circle</span>
                <h3 className="text-2xl font-bold mb-2">提交成功</h3>
                <p className="text-gray-600">我们会尽快与您联系。</p>
                <button onClick={() => setSuccess(false)} className="mt-6 text-blue-600 font-bold hover:underline">返回</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2">姓名</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">电话</label>
                  <input 
                    type="tel" 
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                    value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">邮箱</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">留言内容</label>
                  <textarea 
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none"
                    value={form.content}
                    onChange={e => setForm({...form, content: e.target.value})}
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-industrial-grey text-white py-4 rounded-lg font-bold hover:bg-black transition-colors disabled:opacity-50"
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
