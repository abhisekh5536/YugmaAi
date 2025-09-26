import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { main as mainGemini } from "../../services/aimodel_gemini";
import { main as mainGpt } from "../../services/aimodel_GPT";
import { main as mainDeepseek } from "../../services/aimodel_openRouter";
import { main as mainMistral } from "../../services/aimodel_mistral";
import { main as mainLangchain } from "../../services/aimodel_langchain";
import { main as nameGenerator } from "../../services/genName";
import sendGeneration from '../../services/sendGeneration';

const Builder = () => {
  // State for chat messages
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! i am Yugma Ai Please Write a prompt", sender: 'ai' },
  ]);
  
  // State for new message input
  const location = useLocation();
  const [newMessage, setNewMessage] = useState('');
  
  const hasAutoSubmitted = useRef(false);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const [selectedModel, setSelectedModel] = useState('mainGemini');
  const [projectName, setProjectName] = useState('');
  const hasProjectNameGenerated = useRef(false);
  const projectNameRef = useRef('');

  useEffect(() => {
    if (location.state?.prompt && !hasAutoSubmitted.current) {
      setNewMessage(location.state.prompt);

      // checking if the prompt is from dashboard
      if(location.state.fromDashboard) {
        setFiles(location.state.files || []);
        // set the user prompt
        const userMessage = {
        id: messages.length + 1,
        text: location.state.prompt,
        sender: 'user'
      };
      setMessages(prev => [...prev, userMessage]);
      // set summary
      const aiResponse = {
          id: messages.length + 2,
          text: location.state.summary,
          sender: 'ai'
        };
        setMessages(prev => [...prev, aiResponse]);
      }
      else {
        handleAutoSubmit(location.state.prompt);
      }

      hasAutoSubmitted.current = true;
    }
  }, [location.state]);

  const handleAutoSubmit = async (promptText) => {
    if (location.state?.fromDashboard) return;
    setNewMessage('');

    // Add user message to chat
    const userMessage = {
      id: messages.length + 1,
      text: promptText,
      sender: 'user'
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // Generate project name only once for the first prompt
      if (!hasProjectNameGenerated.current) {
        const generatedName = await nameGenerator(promptText);
        projectNameRef.current = generatedName || 'Project';
        setProjectName(projectNameRef.current);
        hasProjectNameGenerated.current = true;
      }
      
      // Call AI model with the message
      const modelFunction = selectedModel === 'mainGemini' ? mainGemini : selectedModel === 'mainGpt' ? mainGpt : selectedModel === 'mainDeepseek' ? mainDeepseek : selectedModel === 'mainLangchain' ? mainLangchain : selectedModel === 'mainMistral' ? mainMistral : mainGemini;
      const response = await modelFunction(promptText);
      
      // Ensure response structure matches expected format
      const validatedResponse = {
          html: response?.html || '',
          css: response?.css || '',
          js: response?.js || '',
          summary: response?.summary || ''
      };

      // Only update files if we have some valid content
      const hasAnyContent =
        (validatedResponse.html && validatedResponse.html.trim().length > 0) ||
        (validatedResponse.css && validatedResponse.css.trim().length > 0) ||
        (validatedResponse.js && validatedResponse.js.trim().length > 0);

      if (hasAnyContent) {
        setFiles([
            { id: 1, name: 'index.html', content: validatedResponse.html },
            { id: 2, name: 'style.css', content: validatedResponse.css },
            { id: 3, name: 'index.js', content: validatedResponse.js }
        ]);
      }
      
      // Add AI response to chat (fallback message if empty)
      const aiSummary = validatedResponse.summary && validatedResponse.summary.trim().length > 0
        ? validatedResponse.summary
        : 'Generated content available.';

      const aiResponse = {
        id: messages.length + 2,
        text: aiSummary,
        sender: 'ai'
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      // Handle error case: keep previous files unchanged
      const errorMessage = {
        id: messages.length + 2,
        text: "Sorry, I encountered an error. Previous files are unchanged. Please try again.",
        sender: 'ai'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      // Reset loading state
      setIsLoading(false);
    }
  };
  
  // State for files and active file
  const [files, setFiles] = useState([]);
  
  const [activeFileId, setActiveFileId] = useState(1);
  
  // State for view mode (code/preview)
  const [viewMode, setViewMode] = useState('code'); // 'code' or 'preview'
  
  // Get active file
  const activeFile = files.find(file => file.id === activeFileId);
  
  // Handle sending a new message
  const handleSendMessage = async (e) => {
  e.preventDefault();
  if (newMessage.trim() === '') return;
  
  // Gather current files content
  const currentFiles = {
    html: getFileContent('index.html'),
    css: getFileContent('style.css'),
    js: getFileContent('index.js')
  };

  const userMsg = {
    id: messages.length + 1,
    text: newMessage,
    sender: 'user'
  };
  
  setMessages(prev => [...prev, userMsg]);
  setNewMessage('');
  
  // Set loading state
  setIsLoading(true);
  
  try {
    // Check if we have existing files (from dashboard or previous generation)
    const hasExistingCode = currentFiles.html || currentFiles.css || currentFiles.js;
    
    let prompt;
    if (hasExistingCode) {
      // If we have existing code, ask to modify it
      prompt = `Please modify the existing website based on this request: ${newMessage}
      
Current HTML:
${currentFiles.html}

Current CSS:
${currentFiles.css}

Current JavaScript:
${currentFiles.js}

Please update the code according to the user's request while maintaining the existing structure where appropriate.`;
    } else {
      // If no existing code, create new website
      prompt = `Create a website for: ${newMessage}`;
    }

    const modelFunction = selectedModel === 'mainGemini' ? mainGemini : 
                         selectedModel === 'mainGpt' ? mainGpt : 
                         selectedModel === 'mainDeepseek' ? mainDeepseek : 
                         selectedModel === 'mainLangchain' ? mainLangchain : 
                         selectedModel === 'mainMistral' ? mainMistral : mainGemini;

    const response = await modelFunction(prompt, hasExistingCode ? currentFiles : undefined);

    // Ensure response structure matches expected format
    const validatedResponse = {
        html: response?.html || '',
        css: response?.css || '',
        js: response?.js || '',
        summary: response?.summary || ''
    };

    // Only update files if we have some valid content
    const hasAnyContent =
      (validatedResponse.html && validatedResponse.html.trim().length > 0) ||
      (validatedResponse.css && validatedResponse.css.trim().length > 0) ||
      (validatedResponse.js && validatedResponse.js.trim().length > 0);

    if (hasAnyContent) {
      setFiles([
          { id: 1, name: 'index.html', content: validatedResponse.html },
          { id: 2, name: 'style.css', content: validatedResponse.css },
          { id: 3, name: 'index.js', content: validatedResponse.js }
      ]);
    }
    
    // Add AI response to chat (fallback message if empty)
    const aiSummary = validatedResponse.summary && validatedResponse.summary.trim().length > 0
      ? validatedResponse.summary
      : (hasAnyContent ? 'Generated content available.' : 'No new content was generated.');

    const aiResponse = {
      id: messages.length + 2,
      text: aiSummary,
      sender: 'ai'
    };
    setMessages(prev => [...prev, aiResponse]);
  } catch (error) {
    // Handle error case: keep previous files unchanged
    const errorMessage = {
      id: messages.length + 2,
      text: "Sorry, I encountered an error. Previous files are unchanged. Please try again.",
      sender: 'ai'
    };
    setMessages(prev => [...prev, errorMessage]);
  } finally {
    // Reset loading state
    setIsLoading(false);
  }
};
  
  // Handle file content change
  const handleFileContentChange = (e) => {
    const updatedFiles = files.map(file => 
      file.id === activeFileId ? { ...file, content: e.target.value } : file
    );
    setFiles(updatedFiles);
  };
  
  // Get content of specific file by name
  const getFileContent = (fileName) => {
    const file = files.find(f => f.name === fileName);
    return file ? file.content : '';
  };
  
  // Create combined HTML for preview
  const getPreviewContent = () => {
    // Get the current HTML content
    let htmlContent = getFileContent('index.html');
    
    // Remove existing CSS and JS references
    htmlContent = htmlContent.replace(/<link[^>]*?href="style\.css"[^>]*?>/, '');
    htmlContent = htmlContent.replace(/<script[^>]*?src="index\.js"[^>]*?><\/script>/, '');
  
    // Get CSS and JS content
    const cssContent = getFileContent('style.css');
    const jsContent = getFileContent('index.js');
  
    // Inject CSS into HTML head
    if (cssContent) {
      htmlContent = htmlContent.replace(
        '</head>',
        `<style>${cssContent}</style>\n</head>`
      );
    }
  
    // Inject JS into HTML body
    if (jsContent) {
      htmlContent = htmlContent.replace(
        '</body>',
        `<script>${jsContent}</script>\n</body>`
      );
    }
  
    return htmlContent;
  };
  const getLineCount = (content) => content.split('\n').length;

  // download zip files
  const downloadFilesAsZip = async () => {
  try {
    if (files.length === 0) return;
    
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();
    
    // Add files to zip
    files.forEach(file => {
      zip.file(file.name, file.content);
    });
    
    // Generate zip file
    const content = await zip.generateAsync({ type: 'blob' });
    
    // Create download link
    const url = URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = url;
    link.download = `YugmaAi-Project.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    setTimeout(() => URL.revokeObjectURL(url), 100);
  } catch (error) {
    console.error('Error generating zip:', error);
    
    // Add error message to chat
    const errorMessage = {
      id: messages.length + 1,
      text: "Failed to generate download. Please try again.",
      sender: 'ai'
    };
    setMessages(prev => [...prev, errorMessage]);
  }
};

const handleSync = async () => {
  setIsSyncing(true);
  try {
    // first it check the user is logged in or not
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Get the summary from the last AI message or create one
    const lastAiMessage = messages.filter(msg => msg.sender === 'ai').pop();
    const summary = lastAiMessage ? lastAiMessage.text : 'No summary available';
    
    // Get project name or create default
    const projectNameToSave = projectNameRef.current || 'Untitled Project';
    
    // Get the original prompt from the first user message
    const firstUserMessage = messages.find(msg => msg.sender === 'user');
    const originalPrompt = firstUserMessage ? firstUserMessage.text : newMessage;

    await sendGeneration(
      getFileContent('index.html'), 
      getFileContent('style.css'), 
      getFileContent('index.js'), 
      summary,  // Use the summary from chat
      projectNameToSave,  // Use the generated project name
      originalPrompt  // Use the original prompt
    );

    console.log('Project Saved to Dashboard successfully!');
    
    // Optional: Add success message to chat
    const successMessage = {
      id: messages.length + 1,
      text: "Project saved to Dashboard!",
      sender: 'ai'
    };
    setMessages(prev => [...prev, successMessage]);
  } catch (error) {
    console.error('Sync failed:', error);
    
    // Add error message to chat
    const errorMessage = {
      id: messages.length + 1,
      text: "Failed to save project. Please try again.",
      sender: 'ai'
    };
    setMessages(prev => [...prev, errorMessage]);
  } finally {
    setIsSyncing(false);
  }
};

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white w-full pt-16">
      {/* Chat Sidebar (25% width) */}
      <div className="w-full md:w-1/4 h-[400px] md:h-auto bg-gray-800 flex flex-col border-r border-gray-700">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
  <h2 className="text-xl font-bold">Yugma Chat</h2>
  {/* model select */}
          <select 
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="bg-gray-700 text-white rounded px-3 py-1 text-sm"
          >
            <option value="mainGemini">Gemini 2.5 Flash</option>
            <option value="mainGpt">GPT 4.1</option>
            <option value="mainDeepseek">Deepseek R1-Chimera</option>
            <option value="mainLangchain">GPT 4.1 NANO</option>
            <option value="mainMistral">Codestral 2501</option>
          </select>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`p-3 rounded-lg ${message.sender === 'ai' ? 'bg-gray-700' : 'bg-blue-600 ml-4'}`}
            >
              <p>{message.text}</p>
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="p-3 rounded-lg bg-gray-700 flex items-center">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <span className="ml-2 text-gray-300">Wait while generating content...</span>
            </div>
          )}
        </div>
        
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700">
          <div className="flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-700 text-white rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button 
              type="submit"
              className={`px-4 rounded-r-lg transition duration-200 ${isLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </form>
      </div>
      
      {/* Code Editor Panel (75% width) */}
      <div className="w-full md:w-3/4 md:flex flex-col">
        {/* Simulated VS Code header */}
        <div className="bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="ml-4 text-sm text-gray-400 md:block hidden">
              Builder - {(projectNameRef.current?.length > 0) ? projectNameRef.current : 'Ai Website Builder'}
            </div>
            <div className="ml-4 md:hidden">
              <span className="text-sm">•••</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button 
              className="text-sm px-3 py-1 rounded bg-green-600 hover:bg-green-700 transition duration-200"
              onClick={downloadFilesAsZip}
              disabled={files.length === 0 || isLoading}
              title="Download as ZIP"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="md:inline hidden ml-1">Download as ZIP</span>
            </button>
            
            <button
  className="text-sm px-3 py-1 rounded bg-purple-600 hover:bg-purple-700 transition duration-200 flex items-center"
  onClick={handleSync}
  disabled={files.length === 0 || isLoading || isSyncing}
  title="Save Project"
>
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
  <span className="md:inline hidden ml-1">
    {isSyncing ? 'Saving...' : 'Save'}

  </span>
</button>
            <button 
              className={`text-sm px-3 py-1 rounded transition duration-200 ${viewMode === 'code' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'}`}
              onClick={() => setViewMode('code')}
              title="Code"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <span className="md:inline hidden ml-1">Code</span>
            </button>
            <button 
              className={`text-sm px-3 py-1 rounded transition duration-200 ${viewMode === 'preview' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'}`}
              onClick={() => setViewMode('preview')}
              title="Preview"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="md:inline hidden ml-1">Preview</span>
            </button>
            <button 
              className="text-sm px-3 py-1 rounded bg-purple-600 hover:bg-purple-700 transition duration-200"
              onClick={() => setIsFullscreen(!isFullscreen)}
              disabled={files.length === 0 || isLoading}
              title="Fullscreen"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              <span className="md:inline hidden ml-1">{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
            </button>
          </div>
        </div>
        
        {/* Conditional rendering based on view mode */}
        {viewMode === 'code' ? (
          <div className="flex flex-1 overflow-hidden h-[calc(100vh-450px)]">
            {/* File Explorer */}
            <div className="w-48 bg-gray-800 border-r border-gray-700 overflow-y-auto">
              <div className="p-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Explorer</div>
              {files.length > 0 ? (
                <div className="py-1">
                  {files.map((file) => {
                    const lineCount = getLineCount(file.content);
                    return (
                      <div 
                        key={file.id}
                        onClick={() => setActiveFileId(file.id)}
                        className={`px-4 py-2 text-sm cursor-pointer flex justify-between items-center rounded-lg ${activeFileId === file.id ? 'bg-gray-700 text-blue-400' : 'text-gray-400 hover:bg-gray-750'}`}
                      >
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="text-gray-300">{file.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-500 text-xs font-mono">new</span>
                          <span className="text-green-500 text-xs font-mono">+{lineCount}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">
                  No files generated yet
                  <br />
                  <span className="text-xs">Start a conversation to generate code files</span>
                </div>
              )}
            </div>
            
            {/* Editor Area */}
            {files.length > 0 ? (
              <div className="flex-1 flex flex-col overflow-hidden relative">
                {isLoading && (
                  <div className="absolute inset-0 z-10 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center">
                    <img 
                      src="/Yugma_Logo.png" 
                      className="w-16 h-16 text-blue-500 animate-pulse" 
                      alt="Loading indicator"
                    />
                    <div className="">
                      <div className="text-white text-sm">Generating Code</div>
                    </div>
                  </div>
                )}
                <div className="bg-gray-800 px-4 py-2 text-sm border-b border-gray-700">
                  {activeFile?.name}
                </div>
                <textarea
                  value={activeFile?.content || ''}
                  onChange={handleFileContentChange}
                  className="flex-1 bg-gray-900 text-gray-100 p-4 font-mono text-sm focus:outline-none resize-none"
                  style={{
                    fontFamily: 'Consolas, Monaco, "Courier New", monospace'
                  }}
                  spellCheck="false"
                />
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-900">
                <div className="text-center text-gray-500">
                  <div className="text-lg mb-2">No files generated yet</div>
                  <div className="text-sm">Start a conversation to generate code files</div>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Preview Area
                <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white p-0' : 'flex-1 overflow-hidden bg-white p-3 h-full'}`}>
            <div className={`${isFullscreen ? 'h-full w-full' : 'h-full border border-gray-300 rounded overflow-auto'}`}>
              {files.length > 0 ? (
                <>
                  {isFullscreen && (
                    <button
                      onClick={() => setIsFullscreen(false)}
                      className="fixed bottom-4 right-4 z-50 bg-red-600/20 backdrop-blur-sm border-red-500 text-red-500 rounded-full px-2 py-1 rounded-lg shadow-lg  transition duration-200"
                    >
                      Exit
                    </button>
                  )}
                  <iframe
                    title="preview"
                    srcDoc={getPreviewContent()}
                    className="w-full h-full"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <div className="text-lg mb-2">No preview available</div>
                    <div className="text-sm">Start a conversation to generate and preview your website</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Builder;
