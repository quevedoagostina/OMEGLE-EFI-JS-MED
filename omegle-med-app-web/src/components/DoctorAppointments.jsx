import React, { useState, useEffect } from 'react';
import apiClient from '../utils/apiClient';
import styles from './DoctorAppointments.module.css';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]); // Estado para almacenar pacientes
  const [error, setError] = useState('');

  useEffect(() => {
    const currentUrl = window.location.href;
    const doctorId = parseInt(currentUrl.split('/').pop(), 10);

    if (!doctorId) {
      setError('No se pudo obtener el ID del doctor de la URL.');
      return;
    }

    const fetchAppointments = async () => {
      try {
        const response = await apiClient.get(`/appointment/doctors/${doctorId}`);
        setAppointments(response.data);
      } catch (error) {
        console.error('Error al obtener las citas', error);
        setError('Error al cargar las citas.');
      }
    };

    const fetchPatients = async () => {
      try {
        const response = await apiClient.get(`/patient/list/`);
        setPatients(response.data);
      } catch (error) {
        console.error('Error al obtener los pacientes', error);
        setError('Error al cargar los pacientes.');
      }
    };

    fetchAppointments();
    fetchPatients();
  }, []);

  const handleCancelAppointment = async (appointmentId) => {
    const confirmCancel = window.confirm(
      "¿Está seguro de que quiere cancelar la cita? Se le avisará al paciente."
    );
  
    if (confirmCancel) {
      try {
        await apiClient.delete(`/appointment/${appointmentId}`);
        setAppointments((prev) => prev.filter((appt) => appt.id !== appointmentId));
        alert("Cita cancelada con éxito");
      } catch (error) {
        console.error("Error al cancelar la cita", error);
        setError("No se pudo cancelar la cita.");
      }
    }
  };
  

  const handleEditAppointment = (appointmentId) => {
    window.location.href = `/edit_appointment/${appointmentId}`;
  };

  // Encuentra el nombre del paciente por su ID
  const getPatientName = (patientId) => {
    const patient = patients.find((p) => p.id === patientId);
    return patient ? patient.name : 'Paciente no encontrado';
  };

  return (
    <div className={styles.appointmentsContainer}>
      <h2>Mis Citas</h2>
      {error && <p className={styles.error}>{error}</p>}
      <ul>
        {appointments.map((appt) => (
          <li key={appt.id} className={styles.appointmentItem}>
            <p><strong>Paciente:</strong> {getPatientName(appt.patientId)}</p>
            <p><strong>Fecha:</strong> {appt.date}</p>
            <p><strong>Detalles:</strong> {appt.details}</p>
            <button
              className={styles.cancelButton}
              onClick={() => handleCancelAppointment(appt.id)}
            >
              Cancelar
            </button>
            <button
              className={styles.editButton}
              onClick={() => handleEditAppointment(appt.id)}
            >
              Editar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorAppointments;
