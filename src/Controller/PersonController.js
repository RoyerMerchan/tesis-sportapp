class PersonController {
  async insertar(req, res) {
    const { id_type_person, na_person, ln_person } = req.body;
    if (!id_type_person || !na_person || !ln_person)
      return sendToCli({ status: 400, msg: "Todos los campos son requeridos" });

    try {
      await db.exe("security", "insertPerson", [id_type_person, na_person, ln_person]);
      return sendToCli({ status: 201, msg: "Persona registrada correctamente" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al insertar persona", detalle: err.message });
    }
  }

  async actualizar(req, res) {
    const { id_person, id_type_person, na_person, ln_person } = req.body;
    if (!id_person || !id_type_person || !na_person || !ln_person)
      return sendToCli({ status: 400, msg: "ID y datos completos requeridos para actualizar" });

    try {
      await db.exe("security", "updatePerson", [id_type_person, na_person, ln_person, id_person]);
      return sendToCli({ status: 200, msg: "Persona actualizada correctamente" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al actualizar persona", detalle: err.message });
    }
  }

  async borrar(req, res) {
    const { id_person } = req.body;
    if (!id_person)
      return sendToCli({ status: 400, msg: "ID requerido para eliminar" });

    try {
      await db.exe("security", "deletePerson", [id_person]);
      return sendToCli({ status: 200, msg: "Persona eliminada correctamente" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al eliminar persona", detalle: err.message });
    }
  }

  async seleccionar(req, res) {
    try {
      const resultado = await db.exe("security", "selectPersons");
      return sendToCli({ status: 200, data: resultado.rows });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al consultar personas", detalle: err.message });
    }
  }
}

export default new PersonController();