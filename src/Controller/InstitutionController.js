class InstitutionController {
  async insertar(req, res) {
    const { name_institutions } = req.body;
    if (!name_institutions) return sendToCli({ status: 400, msg: "Nombre requerido" });

    try {
      await db.exe("security", "insertInstitution", [name_institutions]);
      return sendToCli({ status: 201, msg: "Institución creada correctamente" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al insertar", detalle: err.message });
    }
  }

  async actualizar(req, res) {
    const { id_institutions, name_institutions } = req.body;
    if (!id_institutions || !name_institutions)
      return sendToCli({ status: 400, msg: "ID y nombre requeridos" });

    try {
      await db.exe("security", "updateInstitution", [name_institutions, id_institutions]);
      return sendToCli({ status: 200, msg: "Institución actualizada" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al actualizar", detalle: err.message });
    }
  }

  async borrar(req, res) {
    const { id_institutions } = req.body;
    if (!id_institutions)
      return sendToCli({ status: 400, msg: "ID requerido para eliminar" });

    try {
      await db.exe("security", "deleteInstitution", [id_institutions]);
      return sendToCli({ status: 200, msg: "Institución eliminada" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al eliminar", detalle: err.message });
    }
  }

  async seleccionar(req, res) {
    try {
      const resultado = await db.exe("security", "selectInstitutions");
      return sendToCli({ status: 200, data: resultado.rows });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al consultar", detalle: err.message });
    }
  }
}

export default new InstitutionController();