import jwt from 'jsonwebtoken';
import { SECRET_JWT } from '../environments/env';

export const generateToken = (uid:string, name:string, role:string) => {
    return new Promise((resolve, reject)=> {
        const payload = {uid, name, role};
        jwt.sign( payload, SECRET_JWT, {
           expiresIn: "2h" 
        }, (error, token) => {
            if(error){
                console.log(error);
                reject("No se puede generar el token");
            }else{
                resolve(token);
            }
        });
    });
}