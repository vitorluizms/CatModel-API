import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../database/database.connection.js";

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

export async function getCatByUser(req, res) {
  const { userId } = res.locals.user;
  try {
    const userCats = await db.query(
      `
    SELECT cats.*, races.name AS race, users.name AS userName FROM cats
      JOIN races ON races.id = cats.race
      JOIN users ON users.id = $1
      WHERE cats."userId" = $1
      GROUP BY cats.id, races.name, users.name
      ORDER BY cats.id
    `,
      [userId]
    );
    res.status(200).send(userCats.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function toggleDisponible(req, res) {
  const { id } = req.params;
  const { userId } = res.locals.user;
  const { isDisponible } = req.body;
  try {
    const validate = await db.query(`SELECT * FROM cats WHERE id = $1`, [id]);
    if (validate.rows[0].userId !== userId)
      return res.status(401).send("Este gatinho não pertence a sua conta!");

    await db.query(`UPDATE cats SET "isDisponible" = $1 WHERE id = $2`, [
      isDisponible,
      id,
    ]);
    res.status(200).send("Disponibilidade atualizada!");
  } catch (err) {
    res.status(500).send(err.message);
  }
}
