const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');
const { Usuario, Compra } = require('../models');
const Airtable = require('airtable');
const { sendWebhookToMake } = require('./webhookSender')

// Configura Airtable con tu API key y base ID
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY,
});
const base = Airtable.base("appMKxT6mm5jfrgzr");

router.post('/', bodyParser.raw({type: 'application/json'}), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error(`Error verifying webhook signature: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        if (session.payment_status === 'paid') {
            try {
                const metadata = session.metadata;
                const usuario = await Usuario.findOrCreate({
                    where: { email: metadata.email },
                    defaults: {
                        genero: metadata.gender,
                        peso: parseFloat(metadata.weight),
                        altura: parseFloat(metadata.height),
                        edad: parseInt(metadata.age, 10),
                        frecuenciaEjercicio: metadata.intensity,
                        objetivoFitness: metadata.goal,
                        condicionMedica: metadata.condition,
                        equipoDisponible: metadata.equip,
                    }
                });

                const compra = await Compra.create({
                    usuarioId: usuario[0].id,
                    monto: session.amount_total / 100,
                    estadoPago: 'completado',
                });

                // Enviar datos a Airtable
                base('user-information').create([
                    {
                        fields: {
                            'email': metadata.email,
                            'gender': metadata.gender,
                            'weight': parseFloat(metadata.weight),
                            'height': parseFloat(metadata.height),
                            'age': parseInt(metadata.age, 10),
                            'intensity': metadata.intensity,
                            'goal': metadata.goal,
                            'condition': metadata.condition,
                            'equip': metadata.equip,
                        }
                    }
                ], function(err, records) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    const recordId = records[0].id;
                    console.log(recordId);
                    sendWebhookToMake(recordId);
                });

                console.log(`Compra registrada para el usuario ${usuario[0].id}`);
                res.status(200).json({ received: true, compraId: compra.id });
            } catch (error) {
                console.error('Error saving purchase to database:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        } else {
            console.log('Payment not successful or still pending.');
            res.status(200).json({ received: true, message: 'Payment not successful or still pending.' });
        }
    } else {
        console.log(`Unhandled event type: ${event.type}`);
        res.status(200).json({ received: false, message: `Unhandled event type: ${event.type}` });
    }
});

module.exports = router;
