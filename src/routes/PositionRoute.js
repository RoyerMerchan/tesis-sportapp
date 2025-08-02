import express from 'express';
import positionController from '../Controller/PositionController.js';

const router = express.Router();

router.post('/', (req, res) => {
  const { accion } = req.body;

  switch (accion) {
    case 'insertar':
      return positionController.insertar(req, res);

    case 'actualizar':
      return positionController.actualizar(req, res);

    case 'borrar':
      return positionController.borrar(req, res);

    case 'seleccionar':
      return positionController.seleccionar(req, res);

    default:
      return res.status(400).json({ error: "Acción no válida para position" });
  }
});

export default router;