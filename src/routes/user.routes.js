import { Router } from "express";
import {
    getCatByUser,
    signIn,
    signUp,
    toggleDisponible,
} from "../controllers/user.controller.js";
import validateAuth from "../middlewares/validateAuth.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import {
    disponibleSchema,
    signInSchema,
    signUpSchema,
} from "../schemas/main.schemas.js";

const usersRouter = Router();

usersRouter.post("/signup", validateSchema(signUpSchema), signUp);
usersRouter.post("/signin", validateSchema(signInSchema), signIn);
usersRouter.get("/cats/me", validateAuth, getCatByUser);
usersRouter.patch(
  "/cat/:id",
  validateAuth,
  validateSchema(disponibleSchema),
  toggleDisponible
);

export default usersRouter;
