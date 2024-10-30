#!/bin/bash

echo "Instalando styled-components..."
npm install styled-components

# Ruta base
COMPONENTS_DIR="./omegle-med-app-web/src/components"

# Crear carpeta components si no existe
mkdir -p "$COMPONENTS_DIR"

# Crear archivo Home.js
echo "Creando Home.js..."
cat <<EOL > "$COMPONENTS_DIR/Home.js"
import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div\`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f8ff;
  color: #333;
  font-family: Arial, sans-serif;
\`;

const Title = styled.h1\`
  font-size: 3em;
  color: #4b9cd3;
\`;

const Description = styled.p\`
  font-size: 1.5em;
  max-width: 600px;
  text-align: center;
\`;

const Home = () => (
  <HomeContainer>
    <Title>Bienvenido a Omegle Med</Title>
    <Description>Tu plataforma de gestión de turnos médicos. Por favor, inicia sesión o regístrate para continuar.</Description>
  </HomeContainer>
);

export default Home;
EOL

# Crear archivo Login.js
echo "Creando Login.js..."
cat <<EOL > "$COMPONENTS_DIR/Login.js"
import React from 'react';
import styled from 'styled-components';

const LoginContainer = styled.div\`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #e0f7fa;
\`;

const Form = styled.form\`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  width: 100%;
\`;

const Input = styled.input\`
  margin: 10px 0;
  padding: 10px;
  font-size: 1em;
\`;

const Button = styled.button\`
  padding: 10px;
  background-color: #4b9cd3;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1em;
  margin-top: 10px;

  &:hover {
    background-color: #357ba8;
  }
\`;

const Login = () => (
  <LoginContainer>
    <h2>Iniciar Sesión</h2>
    <Form>
      <Input type="email" placeholder="Correo electrónico" />
      <Input type="password" placeholder="Contraseña" />
      <Button type="submit">Ingresar</Button>
    </Form>
  </LoginContainer>
);

export default Login;
EOL

# Crear archivo Register.js
echo "Creando Register.js..."
cat <<EOL > "$COMPONENTS_DIR/Register.js"
import React from 'react';
import styled from 'styled-components';

const RegisterContainer = styled.div\`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fbe9e7;
\`;

const Form = styled.form\`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  width: 100%;
\`;

const Input = styled.input\`
  margin: 10px 0;
  padding: 10px;
  font-size: 1em;
\`;

const Button = styled.button\`
  padding: 10px;
  background-color: #f06292;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1em;
  margin-top: 10px;

  &:hover {
    background-color: #d81b60;
  }
\`;

const Register = () => (
  <RegisterContainer>
    <h2>Registrarse</h2>
    <Form>
      <Input type="text" placeholder="Nombre completo" />
      <Input type="email" placeholder="Correo electrónico" />
      <Input type="password" placeholder="Contraseña" />
      <Button type="submit">Registrarse</Button>
    </Form>
  </RegisterContainer>
);

export default Register;
EOL

# Crear archivo AppointmentsList.js
echo "Creando AppointmentsList.js..."
cat <<EOL > "$COMPONENTS_DIR/AppointmentsList.js"
import React from 'react';
import styled from 'styled-components';

const AppointmentContainer = styled.div\`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fff3e0;
\`;

const Form = styled.form\`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  width: 100%;
\`;

const Input = styled.input\`
  margin: 10px 0;
  padding: 10px;
  font-size: 1em;
\`;

const Button = styled.button\`
  padding: 10px;
  background-color: #ffb300;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1em;
  margin-top: 10px;

  &:hover {
    background-color: #ff8f00;
  }
\`;

const AppointmentsList = () => (
  <AppointmentContainer>
    <h2>Agendar Turno</h2>
    <Form>
      <Input type="text" placeholder="Nombre del Doctor" />
      <Input type="date" />
      <Button type="submit">Agendar</Button>
    </Form>
  </AppointmentContainer>
);

export default AppointmentsList;
EOL

# Actualizar App.js
echo "Actualizando App.js para incluir las rutas..."
cat <<EOL > "./omegle-med-app-web/src/App.js"
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AppointmentsList from './components/AppointmentsList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/appointments" element={<AppointmentsList />} />
      </Routes>
    </Router>
  );
};

export default App;
EOL

echo "Configuración completada. Puedes iniciar tu aplicación con el script ./start_all.sh."
