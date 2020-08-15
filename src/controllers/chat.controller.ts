import {Request, Response} from 'express';
import Message from '../models/Message.model';
import Server from '../classes/Server.class'

export const sendMessage = async( req: Request, res: Response ) => {
    const data = req.body;
    const { id } = req.params;
    try {
        const message = new Message(data);
        await message.save();
        data._id = message.id;
        const server = Server.instance;
        server.io.in(id).emit("private-message", data); 
        res.status(201).json({
          ok: true,
          msg: "Mensaje enviado.",
          uid: message.id,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          ok: false,
          msg: "Por favor hable con el administrador.",
        });
      }
}

export const loadMessages = async( req: Request, res: Response ) => {

  const { sender, receiver } = req.body;

  try {
    const mensajes = await Message.find({$or: [
      {sender, receiver},
      {sender: receiver, receiver: sender}
    ]});
    res.status(201).json({
      ok: true,
      msg: "Mensajes cargados.",
      mensajes
    });
  } catch (error) {
    console.log(error);
        res.status(500).json({
          ok: false,
          msg: "Por favor hable con el administrador.",
        });
  }

}

export const deleteMessages = async (req: Request, res: Response) => {

  const {data} = req.body;
  try {
    await Message.deleteMany({_id: {$in : data} });
    res.status(201).json({
      ok: true,
      msg: "Conversación eliminada."
    });
  } catch (error) {
    console.log(error);
        res.status(500).json({
          ok: false,
          msg: "Por favor hable con el administrador.",
        });
  }
}