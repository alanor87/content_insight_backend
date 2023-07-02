import { app } from "../app";
import { mongoDBconnection } from "@/db/connect-mongoose";
import pineconeDBconnection from "@/db/connect-pinecone";

import dotenv from "dotenv";
dotenv.config();

const { PORT = 3300 } = process.env;

mongoDBconnection
  .then(async () => {
    await pineconeDBconnection();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Listening to the port!", PORT);
    });
  })
  .catch((error: any) => console.log("DB connection error : ", error));

