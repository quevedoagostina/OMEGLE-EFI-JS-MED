import React, { useState, useEffect } from 'react';
import apiClient from '../utils/apiClient';
import styles from './DoctorAppointments.module.css';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const currentUrl = window.location.href;
    const userId = parseInt(currentUrl.split('/').pop(), 10);

    if (!userId) {
      setError('No se pudo obtener el ID del doctor de la URL.');
      return;
    }

    const fetchDoctors = async () => {
      try {
        const response = await apiClient.get('doctors/list');
        const doctors = response.data;
        const foundDoctor = doctors.find((doctor) => doctor.userId === userId);

        if (foundDoctor) {
          setDoctor(foundDoctor);
        } else {
          console.log('No se encontró el doctor con el ID:', userId);
        }
      } catch (error) {
        console.error("Error al obtener doctores", error);
        setError('Error al cargar los doctores.');
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

    fetchDoctors();
    fetchPatients();
  }, []);

  useEffect(() => {
    if (!doctor) return;

    const fetchAppointments = async () => {
      try {
        const response = await apiClient.get(`/appointment/doctors/${doctor.id}`);
        const allAppointments = response.data;
        const filteredAppointments = allAppointments.filter((appt) => {
          return parseInt(appt.doctorId, 10) === parseInt(doctor.id, 10);
        });
        console.log("Filtered Appointments:", filteredAppointments);
        setAppointments(filteredAppointments);
      } catch (error) {
        console.error('Error al obtener las citas', error);
        setError('Error al cargar las citas.');
      }
    };
    

    fetchAppointments();
  }, [doctor]);

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
