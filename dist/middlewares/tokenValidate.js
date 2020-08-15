"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../environments/env");
exports.validateToken = (req, res, next) => {
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No tiene un token"
        });
    }
    try {
        const { uid, name, role } = jsonwebtoken_1.default.verify(token, env_1.SECRET_JWT);
        req.uid = uid;
        req.name = name;
        req.role = role;
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: "El token es invalido"
        });
    }
    next();
};
