import request from './request';
import { Product } from '../types';

export const getProducts = (params: any) => {
  return request.get<any, { records: Product[], total: number }>('/products', { params });
};

export const getProductById = (id: string) => {
  return request.get<any, Product>(`/products/${id}`);
};

export const saveProduct = (data: Partial<Product>) => {
  return request.post<any, boolean>('/products', data);
};

export const deleteProduct = (id: string) => {
  return request.delete<any, boolean>(`/products/${id}`);
};
