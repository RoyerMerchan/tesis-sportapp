import bcrypt from 'bcrypt';


const saltRounds = 10;

class UserController {

  async insertar(req, res) {
  const { username, password, institutional_email, id_person, id_profile } = req.body;

  if (!username || !password || !institutional_email || !id_person, id_profile) {
    return res.status(400).json({ status: 400, msg: "Campos requeridos" });
  }

  try {
    // Verificar si el usuario ya existe
    const existente = await db.exe("security", "getUserByUsername", [username]);
    if (existente.rows.length > 0) {
      return res.status(409).json({ status: 409, msg: "Usuario ya existe" });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insertar nuevo usuario usando procedimiento personalizado
    const resultado = await db.exe("security", "insertUser", [
      username,
      hashedPassword,
      institutional_email,
      id_person,
      id_profile
    ]);

  return res.status(201).json({ status: 201, msg: "Usuario insertado correctamente", resultado });
  } catch (err) {
    return res.status(500).json({ status: 500, msg: "Error al insertar..." });

  }
}



 async actualizar(req, res) {
  const { id, username, password } = req.body;

  if (!id || (!username && !password)) {
    return res.status(400).json({ status: 400, msg: "ID y al menos un campo a modificar son requeridos" });
  }

  try {
    let result;

    if (username && password) {
      const hashed = await bcrypt.hash(password, saltRounds);
      result = await db.exe("security", "updateUP", [username, hashed, id]);
    } else if (username) {
      result = await db.exe("security", "updateU", [username, id]);
    } else {
      const hashed = await bcrypt.hash(password, saltRounds);
      result = await db.exe("security", "updateP", [hashed, id]);
    }

    if (result.rowCount === 0) {
      return res.status(404).json({ status: 404, msg: "Usuario no encontrado" });
    }

  return res.status(200).json({ status: 200, msg: "Usuario actualizado correctamente" });
  } catch (err) {
    return res.status(500).json({ status: 500, msg: "Error al actualizar usuario", detalle: err.message });
  }
}

async borrar(req, res) {
  const { id } = req.params;
  console.log(id);
  
  if (!id) return res.status(400).json({ status: 400, msg: "ID requerido" });

  try {
    const resultado = await db.exe("security", "deleteUser", [id]);
    return res.status(200).json({ status: 200, msg: "Usuario eliminado", resultado });
  } catch (err) {
    return res.status(500).json({ status: 500, msg: "Error al eliminar", detalle: err.message });
  }
}


   async seleccionar(req, res) {
  const { id } = req.body;
  if (!id) return res.status(400).json({ status: 400, msg: "ID requerido" });

  try {
    const resultado = await db.exe("security", "selectUserById", [id]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ status: 404, msg: "Usuario no encontrado" });
    }

  return res.status(200).json({ status: 200, data: resultado.rows[0] });
  } catch (err) {
    return res.status(500).json({ status: 500, msg: "Error al seleccionar", detalle: err.message });
  }
}

    async seleccionarTodos(req, res) {
    try {
      const resultado = await db.exe("security", "selectUsers");
      return res.status(200).json({ status: 200, data: resultado.rows });
    } catch (err) {
      return res.status(500).json({ status: 500, msg: "Error al seleccionar usuarios", detalle: err.message });
    }
}
    async insertarConPersona(req, res) {
  const {
    na_person,
    ln_person,
    type_person_id,
    username,
    password,
    institutional_email,
    id_profile
  } = req.body;

  // Validación básica
  if (!na_person || !ln_person || !type_person_id ||
      !username || !password || !institutional_email || !id_profile) {
    return res.status(400).json({ status: 400, msg: "Todos los campos son requeridos" });
  }

  try {
    await db.runTransaction(async (client) => {
      const personResult = await client.query(security.getSentence("security", "insertPerson"), [type_person_id, na_person, ln_person,]);
      if( !personResult.rows || personResult.rows.length === 0) {
        throw new Error("Error al insertar persona");
      }
      const personId = personResult.rows[0].person_id;

      const userResult = await client.query(security.getSentence("security", "insertUser"), [
        username,
        await bcrypt.hash(password, saltRounds),
        institutional_email,
        personId,
        id_profile
      ])
      if (!userResult.rows || userResult.rows.length === 0) {
        throw new Error("Error al insertar usuario");
      }
    })

    // 4️⃣ Respuesta
    return res.status(201).json({
      status: 201,
      msg: "Usuario y persona creados correctamente",
    });

  } catch (err) {
    console.error("Error en insertarConPersona:", err);
  return res.status(500).json({ status: 500, msg: "Error al crear usuario/persona", detalle: err.message });
  }
}
  async obtenerPorPerfil(req, res) {
  const { id_perfil } = req.params;

  try {
    const result = await db.exe("security", "userProfile", [id_perfil]);
  return res.status(200).json({ status: 200, data: result.rows });
  } catch (err) {
  return res.status(500).json({ status: 500, msg: "Error al filtrar usuarios", detalle: err.message });
  }
}
}





export default new UserController();

