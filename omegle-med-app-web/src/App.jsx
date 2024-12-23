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
import DoctorsList from './components/DoctorsList'
import EditDoctor from './components/EditDoctor';
import DoctorAppointments from './components/DoctorAppointments';
import Profile from './components/Profile';
import PerfilDoctor from './components/PerfilDoctor'


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
          <Route path="/doctors_list" element={<DoctorsList />} />
          <Route path="/edit_doctor/:id" element={<EditDoctor />} />
          <Route path="/appointments" element={<AppointmentsList />} />
          <Route path="/doctor/appointments/:doctorId" element={<DoctorAppointments />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/profile_doctor/:id" element={<PerfilDoctor />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
