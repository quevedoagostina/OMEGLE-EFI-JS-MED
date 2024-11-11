const express = require('express');
const { getDoctors, getDoctor, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctorController');
const authenticate = require('../middleware/authenticate');
const isAdmin = require('../middleware/isAdmin');
const router = express.Router();

router.get('/list', authenticate, getDoctors);
router.get('/edit/:id', authenticate, getDoctors);
router.post('/', authenticate, isAdmin, createDoctor); // Solo admins
router.put('/:id', authenticate, isAdmin, updateDoctor); // Solo admins
router.delete('/:id', authenticate, isAdmin, deleteDoctor); // Solo admins

module.exports = router;
