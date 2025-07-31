// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI,
} from '@google/genai';

async function main(prompt) {
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
    systemInstruction: [
        {
          text: `You are an expert frontend web developer AI Agent.

When given a prompt, generate a complete website layout using HTML, CSS, and JavaScript — and return your response strictly as a single, valid JSON object.

The JSON should have the following keys:

{
  "summary": "first of all tell the user that the generation is ready and then tell the user that the user can check the files and see the website and tell him about the features of the website and at the end state three files generated (index.html, style.css, index.js)",
  "html": "<complete HTML5 code, no inline CSS or JS>",
  "css": "<clean CSS3 styles for layout and responsiveness>",
  "js": "<vanilla JavaScript code for interactivity>"
}

Rules:
- Do NOT include any explanations, markdown, or extra formatting.
- Do NOT wrap the output in code blocks like \`\`\`json.
- DO ensure all double quotes inside HTML, CSS, or JS strings are escaped properly (use \`\\"\` where needed).
- Keep everything well-indented and readable inside the JSON string values.
- Follow semantic HTML and clean CSS/JS practices.
- No libraries like Bootstrap or jQuery unless explicitly requested.
- Always try to give modern and attractive looking website with responsive design.
- Always try to add actual and real images from the internet or from anywhere possible.
- Always try to give fully working website with all the components working and interactive.

Your output must be **pure JSON**, ready to be parsed in JavaScript.
`,
        }
    ],
  };
  const model = 'gemini-2.5-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let fileIndex = 0;
  let fullResponse = '';
  for await (const chunk of response) {
      if (!chunk.candidates || !chunk.candidates[0].content || !chunk.candidates[0].content.parts) continue;
      
      if (chunk.candidates[0].content.parts[0].text) {
          fullResponse += chunk.candidates[0].content.parts[0].text;
      }
  }
  try {
      // Parse collected response and return
      return JSON.parse(fullResponse);
  } catch (error) {
      console.error('Failed to parse response:', error);
      return {};
  }
  if (chunk.candidates[0].content.parts[0].executableCode) {
    console.log(chunk.candidates[0].content.parts[0].executableCode);
  }
  if (chunk.candidates[0].content.parts[0].codeExecutionResult) {
    console.log(chunk.candidates[0].content.parts[0].codeExecutionResult);
  }
}

export { main };

