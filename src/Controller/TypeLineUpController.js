class TypeLineUpController {
  async insertar(req, res) {
    const { de_line_up, na_line_up, sport_id } = req.body;
    if (!de_line_up || !na_line_up || !sport_id)
      return res.status(400).json({ status: 400, msg: "Todos los campos son requeridos" });

    try {
      await db.exe("sport", "insertTypeLineUp", [de_line_up, na_line_up, sport_id]);
  return res.status(201).json({ status: 201, msg: "Tipo de alineación creada correctamente" });
    } catch (err) {
  return res.status(500).json({ status: 500, msg: "Error al insertar tipo de alineación", detalle: err.message });
    }
  }

  async actualizar(req, res) {
    const { type_line_up_id, de_line_up, na_line_up, sport_id } = req.body;
    if (!type_line_up_id || !de_line_up || !na_line_up || !sport_id)
      return res.status(400).json({ status: 400, msg: "ID y todos los campos son requeridos para actualizar" });

    try {
      const result = await db.exe("sport", "updateTypeLineUp", [de_line_up, na_line_up, sport_id, type_line_up_id]);
       if (result.rowCount === 0) {
        return res.status(404).json({ status: 404, msg: "tipo de alineacion no encontrada" });
      }
      return res.status(200).json({ status: 200, msg: "Tipo de alineación actualizada correctamente" });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al actualizar tipo de alineación", detalle: err.message });
    }
  }

  async borrar(req, res) {
    const { type_line_up_id } = req.params;
    if (!type_line_up_id)
      return res.status(400).json({ status: 400, msg: "ID requerido para eliminar" });

    try {
     const result = await db.exe("sport", "deleteTypeLineUp", [type_line_up_id]);
       if (result.rowCount === 0) {
        return res.status(404).json({ status: 404, msg: "tipo de alineacion no encontrada" });
      }
      return res.status(200).json({ status: 200, msg: "Tipo de alineación eliminada correctamente" });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al eliminar tipo de alineación", detalle: err.message });
    }
  }

  async seleccionar(req, res) {
    try {
      const resultado = await db.exe("sport", "selectTypeLineUp");
  return res.status(200).json({ status: 200, data: resultado.rows });
    } catch (err) {
  return res.status(500).json({ status: 500, msg: "Error al consultar tipos de alineación", detalle: err.message });
    }
  }

  async seleccionarBySport(req, res) {
    const { sport_id } = req.params;
    if (!sport_id)
      return res.status(400).json({ status: 400, msg: "ID de deporte requerido" });

    try {
      const resultado = await db.exe("sport", "selectTypeLineUpBySport", [sport_id]);
      return res.status(200).json({ status: 200, data: resultado.rows });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al consultar tipos de alineación por deporte", detalle: err.message });
    }
  }
}



export default new TypeLineUpController();