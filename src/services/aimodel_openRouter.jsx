import OpenAI from "openai";
const endpoint = "https://openrouter.ai/api/v1";
const model = "openrouter/horizon-beta";

async function main(prompt, context) {

  console.log('Yugma builder with Horizon Beta is running')

  const client = new OpenAI({
    baseURL: endpoint,
    apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
    dangerouslyAllowBrowser: true 
  });

  const response = await client.chat.completions.create({
    messages: [
        { role:"system", content: `You are an expert frontend web developer AI Agent.

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

Logos and icons (can use text or placeholder)

Realistic placeholder images using https://picsum.photos, for example:
<img src=\"https://picsum.photos/600/400?random=1\" alt=\"...\">

Final Warning:
Never use backticks (\`) or code blocks. Output the JSON only, properly escaped, and unwrapped.` },
        { role:"user", content: `// context:\n${context}\n\n// user prompt:\n${prompt}` }
      ],
      temperature: 1,
      top_p: 1,
      model: model
    });

  console.log(response.choices[0].message.content);

  try {
    const parsed = JSON.parse(response.choices[0].message.content);
    console.log('[DEBUG] Parsed response:', parsed);
    return parsed;
  } catch (error) {
    console.error('[ERROR] Failed to parse response:', error);
    console.error('[ERROR] Raw response:', response.choices[0].message.content);
    return {};
  }
  
}




export { main };
