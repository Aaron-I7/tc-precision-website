import React, { useEffect, useState } from 'react';
import { getProducts, saveProduct, deleteProduct } from '../api/product';
import { getCategories, saveCategory, deleteCategory, Category } from '../api/category';
import { uploadFile } from '../api/file';
import { Product } from '../types';
import { useConfirm } from '../components/ConfirmDialog';
import { useToast } from '../components/Toast';
import { Switch } from '../components/Switch';

const Inventory: React.FC = () => {
  const { confirm } = useConfirm();
  const { success, error } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  // Product Edit State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Category Edit State
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        getProducts({ size: 100, category: selectedCategory || undefined }),
        getCategories()
      ]);
      setProducts(prodRes.records);
      setCategories(catRes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Product Handlers
  const handleProductSave = async () => {
    if (!editingProduct) return;
    try {
      // Check if category is new
      const categoryName = editingProduct.category;
      if (categoryName && !categories.some(c => c.name === categoryName)) {
        // Auto create new category
        await saveCategory({
          name: categoryName,
          description: '自动创建的分类',
          sortOrder: categories.length + 1
        });
        // Refresh categories to ensure consistency
        const newCategories = await getCategories();
        setCategories(newCategories);
      }

      await saveProduct(editingProduct);
      success('保存成功');
      setEditingProduct(null);
      fetchData();
    } catch (err) {
      error('保存失败');
    }
  };

  const handleProductDelete = async (id: string | number) => {
    confirm({
      title: '确认删除',
      content: '确定要删除这个产品吗？此操作无法撤销。',
      onConfirm: async () => {
        try {
          await deleteProduct(id.toString());
          success('删除成功');
          fetchData();
        } catch (err) {
          error('删除失败');
        }
      }
    });
  };

  // Category Handlers
  const handleCategorySave = async () => {
    if (!editingCategory) return;
    try {
      await saveCategory(editingCategory);
      success('保存成功');
      setEditingCategory(null);
      fetchData();
    } catch (err) {
      error('保存失败');
    }
  };

  const handleCategoryDelete = async (id: number) => {
    confirm({
      title: '确认删除分类',
      content: '确定要删除这个分类吗？删除分类可能会影响该分类下的产品显示。',
      onConfirm: async () => {
        try {
          await deleteCategory(id);
          success('删除成功');
          fetchData();
        } catch (err) {
          error('删除失败');
        }
      }
    });
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(products, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'products.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  const handleToggleShowPrice = async (product: Product) => {
    try {
      await saveProduct({ ...product, showPrice: !product.showPrice });
      success('更新成功');
      fetchData();
    } catch (err) {
      error('更新失败');
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'In Stock': return '有货';
      case 'Out of Stock': return '缺货';
      case 'Draft': return '草稿';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex-1 p-8 bg-paper-white dark:bg-zinc-950">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
          <span>工作台</span>
          <span className="material-symbols-outlined text-lg">chevron_right</span>
          <span className="text-industrial-grey dark:text-white font-medium">产品管理</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">产品库存管理</h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl">管理精密机械产品目录与分类配置。</p>
          </div>
        </div>

        {/* Category Tabs & Filter */}
        <div className="flex flex-wrap items-center gap-3 border-b border-gray-200 dark:border-zinc-800 pb-4">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
              !selectedCategory
                ? 'bg-industrial-grey text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            全部
          </button>
          {categories.map((category) => (
            <div key={category.id} className="relative group">
              <button
                onClick={() => setSelectedCategory(category.name)}
                className={`pr-8 pl-4 py-2 rounded-full text-sm font-bold transition-all ${
                  selectedCategory === category.name
                    ? 'bg-industrial-grey text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.name}
              </button>
              <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => { e.stopPropagation(); setEditingCategory(category); }}
                  className={`p-1 rounded-full hover:bg-white/20 ${selectedCategory === category.name ? 'text-white' : 'text-gray-500'}`}
                >
                  <span className="material-symbols-outlined text-[14px]">edit</span>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleCategoryDelete(category.id); }}
                  className={`p-1 rounded-full hover:bg-white/20 ${selectedCategory === category.name ? 'text-white' : 'text-red-500'}`}
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={() => setEditingCategory({ name: '', description: '', sortOrder: 0 } as any)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">add</span>
          </button>
        </div>

        {/* Product List */}
        <div className="space-y-6">
          <div className="flex justify-end gap-3">
            <button 
              onClick={handleExport}
              className="flex items-center justify-center gap-2 h-10 px-6 rounded-lg bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">download</span>
              导出列表
            </button>
            <button 
              onClick={() => setEditingProduct({ id: '', name: '', sku: '', category: categories[0]?.name || '', price: 0, status: 'In Stock', image: '', description: '', showPrice: true } as any)}
              className="flex items-center justify-center gap-2 h-10 px-6 rounded-lg bg-industrial-grey text-white text-sm font-bold shadow-lg hover:bg-black transition-colors"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              新增产品
            </button>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-zinc-800">
                    <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">产品名称</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">分类</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">参考价</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">显示价格</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">状态</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={product.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                          <div>
                            <div className="font-bold text-gray-900 dark:text-white">{product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{product.category}</td>
                      <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">¥{product.price}</td>
                      <td className="px-6 py-4">
                        <Switch 
                          checked={product.showPrice !== false}
                          onChange={() => handleToggleShowPrice(product)}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(product.status)}`}>
                          {getStatusText(product.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => setEditingProduct({...product})}
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            <span className="material-symbols-outlined">edit</span>
                          </button>
                          <button 
                            onClick={() => handleProductDelete(product.id)}
                            className="text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <span className="material-symbols-outlined">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Product Edit Modal */}
        {editingProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 w-full max-w-2xl shadow-2xl animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">{editingProduct.id ? '编辑产品' : '新增产品'}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-bold mb-2">产品名称</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">分类</label>
                  <div className="relative">
                    <input
                      list="category-options"
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none"
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                      placeholder="选择或输入新分类"
                    />
                    <datalist id="category-options">
                      {categories.map(c => (
                        <option key={c.id} value={c.name} />
                      ))}
                    </datalist>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">价格</label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">前台显示价格</label>
                  <div className="flex items-center h-[46px]">
                    <Switch 
                      checked={editingProduct.showPrice !== false}
                      onChange={(checked) => setEditingProduct({...editingProduct, showPrice: checked})}
                      label={editingProduct.showPrice !== false ? '显示' : '隐藏'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">状态</label>
                  <select 
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none"
                    value={editingProduct.status}
                    onChange={(e) => setEditingProduct({...editingProduct, status: e.target.value})}
                  >
                    <option value="In Stock">有货</option>
                    <option value="Out of Stock">缺货</option>
                    <option value="Draft">草稿</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-bold mb-2">描述</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none resize-none"
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                  ></textarea>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-bold mb-2">图片</label>
                  <div className="flex gap-4 items-start">
                    <div className="flex-1">
                      <input 
                        type="file" 
                        accept="image/*"
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        onChange={(e) => handleFileUpload(e, (url) => setEditingProduct({...editingProduct, image: url}))}
                      />
                      {uploading && <p className="text-xs text-blue-600 mt-1">上传中...</p>}
                      <input 
                        type="text" 
                        className="w-full mt-2 px-4 py-2 text-sm rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none"
                        value={editingProduct.image || ''}
                        onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})}
                        placeholder="或输入图片URL"
                      />
                    </div>
                    {editingProduct.image && (
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                        <img src={editingProduct.image} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <button 
                  onClick={() => setEditingProduct(null)}
                  className="px-6 py-3 rounded-lg font-bold text-gray-600 hover:bg-gray-100"
                >
                  取消
                </button>
                <button 
                  onClick={handleProductSave}
                  className="px-6 py-3 rounded-lg font-bold bg-industrial-grey text-white hover:bg-black"
                >
                  保存
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Category Edit Modal */}
        {editingCategory && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 w-full max-w-xl shadow-2xl animate-in fade-in zoom-in duration-200">
               <h2 className="text-2xl font-bold mb-6">{editingCategory.id ? '编辑分类' : '新增分类'}</h2>
               
               <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">分类名称</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none"
                      value={editingCategory.name}
                      onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-2">排序值 (越小越靠前)</label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none"
                      value={editingCategory.sortOrder}
                      onChange={(e) => setEditingCategory({...editingCategory, sortOrder: Number(e.target.value)})}
                    />
                  </div>
               </div>

               <div className="flex justify-end gap-4 mt-8">
                <button 
                  onClick={() => setEditingCategory(null)}
                  className="px-6 py-3 rounded-lg font-bold text-gray-600 hover:bg-gray-100"
                >
                  取消
                </button>
                <button 
                  onClick={handleCategorySave}
                  className="px-6 py-3 rounded-lg font-bold bg-industrial-grey text-white hover:bg-black"
                >
                  保存
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
