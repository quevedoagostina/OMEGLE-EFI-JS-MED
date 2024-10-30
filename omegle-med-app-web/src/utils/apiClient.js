import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:4000',  // URL de tu API REST
});

// Interceptor para agregar el token JWT a cada solicitud
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
