import { Response, NextFunction } from "express";
import { filesUploadRequestData } from "./ingestKnowledgeBase";
import { pinecone } from "@/db/connect-pinecone";
import { Project } from "@/models";
import { textParser, createEmbeddings, generateId } from "@/utils";

import { ProjectIngestedDataType, RequestUserIdType } from "@/types/common";
import { VectorOperationsApi } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch/apis/VectorOperationsApi";

import { CHUNK_SIZE, OPENAI_EMBEDDING_MODEL } from "@/utils/constants";

async function filesUploadProgress(
  req: RequestUserIdType,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, projectId, projectName } = req.query as Record<
      string,
      string
    >;
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    if (!filesUploadRequestData[`${userId}`][`${projectId}`])
      res.write("event: ingestionError.\n");
      res.write("data: project or user not found.\n\n");

    res.on("close", () => {
      console.log("Closing SSE session.");
      res.end();
    });

    let index: VectorOperationsApi;
    index = pinecone.Index("content-insight-1"); // This should be assigned to the variable, as the number of indexes will exceed one.

    // Data on all the ingested files to be added to the project in mongoDB.
    const projectIngestedData: ProjectIngestedDataType[] = [];

    // Getting uploaded files from the temporary storage object.
    const files = filesUploadRequestData[userId][projectId].files;
    // Generating and upserting vectors for each of files.
    for (let i = 0; i < files.length; i += 1) {
      const { originalname, size, buffer } = files[i];
      projectIngestedData.push({
        fileName: originalname,
        size: size / 1024 + " kb",
      });

      // Cleaning up the file name.
      const title = `${originalname
        .trim()
        .replaceAll(/^[\w,.!?']/g, " ")
        .toLowerCase()}`;
      // Cleaning up the file text.
      const text = buffer
        .toString("utf-8")
        .replaceAll(/^[\w!?']/g, " ")
        .replaceAll(/\n/g, " ")
        .replaceAll(/  +/g, " ")
        .toLowerCase();

      // OpenAI embeddings API can only take a certain amount of tokens at a time. If a text, that exceeds that amount will be passed - might be an error.
      // So splitting each file to the chunks that are smaller, to avoid exceeding token number (CHUNK_SIZE - read details in constants.ts).
      const sections = textParser(text, CHUNK_SIZE);

      // Getting the vector embeddings, generated with the openAI api.
      const embeddingsRequests: Promise<{
        embeddings: number[][];
        usage: any;
      }>[] = sections.map((section) => {
        return createEmbeddings(section.content, OPENAI_EMBEDDING_MODEL);
      });
      const embeddingsResponses = await Promise.all(embeddingsRequests);
      const embeddings = embeddingsResponses.flatMap(
        (response) => response.embeddings
      );

      // Generating vectors for upserting to the pinecone DB, coupling the embeddings and the sections they were generated from (in metadata).
      // Namespace contains the current user id, the projectId field in metadata signs the identifier of the users project.
      // One user can have multiple projects.
      const vectors = embeddings.map((values, index) => {
        const section = sections[index];
        const id = generateId(title + "\n" + section.content.trim());
        console.log("id for vector : ", id);
        const metadata = {
          projectId,
          title,
          content: section.content,
        };
        return { id, values, metadata };
      });

      await index.upsert({ upsertRequest: { vectors, namespace: userId } });
      console.log(`${title} upserted.`);
      res.write(`event: fileIngested\n`);
      res.write(`data: ${originalname} upserted.\n\n`);
    }

    // Writing ingested files info to the mongoDB.
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $push: { projectIngestedData: { $each: projectIngestedData } } },
      { new: true }
    );
    console.log(
      "Ingestion completed, \n projectName : " +
        projectName +
        "\n projectId : " +
        projectId
    );
    res.write(`event: ingestionCompleted\n`);
    res.write(`data: ${JSON.stringify(updatedProject)}\n\n`);
  } catch (error: any) {
    console.log("Files upserting error");
    next(error.message);
  } 
}

export default filesUploadProgress;
