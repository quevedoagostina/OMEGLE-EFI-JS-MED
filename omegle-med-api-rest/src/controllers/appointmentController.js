const db = require('../models');

// Crear nueva cita
exports.createAppointment = async (req, res) => {
    const { doctorId, patientId, date, details } = req.body;
    try {
        const appointment = await db.Appointment.create({ doctorId, patientId, date, details });
        res.status(201).json({ message: 'Cita médica creada', appointment });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear cita médica' });
    }
};

// Obtener todas las citas
exports.getAppointments = async (req, res) => {
    try {
        const appointments = await db.Appointment.findAll();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener citas' });
    }
};

// Actualizar estado de una cita
exports.updateAppointment = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const appointment = await db.Appointment.findByPk(id);
        if (!appointment) return res.status(404).json({ message: 'Cita no encontrada' });

        appointment.status = status;
        await appointment.save();
        res.status(200).json({ message: 'Cita actualizada', appointment });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar cita' });
    }
};

// Cancelar cita
exports.deleteAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await db.Appointment.findByPk(id);
        if (!appointment) return res.status(404).json({ message: 'Cita no encontrada' });

        await appointment.destroy();
        res.status(200).json({ message: 'Cita cancelada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al cancelar cita' });
    }
};
