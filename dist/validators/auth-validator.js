"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateCreateUser = void 0;
const express_validator_1 = require("express-validator");
const stopValidate_1 = require("../middlewares/stopValidate");
const validateCreateUser = () => {
    return [
        express_validator_1.check("name", "El nombre es obligatorio").not().isEmpty(),
        express_validator_1.check("role", "El tipo de usuario valido es obligatorio").custom(isType),
        express_validator_1.check("email", "El email es obligatorio").isEmail(),
        express_validator_1.check("password", "La clave debe tener 6 caracteres").isLength({ min: 6 }),
        stopValidate_1.stopValidate
    ];
};
exports.validateCreateUser = validateCreateUser;
const validateLogin = () => {
    return [
        express_validator_1.check("email", "El email es obligatorio").isEmail(),
        express_validator_1.check("role", "El tipo de usuario valido es obligatorio").custom(isType),
        express_validator_1.check("password", "La clave debe tener 6 caracteres").isLength({ min: 6 }),
        stopValidate_1.stopValidate
    ];
};
exports.validateLogin = validateLogin;
const isType = (value) => {
    if (!value)
        return false;
    if (value !== "Cliente" && value !== "Administrador")
        return false;
    return true;
};
