class TipoPersonaController {
  async insertar(req, res) {
    const { de_type_person } = req.body;
    if (!de_type_person)
      return sendToCli({ status: 400, msg: "Descripción requerida" });

    try {
      await db.exe("security", "insertTypePerson", [de_type_person]);
      return sendToCli({ status: 201, msg: "Tipo de persona creado exitosamente" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al insertar tipo de persona", detalle: err.message });
    }
  }

  async actualizar(req, res) {
    const { id_type_person, de_type_person } = req.body;
    if (!id_type_person || !de_type_person)
      return sendToCli({ status: 400, msg: "ID y descripción son requeridos" });

    try {
      const result = await db.exe("security", "updateTypePerson", [de_type_person, id_type_person]);
       if (result.rowCount === 0) {
        return sendToCli({ status: 404, msg: "tipo persona no encontrada" });
      }
      return sendToCli({ status: 200, msg: "Tipo de persona actualizado" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al actualizar tipo de persona", detalle: err.message });
    }
  }

  async borrar(req, res) {
    const { id_type_person } = req.query;
    if (!id_type_person)
      return sendToCli({ status: 400, msg: "ID requerido" });

    try {
     const result = await db.exe("security", "deleteTypePerson", [id_type_person]);
       if (result.rowCount === 0) {
        return sendToCli({ status: 404, msg: "tipo persona no encontrada" });
      }
      return sendToCli({ status: 200, msg: "Tipo de persona eliminado" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al eliminar tipo de persona", detalle: err.message });
    }
  }

  async seleccionar(req, res) {
    try {
      const resultado = await db.exe("security", "selectTypePersons");
      return sendToCli({ status: 200, data: resultado.rows });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al seleccionar tipos de persona", detalle: err.message });
    }
  }
}

export default new TipoPersonaController();