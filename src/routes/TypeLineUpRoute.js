import express from 'express';
import typeLineUpController from '../Controller/TypeLineUpController.js';

const router = express.Router();

router.post('/', (req, res) => {
  const { accion } = req.body;

  switch (accion) {
    case 'insertar':
      return typeLineUpController.insertar(req, res);
    case 'actualizar':
      return typeLineUpController.actualizar(req, res);
    case 'borrar':
      return typeLineUpController.borrar(req, res);
    case 'seleccionar':
      return typeLineUpController.seleccionar(req, res);
    default:
      return res.status(400).json({ error: "Acción no válida para type_line-up" });
  }
});

export default router;