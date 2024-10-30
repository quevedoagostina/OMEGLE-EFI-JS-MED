#!/bin/bash

# Variables de configuración
PROJECT_NAME="omegle-med-app-web"
API_BASE_URL="http://localhost:4000"

echo "Creando el proyecto de React usando Vite..."
npm create vite@latest $PROJECT_NAME -- --template react

cd $PROJECT_NAME || exit

echo "Instalando dependencias adicionales (Axios y React Router DOM)..."
npm install axios react-router-dom

# Crear estructura de carpetas y archivos
echo "Creando estructura de carpetas y archivos..."

mkdir -p src/utils src/components

# Configurar apiClient.js en src/utils
cat <<EOL > src/utils/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: '$API_BASE_URL',  // URL de tu API REST
});

// Interceptor para agregar el token JWT a cada solicitud
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});

export default apiClient;
EOL

# Crear componente Login.js en src/components
cat <<EOL > src/components/Login.jsx
import React, { useState } from 'react';
import apiClient from '../utils/apiClient';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/users/login', { email, password });
      localStorage.setItem('token', response.data.token); // Guarda el token
      onLoginSuccess();
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Iniciar Sesión</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Iniciar Sesión</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Login;
EOL

# Crear componente Register.js en src/components
cat <<EOL > src/components/Register.jsx
import React, { useState } from 'react';
import apiClient from '../utils/apiClient';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/users/register', formData);
      setMessage('Registro exitoso. Ahora puedes iniciar sesión.');
    } catch (err) {
      setMessage('Error en el registro.');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Registro</h2>
      <input
        type="text"
        placeholder="Nombre"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <button type="submit">Registrar</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Register;
EOL

# Crear componente AppointmentsList.js en src/components
cat <<EOL > src/components/AppointmentsList.jsx
import React, { useEffect, useState } from 'react';
import apiClient from '../utils/apiClient';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await apiClient.get('/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error("Error al obtener citas", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <h2>Lista de Citas</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>{appointment.details}</li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentsList;
EOL

# Configurar App.jsx
cat <<EOL > src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AppointmentsList from './components/AppointmentsList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/appointments" element={<AppointmentsList />} />
      </Routes>
    </Router>
  );
};

export default App;
EOL

echo "Configuración completa. Para iniciar el proyecto, usa:"
echo "cd $PROJECT_NAME && npm run dev"
