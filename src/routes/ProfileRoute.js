import express from 'express';
const router = express.Router();

import profileController from '../Controller/ProfileController.js';

// Define the routes for Profile
router.get('/', profileController.seleccionar)
router.post('/', profileController.insertar)
router.put('/', profileController.actualizar)
router.delete('/:id_profile', profileController.borrar)

export default router;