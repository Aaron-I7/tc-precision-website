import request from './request';

export interface ContentItem {
  id: number;
  section: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  sortOrder: number;
}

export interface CustomerCase {
  id: number;
  title: string;
  industry: string;
  description: string;
  image: string;
  createTime?: string;
}

export const getContentBySection = (section: string) => {
  return request.get<any, ContentItem[]>(`/content/${section}`);
};

export const getAllContent = () => {
  return request.get<any, ContentItem[]>('/content/all');
};

export const updateContent = (data: Partial<ContentItem>) => {
  return request.post<any, boolean>('/content', data);
};

export const getSystemConfig = async () => {
    return getContentBySection('system_config');
};

export const updateSiteMode = async (item: ContentItem, mode: 'default' | 'blog') => {
    return updateContent({ ...item, description: mode });
};

export const getCases = (params: any) => {
  return request.get<any, { records: CustomerCase[], total: number }>('/cases', { params });
};

export const saveCase = (data: Partial<CustomerCase>) => {
  return request.post<any, boolean>('/cases', data);
};

export const deleteCase = (id: number) => {
  return request.delete<any, boolean>(`/cases/${id}`);
};
