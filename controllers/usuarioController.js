const { Usuario } = require('../models'); // Asegúrate de que la ruta al modelo es correcta

const UsuarioController = {
  // Crear un nuevo usuario
  createUser: async (req, res) => {
    try {
      const newUser = await Usuario.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Obtener todos los usuarios
  getAllUsers: async (req, res) => {
    try {
      const users = await Usuario.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obtener un usuario por ID
  getUserById: async (req, res) => {
    try {
      const user = await Usuario.findByPk(req.params.id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Actualizar un usuario por ID
  updateUserById: async (req, res) => {
    try {
      const [updated] = await Usuario.update(req.body, {
        where: { id: req.params.id }
      });
      if (updated) {
        const updatedUser = await Usuario.findByPk(req.params.id);
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Eliminar un usuario por ID
  deleteUserById: async (req, res) => {
    try {
      const deleted = await Usuario.destroy({
        where: { id: req.params.id }
      });
      if (deleted) {
        res.status(204).send("Usuario eliminado");
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

async function obtenerDatosUsuario(usuarioId) {
  try {
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) {
      console.log('Usuario no encontrado');
      return null;
    }
    return usuario;
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
  }
}

module.exports = UsuarioController;