// testopenai.js
const { generateTrainingPlan } = require('./generateTrainingPlan');


// Objeto de metadata de ejemplo
const exampleMetadata = {
  gender: 'masculino',
  weight: '70',
  height: '1.75',
  age: '25',
  intensity: '4-5 días por semana',
  goal: 'ganar músculo',
  condition: 'ninguna',
  equip: 'gimnasio completo',
  email: 'usuario@example.com'
};

// Llamada a la función generateTrainingPlan
generateTrainingPlan(exampleMetadata)
  .then(plan => {
    console.log('Plan de entrenamiento generado:', plan);
  })
  .catch(error => {
    console.error('Error al generar el plan de entrenamiento:', error);
  });