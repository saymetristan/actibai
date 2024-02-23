// entrenamiento.js
const Sequelize = require('sequelize');
const sequelize = require('../database');

const Entrenamiento = sequelize.define('entrenamiento', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    mesocicloId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'mesociclos',
            key: 'id',
        }
    },
    nombreEntrenamiento: {
        type: Sequelize.STRING,
        allowNull: false
    },
    duracionEstimada: {
        type: Sequelize.STRING
    },
    intensidad: {
        type: Sequelize.STRING
    },
    tipoEntrenamiento: {
        type: Sequelize.STRING
    },
    RPE: {
        type: Sequelize.INTEGER
    },
    equipamientoNecesario: {
        type: Sequelize.TEXT
    },
    notas: {
        type: Sequelize.TEXT
    }
});

module.exports = Entrenamiento;
