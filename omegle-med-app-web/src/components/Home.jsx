import React from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className={styles.homeContainer}>
        <h1 className={styles.title}>Bienvenido a Omegle Med</h1>
        <p className={styles.homeDescription}>Tu plataforma de gestión de turnos médicos</p>
        <div className={styles.navLinks}>
          <Link to="/login" className={styles.card}>Iniciar Sesión</Link>
          <Link to="/register" className={styles.card}>Registrarse</Link>
          <Link to="/appointments" className={styles.card}>Agendar Turno</Link>
        </div>
      </div>

      {/* Sección de tarjetas con slogans */}
      <div className={styles.sloganContainer}>
        <div className={styles.sloganCard}>
          <p>Atención médica a solo un clic</p>
        </div>
        <div className={styles.sloganCard}>
          <p>Reserva tu turno en segundos</p>
        </div>
        <div className={styles.sloganCard}>
          <p>Confianza y calidad en cada consulta</p>
        </div>
      </div>

      
    </div>
  );
};

export default Home;


