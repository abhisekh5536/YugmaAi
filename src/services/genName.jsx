
import OpenAI from "openai";
const endpoint = "https://api.llm7.io/v1";
const model = "gpt-5-chat";

async function main(prompt) {
  console.log('Generating name...');

  const client = new OpenAI({
    baseURL: endpoint,
    apiKey: import.meta.env.VITE_GITHUB_TOKEN,
    dangerouslyAllowBrowser: true 
  });

  try {
    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: `You are a title generator. Generate a title for a website based on the user's prompt.` },
        { role: "user", content: `Generate a short title for a website between 2 to 5 words based on the following prompt: ${prompt}` }
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
