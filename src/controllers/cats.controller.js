import { catsService } from '../services/cats.service.js';

export const getCats = async (req, res) => {
  const cats = await catsService.getCats();
  res.status(200).send(cats.rows);
};

export const getCatById = async (req, res) => {
  const { id } = req.params;
  const cat = await catsService.getCatById(id);

  res.status(200).send(cat.rows[0]);
};

export const createCat = async (req, res) => {
  const { userId } = res.locals.user;
  const { name, age, color, race, description, size, mainPic } = req.body;

  await catsService.createCat({ name, userId, age, color, race, description, size, mainPic });
  res.status(201).send('Cadastro feito com sucesso!');
};
