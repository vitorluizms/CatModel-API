import { Router } from "express";
import {
    createCat,
    getCatById,
    getCats,
} from "../controllers/cats.controller.js";
import validateAuth from "../middlewares/validateAuth.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { catSchema } from "../schemas/main.schemas.js";

const catsRouter = Router();

catsRouter.get("/cats", getCats);
catsRouter.get("/cat/:id", getCatById);
catsRouter.post("/cat", validateAuth, validateSchema(catSchema), createCat);

export default catsRouter;
