"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../environments/env");
exports.generateToken = (uid, name, role) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name, role };
        jsonwebtoken_1.default.sign(payload, env_1.SECRET_JWT, {
            expiresIn: "2h"
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject("No se puede generar el token");
            }
            else {
                resolve(token);
            }
        });
    });
};
