import React, { useContext } from 'react';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const goDocsList = () => {
    navigate('/doctors_list');
  };

  const goToAppointments = () => {
    if (user?.role === 'user') {
      navigate('/appointments');
    } else if (user?.role === 'admin') {
      navigate(`/appointments`);
    } else if (user?.role === 'doctor') {
      navigate(`/doctor/appointments/${user.id}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <div>
      <h1 className={styles.instituteName}>Instituto Médico Omegle</h1> {/* Título para el nombre del instituto */}
      <div className={styles.sloganContainer}>
        <button onClick={goDocsList} className={styles.sloganCard}>
          <span role="img" aria-label="doctor" className={styles.icon}>👨‍⚕️</span>
          <p>Lista de Profesionales</p>
        </button>
        <button onClick={goToAppointments} className={styles.sloganCard}>
          <span role="img" aria-label="calendar" className={styles.icon}>📅</span>
          <p>Reserva tu turno</p>
        </button>
      </div>
    </div>
  );
  
};

export default Home;
