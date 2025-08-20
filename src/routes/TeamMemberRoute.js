import express from 'express';
import teamMemberController from '../Controller/TeamMemberController.js';

const router = express.Router();

// Define the routes for TeamMember
router.get('/', teamMemberController.seleccionar)
router.post('/', teamMemberController.insertar)
router.put('/', teamMemberController.actualizar)
router.delete('/:team_member_id', teamMemberController.borrar)
router.get('/filter/:team_id', teamMemberController.seleccionarByTeam)

export default router;