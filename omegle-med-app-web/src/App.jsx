// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthProvider from './context/AuthContext';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AppointmentsList from './components/AppointmentsList';
import RegisterDoctor from './components/RegisterDoctor';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register_doctor" element={<RegisterDoctor />} />
          <Route path="/appointments" element={<AppointmentsList />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
