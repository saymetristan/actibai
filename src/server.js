const express = require('express');
const path = require('path');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { body, validationResult } = require('express-validator');
const Airtable = require('airtable');
require('dotenv').config();

app.use(express.json());

// Sirve los archivos estáticos de la carpeta 'public'
app.use(express.static(path.join(__dirname, '../public')));

app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Servicio de Entrenamiento',
                        },
                        unit_amount: 9900, // El precio debe estar en la moneda más pequeña (centavos)
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'tu_url_de_exito', // URL a la que Stripe redirige tras un pago exitoso
            cancel_url: 'tu_url_de_cancelacion', // URL a la que Stripe redirige si el usuario cancela
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Configura Airtable con tu API Key y la ID de la Base
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY // Usa una variable de entorno para tu API Key
});
const base = Airtable.base(process.env.AIRTABLE_BASE_ID); // Usa una variable de entorno para la ID de la Base

// Función para agregar un registro a Airtable
const addRecord = async (data) => {
    return new Promise((resolve, reject) => {
        base('user-information').create([
            {
                "fields": {
                    "id": data.id,
                    "gender": data.gender,
                    "weight": data.weight,
                    "height": data.height,
                    "age": data.age,
                    "intensity": data.intensity,
                    "goal": data.goal,
                    "condition": data.condition,
                    "equip": data.equip,
                    "email": data.mail
                }
            }
        ], function(err, records) {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }
            records.forEach(function (record) {
                console.log(record.getId());
            });
            resolve(records);
        });
    });
};


// Ruta de pedido con validación
app.post('/order', [
    body('gender').isIn(['Masculino', 'Femenino']), // Asegúrate de que el género sea uno de los valores aceptados
    body('weight').isFloat({ min: 1 }), // Peso debe ser un número y mayor que 0
    body('height').isFloat({ min: 1 }), // Altura debe ser un número y mayor que 0
    body('age').isInt({ min: 1, max: 120 }), // Edad debe ser un número entero entre 1 y 120
    body('intensity').not().isEmpty(), // Intensidad no debe estar vacía
    body('goal').not().isEmpty(), // Objetivo no debe estar vacío
    body('condition').optional().isString(), // Condición es opcional pero debe ser una cadena si se proporciona
    body('equip').not().isEmpty(), // Equipo no debe estar vacío
    body('email').isEmail(), // Email debe ser un correo electrónico válido
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    // Llama a la función para agregar el registro a Airtable
    addRecord(req.body).then(() => {
        res.status(200).send('Pedido añadido a Airtable');
    }).catch(error => {
        res.status(500).send('Error al añadir pedido: ' + error);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});