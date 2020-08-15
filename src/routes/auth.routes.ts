/*
    Rutas: Usuario / auth
    host/api/auth
*/

import { Router, Request, Response } from 'express';
const authRouter = Router();

import { createUser, renewToken, login } from '../controllers/auth.controller';
import { validateCreateUser, validateLogin } from '../validators/auth-validator';
import { validateToken } from '../middlewares/tokenValidate';

authRouter.post("/",validateLogin() ,login);

authRouter.post("/new", validateCreateUser(), createUser);

authRouter.get("/renew-token", validateToken ,renewToken);

export default authRouter;