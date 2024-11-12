import React, { useEffect, useState, useContext } from 'react';
import apiClient from '../utils/apiClient';
import './Appointment.module.css';
import './Navbar.module.css';
import { AuthContext } from '../context/AuthContext';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isAvailable, setIsAvailable] = useState(null);
  const [error, setError] = useState('');
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState(null);
  const { user } = useContext(AuthContext);
  
  useEffect(() => {
    if (user && patients.length > 0) { // Aseguramos que 'patients' tiene datos antes de buscar.
      const foundPatient = patients.find(patient => patient.userId == user.id);
  
      if (foundPatient) {
        console.log('Paciente encontrado:', foundPatient);
        setPatient(foundPatient); // Establecer el paciente en el estado.
      } else {
        console.log('No se encontró el paciente con ese ID.');
        setError('No se encontró el paciente con ese ID.');
      }
    }
  }, [patients, user]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await apiClient.get('appointment/');
        setAppointments(response.data);
      } catch (error) {
        console.error("Error al obtener citas", error);
      }
    };

    const fetchDoctors = async () => {
      try {
        const response = await apiClient.get('doctors/list');
        setDoctors(response.data);
      } catch (error) {
        console.error("Error al obtener doctores", error);
      }
    };

    const fetchPatients = async () => {
      try {
        const pacientes = await apiClient.get(`/patient/list/`);
        setPatients(pacientes.data);
      } catch (error) {
        console.error('Error al obtener los pacientes', error);
        setError('Error al cargar los pacientes.');
      }
    };

    fetchAppointments();
    fetchDoctors();
    fetchPatients();
  }, []);

  const handleDoctorChange = (event) => {
    setSelectedDoctor(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const fetchAvailability = async () => {
    if (!selectedDoctor || !selectedDate) {
      setError('Por favor, selecciona un doctor y una fecha.');
      return;
    }

    try {
      const formattedDate = new Date(selectedDate).toISOString().split('T')[0];
      let available = true;

      for (let appointment of appointments) {
        const appointmentDate = new Date(appointment.date).toISOString().split('T')[0];
        if (appointment.doctorId == selectedDoctor && appointmentDate === formattedDate) {
          available = false;
          break;
        }
      }

      setIsAvailable(available);
      
      if (available) {
        const confirmReservation = window.confirm('Esta fecha está disponible. ¿Deseas confirmar la reserva?');
        if (confirmReservation) {
          await createAppointment(); 
        } else {
          setError('La reserva no se realizó.');
        }
      } else {
        setError('La fecha seleccionada no está disponible.');
      }

    } catch (error) {
      console.error("Error al obtener disponibilidad", error);
      setError('Error al obtener disponibilidad.');
    }
  };

  const createAppointment = async () => {
    // Verificar si el paciente está definido antes de continuar
    if (!patient || !patient.id) {
      setError('No se ha encontrado el patientId del usuario');
      return;
    }
  
    const doctorId = parseInt(selectedDoctor, 10);
  
    if (isNaN(doctorId)) {
      setError('El ID del doctor es inválido');
      return;
    }
  
    const doctor = doctors.find((doc) => doc.id === doctorId);
  
    if (!doctor) {
      setError('Doctor no encontrado');
      return;
    }
  
    const details = `Cita con el Dr. ${doctor.name} (${doctor.specialty}) en la fecha: ${selectedDate}`;
  
    const newAppointment = {
      doctorId,
      patientId: patient.id,
      date: `${selectedDate}T00:00:00`,
      details,
      status: 'programada',
    }; 
  
    try {
      const response = await apiClient.post('appointment/create', newAppointment);
      console.log(response);
      setAppointments((prevAppointments) => [...prevAppointments, response.data.appointment]);
      setError(response.data.message);
    } catch (error) {
      console.error("Error al crear cita", error);
      setError('Error al crear la cita.');
    }
  };
  

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta cita?");
    if (!confirmDelete) {
      return; 
    }
  
    try {
      await apiClient.delete(`appointment/${id}`);
      setAppointments(appointments.filter(appointment => appointment.id !== id));
      alert("Cita eliminada con éxito");
    } catch (error) {
      console.error("Error al eliminar cita", error);
      setError("Error al eliminar la cita.");
    }
  };
  

  const handleEdit = (appointment) => {
    console.log("Editar cita", appointment);
  };

  return (
    <div className="appointments-container">
      <h2>Turnos programados</h2>
      <ul className="appointments-list">
        {appointments.map((appointment) => (
          <li key={appointment.id} className="appointment-item">
          <p>{appointment.doctorId}</p>
          <p>{appointment.date}</p>
          <p>{appointment.details}</p>
          <div className="buttons-container">
            <button className="edit-btn" onClick={() => handleEdit(appointment)}>✏️</button>
            <button className="delete-btn" onClick={() => handleDelete(appointment.id)}>❌</button>
          </div>
        </li>
        ))}
      </ul>
  
      <h2>Selecciona un Doctor</h2>
      <select value={selectedDoctor} onChange={handleDoctorChange}>
        <option value="">Seleccione un doctor</option>
        {doctors.map((doctor) => (
          <option key={doctor.id} value={doctor.id}>
            {doctor.name} - Especialidad: {doctor.specialty}
          </option>
        ))}
      </select>
  
      <h2>Selecciona una Fecha</h2>
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
      />
  
      <button onClick={fetchAvailability}>Ver Disponibilidad</button>
  
      {error && <p className="error-message" style={{ color: isAvailable ? 'green' : 'red' }}>{error}</p>}
    </div>
  );
};

export default AppointmentsList;
