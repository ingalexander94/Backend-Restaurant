"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClientList {
    constructor() {
        this.list = [];
    }
    addUser(newClient) {
        this.list.push(newClient);
        console.log("Cliente agregado a la lista");
        return newClient;
    }
    updateUser(id, name, idDB) {
        for (let client of this.list) {
            if (client.id === id) {
                client.name = name;
                client.idDB = idDB;
                break;
            }
        }
        console.log("----Actualizando----");
        console.log(this.list);
    }
    getList() {
        return this.list.filter(client => client.name !== "Administrador");
    }
    getAdmin() {
        return this.list.find(client => client.name === "Administrador");
    }
    getClientById(id) {
        return this.list.find(client => client.id === id);
    }
    getClientByRoom(room) {
        return this.list.filter(client => client.room === room);
    }
    deleteClient(id) {
        const tempClient = this.getClientById(id);
        this.list = this.list.filter(client => client.id !== id);
        return tempClient;
    }
}
exports.default = ClientList;
