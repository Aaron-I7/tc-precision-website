import axios from 'axios';

const request = axios.create({
  // Use /dev-api in development to avoid conflict with local /api folder
  // In production (Nginx), /api is used normally
  baseURL: import.meta.env.DEV ? '/dev-api' : '/api', 
  timeout: 5000,
});

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
    return Promise.reject(error);
  }
);

export default request;
