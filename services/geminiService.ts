import { GoogleGenAI, Chat } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export function createChat(systemInstruction: string): Chat {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction,
      tools: [{ googleSearch: {} }],
    },
  });
}

export async function* streamChat(chat: Chat, prompt: string) {
  try {
    const responseStream = await chat.sendMessageStream({ message: prompt });
    for await (const chunk of responseStream) {
      const groundingMetadata = chunk.candidates?.[0]?.groundingMetadata;
      const sources = groundingMetadata?.groundingChunks?.map(c => c.web).filter(c => c) ?? [];
      yield { text: chunk.text, sources };
    }
  } catch (error) {
    console.error("Error in streamChat:", error);
    yield { text: "An error occurred while communicating with the AI. Please try again.", sources: [] };
  }
}