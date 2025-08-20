import express from 'express';
import typeLineUpController from '../Controller/TypeLineUpController.js';

const router = express.Router();

// Define the routes for TypeLineUp
router.get('/', typeLineUpController.seleccionar)
router.post('/', typeLineUpController.insertar)
router.put('/', typeLineUpController.actualizar)
router.delete('/:type_line_up_id', typeLineUpController.borrar)
router.get('/filter/:sport_id', typeLineUpController.seleccionarBySport)

export default router;