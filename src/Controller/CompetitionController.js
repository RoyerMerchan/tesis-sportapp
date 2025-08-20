class CompetitionController {
  async insertar(req, res) {
    const { event_id, place_event_id, type_comp_id, date_competition, hour_competition } = req.body;
    if (!event_id || !place_event_id || !type_comp_id || !date_competition || !hour_competition)
      return res.status(400).json({ status: 400, msg: "Todos los campos son requeridos" });

    try {
      await db.exe("sport", "insertCompetition", [event_id, place_event_id, type_comp_id, date_competition, hour_competition]);
  return res.status(201).json({ status: 201, msg: "Competencia creada correctamente" });
    } catch (err) {
  return res.status(500).json({ status: 500, msg: "Error al insertar competencia", detalle: err.message });
    }
  }

  async actualizar(req, res) {
    const { comp_id, event_id, place_event_id, type_comp_id, date_competition, hour_competition } = req.body;
    if (!comp_id || !event_id || !place_event_id || !type_comp_id || !date_competition || !hour_competition)
      return res.status(400).json({ status: 400, msg: "ID y todos los campos son requeridos" });

    try {
     const result = await db.exe("sport", "updateCompetition", [event_id, place_event_id, type_comp_id, date_competition, hour_competition, comp_id]);
       if (result.rowCount === 0) {
        return res.status(404).json({ status: 404, msg: "competencia no encontrada" });
      }
      return res.status(200).json({ status: 200, msg: "Competencia actualizada correctamente" });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al actualizar competencia", detalle: err.message });
    }
  }

  async borrar(req, res) {
    const { comp_id } = req.params;
    if (!comp_id)
      return res.status(400).json({ status: 400, msg: "ID requerido para eliminar" });

    try {
     const result =  await db.exe("sport", "deleteCompetition", [comp_id]);
      if (result.rowCount === 0) {
        return res.status(404).json({ status: 404, msg: "competencia no encontrada" });
      }
      return res.status(200).json({ status: 200, msg: "Competencia eliminada correctamente" });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al eliminar competencia", detalle: err.message });
    }
  }

  async seleccionar(req, res) {
    try {
      const resultado = await db.exe("sport", "selectCompetitions");
  return res.status(200).json({ status: 200, data: resultado.rows });
    } catch (err) {
  return res.status(500).json({ status: 500, msg: "Error al consultar competencias", detalle: err.message });
    }
  }
}

export default new CompetitionController();