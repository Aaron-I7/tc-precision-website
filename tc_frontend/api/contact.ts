import request from './request';

export const submitMessage = (data: any) => {
  return request.post<any, boolean>('/contact', data);
};

export const getMessages = (params: any) => {
  return request.get<any, any>('/contact', { params });
};
