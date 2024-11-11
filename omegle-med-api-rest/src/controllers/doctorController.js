const db = require('../models');

// Obtener todos los médicos
exports.getDoctors = async (req, res) => {
    try {
        const doctors = await db.Doctor.findAll();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la lista de médicos' });
    }
};

// Obtener un médico
exports.getDoctor = async (req, res) => {
    const { id } = req.params;
    try {
        const doctor = await db.Doctor.findByPk(id);
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la lista de médicos' });
    }
};

// Crear un nuevo médico
exports.createDoctor = async (req, res) => {
    const { name, specialty, userId } = req.body;
    try {
        const doctor = await db.Doctor.create({ name, specialty, userId });
        res.status(201).json({ message: 'Médico registrado exitosamente', doctor });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar médico' });
    }
};

// Actualizar la información de un médico
exports.updateDoctor = async (req, res) => {
    const { id } = req.params;
    const { name, specialty, status } = req.body;
    try {
        const doctor = await db.Doctor.findByPk(id);
        if (!doctor) return res.status(404).json({ message: 'Médico no encontrado' });

        doctor.name = name;
        doctor.specialty = specialty;
        doctor.status = status;
        await doctor.save();
        res.status(200).json({ message: 'Médico actualizado', doctor });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar médico' });
    }
};

// Eliminar un médico
exports.deleteDoctor = async (req, res) => {
    const { id } = req.params;
    try {
        const doctor = await db.Doctor.findByPk(id);
        if (!doctor) return res.status(404).json({ message: 'Médico no encontrado' });

        await doctor.destroy();
        res.status(200).json({ message: 'Médico eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar médico' });
    }
};
