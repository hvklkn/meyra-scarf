import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

/**
 * Initiate checkout: creates order + processes payment in one call.
 *
 * @param {{ customer: object, items: array, card: object }} payload
 * @returns {Promise<{ success: boolean, orderNumber: string, orderId: string }>}
 */
export const initiatePayment = (payload) => api.post('/payments/initiate', payload);
