import socketIO from 'socket.io';
import { Socket } from 'socket.io';
import ClientList from '../classes/ClientList.class';
import Client from '../classes/Client.class';
import payloadConfig from '../interfaces/interfaces';

export const clientsOnline = new ClientList();

export const connected = (client: Socket, io: socketIO.Server) => {
    const newClient: Client = new Client(client.id);
    clientsOnline.addUser(newClient);
    io.emit("users-online", clientsOnline.getList());
    io.emit("admin-online", clientsOnline.getAdmin());
}

export const disconnect = (client: Socket, io: socketIO.Server) => {
    client.on("disconnect", () => {
        console.log("-----Desconectando cliente-----");
        clientsOnline.deleteClient(client.id);
        io.emit("users-online", clientsOnline.getList());
        io.emit("admin-online", clientsOnline.getAdmin());
    });
}  

export const configUser = (client: Socket, io: socketIO.Server) => {
    client.on("config-client", (payload: payloadConfig, callback: Function)=> {
        clientsOnline.updateUser(client.id, payload.name, payload.idDB);
        io.emit("users-online", clientsOnline.getList());
        io.emit("admin-online", clientsOnline.getAdmin());
        callback({
            ok: true,
            message: `Usuario ${payload.name} Configurado`
        });
    });
}

export const onMessage = (client: Socket, io: socketIO.Server) => {
    client.on("message", (payload: string)=> {
        console.log("Mensaje recibido", payload);
        io.emit("new-message", payload);
    });
}

export const getUsers = (client: Socket, io: socketIO.Server) => {
    client.on("get-users", () => {
        io.to(client.id).emit("users-online", clientsOnline.getList());
    })
}

export const getAdmin = (client: Socket, io: socketIO.Server) => {
    client.on("get-admin", () => {
        io.to(client.id).emit("admin-online", clientsOnline.getAdmin());
    })
}

