class ProfileController {
  async insertar(req, res) {
    const { profile_de } = req.body;
    if (!profile_de)
      return sendToCli({ status: 400, msg: "La descripción del perfil es requerida" });

    try {
      await db.exe("security", "insertProfile", [profile_de]);
      return sendToCli({ status: 201, msg: "Perfil creado correctamente" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al insertar perfil", detalle: err.message });
    }
  }

  async actualizar(req, res) {
    const { id_profile, profile_de } = req.body;
    if (!id_profile || !profile_de)
      return sendToCli({ status: 400, msg: "ID y nueva descripción son requeridos" });

    try {
     const result = await db.exe("security", "updateProfile", [profile_de, id_profile]);
       if (result.rowCount === 0) {
        return sendToCli({ status: 404, msg: "perfil no encontrado" });
      }
      return sendToCli({ status: 200, msg: "Perfil actualizado correctamente" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al actualizar perfil", detalle: err.message });
    }
  }

  async borrar(req, res) {
    const { id_profile } = req.query;
    if (!id_profile)
      return sendToCli({ status: 400, msg: "ID requerido para eliminar perfil" });

    try {
     const result = await db.exe("security", "deleteProfile", [id_profile]);
       if (result.rowCount === 0) {
        return sendToCli({ status: 404, msg: "perfil no encontrada" });
      }
      return sendToCli({ status: 200, msg: "Perfil eliminado correctamente" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al eliminar perfil", detalle: err.message });
    }
  }

  async seleccionar(req, res) {
    try {
      const resultado = await db.exe("security", "selectProfiles");
      return sendToCli({ status: 200, data: resultado.rows });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al consultar perfiles", detalle: err.message });
    }
  }
}

export default new ProfileController();