'use strict';

const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
    },
  }, {
    timestamps: true,
  });

  // Hook para encriptar la contraseña antes de crear el usuario
  User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

  // Hook para encriptar la contraseña antes de actualizarla
  User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  });

  // Aquí puedes definir las asociaciones si las tienes
  User.associate = (models) => {
    User.hasOne(models.Patient, { foreignKey: 'userId', onDelete: 'CASCADE' });
    User.hasOne(models.Doctor, { foreignKey: 'userId', onDelete: 'CASCADE' });
  };

  return User;
};
