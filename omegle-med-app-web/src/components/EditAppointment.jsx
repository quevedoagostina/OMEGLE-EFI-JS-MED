import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import styles from './EditAppointment.module.css';

const EditAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState({
    date: '',
    details: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await apiClient.get(`/appointment/edit/${id}`);
        setAppointment(response.data[0]);
      } catch (error) {
        console.error('Error al obtener la cita', error);
        setError('Error al cargar los datos de la cita');
      }
    };

    fetchAppointment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.put(`/appointment/update/${id}`, appointment);
      alert('Cita actualizada con éxito');
      navigate(`/doctor/appointments/${appointment.doctorId}`);
    } catch (error) {
      console.error('Error al actualizar la cita', error);
      setError('Error al actualizar la cita.');
    }
  };

  return (
    <div className={styles.editAppointmentContainer}>
      <h2>Editar Cita</h2>
      {error && <p className={styles.error}>{error}</p>}
      {appointment.date}
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="date">Fecha</label>
        <input
          type="date"
          id="date"
          name="date"
          onChange={handleChange}
          required
        />
        <label htmlFor="details">Detalle</label>
        <input
          id="details"
          name="details"  // Corrected name to "details"
          value={appointment.details}
          onChange={handleChange}
          required
        />
        <button type="submit" className={styles.submitButton}>Actualizar Cita</button>
      </form>
    </div>
  );
};

export default EditAppointment;
