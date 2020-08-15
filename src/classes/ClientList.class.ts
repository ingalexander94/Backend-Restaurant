import Client from './Client.class';


export default class ClientList {
    
    private list: Client[];

    constructor(){
        this.list = [];
    }

    public addUser(newClient: Client) {
        this.list.push(newClient);
        console.log("Cliente agregado a la lista");
        return newClient;
    }

    public updateUser(id:string, name:string, idDB:string){
        for (let client of this.list) {
            if(client.id === id){
                client.name = name;
                client.idDB = idDB;
                break;
            }
        }
        console.log("----Actualizando----");
        console.log(this.list);
    }

    public getList(){
        return this.list.filter(client => client.name !== "Administrador");
    }

    public getAdmin(){
        return this.list.find(client => client.name === "Administrador");
    }

    public getClientById(id: string){
        return this.list.find(client => client.id === id);
    }

    public getClientByRoom(room: string){
        return this.list.filter(client => client.room === room);
    }

    public deleteClient(id: string){
        const tempClient = this.getClientById(id);
        this.list = this.list.filter(client => client.id !== id);
        return tempClient;
    }

}