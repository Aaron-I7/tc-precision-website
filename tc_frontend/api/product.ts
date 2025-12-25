import request from './request';
import { Product } from '../types';

export interface ProductQueryParams {
  page?: number;
  size?: number;
  category?: string;
  search?: string;
  featured?: boolean;
  status?: string;
}

export const getProducts = (params: ProductQueryParams) => {
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
