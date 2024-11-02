'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file llamará automáticamente a este método.
     */
    static associate(models) {
      // Relación belongsTo con User
      Doctor.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  // Inicialización del modelo Doctor
  Doctor.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specialty: {
      type: DataTypes.STRING,
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
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    sequelize, // Instancia de sequelize pasada automáticamente
    modelName: 'Doctor', // Nombre del modelo
    timestamps: true, // Crea campos createdAt y updatedAt automáticamente
  });

  return Doctor;
};
