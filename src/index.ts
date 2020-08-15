import express from 'express';
import cors from 'cors';
import Server from './classes/Server.class';
import authRouter from './routes/auth.routes';
import dbConnection from './database';
import chatRouter from './routes/chat.routes';
const server = Server.instance;

// Conectar base de datos
dbConnection();

server.app.use(cors({origin: true, credentials: true}));
server.app.use(express.json());
server.app.use("/api/auth", authRouter);
server.app.use("/api/chat", chatRouter);

server.start(()=> {
    console.log(`Servidor corriendo en el puerto ${server.port}`)
}); 