const db = require('../models');

// Obtener lista de pacientes
exports.getPatients = async (req, res) => {
    try {
        const patients = await db.Patient.findAll();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la lista de pacientes' });
    }
};

// Crear un nuevo paciente
exports.createPatient = async (req, res) => {
    const { name, birthDate, userId } = req.body;
    try {
        const patient = await db.Patient.create({ name, birthDate, userId });
        res.status(201).json({ message: 'Paciente registrado exitosamente', patient });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar paciente' });
    }
};

// Actualizar paciente
exports.updatePatient = async (req, res) => {
    const { id } = req.params;
    const { name, birthDate } = req.body;
    try {
        const patient = await db.Patient.findByPk(id);
        if (!patient) return res.status(404).json({ message: 'Paciente no encontrado' });

        patient.name = name;
        patient.birthDate = birthDate;
        await patient.save();
        res.status(200).json({ message: 'Paciente actualizado', patient });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar paciente' });
    }
};

// Eliminar paciente
exports.deletePatient = async (req, res) => {
    const { id } = req.params;
    try {
        const patient = await db.Patient.findByPk(id);
        if (!patient) return res.status(404).json({ message: 'Paciente no encontrado' });

        await patient.destroy();
        res.status(200).json({ message: 'Paciente eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar paciente' });
    }
};
