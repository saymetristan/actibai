// server.js
require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Airtable = require('airtable');
const axios = require('axios');
const db = require('./models'); 
const sequelize = require('./database');
const userRoutes = require('./routes/users');
const compraRoutes = require('./routes/compras');
const authMiddleware = require('./middlewares/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const stripeRoutes = require('./routes/stripeRoutes');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Webhook route for Stripe should be setup before express.json() middleware
app.use('/webhook', require('./routes/stripeWebhook'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); 
app.use('/api/compras', compraRoutes);
app.use('/api/stripe', stripeRoutes);

// Rutas
app.get('/', (req, res) => {
  res.send('El servidor está funcionando correctamente.');
});

sequelize.sync({ force: false })
  .then(() => {
    console.log('Base de datos sincronizada y modelos asociados.');
  })
  .catch((error) => {
    console.error('Error al sincronizar los modelos con la base de datos:', error);
  });

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
