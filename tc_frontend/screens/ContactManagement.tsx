import React, { useEffect, useState } from 'react';
import { getInquiries, deleteInquiry, saveInquiry, Inquiry } from '../api/inquiry';
import { useConfirm } from '../components/ConfirmDialog';
import { useToast } from '../components/Toast';

const ContactManagement: React.FC = () => {
  const { confirm } = useConfirm();
  const { success, error } = useToast();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

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
    confirm({
      title: '确认删除',
      content: '确定要删除这条留言吗？此操作无法撤销。',
      onConfirm: async () => {
        try {
          await deleteInquiry(id);
          fetchData();
          if (selectedInquiry?.id === id) setSelectedInquiry(null);
          success('删除成功');
        } catch (err) {
          error('删除失败');
        }
      }
    });
  };

  const handleStatusChange = async (inquiry: Inquiry, newStatus: string) => {
    try {
      await saveInquiry({ ...inquiry, status: newStatus });
      fetchData();
      if (selectedInquiry?.id === inquiry.id) {
        setSelectedInquiry({ ...inquiry, status: newStatus });
      }
      success('状态更新成功');
    } catch (err) {
      error('更新状态失败');
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
                          <div className="line-clamp-2">{item.content}</div>
                          {item.attachment && (
                            <div className="mt-1 text-xs text-blue-500 flex items-center gap-1">
                              <span className="material-symbols-outlined text-sm">attachment</span>
                              有附件
                            </div>
                          )}
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
                            <button 
                              onClick={() => setSelectedInquiry(item)}
                              className="text-gray-600 hover:bg-gray-100 px-3 py-1 rounded-lg text-sm font-bold transition-colors"
                            >
                              查看详情
                            </button>
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

      {/* Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center sticky top-0 bg-white dark:bg-zinc-900 z-10">
              <h2 className="text-xl font-bold">留言详情</h2>
              <button onClick={() => setSelectedInquiry(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">客户姓名</label>
                  <div className="text-lg font-bold mt-1">{selectedInquiry.name}</div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">提交时间</label>
                  <div className="text-base mt-1">{formatDate(selectedInquiry.createTime)}</div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">联系电话</label>
                  <div className="text-base mt-1">{selectedInquiry.phone}</div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">电子邮箱</label>
                  <div className="text-base mt-1">{selectedInquiry.email || '-'}</div>
                </div>
              </div>
              
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">咨询内容</label>
                <div className="mt-2 p-4 bg-gray-50 dark:bg-zinc-800 rounded-xl text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.content}
                </div>
              </div>

              {selectedInquiry.attachment && (
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">附件/图纸</label>
                  <div className="mt-2">
                    {selectedInquiry.attachment.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                      <a href={selectedInquiry.attachment} target="_blank" rel="noopener noreferrer" className="block group relative rounded-xl overflow-hidden border border-gray-200 dark:border-zinc-700">
                        <img src={selectedInquiry.attachment} alt="Attachment" className="w-full h-auto max-h-[400px] object-contain bg-gray-100 dark:bg-black/20" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <span className="bg-white/90 text-black px-4 py-2 rounded-full font-bold shadow-lg text-sm">点击查看原图</span>
                        </div>
                      </a>
                    ) : (
                      <a 
                        href={selectedInquiry.attachment} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl text-blue-700 dark:text-blue-300 hover:bg-blue-100 transition-colors"
                      >
                        <span className="material-symbols-outlined text-3xl">description</span>
                        <div>
                          <div className="font-bold">下载附件</div>
                          <div className="text-xs opacity-70 break-all">{selectedInquiry.attachment.split('/').pop()}</div>
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50 flex justify-end gap-3">
              {selectedInquiry.status !== 'read' && (
                <button 
                  onClick={() => handleStatusChange(selectedInquiry, 'read')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
                >
                  标记为已处理
                </button>
              )}
              <button 
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactManagement;
