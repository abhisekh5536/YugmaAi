import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [prompt, setPrompt] = useState('');

  const examplePrompts = [
    'Create a financial dashboard',
    'Design a portfolio website',
    'Build a project management tool',
    'Make a landing page for a startup',
    'Generate a CRM dashboard',
    'Build a mobile banking app'
  ];

  const navigate = useNavigate();

  const handleGenerateApp = () => {
    navigate('/builder', { state: { prompt } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 w-screen">
      <div className="max-w-4xl w-full text-center">
        {/* Header */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4 mt-12 sm:mt-16 md:mt-20">
            Btao Maalik kya bnau?
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mt-3 sm:mt-4">
            The fastest way to go from idea to production with AI-powered development
          </p>
        </div>
        
        {/* Main Prompt Area */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 border border-gray-700 shadow-xl max-w-3xl mx-auto transition-all duration-300 hover:border-gray-600">
          <div className="flex items-start mb-3 sm:mb-4">
            <div className="mr-2 sm:mr-3">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500 inline-block mr-1"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500 inline-block mr-1"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 inline-block"></div>
            </div>
            <div className="text-xs sm:text-sm text-gray-400">Terminal</div>
          </div>
          
          <div className="bg-gray-900/80 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 text-left font-mono text-sm min-h-[100px] sm:min-h-[120px] md:min-h-[140px] flex items-center">
            <span className="text-purple-400 mr-1 sm:mr-2 text-sm">$</span>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want to build..."
              className="w-full bg-transparent text-white placeholder-gray-500 resize-none border-none outline-none text-sm sm:text-base"
              rows={2}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <button className="flex items-center gap-1 sm:gap-2 text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Enhance with AI
            </button>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors duration-200 rounded-lg hover:bg-gray-700">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
              
              <button 
                onClick={handleGenerateApp} 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg font-medium flex items-center gap-1 sm:gap-2 transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-500/20 text-sm sm:text-base"
              >
                Generate App
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Example Prompts */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <p className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">Try these examples:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 max-w-4xl mx-auto">
            {examplePrompts.map((examplePrompt, index) => (
              <button
                key={index}
                className="bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white px-3 py-2 sm:px-4 sm:py-3 rounded-lg transition-all duration-200 text-xs sm:text-sm font-medium border border-gray-700 hover:border-gray-600 text-left"
                onClick={() => setPrompt(examplePrompt)}
              >
                {examplePrompt}
              </button>
            ))}
          </div>
        </div>
        
        {/* Features Section */}
        <div className="max-w-4xl mx-auto pt-8 sm:pt-10 md:pt-12 border-t border-gray-800">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div className="p-3 sm:p-4">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500/10 text-blue-500 mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">Code Generation</h3>
              <p className="text-gray-400 text-xs sm:text-sm">AI-powered code generation with modern frameworks</p>
            </div>
            
            <div className="p-3 sm:p-4">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-500/10 text-purple-500 mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">Deploy Instantly</h3>
              <p className="text-gray-400 text-xs sm:text-sm">One-click deployment with global CDN</p>
            </div>
            
            <div className="p-3 sm:p-4">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-500/10 text-green-500 mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">Scale Effortlessly</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Automatic scaling for any traffic demands</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;