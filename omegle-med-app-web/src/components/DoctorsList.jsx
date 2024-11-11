import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import styles from './DoctorsList.module.css';

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await apiClient.get('doctors/list');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error al obtener los doctores', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleEdit = (doctor) => {
    navigate(`/edit_doctor/${doctor.id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este doctor?');
    if (!confirmDelete) return;

    try {
      await apiClient.delete(`doctors/${id}`);
      setDoctors((prevDoctors) => prevDoctors.filter((doctor) => doctor.id !== id));
      alert('Doctor eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar el doctor', error);
      alert('Error al eliminar el doctor.');
    }
  };

  return (
    <div className={styles.doctorsContainer}>
      <h2>Lista de Doctores</h2>
      <ul className={styles.doctorsList}>
        {doctors.map((doctor) => (
          <li key={doctor.id} className={styles.doctorItem}>
            <p><strong>Nombre:</strong> {doctor.name}</p>
            <p><strong>Especialidad:</strong> {doctor.specialty}</p>
            {user?.role == 'admin' && (
              <div className={styles.adminButtons}>
                <button onClick={() => handleEdit(doctor)} className={styles.editButton}>Editar</button>
                <button onClick={() => handleDelete(doctor.id)} className={styles.deleteButton}>Eliminar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorsList;
