const db = require('../config/db');

exports.obtenerUsuarios = async () => {
  const [rows] = await db.query('SELECT * FROM usuarios');
  return rows;
};

exports.crearUsuario = async (usuario) => {
  const { nombre, email } = usuario;
  const [result] = await db.query(
    'INSERT INTO usuarios (nombre, email, contrasenna) VALUES (?, ?, ?)',
    [nombre, email, contrasenna]
  );
  return { id: result.insertId, ...usuario };
};
