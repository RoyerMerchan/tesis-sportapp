class InstitutionController {
  async insertar(req, res) {
    const { name_institutions } = req.body;
  if (!name_institutions) return res.status(400).json({ status: 400, msg: "Nombre requerido" });

    try {
      await db.exe("security", "insertInstitution", [name_institutions]);
  return res.status(201).json({ status: 201, msg: "Institución creada correctamente" });
    } catch (err) {
  return res.status(500).json({ status: 500, msg: "Error al insertar", detalle: err.message });
    }
  }

  async actualizar(req, res) {
    const { id_institutions , name_institutions } = req.body;
    if (!id_institutions || !name_institutions)
      return res.status(400).json({ status: 400, msg: "ID y nombre requeridos" });

    try {
      const result = await db.exe("security", "updateInstitution", [name_institutions, id_institutions]);
       if (result.rowCount === 0) {
        return res.status(404).json({ status: 404, msg: "institucion no encontrada" });
      }
      return res.status(200).json({ status: 200, msg: "Institución actualizada" });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al actualizar", detalle: err.message });
    }
  }

  async borrar(req, res) {
    const { id_institutions } = req.params;
    if (!id_institutions)
      return res.status(400).json({ status: 400, msg: "ID requerido para eliminar" });

    try {
     const result = await db.exe("security", "deleteInstitution", [id_institutions]);
       if (result.rowCount === 0) {
        return res.status(404).json({ status: 404, msg: "institucion no encontrada" });
      }
      return res.status(200).json({ status: 200, msg: "Institución eliminada" });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al eliminar", detalle: err.message });
    }
  }

  async seleccionar(req, res) {
    try {
      const resultado = await db.exe("security", "selectInstitutions");
  return res.status(200).json({ status: 200, data: resultado.rows });
    } catch (err) {
  return res.status(500).json({ status: 500, msg: "Error al consultar", detalle: err.message });
    }
  }
}

export default new InstitutionController();