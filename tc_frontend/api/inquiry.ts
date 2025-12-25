import request from './request';

export interface Inquiry {
  id: number;
  name: string;
  phone: string;
  email: string;
  content: string;
  attachment?: string; // Add attachment field
  status: string;
  createTime: string;
}

export const getInquiries = (params: any) => {
  return request.get<any, { records: Inquiry[], total: number }>('/inquiries', { params });
};

export const saveInquiry = (data: Partial<Inquiry>) => {
  return request.post<any, boolean>('/inquiries', data);
};

export const deleteInquiry = (id: number) => {
  return request.delete<any, boolean>(`/inquiries/${id}`);
};

export const getUnreadCount = () => {
  return request.get<any, number>('/inquiries/unread-count');
};
