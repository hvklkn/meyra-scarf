import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL || '/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ---- Admin order endpoints ----
export const getAdminOrders     = ()       => api.get('/admin/orders');
export const getAdminOrderById  = (id)     => api.get(`/admin/orders/${id}`);
export const updateOrderStatus  = (id, data) => api.put(`/orders/${id}/status`, data);
export const updateOrderCargo   = (id, data) => api.put(`/orders/${id}/cargo`, data);

// ---- Public order tracking ----
export const trackOrder = (orderNumber, contact) => {
  const params = contact.email
    ? { email: contact.email }
    : { phone: contact.phone };
  return api.get(`/orders/tracking/${orderNumber}`, { params });
};
