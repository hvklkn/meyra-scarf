import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Her istekte localStorage'dan token ekle
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---- Ürün endpointleri ----

export const getProducts = () => api.get('/products');
export const getProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (data) => api.post('/products', data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// ---- Admin endpointleri ----

export const adminLogin = (credentials) => api.post('/admin/login', credentials);
export const getAdminProducts = () => api.get('/admin/products');
