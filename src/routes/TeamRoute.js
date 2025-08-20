import express from 'express';
import teamController from '../Controller/TeamController.js';

const router = express.Router();

// Define the routes for Team
router.get('/', teamController.seleccionar)
router.post('/', teamController.insertar)
router.put('/', teamController.actualizar)
router.delete('/:team_id', teamController.borrar)
router.get('/filter/:sport_id/:institution_id', teamController.seleccionarBySportandInst);

export default router;