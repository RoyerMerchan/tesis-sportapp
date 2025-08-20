import { Router } from 'express';
const router = Router();
import EventController from '../Controller/EventController.js';

// Define the routes for Event
router.get('/', EventController.seleccionar)
router.post('/', EventController.insertar)
router.put('/', EventController.actualizar)
router.delete('/:id_event', EventController.borrar)



export default router;