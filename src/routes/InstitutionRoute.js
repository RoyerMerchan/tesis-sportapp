import express from 'express';
import institutionController from '../Controller/InstitutionController';

const router = express.Router();

router.post('/', (req, res) => {
  const { accion } = req.body;

  switch (accion) {
    case '1':
      return institutionController.insertar(req, res);

    case '2':
      return institutionController.actualizar(req, res);

    case '3':
      return institutionController.borrar(req, res);

    case '4':
      return institutionController.seleccionar(req, res);

    default:
      return res.status(400).json({ error: "Acción no válida para institution" });
  }
});

export default router;