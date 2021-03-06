"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const env_1 = require("../environments/env");
const socket = __importStar(require("../sockets/socket"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.port = env_1.PORT;
        this.httpServer = new http_1.default.Server(this.app);
        this.io = socket_io_1.default(this.httpServer);
        this.listenSockets();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    listenSockets() {
        console.log("Escuchando conexiones sockets");
        this.io.on("connection", (client) => {
            console.log("Cliente conectado");
            // Connectar Usuario
            socket.connected(client, this.io);
            // Configurar Usuario
            socket.configUser(client, this.io);
            // Obtener usuarios activos
            socket.getUsers(client, this.io);
            // Obtener administrador
            socket.getAdmin(client, this.io);
            // Mensajes
            socket.onMessage(client, this.io);
            // Desconectar
            socket.disconnect(client, this.io);
        });
    }
    start(callback) {
        this.httpServer.listen(this.port, callback);
    }
}
exports.default = Server;
