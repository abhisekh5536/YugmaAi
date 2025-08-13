export default function sendGeneration(html, css, js, summary, name, prompt) {

  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found. Please log in.');
  }

  const formData = {
    html: html,
    css: css,
    js: js,
    summary: summary,
    name: name,
    prompt: prompt,
  };


  return fetch('http://localhost:5000/api/generations', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Generation saved successfully:', data);
    return data;
  })
  .catch(error => {
    console.error('Error saving generation:', error);
    throw error; 
  });
}