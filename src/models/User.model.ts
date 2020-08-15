import { Schema, model } from "mongoose";
import UserModel from '../interfaces/interfaces';

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required : true
    },
    role: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required : true,
        unique: true
    },
    password: {
        type: String,
        required : true
    }
});

export default model<UserModel>("User", UserSchema);