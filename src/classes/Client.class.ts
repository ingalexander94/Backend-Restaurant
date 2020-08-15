export default class Client {

    public name: string;
    public room: string;
    public idDB: string;

    constructor(public id: string){
        this.id = id;
        this.name = "";
        this.room = "";
        this.idDB = "";
    }

}