import React, { useEffect, useState, useContext } from 'react';
import apiClient from '../utils/apiClient';
import './Profile.module.css';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
        if (!user?.id) {
          setError('Usuario no autenticado.');
          return;
        }
      
        try {
          const response = await apiClient.get('/users/profile', {
            headers: { Authorization: `Bearer ${user.token}` }
          });
          setProfileData(response.data);
        } catch (error) {
          console.error("Error al obtener perfil", error);
          setError('Error al cargar los datos del perfil.');
        }
      };
      

    fetchProfileData();
  }, [user]);

  return (
    <div className="profile-container">
      <h2>Mi Perfil</h2>

      {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

      {profileData ? (
        <div className="profile-details">
          <p><strong>Nombre:</strong> {profileData.name}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Rol:</strong> {profileData.role}</p>
          {/* Add more fields as necessary */}
        </div>
      ) : (
        <p>Cargando datos del perfil...</p>
      )}
    </div>
  );
};

export default Profile;
