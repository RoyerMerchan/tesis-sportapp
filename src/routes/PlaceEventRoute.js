import { Router } from 'express';
const router = Router();
import placeEventController from '../Controller/PlaceEventController';

router.post('/', (req, res) => {
  const { action } = req.body;

  switch (action) {
    case '1':
      return placeEventController.insertar(req, res);

    case '2':
      return placeEventController.actualizar(req, res);

    case '3':
      return placeEventController.borrar(req, res);

    case '4':
      return placeEventController.seleccionar(req, res);

    default:
      return res.status(400).json({ error: "Acción no válida para place_event" });
  }
});

export default router;