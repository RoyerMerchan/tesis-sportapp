class TeamController {
  async insertar(req, res) {
    const { na_team, sport_id, institution_id } = req.body;
    if (!na_team || !sport_id || !institution_id)
      return sendToCli({ status: 400, msg: "Todos los campos son requeridos" });

    try {
      await db.exe("sport", "insertTeam", [na_team, sport_id, institution_id]);
      return sendToCli({ status: 201, msg: "Equipo creado correctamente" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al insertar equipo", detalle: err.message });
    }
  }

  async actualizar(req, res) {
    const { team_id, na_team, sport_id, institution_id } = req.body;
    if (!team_id || !na_team || !sport_id || !institution_id)
      return sendToCli({ status: 400, msg: "ID y todos los campos son requeridos" });

    try {
      await db.exe("sport", "updateTeam", [na_team, sport_id, institution_id, team_id]);
      return sendToCli({ status: 200, msg: "Equipo actualizado correctamente" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al actualizar equipo", detalle: err.message });
    }
  }

  async borrar(req, res) {
    const { team_id } = req.body;
    if (!team_id)
      return sendToCli({ status: 400, msg: "ID requerido para eliminar" });

    try {
      await db.exe("sport", "deleteTeam", [team_id]);
      return sendToCli({ status: 200, msg: "Equipo eliminado correctamente" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al eliminar equipo", detalle: err.message });
    }
  }

  async seleccionar(req, res) {
    try {
      const resultado = await db.exe("sport", "selectTeams");
      return sendToCli({ status: 200, data: resultado.rows });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al consultar equipos", detalle: err.message });
    }
  }
}

export default new TeamController();