class TypeCompetitionController {
  async insertar(req, res) {
    const { sport_id, na_type_comp } = req.body;
    if (!sport_id || !na_type_comp)
      return sendToCli({ status: 400, msg: "Campos sport_id y na_type_comp son requeridos" });

    try {
      await db.exe("sport", "insertTypeCompetition", [sport_id, na_type_comp]);
      return sendToCli({ status: 201, msg: "Tipo de competición registrada correctamente" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al insertar tipo de competición", detalle: err.message });
    }
  }

  async actualizar(req, res) {
    const { type_comp_id, sport_id, na_type_comp } = req.body;
    if (!type_comp_id || !sport_id || !na_type_comp)
      return sendToCli({ status: 400, msg: "Todos los campos son requeridos para actualizar" });

    try {
      const result = await db.exe("sport", "updateTypeCompetition", [sport_id, na_type_comp, type_comp_id]);
       if (result.rowCount === 0) {
        return sendToCli({ status: 404, msg: "tipo competencia no encontrada" });
      }
      return sendToCli({ status: 200, msg: "Tipo de competición actualizada correctamente" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al actualizar tipo de competición", detalle: err.message });
    }
  }

  async borrar(req, res) {
    const { type_comp_id } = req.body;
    if (!type_comp_id)
      return sendToCli({ status: 400, msg: "type_comp_id requerido para eliminar" });

    try {
      const result = await db.exe("sport", "deleteTypeCompetition", [type_comp_id]);
       if (result.rowCount === 0) {
        return sendToCli({ status: 404, msg: "tipo competencia no encontrada" });
      }
      return sendToCli({ status: 200, msg: "Tipo de competición eliminada correctamente" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al eliminar tipo de competición", detalle: err.message });
    }
  }

  async seleccionar(req, res) {
    try {
      const resultado = await db.exe("sport", "selectTypeCompetition");
      return sendToCli({ status: 200, data: resultado.rows });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al consultar tipos de competición", detalle: err.message });
    }
  }
}

export default new TypeCompetitionController();