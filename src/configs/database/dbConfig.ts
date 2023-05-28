import "reflect-metadata";
import mongoose from "mongoose";

export const dbConfig = () => {
  return mongoose.connect(String(process.env.DB_URL));
};
