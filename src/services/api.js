import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for JWT auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const portfolioApi = {
  // Public APIs
  getProfile: () => api.get('/public/profile'),
  getSkills: () => api.get('/public/skills'),
  getExperience: () => api.get('/public/experience'),
  getProjects: () => api.get('/public/projects'),
  getProjectBySlug: (slug) => api.get(`/public/projects/${slug}`),
  getEducation: () => api.get('/public/education'),
  getCertificates: () => api.get('/public/certificates'),
  sendContact: (data) => api.post('/public/contact', data),

  // Auth API
  login: (credentials) => api.post('/auth/login', credentials),

  // Admin APIs
  updateProfile: (data) => api.put('/admin/profile', data),
  
  getAllAdminProjects: () => api.get('/admin/projects'),
  createProject: (data) => api.post('/admin/projects', data),
  updateProject: (id, data) => api.put(`/admin/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/admin/projects/${id}`),

  createSkill: (data) => api.post('/admin/skills', data),
  updateSkill: (id, data) => api.put(`/admin/skills/${id}`, data),
  deleteSkill: (id) => api.delete(`/admin/skills/${id}`),

  createExperience: (data) => api.post('/admin/experience', data),
  updateExperience: (id, data) => api.put(`/admin/experience/${id}`, data),
  deleteExperience: (id) => api.delete(`/admin/experience/${id}`),

  getAllMessages: () => api.get('/admin/messages'),
  markMessageRead: (id) => api.put(`/admin/messages/${id}/read`),
  deleteMessage: (id) => api.delete(`/admin/messages/${id}`),
};

export default api;
