import {
  getUserCats,
  updateCat,
  validateCat,
} from '../repositories/user.repository.js';
import { userService } from '../services/user.service.js';

export async function signUp(req, res) {
  const { name, email, password, cpf, contact } = req.body;
  await userService.signUp({ name, email, password, cpf, contact });

  res.status(201).send('Usuário criado, faça login!');
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  const { token, name } = await userService.signIn(email, password);

  res.status(200).send({ token, name });
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
    if (validate.rows[0].userId !== userId) return res.status(400).send('Este gatinho não pertence ao seu usuário!');

    await updateCat(isDisponible, id);
    res.status(200).send('Disponibilidade atualizada!');
  } catch (err) {
    res.status(500).send(err.message);
  }
}
