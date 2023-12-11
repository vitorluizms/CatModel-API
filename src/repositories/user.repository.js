import db from '../database/database.connection.js';

export const validateData = (email, cpf, contact) => {
  const promise = db.query(`SELECT * FROM users WHERE email = $1 OR cpf = $2 OR contact = $3;`, [email, cpf, contact]);

  return promise;
};

export const createUser = userBody => {
  const promise = db.query(`INSERT INTO users (name, email, cpf, password, contact) VALUES ($1, $2, $3, $4, $5);`, [
    userBody.name,
    userBody.email,
    userBody.cpf,
    userBody.hashPass,
    userBody.contact,
  ]);

  return promise;
};

export const validateEmail = email => {
  const promise = db.query(`SELECT * FROM users WHERE email = $1;`, [email]);

  return promise;
};

export const insertSession = (id, token) => {
  db.query(`DELETE FROM sessions WHERE "userId" = $1;`, [id]);

  const promise = db.query(`INSERT INTO sessions (token, "userId") VALUES ($1, $2);`, [token, id]);

  return promise;
};

export const getUserCats = userId => {
  const promise = db.query(
    `
      SELECT cats.*, races.name AS race, users.name AS userName FROM cats
        JOIN races ON races.id = cats.race
        JOIN users ON users.id = $1
        WHERE cats."userId" = $1
        GROUP BY cats.id, races.name, users.name
        ORDER BY cats.id
      `,
    [userId],
  );

  return promise;
};

export const validateCat = id => {
  const promise = db.query(`SELECT * FROM cats WHERE id = $1`, [id]);

  return promise;
};

export const updateCat = (isDisponible, id) => {
  const promise = db.query(`UPDATE cats SET "isDisponible" = $1 WHERE id = $2`, [isDisponible, id]);

  return promise;
};
