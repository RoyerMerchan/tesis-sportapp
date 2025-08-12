import express from 'express';
import teamController from '../Controller/TeamController.js';

const router = express.Router();

// Define the routes for Team
router.get('/', teamController.seleccionar)
router.post('/', teamController.insertar)
router.put('/', teamController.actualizar)
router.delete('/', teamController.borrar)

export default router;