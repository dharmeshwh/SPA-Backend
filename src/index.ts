import app from "./app";
import dotenv from "dotenv";
import * as http from "http";
import { databaseConfig } from "./typeorm/config/dbConfig";
import { User } from "./typeorm/entity/User";

dotenv.config();

const run = async () => {
  try {
    const PORT = process.env.PORT;
    await databaseConfig.initialize();
    const server = http.createServer(app);
    console.log({ x: await databaseConfig.getRepository(User).find({}) });

    // Start the server
    server.listen(PORT, async () => {
      console.info(`listening on port ${PORT}`);
    });

    // Event handler for server errors
    server.on("error", async (err) => {
      if (err) {
        await databaseConfig.destroy();
        console.error("Server crashed while listening", err);
        throw err;
      }
    });

    // Event handler for server close
    server.on("close", async () => {
      await databaseConfig.destroy();
      console.warn("Closing server connection");
    });
  } catch (error: Error | any) {
    console.log(`Erron while executing run function - ${error.message}`);
  }
};

run();
