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
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [editDate, setEditDate] = useState('');
  const [editDetails, setEditDetails] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await apiClient.get('/patient/list/');
        setPatients(response.data);
      } catch (error) {
        console.error('Error al obtener los pacientes', error);
        setError('Error al cargar los pacientes.');
      }
    };
    fetchPatients();
  }, []);

  useEffect(() => {
    if (user && patients.length > 0) {
      const foundPatient = patients.find((patient) => patient.userId === user.id);
      if (foundPatient) {
        setPatient(foundPatient);
      } else {
        setError('No se encontró el paciente con ese ID.');
      }
    }
  }, [patients, user]);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (patient) {
        try {
          const response = await apiClient.get('appointment/');
          const allAppointments = response.data;
          const filteredAppointments = allAppointments.filter(
            (appointment) => appointment.patientId === patient.id
          );
          setAppointments(filteredAppointments);
        } catch (error) {
          console.error('Error al obtener citas', error);
        }
      }
    };
    fetchAppointments();
  }, [patient]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await apiClient.get('doctors/list');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error al obtener doctores', error);
      }
    };
    fetchDoctors();
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
      console.error('Error al obtener disponibilidad', error);
      setError('Error al obtener disponibilidad.');
    }
  };

  const createAppointment = async () => {
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
      setAppointments((prevAppointments) => [...prevAppointments, response.data.appointment]);
      setError(response.data.message);
    } catch (error) {
      console.error('Error al crear cita', error);
      setError('Error al crear la cita.');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar esta cita?');
    if (!confirmDelete) {
      return;
    }

    try {
      await apiClient.delete(`appointment/${id}`);
      setAppointments((appointments) => appointments.filter((appointment) => appointment.id !== id));
      alert('Cita eliminada con éxito');
    } catch (error) {
      console.error('Error al eliminar cita', error);
      setError('Error al eliminar la cita.');
    }
  };

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setEditDate(new Date(appointment.date).toISOString().split('T')[0]);
    setEditDetails(appointment.details);
  };

  const saveEdit = async () => {
    if (!editingAppointment) return;

    const updatedAppointment = {
      ...editingAppointment,
      date: `${editDate}T00:00:00`,
      details: editDetails,
    };

    try {
      await apiClient.put(`appointment/update/${editingAppointment.id}`, updatedAppointment);
      setAppointments((prevAppointments) =>
        prevAppointments.map((appt) =>
          appt.id === editingAppointment.id ? updatedAppointment : appt
        )
      );
      setEditingAppointment(null);
      setError('Cita actualizada con éxito.');
    } catch (error) {
      console.error('Error al actualizar la cita', error);
      setError('No se pudo actualizar la cita.');
    }
  };

  return (
    <div className="appointments-container">
      {/* Mostrar solo la lista de citas si no se está editando una cita */}
      {!editingAppointment && (
        <>
          <h2>Turnos programados</h2>
          <ul className="appointments-list">
            {appointments.map((appointment) => (
              <li key={appointment.id} className="appointment-item">
                <p>{appointment.date}</p>
                <p>{appointment.details}</p>
                <div className="buttons-container">
                  <button className="edit-btn" onClick={() => handleEdit(appointment)}>
                    ✏️
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(appointment.id)}>
                    ❌
                  </button>
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
          <input type="date" value={selectedDate} onChange={handleDateChange} />

          <button onClick={fetchAvailability}>Ver Disponibilidad</button>

          {error && <p className="error-message" style={{ color: isAvailable ? 'green' : 'red' }}>{error}</p>}
        </>
      )}

      {/* Mostrar solo el formulario de edición si se está editando una cita */}
      {editingAppointment && (
        <div className="edit-form">
          <h3>Editar Cita</h3>
          <label>
            Fecha:
            <input type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} />
          </label>
          <label>
            Detalles:
            <input
              type="text"
              value={editDetails}
              onChange={(e) => setEditDetails(e.target.value)}
            />
          </label>
          <button onClick={saveEdit}>Guardar Cambios</button>
          <button onClick={() => setEditingAppointment(null)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default AppointmentsList;
