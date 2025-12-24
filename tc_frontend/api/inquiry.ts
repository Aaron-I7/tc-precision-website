import request from './request';

export interface Inquiry {
  id: number;
  name: string;
  phone: string;
  email: string;
  content: string;
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
