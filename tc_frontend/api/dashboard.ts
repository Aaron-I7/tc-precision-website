import request from './request';

export interface DashboardStats {
  productCount: number;
  inquiryCount: number;
  visitCount: number;
}

export const getDashboardStats = () => {
  return request.get<any, DashboardStats>('/dashboard/stats');
};
