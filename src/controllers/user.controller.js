import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import {
  createUser,
  getUserCats,
  insertSession,
  updateCat,
  validateCat,
  validateData,
  validateEmail,
} from "../repositories/user.repository.js";

export async function signUp(req, res) {
  const { name, email, password, cpf, contact } = req.body;
  try {
    const validate = await validateData(email, cpf, contact);
    if (validate.rowCount > 0)
      return res.status(409).send("Usuário já existente!");

    const hashPass = bcrypt.hashSync(password, 10);
    await createUser(name, email, cpf, hashPass, contact);
    res.status(201).send("Usuário criado, faça login!");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  try {
    const user = await validateEmail(email);
    if (
      user.rowCount === 0 ||
      !bcrypt.compareSync(password, user.rows[0].password)
    )
      return res.status(404).send("email/senha inválido");

    const token = uuid();
    await insertSession(user.rows[0].id, token);
    res.status(200).send({ token: token, name: user.rows[0].name });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getCatByUser(req, res) {
  const { userId } = res.locals.user;
  try {
    const userCats = await getUserCats(userId);
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
    const validate = await validateCat(id);
    if (validate.rows[0].userId !== userId)
      return res.status(400).send("Este gatinho não pertence ao seu usuário!");

    await updateCat(isDisponible, id);
    res.status(200).send("Disponibilidade atualizada!");
  } catch (err) {
    res.status(500).send(err.message);
  }
}
