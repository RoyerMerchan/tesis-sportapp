import express from 'express';
import PersonController from '../Controller/PersonController.js';

const router = express.Router();

router.post('/', (req, res) => {
  const { action } = req.body;

  switch (action) {
    case 'insertar':
      return PersonController.insertar(req, res);

    case 'actualizar':
      return PersonController.actualizar(req, res);

    case 'borrar':
      return PersonController.borrar(req, res);

    case 'seleccionar':
      return PersonController.seleccionar(req, res);

    default:
      return res.status(400).json({ error: "Acción no válida para person" });
  }
});

export default router;