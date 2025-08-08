import { Router } from 'express';
const router = Router();
import placeEventController from '../Controller/PlaceEventController.js';

router.get('/', placeEventController.seleccionar)
router.post('/', placeEventController.insertar)
router.put('/', placeEventController.actualizar)
router.delete('/', placeEventController.borrar)

export default router;