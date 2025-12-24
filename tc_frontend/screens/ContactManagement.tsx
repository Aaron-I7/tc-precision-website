import React, { useEffect, useState } from 'react';
import { getInquiries, deleteInquiry, saveInquiry, Inquiry } from '../api/inquiry';

const ContactManagement: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getInquiries({ size: 100 });
      setInquiries(res.records);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('确定要删除这条留言吗？')) return;
    try {
      await deleteInquiry(id);
      fetchData();
    } catch (error) {
      alert('删除失败');
    }
  };

  const handleStatusChange = async (inquiry: Inquiry, newStatus: string) => {
    try {
      await saveInquiry({ ...inquiry, status: newStatus });
      fetchData();
    } catch (error) {
      alert('更新状态失败');
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleString('zh-CN');
  };

  return (
    <div className="flex-1 p-8 bg-paper-white dark:bg-zinc-950">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
          <span>工作台</span>
          <span className="material-symbols-outlined text-lg">chevron_right</span>
          <span className="text-industrial-grey dark:text-white font-medium">联系方式管理</span>
        </nav>

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">客户留言管理</h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl">查看并处理来自“联系我们”页面的客户咨询与留言。</p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">加载中...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50">
                    <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">客户姓名</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">联系方式</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider w-1/3">咨询内容</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">提交时间</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">状态</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                  {inquiries.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">暂无留言数据</td>
                    </tr>
                  ) : (
                    inquiries.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                          {item.name}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-white">{item.phone}</div>
                          <div className="text-xs text-gray-500">{item.email}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                          {item.content}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {formatDate(item.createTime)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            item.status === 'read' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {item.status === 'read' ? '已处理' : '未读'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <div className="flex justify-end gap-2">
                            {item.status !== 'read' && (
                              <button 
                                onClick={() => handleStatusChange(item, 'read')}
                                className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg text-sm font-bold transition-colors"
                              >
                                标记已读
                              </button>
                            )}
                            <button 
                              onClick={() => handleDelete(item.id)}
                              className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                            >
                              <span className="material-symbols-outlined text-lg">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactManagement;
