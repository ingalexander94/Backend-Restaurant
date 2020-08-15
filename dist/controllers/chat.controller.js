"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessages = exports.loadMessages = exports.sendMessage = void 0;
const Message_model_1 = __importDefault(require("../models/Message.model"));
const Server_class_1 = __importDefault(require("../classes/Server.class"));
exports.sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { id } = req.params;
    try {
        const message = new Message_model_1.default(data);
        yield message.save();
        data._id = message.id;
        const server = Server_class_1.default.instance;
        server.io.in(id).emit("private-message", data);
        res.status(201).json({
            ok: true,
            msg: "Mensaje enviado.",
            uid: message.id,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador.",
        });
    }
});
exports.loadMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sender, receiver } = req.body;
    try {
        const mensajes = yield Message_model_1.default.find({ $or: [
                { sender, receiver },
                { sender: receiver, receiver: sender }
            ] });
        res.status(201).json({
            ok: true,
            msg: "Mensajes cargados.",
            mensajes
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador.",
        });
    }
});
exports.deleteMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = req.body;
    try {
        yield Message_model_1.default.deleteMany({ _id: { $in: data } });
        res.status(201).json({
            ok: true,
            msg: "Conversación eliminada."
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador.",
        });
    }
});
