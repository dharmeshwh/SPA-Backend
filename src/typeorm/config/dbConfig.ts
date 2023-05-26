import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";

export const databaseConfig = new DataSource({
  type: "mongodb",
  url: process.env.DB_URL,
  synchronize: false,
  logging: false,
  entities: [path.join(__dirname, "../entity/**/*.ts")],
  migrations: [path.join(__dirname, "../migration/**/*.ts")],
});
