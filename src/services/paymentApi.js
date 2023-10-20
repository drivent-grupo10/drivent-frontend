import api from './api';

export async function paymentProcess(data, token) {
  const response = await api.post('/payments/process', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}