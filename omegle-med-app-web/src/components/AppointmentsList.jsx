import React, { useEffect, useState } from 'react';
import apiClient from '../utils/apiClient';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await apiClient.get('appointment/');
        setAppointments(response.data);
      } catch (error) {
        console.error("Error al obtener citas", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <h2>Lista de Citas</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>{appointment.details}</li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentsList;
