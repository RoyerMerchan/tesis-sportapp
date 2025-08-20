import { Router } from 'express';
const router = Router();
import sportController from '../Controller/SportController.js';

// Define the routes for Sport
router.get('/', sportController.seleccionar)
router.post('/', sportController.insertar)
router.put('/', sportController.actualizar)
router.delete('/:id_sport', sportController.borrar)

export default router;