const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');

// Registro de usuario
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const user = await db.User.create({ name, email, password, role });
        res.status(201).json({ message: 'Usuario registrado', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
};

// Inicio de sesión (Login)
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token , user });
    } catch (error) {
        console.error(error); // Esto registrará el error en la consola
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};

// Obtener perfil de usuario autenticado
exports.getProfile = async (req, res) => {
    try {
        const user = await db.User.findByPk(req.user.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el perfil' });
    }
};
