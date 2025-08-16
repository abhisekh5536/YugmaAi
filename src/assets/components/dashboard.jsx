import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';




const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        // Fetch user data
        const userResponse = await fetch(`${process.env.BACKEND_URL}/auth/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();
        setUser(userData);

        // Fetch generations
        const generationsResponse = await fetch(`${process.env.BACKEND_URL}/generations`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!generationsResponse.ok) throw new Error('Failed to fetch generations');
        const generationsData = await generationsResponse.json();
        setProjects(generationsData);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        // Optionally show error to user
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);




  const filteredProjects = projects.filter(project => 
    project && 
    project.name && 
    project.prompt && 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    project.prompt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleOpenProject = (project) => {
    navigate('/builder', {
      state: {
        prompt: project.prompt,
        files: [
          { id: 1, name: 'index.html', content: project.html },
          { id: 2, name: 'style.css', content: project.css },
          { id: 3, name: 'index.js', content: project.js }
        ],
        fromDashboard: true,
        summary: project.summary,
        name: project.name
      }
    });
  };

  const handleDeleteProject = async (projectId, e) => {
    e.stopPropagation();
    const confirmDelete = window.confirm('Are you sure you want to delete this project?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/generations/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete project');
      
      // Update state to remove the deleted project
      setProjects(projects.filter(project => project._id !== projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
      // Optionally show error to user
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white pt-24 pb-16 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* User Header */}
        {user && (
          <div className="mb-8 bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 shadow-xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border-2 border-blue-500 flex items-center justify-center bg-gray-700 text-white font-bold text-xl">
                  {user.username && user.username.split(' ').map(name => name[0]).join('')}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Welcome back, {user.username}</h2>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400 mt-1">
                    <span>{user.email}</span>
                    <span>•</span>
                    <span>Member since {formatDate(user.createdAt)}</span>
                    <span>•</span>
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-400 rounded-full text-xs">
                      {user.plan} Plan
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors px-4 py-2 rounded-lg border border-red-400/30 hover:bg-red-400/10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Your Projects
          </h1>
          <p className="text-gray-400 mt-3 sm:mt-4 text-sm sm:text-base max-w-3xl">
            View and manage all your previous AI-generated projects
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 sm:mb-8 bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-gray-700 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-500/20" onClick={() => navigate('/builder', { state: { prompt:'' } })}>

              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Project
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 shadow-xl overflow-hidden transition-all duration-300 hover:border-gray-600 hover:shadow-blue-500/20 hover:transform hover:-translate-y-1 cursor-pointer"
                onClick={() => handleOpenProject(project)}
              >
                <div className="p-5 sm:p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg sm:text-xl font-semibold text-white truncate">{project.name}</h3>
                    <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded-full min-w-[100px] text-center">
                      {formatDate(project.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">{project.prompt}</p>
                  <div className="bg-gray-900/60 rounded-lg p-3 text-xs text-gray-300 font-mono mb-4">
                    <p className="line-clamp-3">{project.summary}</p>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <div className="flex space-x-2">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        HTML
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                        CSS
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        JS
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        className="text-red-400 hover:text-red-300 transition-colors"
                        onClick={(e) => handleDeleteProject(project._id, e)}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      <button 
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle download or other action
                        }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 shadow-xl p-8 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No projects found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {searchTerm ? 'No projects match your search. Try a different term.' : 'You haven\'t created any projects yet. Start by generating a new project.'}
            </p>
            {!searchTerm && (
              <button className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-500/20">
                Create Your First Project
              </button>
            )}
          </div>
        )}

        {/* Stats Section */}
        {!isLoading && projects.length > 0 && (
          <div className="mt-12 bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 shadow-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Your Stats</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-gray-900/60 rounded-lg p-4 border border-gray-700">
                <p className="text-gray-400 text-sm">Total Projects</p>
                <p className="text-2xl font-bold text-white">{projects.length}</p>
              </div>
              <div className="bg-gray-900/60 rounded-lg p-4 border border-gray-700">
                <p className="text-gray-400 text-sm">Last Created</p>
                <p className="text-2xl font-bold text-white">
                  {projects.length > 0 ? formatDate(projects[0].createdAt) : 'N/A'}
                </p>
              </div>
              <div className="bg-gray-900/60 rounded-lg p-4 border border-gray-700">
                <p className="text-gray-400 text-sm">HTML Files</p>
                <p className="text-2xl font-bold text-white">{projects.length}</p>
              </div>
              <div className="bg-gray-900/60 rounded-lg p-4 border border-gray-700">
                <p className="text-gray-400 text-sm">Lines of Code</p>
                <p className="text-2xl font-bold text-white">
                  {projects.reduce((acc, project) => acc + project.html.split('\n').length, 0) + 
                   projects.reduce((acc, project) => acc + project.css.split('\n').length, 0) + 
                   projects.reduce((acc, project) => acc + project.js.split('\n').length, 0)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;