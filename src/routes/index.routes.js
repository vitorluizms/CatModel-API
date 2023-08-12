import { Router } from "express";
import catsRouter from "./cats.routes.js";
import usersRouter from "./user.routes.js";

const router = Router();

router.use(usersRouter);
router.use(catsRouter);

export default router;
