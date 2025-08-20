class SportController {
  async insertar(req, res) {
    const { name_sport, de_sport } = req.body;
    if (!name_sport || !de_sport)
      return res.status(400).json({ status: 400, msg: "Nombre y descripción requeridos" });

    try {
      await db.exe("sport", "insertSport", [name_sport, de_sport]);
      return res.status(201).json({ status: 201, msg: "Deporte creado exitosamente" });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al insertar deporte", detalle: err.message });
    }
  }

  async actualizar(req, res) {
    const { id_sport, name_sport, de_sport } = req.body;
    if (!id_sport || (!name_sport && !de_sport))
      return sendToCli({ status: 400, msg: "ID y al menos un campo a modificar son requeridos" });

    try {
      let result
      if (name_sport && de_sport) {
       result = await db.exe("sport", "updateSportBoth", [name_sport, de_sport, id_sport]);
      } else if (name_sport) {
       result = await db.exe("sport", "updateSportNameOnly", [name_sport, id_sport]);
      } else {
       result = await db.exe("sport", "updateSportDescriptionOnly", [de_sport, id_sport]);
      }

       if (result.rowCount === 0) {
        return res.status(404).json({ status: 404, msg: "deporte no encontrada" });
      }
      return res.status(200).json({ status: 200, msg: "Deporte actualizado correctamente" });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al actualizar deporte", detalle: err.message });
    }
  }

  async borrar(req, res) {
    const { id_sport } = req.params;
    if (!id_sport)
      return sendToCli({ status: 400, msg: "ID requerido para eliminar" });

    try {
      const result = await db.exe("sport", "deleteSport", [id_sport]);
       if (result.rowCount === 0) {
        return res.status(404).json({ status: 404, msg: "deporte no encontrado" });
      }
      return res.status(200).json({ status: 200, msg: "Deporte eliminado correctamente" });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al eliminar deporte", detalle: err.message });
    }
  }

  async seleccionar(req, res) {
    try {
      const resultado = await db.exe("sport", "selectSports");
      return res.status(200).json({ status: 200, data: resultado.rows });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al consultar deportes", detalle: err.message });
    }
  }
}

export default new SportController();