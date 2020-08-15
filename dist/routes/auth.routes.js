"use strict";
/*
    Rutas: Usuario / auth
    host/api/auth
*/
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRouter = express_1.Router();
const auth_controller_1 = require("../controllers/auth.controller");
const auth_validator_1 = require("../validators/auth-validator");
const tokenValidate_1 = require("../middlewares/tokenValidate");
authRouter.post("/", auth_validator_1.validateLogin(), auth_controller_1.login);
authRouter.post("/new", auth_validator_1.validateCreateUser(), auth_controller_1.createUser);
authRouter.get("/renew-token", tokenValidate_1.validateToken, auth_controller_1.renewToken);
exports.default = authRouter;
