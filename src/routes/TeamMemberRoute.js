import express from 'express';
import teamMemberController from '../Controller/TeamMemberController.js';

const router = express.Router();

router.get('/', teamMemberController.seleccionar)
router.post('/', teamMemberController.insertar)
router.put('/', teamMemberController.actualizar)
router.delete('/', teamMemberController.borrar)

export default router;