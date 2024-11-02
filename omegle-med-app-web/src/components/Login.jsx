// src/components/Login.jsx
import React, { useState } from 'react';
import apiClient from '../utils/apiClient';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #333;
  color: #fff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #444;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  font-size: 1em;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #61dafb;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 10px;

  &:hover {
    background-color: #21a1f1;
  }
`;

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
      navigate('/'); // Redirige a /home
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <LoginContainer>
      <h2>Iniciar Sesión</h2>
      <Form onSubmit={handleLogin}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo Electrónico"
          required
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <Button type="submit">Iniciar Sesión</Button>
      </Form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </LoginContainer>
  );
};

export default Login;
