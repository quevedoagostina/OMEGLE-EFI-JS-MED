import React, { useState } from 'react';
import apiClient from '../utils/apiClient';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role:'doctor'});
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/users/register', formData);
      const doctorId = response.data?.user?.id;
      const defaultDoctor = {
        name: 'default',
        specialty: 'default',
        userId: doctorId,
      }
      await apiClient.post('/doctors/create', defaultDoctor);
      console.log(`Doctor registrado con ID: ${doctorId}`);
      setMessage('Doctor Añadido.');
      setIsSuccess(true);
    } catch (err) {
      setMessage('Error en el registro. Inténtalo de nuevo.');
      setIsSuccess(false);
    }
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.registerContainer}>
      <h2>Registro Doctor</h2>
      <form className={styles.form} onSubmit={handleRegister}>
        <input
          type="text"
          className={styles.input}
          placeholder="Nombre completo"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          className={styles.input}
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          className={styles.input}
          placeholder="Contraseña"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button type="submit" className={styles.button}>
          Registrar
        </button>
      </form>
      {message && (
        <p className={`${styles.message} ${isSuccess ? styles.success : ''}`}>
          {message}
        </p>
      )}
      
      {/* Botón adicional para volver al home */}
      <button onClick={goToHome} className={styles.homeButton}>
        Volver al Home
      </button>
    </div>
  );
};

export default Register;
