import { check } from 'express-validator';
import { stopValidate } from '../middlewares/stopValidate';

const validateCreateUser = () => {
    return [
        check("name","El nombre es obligatorio").not().isEmpty(),
        check("role","El tipo de usuario valido es obligatorio").custom(isType),
        check("email","El email es obligatorio").isEmail(),
        check("password","La clave debe tener 6 caracteres").isLength({min: 6}),
        stopValidate
    ];
}

const validateLogin = () => {
    return [
        check("email","El email es obligatorio").isEmail(),
        check("role","El tipo de usuario valido es obligatorio").custom(isType),
        check("password","La clave debe tener 6 caracteres").isLength({min: 6}),
        stopValidate
    ];
}

const isType = (value: string) => {
    if(!value) return false;
    if(value !== "Cliente" && value !== "Administrador") return false;
    return true;
}

export {
    validateCreateUser, 
    validateLogin
}