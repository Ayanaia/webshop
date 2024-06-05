import api from '../../network/api';

export const login = async (email: string, password: string) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

export const register = async (name: string, email: string, password: string, role: string) => {
  const response = await api.post('/register', { name, email, password, role });
  return response.data;
};

