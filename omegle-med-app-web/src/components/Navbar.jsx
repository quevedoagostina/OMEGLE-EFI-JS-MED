import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext); 

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.link}>Home</Link>
      <div className={styles.navLinks}>
      {isAuthenticated ? (
      <>
        {user?.role === 'user' && (
          <>
            <Link to="/appointments" className={styles.link}>Citas</Link>
            <Link to={`/profile/${user.id}`} className={styles.link}>Perfil</Link>
          </>
        )}
        {user?.role === 'admin' && (
          <Link to="/register_doctor" className={styles.link}>Registrar Doctor</Link>
        )}
        {user?.role === 'doctor' && (
          <Link to={`/doctor/appointments/${user.id}`} className={styles.link}>
            Mis Citas
          </Link>
        )}
        <button onClick={logout} className={styles.logoutButton}>Logout</button>
      </>
    ) : (
      <>
        <Link to="/login" className={styles.link}>Login</Link>
        <Link to="/register" className={styles.link}>Register</Link>
      </>
    )}
      </div>
    </nav>
  );
};

export default Navbar;
