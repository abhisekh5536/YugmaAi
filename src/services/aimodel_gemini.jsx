// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI,
} from '@google/genai';

async function main(prompt, context) {

  console.log('Yugma builder with Gemini 2.5 Flash is running')

  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });
  const tools = [
    { codeExecution: {} },
    {
      googleSearch: {
      }
    },
  ];
  const config = {
    thinkingConfig: {
      thinkingBudget: 0,
    },
    tools,
    systemInstruction: `You are an expert frontend web developer AI Agent.

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

Escape all double quotes inside string values with \\ (e.g., \\\"\).

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

Logos and icons



Final Warning:
Never use backticks (\`) or code blocks. Output the JSON only, properly escaped, and unwrapped.`,
  };
  const model = 'gemini-2.5-flash'; // Corrected model name
  const contents = [
      {
        role: "user",
        parts: [{ text: `// context:\n${context}\n\n// user prompt:\n${prompt}` }]
      }
    ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let fileIndex = 0;
  let fullResponse = '';
  for await (const chunk of response) {
      if (!chunk.candidates || !chunk.candidates[0].content || !chunk.candidates[0].content.parts) {
        console.log('[DEBUG] Empty chunk received:', chunk);
        continue;
      }
      
      const chunkText = chunk.candidates[0].content.parts[0].text;
      if (chunkText) {
        console.log('[DEBUG] Received chunk:', chunkText);
        fullResponse += chunkText;
      }
  }
  
  console.log('[DEBUG] Full response:', fullResponse);
  
  // Clean response from markdown code blocks
  const cleanedResponse = fullResponse.replace(/```(json)?\s*([\s\S]*?)\s*```/g, '$2');
  console.log('[DEBUG] Cleaned response:', cleanedResponse);
  
  try {
    const parsed = JSON.parse(cleanedResponse);
    console.log('[DEBUG] Parsed response:', parsed);
    return parsed;
  } catch (error) {
    console.error('[ERROR] Failed to parse response:', error);
    console.error('[ERROR] Raw response:', fullResponse);
    return {};
  }
}

export { main };

