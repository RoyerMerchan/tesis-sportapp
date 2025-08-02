class PlaceEventController {
  async insertar(req, res) {
    const { name_place_event, ubication_place_event } = req.body;
    if (!name_place_event || !ubication_place_event)
      return sendToCli({ status: 400, msg: "Nombre y ubicación requeridos" });

    try {
      await db.exe("event", "insertPlaceEvent", [name_place_event, ubication_place_event]);
      return sendToCli({ status: 201, msg: "Lugar del evento creado correctamente" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al insertar lugar", detalle: err.message });
    }
  }

  async actualizar(req, res) {
    const { id_place_event, name_place_event, ubication_place_event } = req.body;
    if (!id_place_event || (!name_place_event && !ubication_place_event))
      return sendToCli({ status: 400, msg: "ID y al menos un campo a modificar son requeridos" });

    try {
      if (name_place_event && ubication_place_event) {
        await db.exe("event", "updatePlaceEventNameAndUbication", [name_place_event, ubication_place_event, id_place_event]);
      } else if (name_place_event) {
        await db.exe("event", "updatePlaceEventNameOnly", [name_place_event, id_place_event]);
      } else {
        await db.exe("event", "updatePlaceEventUbicationOnly", [ubication_place_event, id_place_event]);
      }

      return sendToCli({ status: 200, msg: "Lugar del evento actualizado correctamente" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al actualizar lugar", detalle: err.message });
    }
  }

  async borrar(req, res) {
    const { id_place_event } = req.body;
    if (!id_place_event)
      return sendToCli({ status: 400, msg: "ID requerido para eliminar" });

    try {
      await db.exe("event", "deletePlaceEvent", [id_place_event]);
      return sendToCli({ status: 200, msg: "Lugar del evento eliminado" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al eliminar lugar", detalle: err.message });
    }
  }

  async seleccionar(req, res) {
    try {
      const resultado = await db.exe("event", "selectPlaceEvents");
      return sendToCli({ status: 200, data: resultado.rows });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al consultar lugares", detalle: err.message });
    }
  }
}

export default new PlaceEventController();