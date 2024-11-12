import React, { useEffect, useState, useContext } from 'react';
import apiClient from '../utils/apiClient';
import './Profile.module.css';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState(null);
  const [formData, setFormData] = useState({ name: '', birthDate: '' });

  useEffect(() => {
    if (user && patients.length > 0) {
      const foundPatient = patients.find(patient => patient.userId == user.id);
      if (foundPatient) setPatient(foundPatient);
      else setError('No se encontró el paciente con ese ID.');
    }
  }, [patients, user]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const pacientes = await apiClient.get(`/patient/list/`);
        setPatients(pacientes.data);
      } catch (error) {
        console.error('Error al obtener los pacientes', error);
        setError('Error al cargar los pacientes.');
      }
    };
    fetchPatients();
  }, [user]);

  const handleEditClick = () => {
    setFormData({
      name: patient.name,
      birthDate: patient.birthDate,
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
      await apiClient.put(`/patient/update/${patient.id}`, formData);
      setPatient((prevPatient) => ({
        ...prevPatient,
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
      <h2>Mi Perfil</h2>
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
            <strong>Fecha Nac.:</strong>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit">Guardar Cambios</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancelar
          </button>
        </form>
      ) : patient ? (
        <div className="profile-details">
          <p><strong>Nombre:</strong> {patient.name}</p>
          <p><strong>Fecha Nac.:</strong> {patient.birthDate}</p>
          <button onClick={handleEditClick}>Editar Perfil</button>
        </div>
      ) : (
        <p>Cargando datos del perfil...</p>
      )}
    </div>
  );
};

export default Profile;
