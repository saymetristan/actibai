const { Compra, Usuario } = require('../models'); // Importa también Usuario si necesitas referenciarlo

const CompraController = {
  // Crear una nueva compra
  createCompra: async (req, res) => {
    try {
      const newCompra = await Compra.create(req.body);
      res.status(201).json(newCompra);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Obtener todas las compras
  getAllCompras: async (req, res) => {
    try {
      const compras = await Compra.findAll();
      res.status(200).json(compras);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obtener una compra por ID
  getCompraById: async (req, res) => {
    try {
      const compra = await Compra.findByPk(req.params.id);
      if (compra) {
        res.status(200).json(compra);
      } else {
        res.status(404).json({ error: 'Compra no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Actualizar una compra por ID
  updateCompraById: async (req, res) => {
    try {
      const [updated] = await Compra.update(req.body, {
        where: { id: req.params.id }
      });
      if (updated) {
        const updatedCompra = await Compra.findByPk(req.params.id);
        res.status(200).json(updatedCompra);
      } else {
        res.status(404).json({ error: 'Compra no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Eliminar una compra por ID
  deleteCompraById: async (req, res) => {
    try {
      const deleted = await Compra.destroy({
        where: { id: req.params.id }
      });
      if (deleted) {
        res.status(204).send("Compra eliminada");
      } else {
        res.status(404).json({ error: 'Compra no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = CompraController;
