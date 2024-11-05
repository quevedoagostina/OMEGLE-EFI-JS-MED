import React, { useEffect, useState } from 'react';
import apiClient from '../utils/apiClient';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]); // Estado para la lista de doctores

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

  return (
    <div>
      <h2>Lista de Citas</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>{appointment.details}</li>
        ))}
      </ul>

      <h2>Lista de Doctores</h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>
            Nombre: {doctor.name} - Especialidad: {doctor.specialty}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentsList;
