// routes/patientRoutes.js
const express = require('express');
const { getPatients, createPatient, updatePatient, deletePatient } = require('../controllers/patientController');
const authenticate = require('../middleware/authenticate');
const isAdmin = require('../middleware/isAdmin');
const router = express.Router();

router.get('/list', authenticate, getPatients); // Solo admins
router.post('/create', createPatient); // Solo admins
router.put('/update/:id', authenticate, updatePatient); // Solo admins
router.delete('/:id', authenticate, isAdmin, deletePatient); // Solo admins

module.exports = router;
