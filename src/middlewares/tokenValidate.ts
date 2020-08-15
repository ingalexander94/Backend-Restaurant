import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_JWT } from '../environments/env';

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("x-token");
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: "No tiene un token"
        })
    }
    try {     
        const {uid, name, role}: any = jwt.verify(token, SECRET_JWT);
        req.uid = uid;
        req.name = name;
        req.role = role;
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: "El token es invalido"
        });
    }
    
    next();

}