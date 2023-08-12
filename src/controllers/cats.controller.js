import db from "../database/database.connection.js";

export const getCats = async (req, res) => {
  try {
    const cats =
      await db.query(`SELECT cats.id, cats.name, cats."mainPic", races.name AS race FROM cats
                    JOIN races ON cats.race = races.id
                    WHERE cats."isDisponible" = true
                    GROUP BY cats.id, races.name
                    ORDER BY cats.id;`);
    res.status(200).send(cats.rows);
  } catch (err) {
    res.status.send(err.message);
  }
};

export const getCatById = async (req, res) => {
  const { id } = req.params;
  try {
    const cat = await db.query(
      `SELECT cats.*, users.name AS user, races.name AS "raceName", 
      pics.url AS pics
	FROM cats
	LEFT JOIN races ON races.id = cats.race
  LEFT JOIN users ON users.id = cats."userId"
	LEFT JOIN pics ON pics."catId" = cats.id
	WHERE cats.id = $1
	GROUP BY cats.id, races.name, users.name, pics.url;
    `,
      [id]
    );
    delete cat.rows[0].race;
    delete cat.rows[0].userId;

    res.status(200).send(cat.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const createCat = async (req, res) => {
  const { userId } = res.locals.user;

  const { name, age, color, race, description, size, mainPic, pics } = req.body;
  try {
    const promise = await db.query(
      `INSERT INTO cats (name,"userId", age, color, race, description, size, "mainPic") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;
    `,
      [name, userId, age, color, race, description, size, mainPic]
    );
    if (pics.length === 0)
      return res.status(201).send("Cadastro feito com sucesso!");

    await db.query(`INSERT INTO pics (url, "catId") VALUES ($1, $2);`, [
      pics,
      promise.rows[0].id,
    ]);
    res.status(201).send("Cadastro com sucesso!");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
