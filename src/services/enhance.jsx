
import OpenAI from "openai";
const endpoint = "https://api.llm7.io/v1";
const model = "gpt-4.1-nano-2025-04-14";

async function main(prompt) {
  console.log('Prompt Enhancer is running');

  const client = new OpenAI({
    baseURL: endpoint,
    apiKey: import.meta.env.VITE_GITHUB_TOKEN,
    dangerouslyAllowBrowser: true 
  });

  try {
    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: `You are a prompt enhancer for a website generator (frontend).
Improve the user's prompt to make it more clear, specific, and implementation-ready using standard web technologies (HTML, CSS, JavaScript). Avoid mentioning HTML, CSS, or JavaScript directly. Ensure the result describes the site’s purpose, layout, features, style, and interactivity clearly.

Respond only with the enhanced prompt. No explanations.` },
        { role: "user", content: `user prompt: ${prompt}` }
      ],
      temperature: 1,
      top_p: 1,
      model: model
    });

    const content = response?.choices?.[0]?.message?.content;
    console.log('[Enhancer] Raw response content:', content);

    // Fallback if content is missing or empty
    if (typeof content !== 'string' || content.trim().length === 0) {
      console.warn('[Enhancer] Empty or invalid enhanced prompt. Falling back to original prompt.');
      return prompt;
    }

    return content;
  } catch (error) {
    console.error('[Enhancer] Failed to get enhanced prompt:', error);
    return prompt;
  }
}

export { main };
