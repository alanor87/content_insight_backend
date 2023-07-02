"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUPABASE_SIMILARITY_THRESHOLD = exports.PINECONE_UPSERT_VECTOR_LIMIT = exports.PINECONE_POD_TYPE = exports.PINECONE_METRIC = exports.EMBEDDING_MATCH_COUNT = exports.CHUNK_SIZE = exports.OPENAI_TOKENS_PER_WORD = exports.OPENAI_COMPLETION_N = exports.OPENAI_COMPLETION_TOP_P = exports.OPENAI_COMPLETION_TEMPERATURE = exports.OPENAI_TOKENS_FOR_COMPLETION = exports.OPENAI_MAX_COMPLETION_TOKENS = exports.OPENAI_COMPLETION_MODEL = exports.OPENAI_OUTPUT_DIMENSIONS = exports.OPENAI_MAX_INPUT_TOKENS = exports.OPENAI_EMBEDDING_MODEL = void 0;
/**
 * The maximum number of input tokens for the embedding model v2 is 8191. There seems to be no tokenizer for JS
 * available. Some use "4 characters per token", others "4/3 tokens per word". This can vary per language. And there
 * needs to be some kind of safety margin to stay within the boundaries and prevent erors.
 */
exports.OPENAI_EMBEDDING_MODEL = 'text-embedding-ada-002';
exports.OPENAI_MAX_INPUT_TOKENS = 8191;
exports.OPENAI_OUTPUT_DIMENSIONS = 1536;
/**
 * The other thing to consider is that the completion model is also capped (e.g. at 4096 tokens). Larger embeddings
 * eventually means less of them fit in the context for the completion (EMBEDDING_MATCH_COUNT). We also need to leave
 * room for the question and for the completion. Using the largest possible chunks of texts for embeddings is not
 * necessarily the best strategy. So tweaking is necessary for best results based on input and expected output.
 */
const MAX_COMPLETION_TOKENS_MAP = {
    'gpt-3.5-turbo': 4096,
    'gpt-4': 8192,
    'gpt-4-32k': 32768
};
exports.OPENAI_COMPLETION_MODEL = 'gpt-3.5-turbo';
exports.OPENAI_MAX_COMPLETION_TOKENS = MAX_COMPLETION_TOKENS_MAP[exports.OPENAI_COMPLETION_MODEL];
exports.OPENAI_TOKENS_FOR_COMPLETION = 1024; // Tokens reserved for the answer/completion
exports.OPENAI_COMPLETION_TEMPERATURE = 0.2;
exports.OPENAI_COMPLETION_TOP_P = 1;
exports.OPENAI_COMPLETION_N = 1;
exports.OPENAI_TOKENS_PER_WORD = 4 / 3;
const GRANULARITY = 0.5; // Higher means smaller and more embeddings, and more fine-grained results. Capped at TOKEN_MARGIN.
const TOKEN_MARGIN = 0.05; // Safety margin as token calculation is only an estimate
exports.CHUNK_SIZE = (exports.OPENAI_MAX_INPUT_TOKENS / exports.OPENAI_TOKENS_PER_WORD) * (1 - Math.max(TOKEN_MARGIN, GRANULARITY));
// Number of matches from the db vector query to build up context for the completion request. Only a few search results
// will fit. Keep one or two extra so this program can try the next embedding if one doesn't fit.
exports.EMBEDDING_MATCH_COUNT = 5;
exports.PINECONE_METRIC = 'cosine'; // OpenAI recommendation
exports.PINECONE_POD_TYPE = 'p2.x1'; // Options: s1 (high capacity), p1 (fast queries), p2 (low latency, high throughput)
exports.PINECONE_UPSERT_VECTOR_LIMIT = 100;
exports.SUPABASE_SIMILARITY_THRESHOLD = 0.78;
