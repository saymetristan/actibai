// entrenamientosController.js
const { OpenAIApi, Configuration } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Imagina que esta función es parte de tu controlador o lógica de negocio
async function obtenerDatosUsuario(usuarioId) {
  try {
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) {
      console.log('Usuario no encontrado');
      return;
    }
    return usuario; // Retorna el usuario encontrado
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
  }
}






const generarEntrenamiento = async (req, res) => {
  try {
    const { genero, peso, altura, edad, frecuenciaEjercicio, objetivoFitness, condicionMedica, equipoDisponible } = req.body;
    
    const prompt = `
Por favor, desarrolla un plan de entrenamiento personalizado para un usuario basándote en la siguiente información:

- Género: [Género del usuario]
- Peso: [Peso del usuario en kg]
- Altura: [Altura del usuario en cm]
- Edad: [Edad del usuario]
- Frecuencia de Ejercicio: [Frecuencia con la que el usuario hace ejercicio, ej. 3 veces por semana]
- Objetivo Fitness: [Objetivo fitness del usuario, ej. pérdida de peso, ganancia muscular]
- Condición Médica Preexistente: [Si aplica, cualquier condición médica relevante]
- Equipo Disponible: [Gym o Casa]

Genera 3 mesociclos (NombreMesociclo, DescripcionMesociclo, DuracionEstimada, FrecuenciaEntrenamiento, Comentarios), y para el Mesociclo 1, detalla dos alternativas de entrenamiento por día (NombreEntrenamiento, DuracionEstimada, Intensidad, TipoEntrenamiento, RPE) con ejercicios específicos (NombreEjercicio, Series, Repeticiones, PesoSugerido, DescansoEntreSeries, NotasEjercicio).

El plan debe ser adaptable según los datos del usuario y presentarse en formato JSON. A continuación, se muestra un ejemplo de cómo esperamos que se vea la estructura JSON:

json:
{
  "mesociclos": [
    {
      "nombreMesociclo": "Mesociclo 1",
      "descripcionMesociclo": "Introducción al entrenamiento de fuerza",
      "duracionEstimada": "4 semanas",
      "frecuenciaEntrenamiento": "3 veces por semana",
      "comentarios": "Este mesociclo está diseñado para adaptar el cuerpo al entrenamiento de fuerza.",
      "entrenamientos": [
        {
          "nombreEntrenamiento": "Día 1: Tren superior",
          "duracionEstimada": "60 minutos",
          "intensidad": "Moderada",
          "tipoEntrenamiento": "Fuerza",
          "RPE": "6",
          "ejercicios": [
            {
              "nombreEjercicio": "Press de banca",
              "series": 3,
              "repeticiones": 10,
              "pesoSugerido": "50% RM",
              "descansoEntreSeries": "90 segundos",
              "notasEjercicio": "Mantén la forma correcta."
            }
            // Más ejercicios aquí
          ]
        }
      ]
    }
  ]
}


Por favor, adapta el plan a los datos proporcionados por el usuario y sigue el ejemplo de formato JSON proporcionado. ¿Existe algún requisito adicional o preferencia en cuanto al nivel de detalle de los ejercicios?
`;

    // Llamada a la API de OpenAI para generar el contenido
    const response = await openai.createCompletion({
      model: process.env.OPENAI_MODEL || "text-davinci-003", // Usa una variable de entorno para el modelo
      prompt,
      max_tokens: 500 // Ajusta según la longitud esperada de la respuesta
    });

    const contenido = response.data.choices[0].text.trim();
    res.json({ planEntrenamiento: contenido });
  } catch (error) {
    console.error('Error al generar entrenamiento:', error);
    res.status(500).json({ error: 'Error al generar el plan de entrenamiento' });
  }
};

module.exports = {
  generarEntrenamiento
};







