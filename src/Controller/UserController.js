import bcrypt from 'bcrypt';


const saltRounds = 10;

class UserController {

  async insert(req, res) {
  const { username, password, institutional_email, id_person } = req.body;

  if (!username || !password || !institutional_email || !id_person) {
    return sendToCli({ status: 400, msg: "Campos requeridos" });
  }

  try {
    // Verificar si el usuario ya existe
    const existente = await db.exe("security", "getUserByUsername", [username]);
    if (existente.rows.length > 0) {
      return sendToCli({ status: 409, msg: "Usuario ya existe" });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insertar nuevo usuario usando procedimiento personalizado
    const resultado = await db.exe("security", "insertUser", [
      username,
      hashedPassword,
      institutional_email,
      id_person
    ]);

    return sendToCli({ status: 201, msg: "Usuario insertado correctamente", resultado });
  } catch (err) {
    return sendToCli({ status: 500, msg: "Error al insertar", detalle: err.message });
  }
}



 async update(req, res) {
  const { id, username, password } = req.body;
  if (!id || (!username && !password)) {
    return sendToCli({ status: 400, msg: "Datos insuficientes" });
  }

  try {
    const campos = [];
    const valores = [];
    let i = 1;

    if (username) {
      campos.push(`username = $${i++}`);
      valores.push(username);
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      campos.push(`password = $${i++}`);
      valores.push(hashedPassword);
    }

    valores.push(id); // último valor: ID para el WHERE
    const query = `UPDATE users SET ${campos.join(', ')} WHERE id = $${i}`;

    // Ejecutar con db.exe
    const resultado = await db.exe("security", "customQuery", [query, valores]);

    return sendToCli({ status: 200, msg: "Usuario actualizado", resultado });
  } catch (err) {
    return sendToCli({ status: 500, msg: "Error al actualizar", detalle: err.message });
  }
}

async delete(req, res) {
  const { id } = req.body;
  if (!id) return sendToCli({ status: 400, msg: "ID requerido" });

  try {
    const resultado = await db.exe("security", "deleteUser", [id]);
    return sendToCli({ status: 200, msg: "Usuario eliminado", resultado });
  } catch (err) {
    return sendToCli({ status: 500, msg: "Error al eliminar", detalle: err.message });
  }
}


   async select(req, res) {
  const { id } = req.body;
  if (!id) return sendToCli({ status: 400, msg: "ID requerido" });

  try {
    const resultado = await db.exe("security", "selectUserById", [id]);

    if (resultado.rows.length === 0) {
      return sendToCli({ status: 404, msg: "Usuario no encontrado" });
    }

    return sendToCli({ status: 200, data: resultado.rows[0] });
  } catch (err) {
    return sendToCli({ status: 500, msg: "Error al seleccionar", detalle: err.message });
  }
}
}

export default new UserController();

