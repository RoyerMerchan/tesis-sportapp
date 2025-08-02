import { Router } from 'express';
const router = Router();
import TipoPersonaController from '../Controller/TypePersonController';

router.post('/', (req, res) => {
  const { accion } = req.body;

  switch (accion) {
    case '1':
      return TipoPersonaController.insertar(req, res);

    case '2':
      return TipoPersonaController.actualizar(req, res);

    case '3':
      return TipoPersonaController.borrar(req, res);

    case '4':
      return TipoPersonaController.seleccionar(req, res);

    default:
      return res.status(400).json({ error: "Acción no válida para tipo_persona" });
  }
});

export default router;