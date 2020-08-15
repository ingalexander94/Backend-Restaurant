import { Document , Schema } from "mongoose";

export default interface UserModel extends Document{
    name: string;
    email: string;
    password: string;
    role: string;
};

export default interface MessageModel extends Document {
    text: string;
    sender: Schema.Types.ObjectId;
    receiver: Schema.Types.ObjectId;
    date: Date;
}

export default interface payloadConfig {
    name: string;
    idDB: string;
}