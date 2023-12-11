import { catsService } from '../services/cats.service.js';
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
  const userCats = await catsService.getCatsByUser(userId);

  res.status(200).send(userCats.rows);
}

export async function toggleDisponible(req, res) {
  const { id } = req.params;
  const { userId } = res.locals.user;
  const { isDisponible } = req.body;

  await catsService.toggleDisponible(id, userId, isDisponible);
  res.status(200).send('Disponibilidade atualizada!');
}
