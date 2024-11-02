'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * Este método no es parte del ciclo de vida de Sequelize.
     * Será llamado automáticamente en el archivo `models/index.js`.
     */
    static associate(models) {
      // Relación belongsTo con User
      Patient.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  // Inicialización del modelo Patient
  Patient.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Nombre de la tabla Users (no del modelo)
        key: 'id',
      },
    },
  }, {
    sequelize, // Instancia de sequelize pasada automáticamente
    modelName: 'Patient', // Nombre del modelo
    timestamps: true, // Crea campos createdAt y updatedAt automáticamente
  });

  return Patient;
};
