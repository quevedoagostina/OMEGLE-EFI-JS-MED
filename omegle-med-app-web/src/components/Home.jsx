import React from 'react';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div>
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


