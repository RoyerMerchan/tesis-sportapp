class SportController {
  async insertar(req, res) {
    const { name_sport, de_sport } = req.body;
    if (!name_sport || !de_sport)
      return sendToCli({ status: 400, msg: "Nombre y descripción requeridos" });

    try {
      await db.exe("event", "insertSport", [name_sport, de_sport]);
      return sendToCli({ status: 201, msg: "Deporte creado exitosamente" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al insertar deporte", detalle: err.message });
    }
  }

  async actualizar(req, res) {
    const { id_sport, name_sport, de_sport } = req.body;
    if (!id_sport || (!name_sport && !de_sport))
      return sendToCli({ status: 400, msg: "ID y al menos un campo a modificar son requeridos" });

    try {
      if (name_sport && de_sport) {
        await db.exe("event", "updateSportBoth", [name_sport, de_sport, id_sport]);
      } else if (name_sport) {
        await db.exe("event", "updateSportNameOnly", [name_sport, id_sport]);
      } else {
        await db.exe("event", "updateSportDescriptionOnly", [de_sport, id_sport]);
      }

      return sendToCli({ status: 200, msg: "Deporte actualizado correctamente" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al actualizar deporte", detalle: err.message });
    }
  }

  async borrar(req, res) {
    const { id_sport } = req.body;
    if (!id_sport)
      return sendToCli({ status: 400, msg: "ID requerido para eliminar" });

    try {
      await db.exe("event", "deleteSport", [id_sport]);
      return sendToCli({ status: 200, msg: "Deporte eliminado correctamente" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al eliminar deporte", detalle: err.message });
    }
  }

  async seleccionar(req, res) {
    try {
      const resultado = await db.exe("event", "selectSports");
      return sendToCli({ status: 200, data: resultado.rows });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al consultar deportes", detalle: err.message });
    }
  }
}

export default new SportController();