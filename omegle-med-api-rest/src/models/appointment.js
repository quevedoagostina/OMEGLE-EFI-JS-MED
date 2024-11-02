'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * Este método será llamado automáticamente en el archivo `models/index.js`.
     */
    static associate(models) {
      // Relación belongsTo con Doctor
      Appointment.belongsTo(models.Doctor, { foreignKey: 'doctorId' });
      // Relación belongsTo con Patient
      Appointment.belongsTo(models.Patient, { foreignKey: 'patientId' });
    }
  }

  // Inicialización del modelo Appointment
  Appointment.init({
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Doctors', // Nombre de la tabla de Doctors (no del modelo)
        key: 'id',
      },
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Patients', // Nombre de la tabla de Patients (no del modelo)
        key: 'id',
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'programada', // Estado inicial
    },
    details: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize, // Instancia de sequelize
    modelName: 'Appointment', // Nombre del modelo
    timestamps: true, // Crea automáticamente los campos createdAt y updatedAt
  });

  return Appointment;
};
