import { Router } from 'express';
const router = Router();
import TipoPersonaController from '../Controller/TypePersonController.js';


// Define the routes for TypePerson
router.get('/', TipoPersonaController.seleccionar)
router.post('/', TipoPersonaController.insertar)
router.put('/', TipoPersonaController.actualizar)
router.delete('/:id_type_person', TipoPersonaController.borrar)

export default router;