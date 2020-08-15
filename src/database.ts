import mongoose from "mongoose";
import { DB_CNN } from './environments/env';

const dbConnection = async () => {
  try {
    await mongoose.connect(DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log("DB Connect");
  } catch (error) {
    console.log(error);
    throw new Error("Error al inicializar la conexión a la base de datos.");
  }
};

export default dbConnection;
