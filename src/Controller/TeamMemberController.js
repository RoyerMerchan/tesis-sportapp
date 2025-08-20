class TeamMemberController {
  async insertar(req, res) {
    const { team_id, person_id, num_team_member } = req.body;
    if (!team_id || !person_id || num_team_member == null)
      return res.status(400).json({ status: 400, msg: "Todos los campos son requeridos" });

    try {
      await db.exe("sport", "insertTeamMember", [team_id, person_id, num_team_member]);
  return res.status(201).json({ status: 201, msg: "Miembro de equipo creado correctamente" });
    } catch (err) {
  return res.status(500).json({ status: 500, msg: "Error al insertar miembro", detalle: err.message });
    }
  }

  async actualizar(req, res) {
    const { team_member_id, team_id, num_team_member } = req.body;
    if (!team_member_id || !team_id || num_team_member == null)
      return res.status(400).json({ status: 400, msg: "ID y todos los campos son requeridos" });

    try {
     const result = await db.exe("sport", "updateTeamMember", [team_id, num_team_member, team_member_id]);
       if (result.rowCount === 0) {
        return res.status(404).json({ status: 404, msg: "miembro no encontrada" });
      }
      return res.status(200).json({ status: 200, msg: "Miembro actualizado correctamente" });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al actualizar miembro", detalle: err.message });
    }
  }

  async borrar(req, res) {
    const { team_member_id } = req.params;
    if (!team_member_id)
      return res.status(400).json({ status: 400, msg: "ID requerido para eliminar" });

    try {
     const result = await db.exe("sport", "deleteTeamMember", [team_member_id]);
       if (result.rowCount === 0) {
        return res.status(404).json({ status: 404, msg: "miembro no encontrado" });
      }
      return res.status(200).json({ status: 200, msg: "Miembro eliminado correctamente" });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al eliminar miembro", detalle: err.message });
    }
  }

  async seleccionar(req, res) {
    try {
      const resultado = await db.exe("sport", "selectTeamMembers");
  return res.status(200).json({ status: 200, data: resultado.rows });
    } catch (err) {
  return res.status(500).json({ status: 500, msg: "Error al consultar miembros", detalle: err.message });
    }
  }

  async seleccionarByTeam(req, res) {
    const { team_id } = req.params;
    if (!team_id)
      return res.status(400).json({ status: 400, msg: "ID de equipo requerido" });

    try {
      const resultado = await db.exe("sport", "selectTeamMembersByTeam", [team_id]);
      return res.status(200).json({ status: 200, data: resultado.rows });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al consultar miembros por equipo", detalle: err.message });
    }
  }


}

export default new TeamMemberController();