class PositionController {
  async insertar(req, res) {
    const { name_position } = req.body;
    if (!name_position)
      return res.status(400).json({ status: 400, msg: "El nombre de la posición es requerido" });

    try {
      await db.exe("security", "insertPosition", [name_position]);
  return res.status(201).json({ status: 201, msg: "Posición creada exitosamente" });
    } catch (err) {
  return res.status(500).json({ status: 500, msg: "Error al insertar posición", detalle: err.message });
    }
  }

  async actualizar(req, res) {
    const { id_position, name_position } = req.body;
    if (!id_position || !name_position)
      return res.status(400).json({ status: 400, msg: "ID y nuevo nombre son requeridos" });

    try {
      const result = await db.exe("security", "updatePosition", [name_position, id_position]);
       if (result.rowCount === 0) {
        return res.status(404).json({ status: 404, msg: "posicion no encontrada" });
      }
      return res.status(200).json({ status: 200, msg: "Posición actualizada correctamente" });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al actualizar posición", detalle: err.message });
    }
  }

  async borrar(req, res) {
    const { id_position } = req.params;
    if (!id_position)
      return res.status(400).json({ status: 400, msg: "ID requerido para eliminar" });

    try {
     const result = await db.exe("security", "deletePosition", [id_position]);
       if (result.rowCount === 0) {
        return res.status(404).json({ status: 404, msg: "posicion no encontrada" });
      }
      return res.status(200).json({ status: 200, msg: "Posición eliminada" });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al borrar posición", detalle: err.message });
    }
  }

  async seleccionar(req, res) {
    try {
      const resultado = await db.exe("security", "selectPositions");
  return res.status(200).json({ status: 200, data: resultado.rows });
    } catch (err) {
  return res.status(500).json({ status: 500, msg: "Error al consultar posiciones", detalle: err.message });
    }
  }
}

export default new PositionController();