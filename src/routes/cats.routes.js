import { Router } from "express";
import { getCatById, getCats } from "../controllers/cats.controller.js";

const catsRouter = Router();

catsRouter.get("/cats", getCats);
catsRouter.get("/cat/:id", getCatById);

export default catsRouter;