import { openai } from '@ai-sdk/openai';
import { anthropic } from "@ai-sdk/anthropic"
import { groq } from '@ai-sdk/groq';
import { google } from "@ai-sdk/google"
import { createOllama } from 'ollama-ai-provider-v2';


export const getProvider = () => {
    const provider = process.env.AI_PROVIDER as any;
    const model = process.env.AI_MODEL as any;
    switch (provider) {
        case 'groq':
            return groq(model);
        case 'openai':
            return openai(model);
        case "anthropic":
            return anthropic(model);
        case "google":
            return google(model)
        case "ollama":
            const ollama = createOllama({
                baseURL: process.env.OLLAMA_BASE_URL,
            });
            return ollama(model)
        default:
            return openai("gpt-4o")
    }
}