import axios from 'axios';

const API_BASE = '/api';

export const getAvailableRooms = (checkIn, checkOut) => {
  return axios.get(`${API_BASE}/rooms/available`, {
    params: { checkIn, checkOut },
  });
};

export const createBooking = (bookingData) => {
  return axios.post(`${API_BASE}/bookings`, bookingData);
};
