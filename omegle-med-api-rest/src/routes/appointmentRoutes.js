// routes/appointmentRoutes.js
const express = require('express');
const { createAppointment, getAppointments, updateAppointment, deleteAppointment } = require('../controllers/appointmentController');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.post('/', authenticate, createAppointment); // Crear nueva cita
router.get('/', authenticate, getAppointments); // Obtener todas las citas
router.put('/:id', authenticate, updateAppointment); // Actualizar cita
router.delete('/:id', authenticate, deleteAppointment); // Cancelar cita

module.exports = router;
