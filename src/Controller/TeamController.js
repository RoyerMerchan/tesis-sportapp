class TeamController {
  async insertar(req, res) {
    const { na_team, sport_id, institution_id } = req.body;
    if (!na_team || !sport_id || !institution_id)
      return res.status(400).json({ status: 400, msg: "Todos los campos son requeridos" });

    try {
      await db.exe("sport", "insertTeam", [na_team, sport_id, institution_id]);
  return res.status(201).json({ status: 201, msg: "Equipo creado correctamente" });
    } catch (err) {
  return res.status(500).json({ status: 500, msg: "Error al insertar equipo", detalle: err.message });
    }
  }

  async actualizar(req, res) {
    const { team_id, na_team, sport_id, institution_id } = req.body;
    if (!team_id || !na_team || !sport_id || !institution_id)
      return res.status(400).json({ status: 400, msg: "ID y todos los campos son requeridos" });

    try {
     const result =  await db.exe("sport", "updateTeam", [na_team, sport_id, institution_id, team_id]);
       if (result.rowCount === 0) {
        return res.status(404).json({ status: 404, msg: "equipo no encontrado" });
      }
      return res.status(200).json({ status: 200, msg: "Equipo actualizado correctamente" });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al actualizar equipo", detalle: err.message });
    }
  }

  async borrar(req, res) {
    const { team_id } = req.params;
    if (!team_id)
      return res.status(400).json({ status: 400, msg: "ID requerido para eliminar" });

    try {
     const result = await db.exe("sport", "deleteTeam", [team_id]);
       if (result.rowCount === 0) {
        return res.status(404).json({ status: 404, msg: "equipo no encontrado" });
      }
      return res.status(200).json({ status: 200, msg: "Equipo eliminado correctamente" });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al eliminar equipo", detalle: err.message });
    }
  }

  async seleccionar(req, res) {
    try {
      const resultado = await db.exe("sport", "selectTeams");
  return res.status(200).json({ status: 200, data: resultado.rows });
    } catch (err) {
  return res.status(500).json({ status: 500, msg: "Error al consultar equipos", detalle: err.message });
    }
  }

  async seleccionarBySportandInst(req, res) {
    const { sport_id, institution_id } = req.params;
    if (!sport_id && !institution_id)
      return res.status(400).json({ status: 400, msg: "ID de deporte e institución requeridos" });
  
    try {
 const sportID = sport_id === 'null' ? null : parseInt(sport_id);
const institutionID = institution_id === 'null' ? null : parseInt(institution_id);
      const resultado = await db.exe("sport", "selectTeamsBySportAndInst", [sportID, institutionID]);
      return res.status(200).json({ status: 200, data: resultado.rows });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al consultar equipos por deporte e institución", detalle: err.message });
    }
}



}
export default new TeamController();