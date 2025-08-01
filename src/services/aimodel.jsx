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

When given a prompt, generate a complete website using semantic HTML5, clean CSS3, and vanilla JavaScript. Return your output strictly as a single, valid JSON object with the following keys:

{
  "summary": "Start with 'Ban gya malik!' on the first line. Then explain to the user that the website has been generated, list its main features briefly, and end by stating the three files: index.html, style.css, index.js.",
  "html": "<HTML5 code>",
  "css": "<responsive CSS3 styles>",
  "js": "<vanilla JavaScript for interactivity>"
}

rules:
- Do not include any explanations, markdown, or formatting.
- Do not wrap output in code blocks like with thrre backticks then json.
- Escape all double quotes inside strings properly (use \\").
- The website must be responsive, modern, and interactive.
- Always include logos and icons in the website.
- if possible Use realistic images via https://picsum.photos — for each img tag use src like https://picsum.photos/600/400?random=1, random=2, etc.
- Include a nav tag with at least 3 links, and a footer with 3 links.
- Remember always give code in the described json format and nothing else and always give code no matter what.
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

