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
