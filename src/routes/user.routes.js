import { Router } from "express";
import {
    getCatByUser,
    signIn,
    signUp,
} from "../controllers/user.controller.js";
import validateAuth from "../middlewares/validateAuth.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { signInSchema, signUpSchema } from "../schemas/main.schemas.js";

const usersRouter = Router();

usersRouter.post("/signup", validateSchema(signUpSchema), signUp);
usersRouter.post("/signin", validateSchema(signInSchema), signIn);
usersRouter.get("/cats/me", validateAuth, getCatByUser);

export default usersRouter;
