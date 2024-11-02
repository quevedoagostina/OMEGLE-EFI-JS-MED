const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

// Inicialización de la instancia de Sequelize
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const db = {};

// Inicialización de los modelos pasando `sequelize` y `DataTypes`
db.User = require('./user')(sequelize, Sequelize.DataTypes);
db.Doctor = require('./doctor')(sequelize, Sequelize.DataTypes);
db.Patient = require('./patient')(sequelize, Sequelize.DataTypes);
db.Appointment = require('./appointment')(sequelize, Sequelize.DataTypes);

// Configuración de asociaciones
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Agregar la instancia de sequelize y Sequelize a `db`
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
