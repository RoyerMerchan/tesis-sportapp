import express from 'express';
import sportStatisticController from '../Controller/SportStadisticController.js';

const router = express.Router();

router.get('/', sportStatisticController.seleccionar)
router.post('/', sportStatisticController.insertar)
router.put('/', sportStatisticController.actualizar)
router.delete('/', sportStatisticController.borrar)

export default router;