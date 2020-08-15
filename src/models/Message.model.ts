import { Schema, model } from 'mongoose';
import MessageModel from '../interfaces/interfaces';

const chatSchema: Schema = new Schema({
    text: {
        type: String,
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

export default model<MessageModel>("Message", chatSchema);