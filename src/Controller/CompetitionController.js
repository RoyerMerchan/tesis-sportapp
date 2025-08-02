class CompetitionController {
  async insertar(req, res) {
    const { event_id, place_event_id, type_comp_id, date_competition, hour_competition } = req.body;
    if (!event_id || !place_event_id || !type_comp_id || !date_competition || !hour_competition)
      return sendToCli({ status: 400, msg: "Todos los campos son requeridos" });

    try {
      await db.exe("sport", "insertCompetition", [event_id, place_event_id, type_comp_id, date_competition, hour_competition]);
      return sendToCli({ status: 201, msg: "Competencia creada correctamente" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al insertar competencia", detalle: err.message });
    }
  }

  async actualizar(req, res) {
    const { comp_id, event_id, place_event_id, type_comp_id, date_competition, hour_competition } = req.body;
    if (!comp_id || !event_id || !place_event_id || !type_comp_id || !date_competition || !hour_competition)
      return sendToCli({ status: 400, msg: "ID y todos los campos son requeridos" });

    try {
      await db.exe("sport", "updateCompetition", [event_id, place_event_id, type_comp_id, date_competition, hour_competition, comp_id]);
      return sendToCli({ status: 200, msg: "Competencia actualizada correctamente" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al actualizar competencia", detalle: err.message });
    }
  }

  async borrar(req, res) {
    const { comp_id } = req.body;
    if (!comp_id)
      return sendToCli({ status: 400, msg: "ID requerido para eliminar" });

    try {
      await db.exe("sport", "deleteCompetition", [comp_id]);
      return sendToCli({ status: 200, msg: "Competencia eliminada correctamente" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al eliminar competencia", detalle: err.message });
    }
  }

  async seleccionar(req, res) {
    try {
      const resultado = await db.exe("sport", "selectCompetitions");
      return sendToCli({ status: 200, data: resultado.rows });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al consultar competencias", detalle: err.message });
    }
  }
}

export default new CompetitionController();