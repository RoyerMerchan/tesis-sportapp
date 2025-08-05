import express from 'express';
import typeLineUpController from '../Controller/TypeLineUpController.js';

const router = express.Router();

router.post('/', (req, res) => {
  const { action } = req.body;

  switch (action) {
    case '1':
      return typeLineUpController.insertar(req, res);
    case '2':
      return typeLineUpController.actualizar(req, res);
    case '3':
      return typeLineUpController.borrar(req, res);
    case '4':
      return typeLineUpController.seleccionar(req, res);
    default:
      return res.status(400).json({ error: "Acción no válida para type_line-up" });
  }
});

export default router;