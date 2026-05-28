import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const getPersonajes = async () => {
  const response = await api.get('/personajes');
  return response.data;
};

export const getPersonajeDetail = async (id) => {
  const response = await api.get(`/personajes/${id}`);
  return response.data;
};

export const createPersonaje = async (data) => {
  const response = await api.post('/personajes', data);
  return response.data;
};

export const updatePersonaje = async (id, data) => {
  const response = await api.put(`/personajes/${id}`, data);
  return response.data;
};

export const deletePersonaje = async (id) => {
  const response = await api.delete(`/personajes/${id}`);
  return response.data;
};

export default api;
