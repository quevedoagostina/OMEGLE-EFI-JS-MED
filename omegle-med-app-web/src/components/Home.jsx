import React, { useEffect, useState, useContext } from 'react';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();

  const goDocsList = () => {
    navigate('/doctors_list');
  };

  return (
    <div>
      {/* Sección de tarjetas con slogans */}
      <div className={styles.sloganContainer}>
        <button onClick={goDocsList} className={styles.sloganCard}>
          <p>Nuestros Profesionales</p>
        </button>
        <button className={styles.sloganCard}>
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
