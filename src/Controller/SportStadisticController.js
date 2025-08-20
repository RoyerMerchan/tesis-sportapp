class SportStatisticController {
  async insertar(req, res) {
    const { statistic_concept_id, team_member_id, comp_id, statistic } = req.body;
    if (!statistic_concept_id || !team_member_id || !comp_id || statistic == null)
      return res.status(400).json({ status: 400, msg: "Todos los campos son requeridos" });

    try {
      await db.exe("sport", "insertSportStatistic", [statistic_concept_id, team_member_id, comp_id, statistic]);
  return res.status(201).json({ status: 201, msg: "Estadística creada correctamente" });
    } catch (err) {
  return res.status(500).json({ status: 500, msg: "Error al insertar estadística", detalle: err.message });
    }
  }

  async actualizar(req, res) {
    const { sport_statistic_id, statistic_concept_id, team_member_id, comp_id, statistic } = req.body;
    if (!sport_statistic_id || !statistic_concept_id || !team_member_id || !comp_id || statistic == null)
      return res.status(400).json({ status: 400, msg: "ID y todos los campos son requeridos" });

    try {
      const result = await db.exe("sport", "updateSportStatistic", [statistic_concept_id, team_member_id, comp_id, statistic, sport_statistic_id]);
       if (result.rowCount === 0) {
        return res.status(404).json({ status: 404, msg: "competencia no encontrada" });
      }
      return res.status(200).json({ status: 200, msg: "Estadística actualizada correctamente" });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al actualizar estadística", detalle: err.message });
    }
  }

  async borrar(req, res) {
    const { sport_statistic_id } = req.params;
    if (!sport_statistic_id)
      return res.status(400).json({ status: 400, msg: "ID requerido para eliminar" });

    try {
     const result = await db.exe("sport", "deleteSportStatistic", [sport_statistic_id]);
       if (result.rowCount === 0) {
        return res.status(404).json({ status: 404, msg: "estadistica no encontrada" });
      }
      return res.status(200).json({ status: 200, msg: "Estadística eliminada correctamente" });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al eliminar estadística", detalle: err.message });
    }
  }

  async seleccionar(req, res) {
    try {
      const resultado = await db.exe("sport", "selectSportStatistics");
  return res.status(200).json({ status: 200, data: resultado.rows });
    } catch (err) {
  return res.status(500).json({ status: 500, msg: "Error al consultar estadísticas", detalle: err.message });
    }
  }

  async seleccionarPorJugador(req, res) {
    const { team_member_id } = req.params;
    if (!team_member_id)
      return res.status(400).json({ status: 400, msg: "ID de miembro de equipo requerido" });

    try {
      const resultado = await db.exe("sport", "selectSportStatisticsByTeamMember", [team_member_id]); 
      return res.status(200).json({ status: 200, data: resultado.rows });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al consultar estadísticas por jugador", detalle: err.message });
    }
  }

}



export default new SportStatisticController();