const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');

// Crear un nuevo usuario
router.post('/', UsuarioController.createUser);

// Obtener todos los usuarios
router.get('/', UsuarioController.getAllUsers);

// Obtener un usuario por ID
router.get('/:id', UsuarioController.getUserById);

// Actualizar un usuario por ID
router.put('/:id', UsuarioController.updateUserById);

// Eliminar un usuario por ID
router.delete('/:id', UsuarioController.deleteUserById);

module.exports = router;