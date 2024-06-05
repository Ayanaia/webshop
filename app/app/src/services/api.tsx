import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3002/', 
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && !config.url?.includes('/login') && !config.url?.includes('/register')) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Request Config:', config); // Log the request config to debug
    return config;
});

export default api;

