// src/components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #fff;
  background-color: #282c34;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #61dafb;
`;

const NavLinks = styled.div`
  margin-top: 20px;
  a {
    margin: 0 15px;
    color: #61dafb;
    text-decoration: none;
    font-size: 1.2rem;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <Title>Bienvenido a Omegle Med</Title>
      <p>Tu plataforma de gestión de turnos médicos</p>
      <NavLinks>
        <Link to="/login">Iniciar Sesión</Link>
        <Link to="/register">Registrarse</Link>
        <Link to="/appointments">Agendar Turno</Link>
      </NavLinks>
    </HomeContainer>
  );
};

export default Home;
