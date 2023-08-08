import db from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
  const { name, email, password, cpf, contact } = req.body;
  try {
    const validate = await db.query(
      `SELECT * FROM users WHERE email = $1 OR cpf = $2 OR contact = $3;`,
      [email, cpf, contact]
    );
    if (validate.rowCount > 0)
      return res.status(409).send("Usuário já existente!");

    const hashPass = bcrypt.hashSync(password, 10);
    await db.query(
      `INSERT INTO users (name, email, cpf, password, contact) VALUES ($1, $2, $3, $4, $5);`,
      [name, email, cpf, hashPass, contact]
    );
    res.status(201).send("Usuário criado, faça login!");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  try {
    const user = await db.query(`SELECT * FROM users WHERE email = $1;`, [
      email,
    ]);
    if (
      user.rowCount === 0 ||
      !bcrypt.compareSync(password, user.rows[0].password)
    )
      return res.status(404).send("email/senha inválido");

    const token = uuid();
    await db.query(`DELETE FROM sessions WHERE "userId" = $1;`, [
      user.rows[0].id,
    ]);
    await db.query(`INSERT INTO sessions (token, "userId") VALUES ($1, $2);`, [
      token,
      user.rows[0].id,
    ]);
    res.status(200).send({ token: token, name: user.rows[0].name });
  } catch (err) {
    res.status(500).send(err.message);
  }
}
