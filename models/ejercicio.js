// ejercicio.js
const Sequelize = require('sequelize');
const sequelize = require('../database');

const Ejercicio = sequelize.define('ejercicio', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    entrenamientoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'entrenamientos',
            key: 'id',
        }
    },
    nombreEjercicio: {
        type: Sequelize.STRING,
        allowNull: false
    },
    series: {
        type: Sequelize.INTEGER
    },
    repeticiones: {
        type: Sequelize.INTEGER
    },
    pesoSugerido: {
        type: Sequelize.FLOAT
    },
    descansoEntreSeries: {
        type: Sequelize.STRING
    },
    notasEjercicio: {
        type: Sequelize.TEXT
    }
});

module.exports = Ejercicio;
