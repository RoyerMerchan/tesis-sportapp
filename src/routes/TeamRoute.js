import express from 'express';
import teamController from '../Controller/TeamController.js';

const router = express.Router();

router.post('/', (req, res) => {
  const { action } = req.body;

  switch (action) {
    case '1':
      return teamController.insertar(req, res);

    case '2':
      return teamController.actualizar(req, res);

    case '3':
      return teamController.borrar(req, res);

    case '4':
      return teamController.seleccionar(req, res);

    default:
      return res.status(400).json({ error: "Acción no válida para team" });
  }
});

export default router;