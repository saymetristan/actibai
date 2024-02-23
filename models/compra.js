// compra.js
const Sequelize = require('sequelize');
const sequelize = require('../database');

const Compra = sequelize.define('compra', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    usuarioId: { // Clave foránea que hace referencia a Usuario
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios', // Nombre de la tabla de usuarios
            key: 'id', // Clave a la que hace referencia
        },
    },
    fechaCompra: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    monto: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    estadoPago: {
      type: Sequelize.STRING,
      defaultValue: 'pendiente',
    },
});

module.exports = Compra;
