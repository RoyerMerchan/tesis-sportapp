class TipoPersonaController {
  async insertar(req, res) {
    const { de_type_person } = req.body;
    if (!de_type_person)
      return res.status(400).json({ status: 400, msg: "Descripción requerida" });

    try {
      await db.exe("security", "insertTypePerson", [de_type_person]);
      return res.status(200).json({ status: 201, msg: "Tipo de persona creado exitosamente" });
    } catch (err) {
      return res.status(200).json({ status: 500, msg: "Error al insertar tipo de persona", detalle: err.message });
    }
  }

  async actualizar(req, res) {
    const { id_type_person, de_type_person } = req.body;
    if (!id_type_person || !de_type_person)
      return res.status(400).json({ status: 400, msg: "ID y descripción son requeridos" });

    try {
      const result = await db.exe("security", "updateTypePerson", [de_type_person, id_type_person]);
       if (result.rowCount === 0) {
        return res.status(404).json({ status: 404, msg: "tipo persona no encontrada" });
      }
      return res.status(200).json({ status: 200, msg: "Tipo de persona actualizado" });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al actualizar tipo de persona", detalle: err.message });
    }
  }

  async borrar(req, res) {
    const { id_type_person } = req.params;
    if (!id_type_person)
      return res.status(400).json({ status: 400, msg: "ID requerido" });

    try {
     const result = await db.exe("security", "deleteTypePerson", [id_type_person]);
       if (result.rowCount === 0) {
        return res.status(404).json({ status: 404, msg: "tipo persona no encontrada" });
      }
      return res.status(200).json({ status: 200, msg: "Tipo de persona eliminado" });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al eliminar tipo de persona", detalle: err.message });
    }
  }

  async seleccionar(req, res) {
    try {
      const resultado = await db.exe("security", "selectTypePersons");
      return res.status(200).json({  data: resultado.rows });
    } catch (err) {
      return res.status(500).json({ msg: "Error al seleccionar tipos de persona", detalle: err.message });
    }
  }
}

export default new TipoPersonaController();