import {
  getAllCats,
  getById,
  insertCat,
} from "../repositories/cats.repository.js";

export const getCats = async (req, res) => {
  try {
    const cats = await getAllCats();
    res.status(200).send(cats.rows);
  } catch (err) {
    res.status.send(err.message);
  }
};

export const getCatById = async (req, res) => {
  const { id } = req.params;
  try {
    const cat = await getById(id);
    delete cat.rows[0].race;
    delete cat.rows[0].userId;

    res.status(200).send(cat.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const createCat = async (req, res) => {
  const { userId } = res.locals.user;

  const { name, age, color, race, description, size, mainPic } = req.body;
  try {
    const promise = await insertCat(
      name, userId, age, color, race, description, size, mainPic
    );
    res.status(201).send("Cadastro feito com sucesso!");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
