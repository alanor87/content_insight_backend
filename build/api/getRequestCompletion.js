"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_pinecone_1 = require("@/db/connect-pinecone");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { OPENAI_API_KEY = "" } = process.env;
/** Making embeddings of the user question, through openAI api call. */
async function createQuestionEmbeddings({ model, input, }) {
    try {
        const response = await fetch("https://api.openai.com/v1/embeddings", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`,
            },
            method: "POST",
            body: JSON.stringify({ input, model }),
        });
        const { error, data, usage } = await response.json();
        return data[0].embedding;
    }
    catch (e) {
        console.log("Error in creating question embeddings, returning empty array : ", e);
        return [];
    }
}
/** Function sends the request to the vector database (pinecone in our case) with the embeddings of the question.
 * Means, hey, pinecone, here is the question, in a form of the numerical representations of textual data.
 * Please, give me the most semantically close stuff (text) to it that you have in this database.
 */
async function createQuestionContext({ projectId, vector, }) {
    try {
        console.log(projectId);
        const response = await connect_pinecone_1.pinecone.Index("content-insight-1").query({
            queryRequest: {
                vector,
                filter: { "projectId": { $eq: projectId } },
                topK: 5,
                includeMetadata: true,
                namespace: "649f2aa4d662391f341a431d",
            },
        });
        console.log(response);
        return response?.matches?.map((match) => match.metadata) || [];
    }
    catch (e) {
        console.log("Error in creating question embeddings : ", e);
    }
}
/** Function that makes the request for the completion to the openAI completions endpoint.
 * In a nutshell - we give the openAI the big message (prompt), whith our question and the context,
 * in which it must look for the answer to that question.
 * @prompt - question, formulated for openAI api to answer in a human readable form.
 */
async function getChatCompletions(prompt) {
    try {
        console.log("Current prompt : ", prompt);
        const body = {
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        };
        const data = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }).then((res) => res.json());
        return data.choices[0].message.content;
    }
    catch (e) {
        console.log("Error in getting completions from openAI : ", e);
    }
}
/** Running all the routines for obtaining the user readable answer to the question.
 *  @question an user question, string.   */
async function getRequestCompletion(req, res) {
    console.log('request : ', req);
    const { projectId, question } = req.body;
    console.log('projectId : ', projectId);
    const vector = await createQuestionEmbeddings({
        model: "text-embedding-ada-002",
        input: question,
    });
    const metadata = await createQuestionContext({
        projectId,
        vector, //  Here's the vector we received from `createEmbeddings()`, this is a numerical representation of the question.
    });
    /** Joining all the things that we got from the database, obtaining all the text, that is semantically close to our user question.
     * For example - if the question was "How to add an image?" - database gave us all the text it has about adding images.
     * This is the context, in which the openAi completion api (read as chatGPT basically)) will look for the answer to our question,
     * and from which it is going to formulate the answer.
     */
    const context = metadata?.map((data) => data.content).join(" ");
    /** Here we formulate a concise question to the openAi completions endpoint, basically, now we are a user
     * that is asking a question to chatGPT - this is the best way to view what is happening.
     */
    const prompt = `Answer the question as truthfully and accurately as possible using only the information provided in the context.
  If the answer is not contained within the provided context, say "Sorry, I don't have that information.".
  Context: ${context || 'none.'}
  Question: ${question}
  Answer: `;
    const response = await getChatCompletions(prompt);
    res.status(200).json({ response });
}
exports.default = getRequestCompletion;
