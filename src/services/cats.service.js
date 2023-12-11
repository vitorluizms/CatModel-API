import { conflictError } from '../errors/conflictError.js';
import { getAllCats, getById, insertCat } from '../repositories/cats.repository.js';
import { getUserCats, updateCat, validateCat } from '../repositories/user.repository.js';

async function getCats() {
  const cats = await getAllCats();
  return cats;
}

async function getCatById(id) {
  const cat = await getById(id);
  delete cat.rows[0].race;
  delete cat.rows[0].userId;

  return cat;
}

async function createCat(body) {
  await insertCat(body);
}

async function getCatsByUser(userId) {
  const userCats = await getUserCats(userId);

  return userCats;
}

async function toggleDisponible(id, userId, isDisponible) {
  const validate = await validateCat(id);
  if (validate.rows[0].userId !== userId) throw conflictError('Este gatinho não pertence ao seu usuário!');

  await validateCat(id, userId);
  await updateCat(isDisponible, id);
}

export const catsService = { getCats, getCatById, createCat, getCatsByUser, toggleDisponible, toggleDisponible };
