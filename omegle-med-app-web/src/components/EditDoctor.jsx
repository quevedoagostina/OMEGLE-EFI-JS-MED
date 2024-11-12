import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import styles from './EditDoctor.module.css';

const EditDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState({
    name: '',
    specialty: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);  // Estado para manejar el loading

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await apiClient.get(`doctors/edit/${id}`);
        setDoctor(response.data[0]); // Actualiza el estado con los datos del doctor
        setLoading(false);  // Cuando la carga se haya completado, cambia el estado de loading
      } catch (error) {
        console.error('Error al obtener el doctor', error);
        setError('Error al obtener los datos del doctor');
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prevDoctor) => ({
      ...prevDoctor,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.put(`doctors/${id}`, doctor);
      alert('Doctor actualizado con éxito');
      navigate('/doctors_list'); // Redirige a la lista de doctores
    } catch (error) {
      console.error('Error al actualizar el doctor', error);
      setError('Error al actualizar el doctor');
    }
  };

  // Si los datos aún se están cargando, muestra un mensaje de carga
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.editDoctorContainer}>
      <h2>Editar Doctor</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="name">Nombre: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={doctor.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="specialty">Especialidad: </label>
          <input
            type="text"
            id="specialty"
            name="specialty"
            value={doctor.specialty}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>Actualizar Doctor</button>
      </form>
    </div>
  );
};

export default EditDoctor;
