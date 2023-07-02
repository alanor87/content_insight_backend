"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connect_pinecone_1 = require("@/db/connect-pinecone");
async function isPineconeIndexReady(indexName) {
    const { status } = await connect_pinecone_1.pinecone.describeIndex({ indexName });
    if (!status?.ready)
        return isPineconeIndexReady(indexName);
    return undefined;
}
exports.default = isPineconeIndexReady;
