import api from './api';

export async function getBooking(token) {
    const response = await api.get(`/booking`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response.data;
  }

  export async function createBooking(body, token) {
    const response = await api.post('/booking', body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  export async function updateBooking(body, bookingId, token) {
    const response = await api.put(`/booking/${bookingId}}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }