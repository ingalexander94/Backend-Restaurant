"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renewToken = exports.login = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_model_1 = __importDefault(require("../models/User.model"));
const jwt_1 = require("../helpers/jwt");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        let user = yield User_model_1.default.findOne({ email: data.email });
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: "El cliente ya existe",
            });
        }
        user = new User_model_1.default(data);
        const salt = bcrypt_1.default.genSaltSync();
        user.password = bcrypt_1.default.hashSync(data.password, salt);
        yield user.save();
        const token = yield jwt_1.generateToken(user.id, user.name, user.role);
        res.status(201).json({
            ok: true,
            msg: "Usuario creado.",
            uid: user.id,
            name: user.name,
            role: user.role,
            token,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador.",
        });
    }
});
exports.createUser = createUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let user = yield User_model_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "El cliente no existe",
            });
        }
        const matchPassword = bcrypt_1.default.compareSync(password, user.password);
        if (!matchPassword) {
            return res.status(400).json({
                ok: false,
                msg: "La contraseña es incorrecta",
            });
        }
        const token = yield jwt_1.generateToken(user.id, user.name, user.role);
        res.status(201).json({
            ok: true,
            msg: "Se inicio la sesión.",
            uid: user.id,
            name: user.name,
            role: user.role,
            token,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador.",
        });
    }
});
exports.login = login;
const renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, name, role } = req;
    const token = yield jwt_1.generateToken(uid, name, role);
    res.status(200).json({
        ok: true,
        msg: "Autenticado",
        uid,
        name,
        role,
        token
    });
});
exports.renewToken = renewToken;
