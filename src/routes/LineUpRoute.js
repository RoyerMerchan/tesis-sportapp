import express from 'express';
import lineUpController from '../Controller/LineUpController.js';

const router = express.Router();

router.get('/', lineUpController.seleccionar)
router.post('/', lineUpController.insertar)
router.put('/', lineUpController.actualizar)
router.delete('/', lineUpController.borrar)

export default router;