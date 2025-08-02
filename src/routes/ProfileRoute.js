import express from 'express';
const router = express.Router();

import profileController from '../Controller/ProfileController';

router.post('/', (req, res) => {
  const { accion } = req.body;

  switch (accion) {
    case '1':
      return profileController.insertar(req, res);

    case '2':
      return profileController.actualizar(req, res);

    case '3':
      return profileController.borrar(req, res);

    case '4':
      return profileController.seleccionar(req, res);

    default:
      return res.status(400).json({ error: "Acción no válida para profile" });
  }
});
export default router;