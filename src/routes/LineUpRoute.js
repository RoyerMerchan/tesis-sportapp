import express from 'express';
import lineUpController from '../Controller/LineUpController.js';

const router = express.Router();

router.post('/', (req, res) => {
  const { action } = req.body;

  switch (action) {
    case 'insertar':
      return lineUpController.insertar(req, res);

    case 'actualizar':
      return lineUpController.actualizar(req, res);

    case 'borrar':
      return lineUpController.borrar(req, res);

    case 'seleccionar':
      return lineUpController.seleccionar(req, res);

    default:
      return res.status(400).json({ error: "Acción no válida para line_up" });
  }
});

export default router;