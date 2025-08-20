import express from 'express';
import sportStatisticController from '../Controller/SportStadisticController.js';

const router = express.Router();

// Define the routes for SportStatistic
router.get('/', sportStatisticController.seleccionar)
router.post('/', sportStatisticController.insertar)
router.put('/', sportStatisticController.actualizar)
router.delete('/:sport_statistic_id', sportStatisticController.borrar)
router.get('/filter/:team_member_id', sportStatisticController.seleccionarPorJugador)

export default router;