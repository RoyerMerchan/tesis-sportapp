import { Router } from 'express';
import CompetitionController from '../controller/CompetitionController.js';

const router = Router();

router.get('/', CompetitionController.seleccionar)
router.post('/', CompetitionController.insertar)
router.put('/', CompetitionController.actualizar)
router.delete('/', CompetitionController.borrar)


export default router;