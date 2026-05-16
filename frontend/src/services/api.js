import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const topicsApi = {
  generate: (topic) => api.post('/topics/generate', { topic }),
  getHistory: () => api.get('/topics/history'),
  getHistoryItem: (id) => api.get(`/topics/history/${id}`),
  toggleBookmark: (id) => api.put(`/topics/history/${id}/bookmark`),
};

export const userApi = {
  updateProfile: (name) => api.put('/auth/profile', { name }),
  updatePassword: (password) => api.put('/auth/password', { password }),
};

export default api;
