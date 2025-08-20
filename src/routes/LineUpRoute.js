import express from 'express';
import lineUpController from '../Controller/LineUpController.js';

const router = express.Router();

// Define the routes for LineUp
router.get('/', lineUpController.seleccionar)
router.post('/', lineUpController.insertar)
router.put('/', lineUpController.actualizar)
router.delete('/:line_up_id', lineUpController.borrar)
router.get('/filter/:type_line_up_id', lineUpController.seleccionarByType)

export default router;