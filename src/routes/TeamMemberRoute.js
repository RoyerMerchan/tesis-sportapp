import express from 'express';
import teamMemberController from '../Controller/TeamMemberController.js';

const router = express.Router();

router.post('/', (req, res) => {
  const { accion } = req.body;

  switch (accion) {
    case 'insertar':
      return teamMemberController.insertar(req, res);

    case 'actualizar':
      return teamMemberController.actualizar(req, res);

    case 'borrar':
      return teamMemberController.borrar(req, res);

    case 'seleccionar':
      return teamMemberController.seleccionar(req, res);

    default:
      return res.status(400).json({ error: "Acción no válida para team_member" });
  }
});

export default router;