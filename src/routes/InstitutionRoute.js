import express from 'express';
import institutionController from '../Controller/InstitutionController.js';

const router = express.Router();

// Define the routes for Institution
router.get('/', institutionController.seleccionar)
router.post('/', institutionController.insertar)
router.put('/', institutionController.actualizar)
router.delete('/', institutionController.borrar)

export default router;