import { Router } from 'express';
import { sendMessage, loadMessages, deleteMessages } from '../controllers/chat.controller';
import { validateToken } from '../middlewares/tokenValidate';

const chatRouter = Router();

chatRouter.post("/:id",validateToken, sendMessage);

chatRouter.post("/mensajes/cargar", validateToken, loadMessages);

chatRouter.delete("/mensajes/borrar", validateToken, deleteMessages);

export default chatRouter;