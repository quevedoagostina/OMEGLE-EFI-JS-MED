// routes/patientRoutes.js
const express = require('express');
const { getPatients, createPatient, updatePatient, deletePatient } = require('../controllers/patientController');
const authenticate = require('../middleware/authenticate');
const isAdmin = require('../middleware/isAdmin');
const router = express.Router();

router.get('/list', authenticate, getPatients);
router.post('/create', createPatient);
router.put('/update/:id', authenticate, updatePatient);
router.delete('/:id', authenticate, isAdmin, deletePatient);

module.exports = router;
