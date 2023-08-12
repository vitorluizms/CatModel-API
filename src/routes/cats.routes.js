import { Router } from "express";
import {
    createCat,
    getCatById,
    getCats,
} from "../controllers/cats.controller.js";
import validateAuth from "../middlewares/validateAuth.js";

const catsRouter = Router();

catsRouter.get("/cats", getCats);
catsRouter.get("/cat/:id", getCatById);
catsRouter.post("/cat", validateAuth, createCat);

export default catsRouter;
