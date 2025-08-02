
import { Router } from 'express';
const router = Router();
import UserController from '../Controller/UserController';

router.post('/users', (req, res) => {
  const { action } = req.body;

  let k

  if(Security.hasPermission(k)){
  switch (action) {
    case '1':
      return UserController.insert(req, res);

    case '2':
      return UserController.update(req, res);

    case '3':
      return UserController.delete(req, res);

    case '4':
      return UserController.select(req, res);

    default:
      return res.status(400).json({ error: "Acción no válida" });
  }
  }
});

export default router;