import { Router } from 'express';
const router = Router();
import sportController from '../Controller/SportController';

router.post('/', (req, res) => {
  const { action } = req.body;

  switch (action) {
    case '1':
      return sportController.insertar(req, res);

    case '2':
      return sportController.actualizar(req, res);

    case '3':
      return sportController.borrar(req, res);

    case '4':
      return sportController.seleccionar(req, res);

    default:
      return res.status(400).json({ error: "Acción no válida para sport" });
  }
});

export default router;