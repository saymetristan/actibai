// generateTrainingPlan.js
const OpenAI = require('openai');

// Crear una nueva instancia de OpenAI directamente con la clave API
const openai = new OpenAI({
  apiKey: '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',
});


/**
 * Genera un plan de entrenamiento basado en la metadata del usuario.
 * @param {Object} metadata - Datos del usuario.
 * @returns {Promise<string>} El plan de entrenamiento generado.
 */
async function generateTrainingPlan(metadata) {
  // Construir el prompt para OpenAI
  const prompt = `Por favor, desarrolla un plan de entrenamiento personalizado para un usuario basándote en la siguiente información:
    Género: ${metadata.gender}
    Peso: ${metadata.weight} kg
    Altura: ${metadata.height} m
    Edad: ${metadata.age} años
    Frecuencia de ejercicio: ${metadata.intensity}
    Objetivo fitness: ${metadata.goal}
    Condición médica: ${metadata.condition}
    Equipo disponible: ${metadata.equip}
    Genera 3 mesociclos (NombreMesociclo, DescripcionMesociclo, DuracionEstimada, FrecuenciaEntrenamiento, Comentarios), y para el Mesociclo 1, detalla dos alternativas de entrenamiento por día (NombreEntrenamiento, DuracionEstimada, Intensidad, TipoEntrenamiento, RPE) con ejercicios específicos (NombreEjercicio, Series, Repeticiones, PesoSugerido, DescansoEntreSeries, NotasEjercicio).

    El plan debe ser adaptable según los datos del usuario y presentarse en formato JSON. A continuación, se muestra un ejemplo de cómo esperamos que se vea la estructura JSON:
    
    {
      "mesociclos": [
        {
          "nombreMesociclo": "Mesociclo 1",
          "descripcionMesociclo": "Introducción al entrenamiento de fuerza",
          "duracionEstimada": "4 semanas",
          "frecuenciaEntrenamiento": "3 veces por semana",
          "comentarios": "Este mesociclo está diseñado para adaptar el cuerpo al entrenamiento de fuerza.",
        }
      ]
    }
    
    
    Por favor, adapta el plan a los datos proporcionados por el usuario y sigue el ejemplo de formato JSON proporcionado.`;
  try {
    const response = await openai.chat.completions.create({
        model: "gpt-4-0125-preview",
        messages: [
          {
            "role": "user",
            "content": "Por favor, desarrolla un plan de entrenamiento personalizado para un usuario basándote en la siguiente información:\n    Género: ${metadata.gender}\n    Peso: ${metadata.weight} kg\n    Altura: ${metadata.height} m\n    Edad: ${metadata.age} años\n    Frecuencia de ejercicio: ${metadata.intensity}\n    Objetivo fitness: ${metadata.goal}\n    Condición médica: ${metadata.condition}\n    Equipo disponible: ${metadata.equip}\n    Genera 3 mesociclos (NombreMesociclo, DescripcionMesociclo, DuracionEstimada, FrecuenciaEntrenamiento, Comentarios), y para el Mesociclo 1, detalla dos alternativas de entrenamiento por día (NombreEntrenamiento, DuracionEstimada, Intensidad, TipoEntrenamiento, RPE) con ejercicios específicos (NombreEjercicio, Series, Repeticiones, PesoSugerido, DescansoEntreSeries, NotasEjercicio).\n\n    El plan debe ser adaptable según los datos del usuario y presentarse en formato JSON. A continuación, se muestra un ejemplo de cómo esperamos que se vea la estructura JSON:\n    \n    {\n      \"mesociclos\": [\n        {\n          \"nombreMesociclo\": \"Mesociclo 1\",\n          \"descripcionMesociclo\": \"Introducción al entrenamiento de fuerza\",\n          \"duracionEstimada\": \"4 semanas\",\n          \"frecuenciaEntrenamiento\": \"3 veces por semana\",\n          \"comentarios\": \"Este mesociclo está diseñado para adaptar el cuerpo al entrenamiento de fuerza.\",\n        }\n      ]\n    }\n    \n    \n    Por favor, adapta el plan a los datos proporcionados por el usuario y sigue el ejemplo de formato JSON proporcionado.`"
          }
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
    console.log(response.data)
    // Extraer y retornar el texto generado
    const generatedJson = JSON.parse(response.choices[0].text); // Ajuste en la extracción del JSON
    return generatedJson;
  } catch (error) {
    console.error("Error al generar el plan de entrenamiento:", error);
    throw error;
  }
}

module.exports = { generateTrainingPlan };

