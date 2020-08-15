"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopValidate = void 0;
const express_validator_1 = require("express-validator");
exports.stopValidate = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }
    next();
};
