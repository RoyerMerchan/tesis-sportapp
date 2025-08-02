class EventController {
  async insertar(req, res) {
    const { name_event } = req.body;
    if (!name_event) return sendToCli({ status: 400, msg: "Nombre del evento requerido" });

    try {
      await db.exe("security", "insertEvent", [name_event]);
      return sendToCli({ status: 201, msg: "Evento creado correctamente" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al insertar evento", detalle: err.message });
    }
  }

  async actualizar(req, res) {
    const { id_event, name_event } = req.body;
    if (!id_event || !name_event)
      return sendToCli({ status: 400, msg: "ID y nuevo nombre requeridos" });

    try {
      await db.exe("security", "updateEvent", [name_event, id_event]);
      return sendToCli({ status: 200, msg: "Evento actualizado" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al actualizar evento", detalle: err.message });
    }
  }

  async borrar(req, res) {
    const { id_event } = req.body;
    if (!id_event)
      return sendToCli({ status: 400, msg: "ID del evento requerido" });

    try {
      await db.exe("security", "deleteEvent", [id_event]);
      return sendToCli({ status: 200, msg: "Evento eliminado" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al borrar evento", detalle: err.message });
    }
  }

  async seleccionar(req, res) {
    try {
      const resultado = await db.exe("security", "selectEvents");
      return sendToCli({ status: 200, data: resultado.rows });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al consultar eventos", detalle: err.message });
    }
  }
}

export default new EventController();