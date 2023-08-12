import { Request, Response } from "express";
import { pinecone } from "@/db/connect-pinecone";

import dotenv from "dotenv";
dotenv.config();

const { OPENAI_API_KEY = "" } = process.env;

/** Making embeddings of the user question, through openAI api call. */
async function createQuestionEmbeddings({
  model,
  input,
}: {
  model: string;
  input: string;
}): Promise<number[]> {
  try {
    const response = await fetch("https://api.openai.com/v1/embeddings", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      method: "POST",
      body: JSON.stringify({ input, model }),
    });

    const { error, data, usage } = await response.json();
    return data[0].embedding;
  } catch (e) {
    console.log(
      "Error in creating question embeddings, returning empty array : ",
      e
    );
    return [];
  }
}

/** Function sends the request to the vector database (pinecone in our case) with the embeddings of the question.
 * Means, hey, pinecone, here is the question, in a form of the numerical representations of textual data.
 * Please, give me the most semantically close stuff (text) to it that you have in this database.
 * @userId defines the namespace in pinecone index. Namespace contains projects of one user.
 * @projectId defines the filter that is applied in the search through the metadata. This is the users particular project.
 * @vector embeddings of the user question.
 */
async function createQuestionContext({
  userId,
  projectId,
  vector,
}: {
  userId: string;
  projectId: string;
  vector: number[];
}) {
  try {
    const response = await pinecone.Index("content-insight-1").query({
      queryRequest: {
        vector,
        filter: { projectId: { $eq: projectId } },
        topK: 5,
        includeMetadata: true,
        namespace: userId,
      },
    });
    return response?.matches?.map((match: any) => match.metadata) || [];
  } catch (e) {
    console.log("Error in creating question embeddings : ", e);
  }
}

/** Function that makes the request for the completion to the openAI completions endpoint.
 * In a nutshell - we give the openAI the big message (prompt), whith our question and the context,
 * in which it must look for the answer to that question.
 * @prompt - question, formulated for openAI api to answer in a human readable form.
 */
async function getOpenAiCompletions(prompt: string) {
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
  } catch (e) {
    console.log("Error in getting completions from openAI : ", e);
  }
}

/** Running all the routines for obtaining the user readable answer to the question.
 *  @question an user question, string.   */
export default async function getRequestCompletion(
  req: Request,
  res: Response
) {
  const { userId, projectId, question } = req.body;

  /** Extracting the question keywords with openAI. We need to have those to query a meaningful context from the pinecone db.
   * Utility words like 'how', 'why', 'is' and so on would pollute the pinecone db query result with unneeded noise.
   * This is only needed for the pinecone - we use original question for the final completion request.
   */
  const keywordsPrompt = `Extract keywords from the following question, put them al a comma separated words. ${question}`
  const questionKeywords = await getOpenAiCompletions(keywordsPrompt);

  console.log('Keywords response : ', questionKeywords);

  /** Creating numerical representation of the question itself. */
  const vector = await createQuestionEmbeddings({
    model: "text-embedding-ada-002",
    input: question,
  });


  /** All the bunch of info that */
  const metadata = await createQuestionContext({
    userId,
    projectId,
    vector,
  });

  /** Joining all the things that we got from the database, obtaining all the text, that is semantically close to our user question.
   * For example - if the question was "How to add an image?" - database gave us all the text it has about adding images.
   * This is the context, in which the openAi completion api (read as chatGPT basically)) will look for the answer to our question,
   * and from which it is going to formulate the answer.
   */
  const context = metadata?.map((data: any) => data.content).join(" ");

  /** Here we formulate a concise question to the openAi completions endpoint, basically, now we are a user
   * that is asking a question to chatGPT - this is the best way to view what is happening.
   */

  const mainPrompt = `Answer the question as detailed and accurately as possible using only the information provided in the context.
  If the answer is not contained within the provided context, say "Sorry, I don't have that information.".
  Context: ${context || "none."}
  Question: ${question}
  Answer: `;

  const response = await getOpenAiCompletions(mainPrompt);

  console.log(response);

  res.status(200).json({ response });
}