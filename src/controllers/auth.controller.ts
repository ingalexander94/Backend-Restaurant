import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User.model";
import UserModel from "../interfaces/interfaces";
import { generateToken } from "../helpers/jwt";

const createUser = async (req: Request, res: Response) => {
  const data: UserModel = req.body;
  try {
    let user = await User.findOne({ email: data.email });
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "El cliente ya existe",
      });
    }
    user = new User(data);
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(data.password, salt);
    await user.save();
    const token = await generateToken(user.id, user.name, user.role);
    res.status(201).json({
      ok: true,
      msg: "Usuario creado.",
      uid: user.id,
      name: user.name,
      role: user.role,
      token, 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador.",
    });
  }
};

const login = async (req: Request, res: Response) => {
  const {email, password} = req.body;
  try {
    let user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "El cliente no existe",
      });
    }
    const matchPassword = bcrypt.compareSync(password, user.password);

    if(!matchPassword){
      return res.status(400).json({
        ok: false,
        msg: "La contraseña es incorrecta",
      });
    }

    const token = await generateToken(user.id, user.name, user.role);

    res.status(201).json({
      ok: true,
      msg: "Se inicio la sesión.",
      uid: user.id,
      name: user.name,
      role: user.role,
      token, 
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador.",
    });
  }
};

const renewToken = async (req: Request, res: Response) => {

  const { uid, name, role } = req;

  const token = await generateToken(uid, name, role);
  res.status(200).json({
    ok: true, 
    msg: "Autenticado",
     uid, 
     name, 
     role, 
     token
  });

};

export { createUser, login, renewToken };
