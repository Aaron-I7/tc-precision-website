import request from './request';

export const login = (username, password) => {
  return request.post<any, string>('/auth/login', { username, password });
};
