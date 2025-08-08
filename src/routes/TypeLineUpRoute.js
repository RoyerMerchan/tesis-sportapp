import express from 'express';
import typeLineUpController from '../Controller/TypeLineUpController.js';

const router = express.Router();

router.get('/', typeLineUpController.seleccionar)
router.post('/', typeLineUpController.insertar)
router.put('/', typeLineUpController.actualizar)
router.delete('/', typeLineUpController.borrar)

export default router;