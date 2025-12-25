
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-metal-gray/20 dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 py-12">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-8 flex items-center justify-center bg-precision-blue dark:bg-white rounded-lg text-white dark:text-precision-blue shadow-md">
                <span className="material-symbols-outlined text-[20px]">precision_manufacturing</span>
              </div>
              <h2 className="text-lg font-bold text-precision-blue dark:text-white">腾昌精密机械厂</h2>
            </div>
            <p className="text-sm text-steel-blue dark:text-gray-400 leading-relaxed max-w-sm">
              专注精密制造三十年，以匠心致初心，以品质赢未来。您值得信赖的高精度CNC加工和制造解决方案合作伙伴。
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-precision-blue dark:text-white">快速链接</h3>
            <ul className="space-y-3 text-sm text-steel-blue dark:text-gray-400">
              <li><a href="#/about" className="hover:text-precision-blue transition-colors">关于我们</a></li>
              <li><a href="#/products" className="hover:text-precision-blue transition-colors">产品中心</a></li>
              <li><a href="#/contact" className="hover:text-precision-blue transition-colors">询价申请</a></li>
              <li><a href="#/guidelines" className="hover:text-precision-blue transition-colors">设计规范</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-precision-blue dark:text-white">联系方式</h3>
            <ul className="space-y-3 text-sm text-steel-blue dark:text-gray-400">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">call</span>
                <span>+86 512 1234 5678</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">mail</span>
                <span>bd@tengchang.cn</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-sm mt-0.5">location_on</span>
                <span>苏州工业园区精密制造产业园A区88号</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-steel-blue">
          <p>© 2024 腾昌精密机械厂 版权所有</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-precision-blue">隐私政策</a>
            <a href="#" className="hover:text-precision-blue">服务条款</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
