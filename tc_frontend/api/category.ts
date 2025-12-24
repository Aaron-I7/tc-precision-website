import request from './request';

export interface Category {
  id: number;
  name: string;
  description: string;
  sortOrder: number;
  createTime?: string;
}

export const getCategories = () => {
  return request.get<any, Category[]>('/categories');
};

export const saveCategory = (data: Partial<Category>) => {
  return request.post<any, boolean>('/categories', data);
};

export const deleteCategory = (id: number) => {
  return request.delete<any, boolean>(`/categories/${id}`);
};
