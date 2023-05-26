import express from "express";
import apiRouter from "./routes";

const app = express();

app.use(express.json());

app.use("/", apiRouter);

export = app;
