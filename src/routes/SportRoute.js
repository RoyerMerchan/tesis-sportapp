import { Router } from 'express';
const router = Router();
import sportController from '../Controller/SportController.js';

router.get('/', sportController.seleccionar)
router.post('/', sportController.insertar)
router.put('/', sportController.actualizar)
router.delete('/', sportController.borrar)

export default router;