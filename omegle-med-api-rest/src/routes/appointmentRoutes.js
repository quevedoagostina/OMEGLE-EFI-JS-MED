// routes/appointmentRoutes.js
const express = require('express');
const { createAppointment, getAppointments, updateAppointment, deleteAppointment, getAppointmentsByDoctor } = require('../controllers/appointmentController');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.post('/', authenticate, createAppointment); // Crear nueva cita
router.get('/', authenticate, getAppointments);
router.get('/edit/:id', authenticate, getAppointments);
router.get('/doctors/:doctorId', authenticate, getAppointments);
router.put('/update/:id', authenticate, updateAppointment); // Actualizar cita
router.delete('/:id', authenticate, deleteAppointment); // Cancelar cita

module.exports = router;
