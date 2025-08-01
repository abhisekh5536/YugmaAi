import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { main } from "../../services/aimodel";


const Builder = () => {
  // State for chat messages
  const [messages, setMessages] = useState([
    { id: 1, text: "Jaldi boliye malik kya bnau? kal subh panvel nikalna hai", sender: 'ai' },

  ]);
  
  // State for new message input
  const location = useLocation();
  const [newMessage, setNewMessage] = useState('');
  
  const hasAutoSubmitted = useRef(false);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  const [isFullscreen, setIsFullscreen] = useState(false);



  
useEffect(() => {
  if (location.state?.prompt && !hasAutoSubmitted.current) {
    setNewMessage(location.state.prompt);
    handleAutoSubmit(location.state.prompt);
    hasAutoSubmitted.current = true;
  }
}, [location.state]);

  const handleAutoSubmit = async (promptText) => {
    
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
      // Call AI model with the message
      const response = await main(promptText);
      
      
      // Ensure response structure matches expected format
      const validatedResponse = {
          html: response?.html || '',
          css: response?.css || '',
          js: response?.js || '',
          summary: response?.summary || ''
      };

      setFiles([
          { id: 1, name: 'index.html', content: validatedResponse.html },
          { id: 2, name: 'style.css', content: validatedResponse.css },
          { id: 3, name: 'index.js', content: validatedResponse.js }
      ]);
      
      // Add AI response to chat
      const aiResponse = {
        id: messages.length + 2,
        text: validatedResponse.summary,
        sender: 'ai'
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      // Handle error case
      const errorMessage = {
        id: messages.length + 2,
        text: "Sorry, I encountered an error. Please try again.",
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

    const prompt = `This is the user Prompt: ${newMessage}`;
    const context = `Current HTML:\n${currentFiles.html}\n\nCurrent CSS:\n${currentFiles.css}\n\nCurrent JS:\n${currentFiles.js}`;
    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user'
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // Call AI model with the message
      const prompt = `Create a website for: ${newMessage}`;
      const response = await main(prompt, context);

      // Ensure response structure matches expected format
      const validatedResponse = {
          html: response?.html || '',
          css: response?.css || '',
          js: response?.js || '',
          summary: response?.summary || ''
      };

      setFiles([
          { id: 1, name: 'index.html', content: validatedResponse.html },
          { id: 2, name: 'style.css', content: validatedResponse.css },
          { id: 3, name: 'index.js', content: validatedResponse.js }
      ]);
      
      // Add AI response to chat
      const aiResponse = {
        id: messages.length + 2,
        text: validatedResponse.summary,
        sender: 'ai'
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      // Handle error case
      const errorMessage = {
        id: messages.length + 2,
        text: "Sorry, I encountered an error. Please try again.",
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

  return (
    <div className="flex h-screen bg-gray-900 text-white w-full pt-16">
      {/* Chat Sidebar (25% width) */}
      <div className="w-1/4 bg-gray-800 flex flex-col border-r border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Yugma Ai</h2>
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
              <span className="ml-2 text-gray-300">Rukiye malik kaam chalu h...</span>
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
      <div className="w-3/4 flex flex-col">
        {/* Simulated VS Code header */}
        <div className="bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="ml-4 text-sm text-gray-400">
              Builder - AI Website Generator
            </div>
          </div>
          <div className="flex space-x-2">
            <button 
              className="text-sm px-3 py-1 rounded bg-green-600 hover:bg-green-700 transition duration-200 ml-2"
              onClick={downloadFilesAsZip}
              disabled={files.length === 0 || isLoading}>
              Download as ZIP
            </button> 
            <button 
              className={`text-sm px-3 py-1 rounded transition duration-200 ${viewMode === 'code' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'}`}
              onClick={() => setViewMode('code')}
            >
              Code
            </button>
            <button 
              className={`text-sm px-3 py-1 rounded transition duration-200 ${viewMode === 'preview' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'}`}
              onClick={() => setViewMode('preview')}
            >
              Preview
            </button>
            <button 
              className="text-sm px-3 py-1 rounded bg-purple-600 hover:bg-purple-700 transition duration-200 ml-2"
              onClick={() => setIsFullscreen(!isFullscreen)}
              disabled={files.length === 0 || isLoading}
            >
              {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Preview'}
            </button> 
          </div>
        </div>
        
        {/* Conditional rendering based on view mode */}
        {viewMode === 'code' ? (
          <div className="flex flex-1 overflow-hidden">
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
              <div className="flex-1 flex flex-col overflow-hidden">
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
          <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white p-0' : 'flex-1 overflow-hidden bg-white p-4'}`}>
            <div className={`${isFullscreen ? 'h-full w-full' : 'h-full border border-gray-300 rounded overflow-auto'}`}>
              {files.length > 0 ? (
                <>
                  {isFullscreen && (
                    <button
                      onClick={() => setIsFullscreen(false)}
                      className="fixed top-4 right-4 z-50 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-700 transition duration-200"
                    >
                      Exit Fullscreen
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
