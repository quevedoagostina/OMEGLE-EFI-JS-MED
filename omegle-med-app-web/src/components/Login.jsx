import React, { useState } from 'react';
import apiClient from '../utils/apiClient';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('users/login', { email, password });
      localStorage.setItem('token', response.data.token); // Guarda el token
      navigate('/Appointments'); // Redirige a /home
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  // Función para navegar al home sin iniciar sesión
  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Iniciar Sesión</h2>
      <form className={styles.form} onSubmit={handleLogin}>
        <input
          type="email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo Electrónico"
          required
        />
        <input
          type="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <button type="submit" className={styles.button}>
          Iniciar Sesión
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      
      {/* Botón adicional para volver al home */}
      <button onClick={goToHome} className={styles.homeButton}>
        Volver al Home
      </button>
    </div>
  );
};

export default Login;
