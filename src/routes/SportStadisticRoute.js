import express from 'express';
import sportStatisticController from '../Controller/SportStatisticController.js';

const router = express.Router();

router.post('/', (req, res) => {
  const { action } = req.body;

  switch (action) {
    case 'insertar':
      return sportStatisticController.insertar(req, res);

    case 'actualizar':
      return sportStatisticController.actualizar(req, res);

    case 'borrar':
      return sportStatisticController.borrar(req, res);

    case 'seleccionar':
      return sportStatisticController.seleccionar(req, res);

    default:
      return res.status(400).json({ error: "Acción no válida para sport_statistic" });
  }
});

export default router;