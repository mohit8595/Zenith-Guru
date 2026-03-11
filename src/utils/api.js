import axios from 'axios';

const API_BASE_URL = 'http://localhost:5002/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  loginWithOtp: (data) => api.post('/auth/login-with-otp', data),
  verifyOtpLogin: (data) => api.post('/auth/verify-otp-login', data),
  sendLoginOtp: (data) => api.post('/auth/send-login-otp', data),
  verifyLoginOtp: (data) => api.post('/auth/verify-login-otp', data),
  getMe: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout')
};

// Contact API
export const contactAPI = {
  submit: (data) => api.post('/contacts', data),
  getAll: () => api.get('/contacts'),
  getById: (id) => api.get(`/contacts/${id}`),
  updateStatus: (id, status) => api.patch(`/contacts/${id}`, { status }),
  delete: (id) => api.delete(`/contacts/${id}`)
};

// Video API
export const videoAPI = {
  getAll: (params) => api.get('/videos', { params }),
  getById: (id) => api.get(`/videos/${id}`),
  create: (data) => api.post('/videos', data),
  createWithUrl: (data) => api.post('/videos/url', data),
  update: (id, data) => api.put(`/videos/${id}`, data),
  delete: (id) => api.delete(`/videos/${id}`)
};

// PDF API
export const pdfAPI = {
  getAll: (params) => api.get('/pdfs', { params }),
  getById: (id) => api.get(`/pdfs/${id}`),
  create: (data) => api.post('/pdfs', data),
  createWithUrl: (data) => api.post('/pdfs/url', data),
  update: (id, data) => api.put(`/pdfs/${id}`, data),
  delete: (id) => api.delete(`/pdfs/${id}`)
};

// Blog API
export const blogAPI = {
  getAll: (params) => api.get('/blogs', { params }),
  getById: (id) => api.get(`/blogs/${id}`),
  create: (data) => api.post('/blogs', data),
  update: (id, data) => api.put(`/blogs/${id}`, data),
  delete: (id) => api.delete(`/blogs/${id}`)
};

// Course API
export const courseAPI = {
  getAll: (params) => api.get('/courses', { params }),
  getById: (id) => api.get(`/courses/${id}`),
  create: (data) => api.post('/courses', data),
  update: (id, data) => api.put(`/courses/${id}`, data),
  delete: (id) => api.delete(`/courses/${id}`)
};

// Test API
export const testAPI = {
  getAll: (params) => api.get('/tests', { params }),
  getById: (id) => api.get(`/tests/${id}`),
  create: (data) => api.post('/tests', data),
  update: (id, data) => api.put(`/tests/${id}`, data),
  delete: (id) => api.delete(`/tests/${id}`)
};

// Visitor API
export const visitorAPI = {
  get: () => api.get('/visitors'),
  increment: () => api.post('/visitors/increment'),
  reset: () => api.post('/visitors/reset')
};

export default api;
