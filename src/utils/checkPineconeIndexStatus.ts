import { pinecone } from "@/db/connect-pinecone";

async function isPineconeIndexReady(indexName: string): Promise<void> {
  const { status } = await pinecone.describeIndex({ indexName });
  if (!status?.ready) return isPineconeIndexReady(indexName);
  return undefined;
}

export default isPineconeIndexReady;