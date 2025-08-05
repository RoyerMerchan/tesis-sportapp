import { Router } from 'express';
const router = Router();
import EventController from '../Controller/EventController';

router.post('/', (req, res) => {
  const { action } = req.body;

  switch (action) {
    case '1':
      return EventController.insertar(req, res);

    case '2':
      return EventController.actualizar(req, res);

    case '3':
      return EventController.borrar(req, res);

    case '4':
      return EventController.seleccionar(req, res);

    default:
      return res.status(400).json({ error: "Acción no válida para event" });
  }
});

export default router;