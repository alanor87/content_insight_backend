import { Pinecone } from "@pinecone-database/pinecone";
import { config } from "dotenv";
config();

const {
  PINECONE_API_KEY = "",
} = process.env;

const pinecone = new Pinecone({
  apiKey: PINECONE_API_KEY,
});

export { pinecone };
