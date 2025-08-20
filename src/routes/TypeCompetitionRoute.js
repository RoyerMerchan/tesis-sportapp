import express from 'express';
import typeCompetitionController from '../Controller/TypeCompetitionController.js';

const router = express.Router();

// Define the routes for TypeCompetition
router.get('/', typeCompetitionController.seleccionar)
router.post('/', typeCompetitionController.insertar)
router.put('/', typeCompetitionController.actualizar)
router.delete('/:type_comp_id', typeCompetitionController.borrar)
router.get('/filter/:sport_id', typeCompetitionController.seleccionarBySport)

export default router;