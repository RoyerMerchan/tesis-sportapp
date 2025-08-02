class TypeLineUpController {
  async insertar(req, res) {
    const { de_line_up, na_line_up, sport_id } = req.body;
    if (!de_line_up || !na_line_up || !sport_id)
      return sendToCli({ status: 400, msg: "Todos los campos son requeridos" });

    try {
      await db.exe("sport", "insertTypeLineUp", [de_line_up, na_line_up, sport_id]);
      return sendToCli({ status: 201, msg: "Tipo de alineación creada correctamente" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al insertar tipo de alineación", detalle: err.message });
    }
  }

  async actualizar(req, res) {
    const { type_line_up_id, de_line_up, na_line_up, sport_id } = req.body;
    if (!type_line_up_id || !de_line_up || !na_line_up || !sport_id)
      return sendToCli({ status: 400, msg: "ID y todos los campos son requeridos para actualizar" });

    try {
      await db.exe("sport", "updateTypeLineUp", [de_line_up, na_line_up, sport_id, type_line_up_id]);
      return sendToCli({ status: 200, msg: "Tipo de alineación actualizada correctamente" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al actualizar tipo de alineación", detalle: err.message });
    }
  }

  async borrar(req, res) {
    const { type_line_up_id } = req.body;
    if (!type_line_up_id)
      return sendToCli({ status: 400, msg: "ID requerido para eliminar" });

    try {
      await db.exe("sport", "deleteTypeLineUp", [type_line_up_id]);
      return sendToCli({ status: 200, msg: "Tipo de alineación eliminada correctamente" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al eliminar tipo de alineación", detalle: err.message });
    }
  }

  async seleccionar(req, res) {
    try {
      const resultado = await db.exe("sport", "selectTypeLineUp");
      return sendToCli({ status: 200, data: resultado.rows });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al consultar tipos de alineación", detalle: err.message });
    }
  }
}

export default new TypeLineUpController();