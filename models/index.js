// index.js
const Usuario = require('./usuario');
const Compra = require('./compra');
const Mesociclo = require('./mesociclo');
const Entrenamiento = require('./entrenamiento');
const Ejercicio = require('./ejercicio');

// Relaciones existentes
Usuario.hasMany(Compra, { as: 'compras', foreignKey: 'usuarioId' });
Compra.belongsTo(Usuario, { as: 'usuario', foreignKey: 'usuarioId' });

// Nuevas relaciones
Usuario.hasMany(Mesociclo, { as: 'mesociclos', foreignKey: 'usuarioId' });
Mesociclo.belongsTo(Usuario, { as: 'usuario', foreignKey: 'usuarioId' });

Mesociclo.hasMany(Entrenamiento, { as: 'entrenamientos', foreignKey: 'mesocicloId' });
Entrenamiento.belongsTo(Mesociclo, { as: 'mesociclo', foreignKey: 'mesocicloId' });

Entrenamiento.hasMany(Ejercicio, { as: 'ejercicios', foreignKey: 'entrenamientoId' });
Ejercicio.belongsTo(Entrenamiento, { as: 'entrenamiento', foreignKey: 'entrenamientoId' });

module.exports = {
  Usuario,
  Compra,
  Mesociclo,
  Entrenamiento,
  Ejercicio
};
