// mesociclo.js
const Sequelize = require('sequelize');
const sequelize = require('../database');

const Mesociclo = sequelize.define('mesociclo', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id',
        }
    },
    nombreMesociclo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descripcionMesociclo: {
        type: Sequelize.TEXT
    },
    duracionEstimada: {
        type: Sequelize.STRING
    },
    frecuenciaEntrenamiento: {
        type: Sequelize.INTEGER
    },
    comentarios: {
        type: Sequelize.TEXT
    }
});

module.exports = Mesociclo;
