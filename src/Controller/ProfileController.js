class ProfileController {
  async insertar(req, res) {
    const { profile_de } = req.body;
    if (!profile_de)
      return res.status(400).json({ status: 400, msg: "La descripción del perfil es requerida" });

    try {
      await db.exe("security", "insertProfile", [profile_de]);
  return res.status(201).json({ status: 201, msg: "Perfil creado correctamente" });
    } catch (err) {
  return res.status(500).json({ status: 500, msg: "Error al insertar perfil", detalle: err.message });
    }
  }

  async actualizar(req, res) {
    const { id_profile, profile_de } = req.body;
    if (!id_profile || !profile_de)
      return res.status(400).json({ status: 400, msg: "ID y nueva descripción son requeridos" });

    try {
     const result = await db.exe("security", "updateProfile", [profile_de, id_profile]);
       if (result.rowCount === 0) {
        return res.status(404).json({ status: 404, msg: "perfil no encontrado" });
      }
      return res.status(200).json({ status: 200, msg: "Perfil actualizado correctamente" });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al actualizar perfil", detalle: err.message });
    }
  }

  async borrar(req, res) {
    const { id_profile } = req.params;
    if (!id_profile)
      return res.status(400).json({ status: 400, msg: "ID requerido para eliminar perfil" });

    try {
     const result = await db.exe("security", "deleteProfile", [id_profile]);
       if (result.rowCount === 0) {
        return res.status(404).json({ status: 404, msg: "perfil no encontrada" });
      }
      return res.status(200).json({ status: 200, msg: "Perfil eliminado correctamente" });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al eliminar perfil", detalle: err.message });
    }
  }

  async seleccionar(req, res) {
    try {
      const resultado = await db.exe("security", "selectProfiles");
      return res.status(200).json({  data: resultado.rows });
    } catch (err) {
      return res.status(500).json({ msg: "Error al seleccionar perfiles", detalle: err.message });
    }
  }
}

export default new ProfileController();