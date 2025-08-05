import express from 'express';
import typeCompetitionController from '../Controller/TypeCompetitionController.js';

const router = express.Router();

router.post('/', (req, res) => {
  const { action } = req.body;

  switch (action) {
    case '1':
      return typeCompetitionController.insertar(req, res);

    case '2':
      return typeCompetitionController.actualizar(req, res);

    case '3':
      return typeCompetitionController.borrar(req, res);

    case '4':
      return typeCompetitionController.seleccionar(req, res);

    default:
      return res.status(400).json({ error: "Acción no válida para type_competition" });
  }
});

export default router;