const express = require('express');
const { register, login, getProfile } = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.post('/register', register); // Registro de usuarios
router.post('/login', login); // Autenticación de usuarios
router.get('/profile/:id', authenticate, getProfile); // Obtener el perfil de usuario autenticado

module.exports = router;
