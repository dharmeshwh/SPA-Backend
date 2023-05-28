// import app from "./app";
import dotenv from "dotenv";
// import { dbConfig } from "./configs/database/dbConfig";
import express from "express";

dotenv.config();
const PORT = process.env.PORT ?? 3003;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("test route");
});

app.listen(PORT, async () => {
  try {
    // await dbConfig();
    console.log(`listning on port - ${PORT}`);
  } catch (error: Error | any) {
    console.error(`[Error] - ${error.message}`);
  }
});
