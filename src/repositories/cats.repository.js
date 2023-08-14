import db from "../database/database.connection.js";

export const getAllCats = () => {
  const promise =
    db.query(`SELECT cats.id, cats.name, cats."mainPic", races.name AS race FROM cats
    JOIN races ON cats.race = races.id
    WHERE cats."isDisponible" = true
    GROUP BY cats.id, races.name
    ORDER BY cats.id;`);

  return promise;
};

export const getById = (id) => {
  const promise = db.query(
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

  return promise;
};

export const insertCat = (
  name,
  userId,
  age,
  color,
  race,
  description,
  size,
  mainPic
) => {
  const promise = db.query(
    `INSERT INTO cats (name,"userId", age, color, race, description, size, "mainPic") 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;
      `,
    [name, userId, age, color, race, description, size, mainPic]
  );

  return promise;
};
