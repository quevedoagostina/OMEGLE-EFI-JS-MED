import React, { useEffect, useState, useContext } from 'react';
import apiClient from '../utils/apiClient';
import './Profile.module.css';
import { AuthContext } from '../context/AuthContext';

const PerfilDoctor = () => {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [formData, setFormData] = useState({ name: '', specialty: '' });

  useEffect(() => {
    if (user && doctors.length > 0) {
      const foundDoctor = doctors.find(doctor => doctor.userId == user.id);
      console.log(user, doctors)
      if (foundDoctor) setDoctor(foundDoctor);
      else setError('No se encontró el doctor con ese ID.');
    }
  }, [doctors, user]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await apiClient.get(`/doctors/list/`);
        console.log(response.data)
        setDoctors(response.data);
      } catch (error) {
        console.error('Error al obtener los doctores', error);
        setError('Error al cargar los doctores.');
      }
    };
    fetchDoctors();
  }, [user]);

  const handleEditClick = () => {
    setFormData({
      name: doctor.name,
      specialty: doctor.specialty,
    });
    setIsEditing(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await apiClient.put(`/doctors/update/${doctor.id}`, formData);
      setDoctor((prevDoctor) => ({
        ...prevDoctor,
        ...formData,
      }));
      setIsEditing(false);
      setError('');
      alert('Perfil actualizado con éxito');
    } catch (error) {
      console.error('Error al actualizar el perfil', error);
      setError('Error al actualizar los datos del perfil.');
    }
  };

  return (
    <div className="profile-container">
      <h2>Perfil del Doctor</h2>
      {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
      {isEditing ? (
        <form onSubmit={handleSubmit} className="edit-profile-form">
          <label>
            <strong>Nombre:</strong>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            <strong>Especialidad:</strong>
            <input
              type="text"
              name="specialty"
              value={formData.specialty}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit">Guardar Cambios</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancelar
          </button>
        </form>
      ) : doctor ? (
        <div className="profile-details">
          <p><strong>Nombre:</strong> {doctor.name}</p>
          <p><strong>Especialidad:</strong> {doctor.specialty}</p>
          <button onClick={handleEditClick}>Editar Perfil</button>
        </div>
      ) : (
        <p>Cargando datos del perfil...</p>
      )}
    </div>
  );
};

export default PerfilDoctor;
