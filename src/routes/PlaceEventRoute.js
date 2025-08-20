import { Router } from 'express';
const router = Router();
import placeEventController from '../Controller/PlaceEventController.js';

// Define the routes for PlaceEvent
router.get('/', placeEventController.seleccionar)
router.post('/', placeEventController.insertar)
router.put('/', placeEventController.actualizar)
router.delete('/:id_place_event', placeEventController.borrar)

export default router;