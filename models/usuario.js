// usuario.js
const Sequelize = require('sequelize');
const sequelize = require('../database');

const Usuario = sequelize.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    genero: {
      type: Sequelize.STRING,
    },
    peso: {
      type: Sequelize.FLOAT,
    },
    altura: {
      type: Sequelize.FLOAT,
    },
    edad: {
      type: Sequelize.INTEGER,
    },
    frecuenciaEjercicio: {
      type: Sequelize.STRING,
    },
    objetivoFitness: {
      type: Sequelize.STRING,
    },
    condicionMedica: {
      type: Sequelize.TEXT,
    },
    equipoDisponible: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
});

module.exports = Usuario;
