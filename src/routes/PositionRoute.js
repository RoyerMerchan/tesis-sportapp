import express from 'express';
import positionController from '../Controller/PositionController.js';

const router = express.Router();

router.get('/', positionController.seleccionar)
router.post('/', positionController.insertar)
router.put('/', positionController.actualizar)
router.delete('/', positionController.borrar)

export default router;