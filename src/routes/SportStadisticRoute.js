import express from 'express';
import sportStatisticController from '../Controller/SportStadisticController.js';

const router = express.Router();

// Define the routes for SportStatistic
router.get('/', sportStatisticController.seleccionar)
router.post('/', sportStatisticController.insertar)
router.put('/', sportStatisticController.actualizar)
router.delete('/', sportStatisticController.borrar)

export default router;