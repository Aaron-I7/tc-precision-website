import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import request from '../api/request';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await request.post<any, any>('/auth/login', { username, password });
      // request.ts interceptor handles the response format, assuming it returns data directly on success
      // If result structure is { code, data, msg }, request.ts returns data.
      // So res should be { token: '...', user: ... }
      if (res && res.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        navigate('/admin');
      } else {
        alert('登录失败: 未获取到令牌');
      }
    } catch (error: any) {
      alert(error.message || '登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
      <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-industrial-grey dark:text-white">系统登录</h1>
          <p className="text-gray-500 mt-2">Tengchang Precision System</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">用户名</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-zinc-700 border border-gray-200 dark:border-zinc-600 focus:border-blue-500 outline-none transition-colors dark:text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="请输入用户名"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">密码</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-zinc-700 border border-gray-200 dark:border-zinc-600 focus:border-blue-500 outline-none transition-colors dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold text-white transition-colors ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-industrial-grey hover:bg-black'}`}
          >
            {loading ? '登录中...' : '立即登录'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
