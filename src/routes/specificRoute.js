import { Router } from 'express';
const router = Router();


router.get('/meassure', async (req, res) => {
    try {
      const resultado = await db.exe("sport", "selectMeassure");
  return res.status(200).json({ status: 200, data: resultado.rows });
    } catch (err) {
  return res.status(500).json({ status: 500, msg: "Error al consultar unidad de medida", detalle: err.message });
    }
  });

router.get('/teamcomp', async (req, res) => {
    try {
      const resultado = await db.exe("sport", "selectTeamComp");
  return res.status(200).json({ status: 200, data: resultado.rows });
    } catch (err) {
  return res.status(500).json({ status: 500, msg: "Error al consultar teamcomp", detalle: err.message });
    }
  });

export default router;
