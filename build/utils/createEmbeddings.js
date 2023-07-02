"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const { OPENAI_API_KEY = "" } = process.env;
/**  Getting the vector embeddings for the knowledge base text. Request to openAi api, no library used. */
async function createEmbeddings(input, model) {
    const response = await fetch("https://api.openai.com/v1/embeddings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            input,
            model,
        }),
    });
    const { error, data, usage } = await response.json();
    if (error)
        throw new Error(error.message);
    if (!data[0].embedding)
        throw new Error("No embedding returned from the completions endpoint");
    return {
        embeddings: data.map((d) => d.embedding),
        usage,
    };
}
exports.default = createEmbeddings;
