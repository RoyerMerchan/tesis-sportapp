class PlaceEventController {
  async insertar(req, res) {
    const { name_place_event, ubication_place_event } = req.body;
    if (!name_place_event || !ubication_place_event)
      return res.status(400).json({ status: 400, msg: "Nombre y ubicación requeridos" });

    try {
      await db.exe("sport", "insertPlaceEvent", [name_place_event, ubication_place_event]);
  return res.status(201).json({ status: 201, msg: "Lugar del evento creado correctamente" });
    } catch (err) {
  return res.status(500).json({ status: 500, msg: "Error al insertar lugar", detalle: err.message });
    }
  }

  async actualizar(req, res) {
    const { id_place_event, name_place_event, ubication_place_event } = req.body;
    if (!id_place_event || (!name_place_event && !ubication_place_event))
      return res.status(400).json({ status: 400, msg: "ID y al menos un campo a modificar son requeridos" });

    try {
      let result 
       
      if (name_place_event && ubication_place_event) {
        result = await db.exe("sport", "updatePlaceEventNameAndUbication", [name_place_event, ubication_place_event, id_place_event]);
      } else if (name_place_event) {
        result = await db.exe("sport", "updatePlaceEventNameOnly", [name_place_event, id_place_event]);
      } else {
        result = await db.exe("sport", "updatePlaceEventUbicationOnly", [ubication_place_event, id_place_event]);
      }
 if (result.rowCount === 0) {
        return res.status(404).json({ status: 404, msg: "lugar de evento no encontrado" });
      }
      return res.status(200).json({ status: 200, msg: "Lugar del evento actualizado correctamente" });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al actualizar lugar", detalle: err.message });
    }
  }

  async borrar(req, res) {
    const { id_place_event } = req.params;
    if (!id_place_event)
      return res.status(400).json({ status: 400, msg: "ID requerido para eliminar" });

    try {
      const result = await db.exe("sport", "deletePlaceEvent", [id_place_event]);
       if (result.rowCount === 0) {
        return res.status(404).json({ status: 404, msg: "lugar de evento no encontrado" });
      }
      return res.status(200).json({ status: 200, msg: "Lugar del evento eliminado" });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al eliminar lugar", detalle: err.message });
    }
  }

  async seleccionar(req, res) {
    try {
      const resultado = await db.exe("sport", "selectPlaceEvents");
  return res.status(200).json({ status: 200, data: resultado.rows });
    } catch (err) {
  return res.status(500).json({ status: 500, msg: "Error al consultar lugares", detalle: err.message });
    }
  }
}

export default new PlaceEventController();