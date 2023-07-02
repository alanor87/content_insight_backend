import { DocumentParser } from "@/types/utils";

const splitContentAtSentence = (content: string, maxLength: number) => {
  const sentences = content
    .replace(/\s+/gm, " ")
    .trim()
    .split(/(?<=[.?!]\s)\s*/g);

  const chunks = [];
  let currentChunk = "";
  for (const sentence of sentences) {
    if (currentChunk.length + sentence.length <= maxLength) {
      currentChunk += sentence;
    } else {
      chunks.push(currentChunk);
      currentChunk = sentence;
    }
  }
  if (currentChunk) {
    chunks.push(currentChunk);
  }
  return chunks;
};

const textParser: DocumentParser = (text, maxLength) => {
  const sections: any[] = [];
  const splitContent = splitContentAtSentence(String(text), maxLength);
  splitContent.forEach((chunk) => {
    sections.push({ content: chunk.trim() });
  });
  return sections;
};

export default textParser;
