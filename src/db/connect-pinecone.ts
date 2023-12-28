import { PineconeClient } from "@pinecone-database/pinecone";
import { config } from "dotenv";
config();

const {
  PINECONE_API_KEY = "",
  PINECONE_ENV = "",
  // PINECONE_PROJECT_NAME = "",
} = process.env;

const pinecone = new PineconeClient();

/** Pinecone client initialization */
async function pineconeDBconnection() {
  // pinecone.projectName = PINECONE_PROJECT_NAME;
  await pinecone.init({
    environment: PINECONE_ENV,
    apiKey: PINECONE_API_KEY,
  });
  
  console.log("Pinecone DB connection open.");
}

export default pineconeDBconnection;
export { pinecone };
