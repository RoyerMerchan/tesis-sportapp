import { Router } from 'express';
import CompetitionController from '../controllers/CompetitionController.js';

const router = Router();

router.post('/', (req, res) => {
  const { action } = req.body;

  switch (action) {
    case 'insertar':
      return CompetitionController.insertar(req, res);

    case 'actualizar':
      return CompetitionController.actualizar(req, res);

    case 'borrar':
      return CompetitionController.borrar(req, res);

    case 'seleccionar':
      return CompetitionController.seleccionar(req, res);

    default:
      return res.status(400).json({ error: 'Acción no válida para competition' });
  }
});

export default router;