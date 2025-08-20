class TypeCompetitionController {
  async insertar(req, res) {
    const { sport_id, na_type_comp } = req.body;
    if (!sport_id || !na_type_comp)
      return res.status(400).json({ status: 400, msg: "Campos sport_id y na_type_comp son requeridos" });

    try {
      await db.exe("sport", "insertTypeCompetition", [sport_id, na_type_comp]);
  return res.status(201).json({ status: 201, msg: "Tipo de competición registrada correctamente" });
    } catch (err) {
  return res.status(500).json({ status: 500, msg: "Error al insertar tipo de competición", detalle: err.message });
    }
  }

  async actualizar(req, res) {
    const { type_comp_id, sport_id, na_type_comp } = req.body;
    if (!type_comp_id || !sport_id || !na_type_comp)
      return res.status(400).json({ status: 400, msg: "Todos los campos son requeridos para actualizar" });

    try {
      const result = await db.exe("sport", "updateTypeCompetition", [sport_id, na_type_comp, type_comp_id]);
       if (result.rowCount === 0) {
        return res.status(404).json({ status: 404, msg: "tipo competencia no encontrada" });
      }
      return res.status(200).json({ status: 200, msg: "Tipo de competición actualizada correctamente" });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al actualizar tipo de competición", detalle: err.message });
    }
  }

  async borrar(req, res) {
    const { type_comp_id } = req.params;
    if (!type_comp_id)
      return res.status(400).json({ status: 400, msg: "type_comp_id requerido para eliminar" });

    try {
      const result = await db.exe("sport", "deleteTypeCompetition", [type_comp_id]);
       if (result.rowCount === 0) {
        return res.status(404).json({ status: 404, msg: "tipo competencia no encontrada" });
      }
      return res.status(200).json({ status: 200, msg: "Tipo de competición eliminada correctamente" });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al eliminar tipo de competición", detalle: err.message });
    }
  }

  async seleccionar(req, res) {
    try {
      const resultado = await db.exe("sport", "selectTypeCompetition");
  return res.status(200).json({ status: 200, data: resultado.rows });
    } catch (err) {
  return res.status(500).json({ status: 500, msg: "Error al consultar tipos de competición", detalle: err.message });
    }
  }

  async seleccionarBySport(req, res) {
    const { sport_id } = req.params;
    if (!sport_id)
      return res.status(400).json({ status: 400, msg: "ID de deporte requerido" });

    try {
      const resultado = await db.exe("sport", "selectTypeCompetitionBySport", [sport_id]);
      return res.status(200).json({ status: 200, data: resultado.rows });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al consultar tipos de competición por deporte", detalle: err.message });
    }
  }

}

export default new TypeCompetitionController();