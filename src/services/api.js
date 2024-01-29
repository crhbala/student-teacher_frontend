import axios from 'axios';

const baseURL = 'https://teacherandstud.onrender.com/data'; 

const api = axios.create({
  baseURL,
});

export const studentAPI = {
  getAll: () => api.get(`/student`),
  create: (student) => api.post('/student', student),
  update: (id, student) => api.put(`/student/${id}`, student),
  delete: (id) => api.delete(`/student/${id}`),
};

export const teacherAPI = {
  getAll: () => api.get('/teacher'),
  create: (teacher) => api.post('/teacher', teacher),
  update: (id, teacher) => api.put(`/teacher/${id}`, teacher),
  delete: (id) => api.delete(`/teacher/${id}`),
};
