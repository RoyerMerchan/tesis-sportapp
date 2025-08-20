class LineUpController {
  async insertar(req, res) {
    const { position_id, type_line_up_id, team_member_id, de_line_up, team_comp_id } = req.body;
    if (!position_id || !type_line_up_id || !team_member_id || !de_line_up || !team_comp_id)
      return res.status(400).json({ status: 400, msg: "Todos los campos son requeridos" });

    try {
      await db.exe("sport", "insertLineUp", [position_id, type_line_up_id, team_member_id, de_line_up, team_comp_id]);
  return res.status(201).json({ status: 201, msg: "Alineación creada correctamente" });
    } catch (err) {
  return res.status(500).json({ status: 500, msg: "Error al insertar alineación", detalle: err.message });
    }
  }

  async actualizar(req, res) {
    const { line_up_id, position_id, type_line_up_id, team_member_id, de_line_up, team_comp_id } = req.body;
    if (!line_up_id || !position_id || !type_line_up_id || !team_member_id || !de_line_up || !team_comp_id)
      return res.status(400).json({ status: 400, msg: "ID y todos los campos son requeridos" });

    try {
     const result = await db.exe("sport", "updateLineUp", [position_id, type_line_up_id, team_member_id, de_line_up, team_comp_id, line_up_id]);
       if (result.rowCount === 0) {
        return res.status(404).json({ status: 404, msg: "alineacion no encontrada" });
      }
      return res.status(200).json({ status: 200, msg: "Alineación actualizada correctamente" });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al actualizar alineación", detalle: err.message });
    }
  }

  async borrar(req, res) {
    const { line_up_id } = req.params;
    if (!line_up_id)
      return res.status(400).json({ status: 400, msg: "ID requerido para eliminar" });

    try {
      const result = await db.exe("sport", "deleteLineUp", [line_up_id]);
       if (result.rowCount === 0) {
        return res.status(404).json({ status: 404, msg: "alineacion no encontrada" });
      }
      return res.status(200).json({ status: 200, msg: "Alineación eliminada correctamente" });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al eliminar alineación", detalle: err.message });
    }
  }

  async seleccionar(req, res) {
    try {
      const resultado = await db.exe("sport", "selectLineUps");
  return res.status(200).json({ status: 200, data: resultado.rows });
    } catch (err) {
  return res.status(500).json({ status: 500, msg: "Error al consultar alineaciones", detalle: err.message });
    }
  }

  async seleccionarByType(req, res) {
    const { type_line_up_id } = req.params;
    if (!type_line_up_id)
      return res.status(400).json({ status: 400, msg: "ID de tipo de alineación requerido" });

    try {
      const resultado = await db.exe("sport", "selectLineUpsByType", [type_line_up_id]);
      return res.status(200).json({ status: 200, data: resultado.rows });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al consultar alineaciones por tipo", detalle: err.message });
    }
  }
}

export default new LineUpController();