import express from 'express';
import teamController from '../Controller/TeamController.js';

const router = express.Router();

router.post('/', (req, res) => {
  const { accion } = req.body;

  switch (accion) {
    case 'insertar':
      return teamController.insertar(req, res);

    case 'actualizar':
      return teamController.actualizar(req, res);

    case 'borrar':
      return teamController.borrar(req, res);

    case 'seleccionar':
      return teamController.seleccionar(req, res);

    default:
      return res.status(400).json({ error: "Acción no válida para team" });
  }
});

export default router;