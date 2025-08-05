import express from 'express';
import teamMemberController from '../Controller/TeamMemberController.js';

const router = express.Router();

router.post('/', (req, res) => {
  const { action } = req.body;

  switch (action) {
    case '1':
      return teamMemberController.insertar(req, res);

    case '2':
      return teamMemberController.actualizar(req, res);

    case '3':
      return teamMemberController.borrar(req, res);

    case '4':
      return teamMemberController.seleccionar(req, res);

    default:
      return res.status(400).json({ error: "Acción no válida para team_member" });
  }
});

export default router;