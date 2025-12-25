import request from './request';

export interface DashboardStats {
  productCount: number;
  inquiryCount: number;
  visitCount: number;
}

export const getDashboardStats = () => {
  return request.get<any, DashboardStats>('/dashboard/stats');
};

export const getGeoStats = () => {
  return request.get<any, Array<{ name: string; value: number }>>('/visit-logs/stats/geo');
};

export const getTrendStats = () => {
  return request.get<any, Array<{ date: string; count: number }>>('/visit-logs/stats/trend');
};
