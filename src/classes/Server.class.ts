import express from "express";
import socketIO from "socket.io";
import http from "http";
import { PORT } from "../environments/env";
import * as socket from "../sockets/socket";

export default class Server {
  private static _instance: Server;

  public httpServer: http.Server;
  public io: socketIO.Server;
  public app: express.Application;
  public port: number;

  constructor() {
    this.app = express();
    this.port = PORT;
    this.httpServer = new http.Server(this.app);
    this.io = socketIO(this.httpServer);
    this.listenSockets();
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  public listenSockets() {
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

  start(callback: () => void) {
    this.httpServer.listen(this.port, callback);
  }
}
