import React, { useContext } from 'react';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Importa el contexto de autenticación

const Home = () => {
  const { user } = useContext(AuthContext); // Obtén el usuario desde el contexto
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
      navigate('/login'); // Si no está autenticado, redirigir a login
    }
  };

  return (
    <div>
      <div className={styles.sloganContainer}>
        <button onClick={goDocsList} className={styles.sloganCard}>
          <p>Nuestros Profesionales</p>
        </button>
        <button onClick={goToAppointments} className={styles.sloganCard}>
          <p>Reserva tu turno en segundos</p>
        </button>

        <button className={styles.sloganCard}>
          <p>Confianza y calidad en cada consulta</p>
        </button>
      </div>
    </div>
  );
};

export default Home;
