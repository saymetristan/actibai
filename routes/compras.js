const express = require('express');
const router = express.Router();
const CompraController = require('../controllers/compraController');

// Crear una nueva compra
router.post('/', CompraController.createCompra);

// Obtener todas las compras
router.get('/', CompraController.getAllCompras);

// Obtener una compra por ID
router.get('/:id', CompraController.getCompraById);

// Actualizar una compra por ID
router.put('/:id', CompraController.updateCompraById);

// Eliminar una compra por ID
router.delete('/:id', CompraController.deleteCompraById);

module.exports = router;
