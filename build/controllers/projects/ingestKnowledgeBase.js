"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connect_pinecone_1 = require("@/db/connect-pinecone");
const models_1 = require("@/models");
const utils_1 = require("@/utils");
const constants_1 = require("@/utils/constants");
async function ingestKnowledgeBase(req, res, next) {
    try {
        //Getting the incoming data and files.
        const files = req.files;
        const { userId = "" } = req;
        const { projectId = "", projectName = "" } = req.body;
        let index;
        index = connect_pinecone_1.pinecone.Index("content-insight-1"); // This should be assigned to the variable, as the number of indexes will exceed one.
        // Data on all the ingested files to be added to the project in mongoDB.
        const projectIngestedData = [];
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
                .replaceAll(/^[\w,.!?']/g, " ")
                .replaceAll(/\n/g, " ")
                .replaceAll(/  +/g, " ")
                .toLowerCase();
            // OpenAI embeddings API can only take a certain amount of tokens at a time. If a text, that exceeds that amount will be passed - might be an error.
            // So splitting each file to the chunks that are smaller, to avoid exceeding token number (CHUNK_SIZE - read details in constants.ts).
            const sections = (0, utils_1.textParser)(text, constants_1.CHUNK_SIZE);
            // Getting the vector embeddings, generated with the openAI api.
            const embeddingsRequests = sections.map((section) => {
                return (0, utils_1.createEmbeddings)(section.content, constants_1.OPENAI_EMBEDDING_MODEL);
            });
            const embeddingsResponses = await Promise.all(embeddingsRequests);
            const embeddings = embeddingsResponses.flatMap((response) => response.embeddings);
            // Generating vectors for upserting to the pinecone DB, coupling the embeddings and the sections they were generated from (in metadata).
            // Namespace contains the current user id, the projectId field in metadata signs the identifier of the users project.
            // One user can have multiple projects.
            const vectors = embeddings.map((values, index) => {
                const section = sections[index];
                const id = (0, utils_1.generateId)(title + "\n" + section.content.trim());
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
        }
        // Writing ingested files info to the mongoDB.
        const updatedProject = await models_1.Project.findByIdAndUpdate(projectId, { $push: { projectIngestedData: { $each: projectIngestedData } } }, { new: true });
        console.log("Ingestion completed, \n projectName : " +
            projectName +
            "\n projectId : " +
            projectId);
        //Sending updated project to the client.
        res.status(200).json(updatedProject);
    }
    catch (error) {
        error.message = "Error ingesting knowledge base. \n" + error.message;
        next(error);
    }
}
exports.default = ingestKnowledgeBase;
