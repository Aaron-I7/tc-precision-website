import axios from 'axios';

const request = axios.create({
  // Use /dev-api in development to avoid conflict with local /api folder
  // In production (Nginx), /api is used normally
  baseURL: import.meta.env.DEV ? '/dev-api' : '/api', 
  timeout: 5000,
});

request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Satoken default header name is 'satoken', but standard is Authorization
      // Backend sa-token config usually accepts both or configured one.
      // Let's assume standard Bearer token or just the token value if configured that way.
      // Based on typical sa-token usage:
      config.headers['satoken'] = token; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code === 200) {
      return res.data;
    } else {
      console.error(res.message);
      return Promise.reject(new Error(res.message || 'Error'));
    }
  },
  (error) => {
    console.error('Request Error:', error);
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/#/login';
    }
    return Promise.reject(error);
  }
);

export default request;
