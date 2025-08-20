
import { Router } from 'express';
const router = Router();
import UserController from '../Controller/UserController.js';

// Define the routes for User
router.get('/', UserController.seleccionar)
router.get('/all', UserController.seleccionarTodos)
router.post('/', UserController.insertar)
router.put('/', UserController.actualizar)
router.delete('/:id', UserController.borrar)
router.post('/person', UserController.insertarConPersona)
router.get('/perfilP/:id_perfil', UserController.obtenerPorPerfil)


export default router;