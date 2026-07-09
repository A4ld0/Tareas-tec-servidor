import mongoose from "mongoose";

export const connectDatabase = async (): Promise<void> => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI no esta definida en las variables de entorno.");
  }

  await mongoose.connect(mongoUri);
  console.log("MongoDB conectado correctamente");
};
