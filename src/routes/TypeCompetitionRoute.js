import express from 'express';
import typeCompetitionController from '../Controller/TypeCompetitionController.js';

const router = express.Router();

// Define the routes for TypeCompetition
router.get('/', typeCompetitionController.seleccionar)
router.post('/', typeCompetitionController.insertar)
router.put('/', typeCompetitionController.actualizar)
router.delete('/', typeCompetitionController.borrar)

export default router;