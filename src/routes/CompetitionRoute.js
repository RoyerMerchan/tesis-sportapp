import { Router } from 'express';
import CompetitionController from '../controller/CompetitionController.js';

const router = Router();
// Define the routes for Competition
router.get('/', CompetitionController.seleccionar)
router.post('/', CompetitionController.insertar)
router.put('/', CompetitionController.actualizar)
router.delete('/:comp_id', CompetitionController.borrar)



export default router;