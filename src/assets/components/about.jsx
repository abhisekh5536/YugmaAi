import React from 'react';

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white pt-24 pb-16 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            About Yugma.Ai
          </h1>
          <p className="text-gray-400 mt-3 sm:mt-4 text-sm sm:text-base max-w-3xl mx-auto">
            Yugma.Ai is an AI-powered website builder that turns ideas into production-ready web projects in seconds. It generates modern, responsive layouts using semantic markup, clean styling, and interactive behaviors while letting you edit, preview, and export instantly.
          </p>
        </header>

        {/* Project Overview */}
        <section className="bg-gray-800/50 border border-gray-700 rounded-2xl p-5 sm:p-8 backdrop-blur-xl shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h2 className="text-2xl sm:text-3xl font-semibold">What is Yugma.Ai?</h2>
              <p className="text-gray-400 mt-3 text-sm sm:text-base">
                Yugma.Ai streamlines front-end creation by combining AI-assisted code generation with a live, in-browser editing experience. Describe your idea, and Yugma.Ai returns a complete <span className="text-blue-400">index.html</span>, <span className="text-blue-400">style.css</span>, and <span className="text-blue-400">index.js</span> with a modern UI, responsive design, and interactions.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-4">
                  <h3 className="text-lg font-semibold">Key Capabilities</h3>
                  <ul className="text-gray-400 mt-2 text-sm list-disc list-inside space-y-1">
                    <li>AI-driven generation for complete web pages</li>
                    <li>Real-time preview with isolated sandbox</li>
                    <li>Editable code with instant feedback</li>
                    <li>One-click ZIP export of generated files</li>
                    <li>Secure user authentication system</li>
                    <li>Cloud storage for all your projects</li>
                  </ul>
                </div>
                <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-4">
                  <h3 className="text-lg font-semibold">Design Principles</h3>
                  <ul className="text-gray-400 mt-2 text-sm list-disc list-inside space-y-1">
                    <li>Responsive-first, mobile-friendly layouts</li>
                    <li>Clean, accessible, and semantic structure</li>
                    <li>Modern visuals consistent with site theme</li>
                    <li>Performance and clarity in code</li>
                    <li>Secure data handling and storage</li>
                    <li>Scalable architecture for future growth</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Developer Card */}
            <aside className="bg-gray-900/60 border border-gray-700 rounded-2xl p-5 h-fit">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 grid place-items-center shadow-lg select-none">
                <span className="text-2xl sm:text-3xl font-bold">AY</span>
              </div>
              <h3 className="text-xl font-semibold mt-4">Developer</h3>
              <p className="text-gray-300">Abhisekh Yadav</p>
              <p className="text-gray-400 mt-2 text-sm">
                Full-stack developer passionate about creating seamless user experiences with robust backend systems.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <a
                  href="https://www.linkedin.com/in/abhisekh-yadav-493306248/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors border border-blue-500/40"
                  title="LinkedIn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/abhisekh__yadav/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-pink-600 hover:bg-pink-700 transition-colors border border-pink-500/40"
                  title="Instagram"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://x.com/abhisekh_y50320"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors border border-gray-500/40"
                  title="X (Twitter)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
              </div>
            </aside>
          </div>
        </section>

        {/* Architecture & Stack */}
        <section className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-5 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-semibold">Frontend Architecture</h3>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">
              The app is built with React and Vite. It integrates multiple AI providers to generate structured JSON containing HTML, CSS, and JavaScript. The Builder page renders and previews code in an isolated iframe sandbox for safety and fidelity.
            </p>
            <ul className="text-gray-400 mt-4 text-sm list-disc list-inside space-y-1">
              <li>React (UI) + Vite (bundler/dev)</li>
              <li>Tailwind CSS for consistent styles and fast iteration</li>
              <li>Multiple AI backends: Gemini, GPT, and more</li>
              <li>ZIP export to download generated code</li>
              <li>React Router for seamless navigation</li>
              <li>Responsive design for all device sizes</li>
            </ul>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-5 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-semibold">Backend Architecture</h3>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">
              The backend is built with Node.js and Express.js, providing a robust API for user authentication, project storage, and AI integration. MongoDB serves as the database for storing user data and projects securely.
            </p>
            <ul className="text-gray-400 mt-4 text-sm list-disc list-inside space-y-1">
              <li>Node.js runtime environment</li>
              <li>Express.js framework for API routes</li>
              <li>MongoDB with Mongoose for data persistence</li>
              <li>JWT for secure authentication</li>
              <li>RESTful API design principles</li>
              <li>Secure password hashing with bcrypt</li>
            </ul>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mt-10 bg-gray-800/50 border border-gray-700 rounded-2xl p-5 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4">Full Tech Stack</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {/* Frontend Technologies */}
            <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-4 text-center">
              <p className="text-gray-300 text-sm">React</p>
            </div>
            <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-4 text-center">
              <p className="text-gray-300 text-sm">Vite</p>
            </div>
            <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-4 text-center">
              <p className="text-gray-300 text-sm">Tailwind CSS</p>
            </div>
            <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-4 text-center">
              <p className="text-gray-300 text-sm">OpenAI / Gemini</p>
            </div>
            <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-4 text-center">
              <p className="text-gray-300 text-sm">Langchain-LLM</p>
            </div>
            <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-4 text-center">
              <p className="text-gray-300 text-sm">JSZip</p>
            </div>
            
            {/* Backend Technologies */}
            <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-4 text-center">
              <p className="text-gray-300 text-sm">Node.js</p>
            </div>
            <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-4 text-center">
              <p className="text-gray-300 text-sm">Express.js</p>
            </div>
            <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-4 text-center">
              <p className="text-gray-300 text-sm">MongoDB</p>
            </div>
            <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-4 text-center">
              <p className="text-gray-300 text-sm">JWT</p>
            </div>
            <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-4 text-center">
              <p className="text-gray-300 text-sm">Mongoose</p>
            </div>
            <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-4 text-center">
              <p className="text-gray-300 text-sm">Bcrypt</p>
            </div>
          </div>
        </section>

        {/* Data Storage */}
        <section className="mt-10 bg-gray-800/50 border border-gray-700 rounded-2xl p-5 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4">Project Storage System</h3>
          <p className="text-gray-400 text-sm sm:text-base mb-4">
            Yugma.Ai securely stores all your generated projects in the cloud, allowing you to access them from anywhere. Each project includes the complete code (HTML, CSS, JS) along with metadata like creation date and modification history.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-4">
              <p className="text-gray-300 font-semibold">Secure Storage</p>
              <p className="text-gray-400 text-sm mt-1">Projects are stored with encryption and only accessible to authenticated users.</p>
            </div>
            <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-4">
              <p className="text-gray-300 font-semibold">Version Control</p>
              <p className="text-gray-400 text-sm mt-1">Track changes and revert to previous versions of your projects.</p>
            </div>
            <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-4">
              <p className="text-gray-300 font-semibold">Instant Access</p>
              <p className="text-gray-400 text-sm mt-1">Retrieve your projects instantly from any device with your credentials.</p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mt-10 bg-gray-800/50 border border-gray-700 rounded-2xl p-5 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-semibold">How It Works</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-4">
              <p className="text-gray-300 font-semibold">1. Describe</p>
              <p className="text-gray-400 text-sm mt-1">Enter your idea on the Home page or use sample prompts.</p>
            </div>
            <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-4">
              <p className="text-gray-300 font-semibold">2. Generate</p>
              <p className="text-gray-400 text-sm mt-1">AI returns HTML, CSS, and JS aligned with your prompt.</p>
            </div>
            <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-4">
              <p className="text-gray-300 font-semibold">3. Edit</p>
              <p className="text-gray-400 text-sm mt-1">Tweak code directly in the Builder and see instant preview.</p>
            </div>
            <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-4">
              <p className="text-gray-300 font-semibold">4. Export</p>
              <p className="text-gray-400 text-sm mt-1">Download the files as a ZIP and deploy anywhere.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-5 sm:p-8">
            <h3 className="text-lg sm:text-xl font-semibold">Is the generated code production-ready?</h3>
            <p className="text-gray-400 text-sm mt-2">
              It provides a strong starting point with clean patterns and responsiveness. You can refine styles, content, or interactions as needed for production.
            </p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-5 sm:p-8">
            <h3 className="text-lg sm:text-xl font-semibold">How are my projects saved?</h3>
            <p className="text-gray-400 text-sm mt-2">
              Projects are securely stored in MongoDB with your account. You can access them anytime from your dashboard after logging in.
            </p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-5 sm:p-8">
            <h3 className="text-lg sm:text-xl font-semibold">Can I customize the output?</h3>
            <p className="text-gray-400 text-sm mt-2">
              Yes. Edit the generated HTML, CSS, and JS in the Builder, preview changes live, and export when satisfied.
            </p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-5 sm:p-8">
            <h3 className="text-lg sm:text-xl font-semibold">Is my data secure?</h3>
            <p className="text-gray-400 text-sm mt-2">
              Absolutely. We use industry-standard encryption, JWT authentication, and secure password hashing to protect your data.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;