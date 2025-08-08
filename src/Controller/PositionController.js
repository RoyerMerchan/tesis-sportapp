class PositionController {
  async insertar(req, res) {
    const { name_position } = req.body;
    if (!name_position)
      return sendToCli({ status: 400, msg: "El nombre de la posición es requerido" });

    try {
      await db.exe("security", "insertPosition", [name_position]);
      return sendToCli({ status: 201, msg: "Posición creada exitosamente" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al insertar posición", detalle: err.message });
    }
  }

  async actualizar(req, res) {
    const { id_position, name_position } = req.body;
    if (!id_position || !name_position)
      return sendToCli({ status: 400, msg: "ID y nuevo nombre son requeridos" });

    try {
      const result = await db.exe("security", "updatePosition", [name_position, id_position]);
       if (result.rowCount === 0) {
        return sendToCli({ status: 404, msg: "posicion no encontrada" });
      }
      return sendToCli({ status: 200, msg: "Posición actualizada correctamente" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al actualizar posición", detalle: err.message });
    }
  }

  async borrar(req, res) {
    const { id_position } = req.query;
    if (!id_position)
      return sendToCli({ status: 400, msg: "ID requerido para eliminar" });

    try {
     const result = await db.exe("security", "deletePosition", [id_position]);
       if (result.rowCount === 0) {
        return sendToCli({ status: 404, msg: "posicion no encontrada" });
      }
      return sendToCli({ status: 200, msg: "Posición eliminada" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al borrar posición", detalle: err.message });
    }
  }

  async seleccionar(req, res) {
    try {
      const resultado = await db.exe("security", "selectPositions");
      return sendToCli({ status: 200, data: resultado.rows });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al consultar posiciones", detalle: err.message });
    }
  }
}

export default new PositionController();