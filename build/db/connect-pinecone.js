"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pinecone = void 0;
const pinecone_1 = require("@pinecone-database/pinecone");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const { PINECONE_API_KEY = "", PINECONE_ENV = "",
// PINECONE_PROJECT_NAME = "",
 } = process.env;
const pinecone = new pinecone_1.PineconeClient();
exports.pinecone = pinecone;
/** Pinecone client initialization */
async function pineconeDBconnection() {
    // pinecone.projectName = PINECONE_PROJECT_NAME;
    await pinecone.init({
        environment: PINECONE_ENV,
        apiKey: PINECONE_API_KEY,
    });
    console.log("Pinecone DB connection open.");
}
exports.default = pineconeDBconnection;
