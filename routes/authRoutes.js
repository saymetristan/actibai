const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
const router = express.Router();

// Registro
router.post('/signup', async (req, res) => {
  try {
    // Hashear la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await Usuario.create({ ...req.body, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  const user = await Usuario.findOne({ where: { email: req.body.email } });
  if (user == null) {
    return res.status(400).send('No se puede encontrar al usuario');
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      // El usuario está autenticado, generar un token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
      res.json({ token: token });
    } else {
      res.send('Contraseña incorrecta');
    }
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
