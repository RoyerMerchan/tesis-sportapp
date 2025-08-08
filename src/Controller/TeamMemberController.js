class TeamMemberController {
  async insertar(req, res) {
    const { team_id, person_id, num_team_member } = req.body;
    if (!team_id || !person_id || num_team_member == null)
      return sendToCli({ status: 400, msg: "Todos los campos son requeridos" });

    try {
      await db.exe("sport", "insertTeamMember", [team_id, person_id, num_team_member]);
      return sendToCli({ status: 201, msg: "Miembro de equipo creado correctamente" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al insertar miembro", detalle: err.message });
    }
  }

  async actualizar(req, res) {
    const { team_member_id, team_id, person_id, num_team_member } = req.body;
    if (!team_member_id || !team_id || !person_id || num_team_member == null)
      return sendToCli({ status: 400, msg: "ID y todos los campos son requeridos" });

    try {
     const result = await db.exe("sport", "updateTeamMember", [team_id, person_id, num_team_member, team_member_id]);
       if (result.rowCount === 0) {
        return sendToCli({ status: 404, msg: "miembro no encontrada" });
      }
      return sendToCli({ status: 200, msg: "Miembro actualizado correctamente" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al actualizar miembro", detalle: err.message });
    }
  }

  async borrar(req, res) {
    const { team_member_id } = req.query;
    if (!team_member_id)
      return sendToCli({ status: 400, msg: "ID requerido para eliminar" });

    try {
     const result = await db.exe("sport", "deleteTeamMember", [team_member_id]);
       if (result.rowCount === 0) {
        return sendToCli({ status: 404, msg: "miembro no encontrado" });
      }
      return sendToCli({ status: 200, msg: "Miembro eliminado correctamente" });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al eliminar miembro", detalle: err.message });
    }
  }

  async seleccionar(req, res) {
    try {
      const resultado = await db.exe("sport", "selectTeamMembers");
      return sendToCli({ status: 200, data: resultado.rows });
    } catch (err) {
      return sendToCli({ status: 500, msg: "Error al consultar miembros", detalle: err.message });
    }
  }
}

export default new TeamMemberController();