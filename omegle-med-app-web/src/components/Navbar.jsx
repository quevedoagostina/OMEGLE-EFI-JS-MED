import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styles from './Navbar.module.css'; // Importa los estilos

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.link}>Home</Link>
      <div className={styles.navLinks}>
        {isAuthenticated ? (
          <>
            <Link to="/appointments" className={styles.link}>Citas</Link>
            <button onClick={logout} className={styles.logoutButton}>Logout</button>
          </>
        ) : (
          <Link to="/login" className={styles.link}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
