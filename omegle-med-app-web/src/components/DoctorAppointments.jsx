import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import styles from './DoctorAppointments.module.css';

const DoctorAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [appointmentId, setAppointmentId] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false); // Controla si se está editando una cita
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [editDate, setEditDate] = useState('');
  const [editDetails, setEditDetails] = useState('');
  const [appointment, setAppointment] = useState({
    date: '',
    details: '',
  });

  // Obtiene el ID del doctor desde la URL
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
        const foundDoctor = doctors.find((doc) => doc.userId === userId);

        if (foundDoctor) setDoctor(foundDoctor);
      } catch (error) {
        console.error("Error al obtener doctores", error);
        setError('Error al cargar los doctores.');
      }
    };

    const fetchPatients = async () => {
      try {
        const response = await apiClient.get('/patient/list/');
        setPatients(response.data);
      } catch (error) {
        console.error('Error al obtener los pacientes', error);
        setError('Error al cargar los pacientes.');
      }
    };

    fetchDoctors();
    fetchPatients();
  }, []);

  // Carga las citas del doctor
  useEffect(() => {
    if (!doctor) return;

    const fetchAppointments = async () => {
      try {
        const response = await apiClient.get(`/appointment/doctors/${doctor.id}`);
        const allAppointments = response.data.filter(
          (appt) => parseInt(appt.doctorId, 10) === parseInt(doctor.id, 10)
        );
        setAppointments(allAppointments);
      } catch (error) {
        console.error('Error al obtener las citas', error);
        setError('Error al cargar las citas.');
      }
    };

    fetchAppointments();
  }, [doctor]);

  // Cargar datos de cita específica para edición
  useEffect(() => {
    if (appointmentId && isEditing) {
      const fetchAppointment = async () => {
        try {
          const response = await apiClient.get(`/appointment/edit/${appointmentId}`);
          setAppointment(response.data[0]);
        } catch (error) {
          console.error('Error al obtener la cita', error);
          setError('Error al cargar los datos de la cita.');
        }
      };

      fetchAppointment();
    }
  }, [appointmentId, isEditing]);

  const handleCancelAppointment = async (appointmentId) => {
    const confirmCancel = window.confirm(
      '¿Está seguro de que quiere cancelar la cita? Se le avisará al paciente.'
    );

    if (confirmCancel) {
      try {
        await apiClient.delete(`/appointment/${appointmentId}`);
        setAppointments((prev) => prev.filter((appt) => appt.id !== appointmentId));
        alert('Cita cancelada con éxito');
      } catch (error) {
        console.error('Error al cancelar la cita', error);
        setError('No se pudo cancelar la cita.');
      }
    }
  };

  const handleEditAppointment = (appointmentId) => {
    const selectedAppointment = appointments.find((appt) => appt.id === appointmentId);
    
    if (!selectedAppointment || !selectedAppointment.date) {
      console.error("Fecha de cita inválida o cita no encontrada.");
      setError("Error al editar la cita. Cita no encontrada o fecha inválida.");
      return;
    }
    
    setAppointmentId(selectedAppointment.id)
    setIsEditing(true);
    setEditingAppointment(selectedAppointment);
  
    try {
      const formattedDate = new Date(selectedAppointment.date).toISOString().split('T')[0];
      setEditDate(formattedDate);
      setEditDetails(selectedAppointment.details);
    } catch (e) {
      console.error("Error al formatear la fecha de la cita:", e);
      setError("Error al formatear la fecha de la cita.");
    }
  };
  

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
      await apiClient.put(`appointment/update/${appointmentId}`, appointment);
      alert('Cita actualizada con éxito');
      setAppointments((prevAppointments) =>
        prevAppointments.map((appt) =>
          appt.id === appointmentId ? { ...appt, ...appointment } : appt
        )
      );
      navigate(`/doctor/appointments/${doctor.userId}`);
      setIsEditing(false);
    } catch (error) {
      console.error('Error al actualizar la cita', error);
      setError('Error al actualizar la cita.');
    }
  };

  const getPatientName = (patientId) => {
    const patient = patients.find((p) => p.id === patientId);
    return patient ? patient.name : 'Paciente no encontrado';
  };

  return (
    <div className={styles.appointmentsContainer}>
      <h2>{isEditing ? 'Editar Cita' : 'Mis Citas'}</h2>
      {error && <p className={styles.error}>{error}</p>}

      {isEditing ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="date">Fecha</label>
          <input
            type="date"
            id="date"
            name="date"
            value={appointment.date}
            onChange={handleChange}
            required
          />
          <label htmlFor="details">Detalle</label>
          <input
            id="details"
            name="details"
            value={appointment.details}
            onChange={handleChange}
            required
          />
          <button type="submit" className={styles.submitButton}>
            Actualizar Cita
          </button>
        </form>
      ) : (
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
      )}
    </div>
  );
};

export default DoctorAppointments;
