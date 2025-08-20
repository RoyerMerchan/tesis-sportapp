class PersonController {
  async insertar(req, res) {
    const { id_type_person, na_person, ln_person } = req.body;
    console.log("Insertando persona:", req.body);
    if (!id_type_person || !na_person || !ln_person)
      return res.status(400).json({ status: 400, msg: "Todos los campos son requeridos" });

    try {
      await db.exe("security", "insertPerson", [id_type_person, na_person, ln_person]);
  return res.status(201).json({ status: 201, msg: "Persona registrada correctamente" });
    } catch (err) {
  return res.status(500).json({ status: 500, msg: "Error al insertar persona", detalle: err.message });
    }
  }

  async actualizar(req, res) {
    const { id_person, id_type_person, na_person, ln_person } = req.body;
    if (!id_person || !id_type_person || !na_person || !ln_person)
      return res.status(400).json({ status: 400, msg: "ID y datos completos requeridos para actualizar" });

    try {
      
      const result = await db.exe("security", "updatePerson", [na_person, ln_person, id_type_person, id_person]);
       if (result.rowCount === 0) {
        return res.status(404).json({ status: 404, msg: "person no encontrada" });
      }
      return res.status(200).json({ status: 200, msg: "Persona actualizada correctamente" });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al actualizar persona", detalle: err.message });
    }
  }

  async borrar(req, res) {
    const { id_person } = req.params;
    if (!id_person)
      return res.status(400).json({ status: 400, msg: "ID requerido para eliminar" });

    try {
      const result = await db.exe("security", "deletePerson", [id_person]);
       if (result.rowCount === 0) {
        return res.status(404).json({ status: 404, msg: "persona no encontrada" });
      }
      return res.status(200).json({ status: 200, msg: "Persona eliminada correctamente" });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al eliminar persona", detalle: err.message });
    }
  }

  async seleccionar(req, res) {
    try {
      const resultado = await db.exe("security", "selectPersons");
  return res.status(200).json({ status: 200, data: resultado.rows });
    } catch (err) {
  return res.status(500).json({ status: 500, msg: "Error al consultar personas", detalle: err.message });
    }
  }

  async seleccionarByType(req, res) {
    const { id_type_person } = req.params;
    if (!id_type_person)
      return res.status(400).json({ status: 400, msg: "ID de tipo de persona requerido" });

    try {
      const resultado = await db.exe("security", "selectPersonsByType", [id_type_person]);
      return res.status(200).json({ status: 200, data: resultado.rows });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al consultar personas por tipo", detalle: err.message });
    }
  }
}

export default new PersonController();