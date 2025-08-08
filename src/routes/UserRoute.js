
import { Router } from 'express';
const router = Router();
import UserController from '../Controller/UserController.js';

router.get('/', UserController.seleccionar)
router.post('/', UserController.insertar)
router.put('/', UserController.actualizar)
router.delete('/', UserController.borrar)

export default router;