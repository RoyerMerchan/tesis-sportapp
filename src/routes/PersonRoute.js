import express from 'express';
import PersonController from '../Controller/PersonController.js';

const router = express.Router();

// Define the routes for Person
router.get('/', PersonController.seleccionar)
router.post('/', PersonController.insertar)
router.put('/', PersonController.actualizar)
router.delete('/:id_person', PersonController.borrar)
router.get('/persontp/:id_type_person', PersonController.seleccionarByType)

export default router;