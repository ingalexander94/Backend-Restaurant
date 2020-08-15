import { userTypes } from '../../src/interfaces/interfaces';
declare global{
    namespace Express {
        interface Request {
            uid: string,
            name: string, 
            role: userTypes
        }
    }
}