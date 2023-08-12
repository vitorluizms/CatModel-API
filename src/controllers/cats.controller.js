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
    // INSERT INTO cats (name, "userId", age, color, race, description, size, "mainPic")
    // VALUES ('gato de botas', 1, 12, 'preto', 1, 'gato que usa botas', 'Médio', 'dkjasdkjasd');
  } catch (err) {
    res.status.send(err.message);
  }
};

export const getCatById = async (req, res) => {
  const { id } = req.params;
  try {
    const cat = await db.query(`SELECT cats.*, races.name AS "raceName",
	CASE 
    WHEN COUNT(pics) > 0 
		THEN JSON_AGG(pics.url ORDER BY pics.id) 
		ELSE '[]'::json
		END AS pics
	FROM cats
	LEFT JOIN races ON races.id = cats.race
	LEFT JOIN pics ON pics."catId" = cats.id
	WHERE cats.id = $1
	GROUP BY cats.id, races.name;
    `, [id]);
    delete cat.rows[0].race;
    res.status(200).send(cat.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
