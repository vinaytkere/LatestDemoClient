import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios'; // Import correct type for config

const apiClient = axios.create({
    baseURL: 'https://localhost:7096/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.set('Authorization', `Bearer ${token}`); // ✅ Use `set()` method on headers
    }
    return config;
});

export default apiClient;