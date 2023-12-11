import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { createUser, insertSession, validateData, validateEmail } from '../repositories/user.repository.js';
import { conflictError } from '../errors/conflictError.js';
import { notFoundError } from '../errors/notFoundError.js';

async function validateUser(email, cpf, contact) {
  const validate = await validateData(email, cpf, contact);
  if (validate.rowCount > 0) throw conflictError('Usuário já existente!');
}

async function signUp({ name, email, password, cpf, contact }) {
  await validateUser(email, cpf, contact);

  const hashPass = bcrypt.hashSync(password, 10);
  await createUser({ name, email, cpf, hashPass, contact });
}

async function validateUserEmail(email, password) {
  const user = await validateEmail(email);
  if (user.rowCount === 0 || !bcrypt.compareSync(password, user.rows[0].password))
    throw notFoundError('email/senha inválido');

  return user;
}

async function signIn(email, password) {
  const user = await validateUserEmail(email, password);

  const token = uuid();
  await insertSession(user.rows[0].id, token);
  return { token, name: user.rows[0].name };
}
export const userService = { signUp, signIn };
