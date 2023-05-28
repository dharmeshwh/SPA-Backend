import app from "./app";
import dotenv from "dotenv";
import { dbConfig } from "./configs/database/dbConfig";

dotenv.config();
const PORT = process.env.PORT;

app.listen(PORT, async () => {
  try {
    await dbConfig();
    console.log(`listning on port - ${PORT}`);
  } catch (error: Error | any) {
    console.error(`[Error] - ${error.message}`);
  }
});
