import React, { useState } from 'react';
import styled from 'styled-components';
import apiClient from '../utils/apiClient';

// Estilos para el contenedor del formulario de registro
const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fbe9e7;
  color: #333;
`;

// Estilos para el formulario
const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  width: 100%;
`;

// Estilos para los campos de entrada
const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

// Estilos para el botón de enviar
const Button = styled.button`
  padding: 10px;
  background-color: #f06292;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 10px;

  &:hover {
    background-color: #d81b60;
  }
`;

const Message = styled.p`
  color: ${(props) => (props.success ? 'green' : 'red')};
`;

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/users/register', formData);
      setMessage('Registro exitoso. Ahora puedes iniciar sesión.');
      setIsSuccess(true);
    } catch (err) {
      setMessage('Error en el registro. Inténtalo de nuevo.');
      setIsSuccess(false);
    }
  };

  return (
    <RegisterContainer>
      <h2>Registro</h2>
      <Form onSubmit={handleRegister}>
        <Input
          type="text"
          placeholder="Nombre completo"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Input
          type="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <Button type="submit">Registrar</Button>
      </Form>
      {message && <Message success={isSuccess}>{message}</Message>}
    </RegisterContainer>
  );
};

export default Register;
