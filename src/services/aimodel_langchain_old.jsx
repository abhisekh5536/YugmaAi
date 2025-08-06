import { ChatLLM7 } from "langchain-llm7";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const model = new ChatLLM7({
  baseUrl: "https://api.llm7.io/v1",
  modelName: "gpt-4.1-nano-2025-04-14",
  temperature: 1.0,
  maxRetries: 3,
  timeout: 120,
  apiKey: import.meta.env.VITE_GPT_OSS_API_KEY
});

// function main(prompt, context)
async function main(prompt, context) {
  console.log("GPT OSS 120B using langchain-llm7 is running");

  const messages = [
    new SystemMessage(`You are an expert frontend web developer AI Agent.

When given a prompt, generate a complete, modern, and responsive website using semantic HTML5, clean CSS3, and vanilla JavaScript.

Respond with a single valid JSON object only, having exactly these four keys:

{
  "summary": "A brief summary of what the website does, its main features, and a closing line listing the three files: index.html, style.css, index.js.",
  "html": "<Complete HTML5 code>",
  "css": "<Complete responsive CSS3 code>",
  "js": "<Complete vanilla JavaScript code>"
}

Strict Response Rules:

You must return only the JSON object described above. Do not include any text before or after the JSON — no explanations, comments, markdown, or formatting.

Never wrap the response in backticks (\`), triple backticks (\`\`\`), or use json, content\`, or any other wrappers.

Escape all double quotes inside string values with \\\" (e.g., \\\"hello\\\" should be written as \"hello\")

Always include complete files, even if only part of them was modified.

Always give the modified response in the same json format as the original response and outside the json format do not write anything.

Always specify clearly in summary whether the prompt is a modification or new website request.

Always update only what needs to change — but include the full updated code for all three files.

The website must be:

Fully responsive

Modern in design

Interactive using JavaScript

Always include:

A <nav> tag with at least 3 links

A <footer> with 3 links

Logos and icons (can use text or placeholder)

Realistic placeholder images using https://picsum.photos, for example:
<img src=\\"https://picsum.photos/600/400?random=1\\" alt=\\"...\\">

Final Warning:
Never use backticks (\`) or code blocks. Output the JSON only, properly escaped, and unwrapped.`),
    new HumanMessage(`// context:\n${context}\n\n// user prompt:\n${prompt}`),
  ];

  try {
    const response = await model.invoke(messages);
    console.log("[DEBUG] Raw response:", response.content);

    // --- Begin robust cleanup and extraction ---
    const extractFirstJsonObject = (text) => {
      if (!text) return "";
      let cleaned = String(text);
      // Remove code fences like ```json ... ```
      cleaned = cleaned.replace(/```(json)?\s*([\s\S]*?)\s*```/gi, "$2");
      // Trim whitespace
      cleaned = cleaned.trim();

      // Try to find the first full JSON object by matching braces
      const start = cleaned.indexOf("{");
      if (start === -1) return "";
      let depth = 0;
      for (let i = start; i < cleaned.length; i++) {
        const ch = cleaned[i];
        if (ch === '{') depth++;
        else if (ch === '}') depth--;
        if (depth === 0) {
          return cleaned.slice(start, i + 1);
        }
      }
      return "";
    };

    const jsonSlice = extractFirstJsonObject(response.content);
    if (!jsonSlice) {
      throw new Error("No JSON object could be extracted from model output.");
    }

    const parsed = JSON.parse(jsonSlice);
    console.log("[DEBUG] Parsed response:", parsed);
    return parsed;
    // --- End robust cleanup and extraction ---
  } catch (error) {
    console.error("[ERROR] Failed to parse or invoke:", error);
    return {
      summary: "Error occurred while fetching response from the LLM.",
      html: "",
      css: "",
      js: ""
    };
  }
}

export { main };
