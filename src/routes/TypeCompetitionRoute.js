import express from 'express';
import typeCompetitionController from '../Controller/TypeCompetitionController.js';

const router = express.Router();

router.post('/', (req, res) => {
  const { accion } = req.body;

  switch (accion) {
    case 'insertar':
      return typeCompetitionController.insertar(req, res);

    case 'actualizar':
      return typeCompetitionController.actualizar(req, res);

    case 'borrar':
      return typeCompetitionController.borrar(req, res);

    case 'seleccionar':
      return typeCompetitionController.seleccionar(req, res);

    default:
      return res.status(400).json({ error: "Acción no válida para type_competition" });
  }
});

export default router;