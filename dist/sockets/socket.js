"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdmin = exports.getUsers = exports.onMessage = exports.configUser = exports.disconnect = exports.connected = exports.clientsOnline = void 0;
const ClientList_class_1 = __importDefault(require("../classes/ClientList.class"));
const Client_class_1 = __importDefault(require("../classes/Client.class"));
exports.clientsOnline = new ClientList_class_1.default();
exports.connected = (client, io) => {
    const newClient = new Client_class_1.default(client.id);
    exports.clientsOnline.addUser(newClient);
    io.emit("users-online", exports.clientsOnline.getList());
    io.emit("admin-online", exports.clientsOnline.getAdmin());
};
exports.disconnect = (client, io) => {
    client.on("disconnect", () => {
        console.log("-----Desconectando cliente-----");
        exports.clientsOnline.deleteClient(client.id);
        io.emit("users-online", exports.clientsOnline.getList());
        io.emit("admin-online", exports.clientsOnline.getAdmin());
    });
};
exports.configUser = (client, io) => {
    client.on("config-client", (payload, callback) => {
        exports.clientsOnline.updateUser(client.id, payload.name, payload.idDB);
        io.emit("users-online", exports.clientsOnline.getList());
        io.emit("admin-online", exports.clientsOnline.getAdmin());
        callback({
            ok: true,
            message: `Usuario ${payload.name} Configurado`
        });
    });
};
exports.onMessage = (client, io) => {
    client.on("message", (payload) => {
        console.log("Mensaje recibido", payload);
        io.emit("new-message", payload);
    });
};
exports.getUsers = (client, io) => {
    client.on("get-users", () => {
        io.to(client.id).emit("users-online", exports.clientsOnline.getList());
    });
};
exports.getAdmin = (client, io) => {
    client.on("get-admin", () => {
        io.to(client.id).emit("admin-online", exports.clientsOnline.getAdmin());
    });
};
