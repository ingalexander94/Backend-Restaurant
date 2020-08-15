"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Server_class_1 = __importDefault(require("./classes/Server.class"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const database_1 = __importDefault(require("./database"));
const chat_routes_1 = __importDefault(require("./routes/chat.routes"));
const server = Server_class_1.default.instance;
// Conectar base de datos
database_1.default();
server.app.use(cors_1.default({ origin: true, credentials: true }));
server.app.use(express_1.default.json());
server.app.use("/api/auth", auth_routes_1.default);
server.app.use("/api/chat", chat_routes_1.default);
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});
