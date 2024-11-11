import React, { useState, useContext } from 'react';
import apiClient from '../utils/apiClient';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Obtén la función login del contexto

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('users/login', { email, password });
      const { token, user } = response.data; // Asegúrate de que el backend envíe el usuario
      login(user, token); // Actualiza el estado global de autenticación
      navigate('/appointments'); // Redirige después de iniciar sesión
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

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

      <button onClick={goToHome} className={styles.homeButton}>
        Volver al Home
      </button>
    </div>
  );
};

export default Login;
