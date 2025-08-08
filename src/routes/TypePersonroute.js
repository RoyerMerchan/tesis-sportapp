import { Router } from 'express';
const router = Router();
import TipoPersonaController from '../Controller/TypePersonController.js';

router.get('/', TipoPersonaController.seleccionar)
router.post('/', TipoPersonaController.insertar)
router.put('/', TipoPersonaController.actualizar)
router.delete('/', TipoPersonaController.borrar)

export default router;