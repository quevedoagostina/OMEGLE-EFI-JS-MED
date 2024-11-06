import React, { useEffect, useState } from 'react';
import apiClient from '../utils/apiClient';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState(''); // Estado para la fecha
  const [availability, setAvailability] = useState([]);
  const [error, setError] = useState('');

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
        const response = await apiClient.get('doctors/');
        setDoctors(response.data);
      } catch (error) {
        console.error("Error al obtener doctores", error);
      }
    };

    fetchAppointments();
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
      const formattedDate = new Date(selectedDate).toISOString().split('T')[0]; // Formateamos la fecha para comparar solo la fecha (sin hora)
      // Recorremos el array de citas
      for (let appointment of appointments) {
        // Comparamos si el doctorId y la fecha son iguales
        const appointmentDate = new Date(appointment.date).toISOString().split('T')[0]; // Igual formateo para la cita
        console.log(appointment.doctorId ,selectedDoctor ,appointmentDate ,formattedDate)
        if (appointment.doctorId == selectedDoctor && appointmentDate === formattedDate) {
          console.log(false)
          return false; // Si ya existe una cita para ese doctor en esa fecha, no está disponible
        } 
      }
      console.log(true)
      return true; // Si no se encontró ninguna cita, está disponible
    
  } catch (error) {
    console.error("Error al obtener disponibilidad", error);
    setError('Error al obtener disponibilidad.');
  }
};

return (
  <div>
    <h2>Lista de Citas</h2>
    <ul>
      {appointments.map((appointment) => (
        <li key={appointment.id}>{appointment.details}</li>
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

    {error && <p style={{ color: 'red' }}>{error}</p>}

    {availability.length > 0 && (
      <div>
        <h3>Disponibilidad para {selectedDate}:</h3>
        <ul>
          {availability.map((slot, index) => (
            <li key={index}>
              {slot.time} {/* Asegúrate de que el slot tenga un campo "time" */}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);
};

export default AppointmentsList;
