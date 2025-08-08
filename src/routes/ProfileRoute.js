import express from 'express';
const router = express.Router();

import profileController from '../Controller/ProfileController.js';

router.get('/', profileController.seleccionar)
router.post('/', profileController.insertar)
router.put('/', profileController.actualizar)
router.delete('/', profileController.borrar)

export default router;