import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const stopValidate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }
    next();
}