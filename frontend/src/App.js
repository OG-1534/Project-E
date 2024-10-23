import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Call the backend API at localhost:5000/api
    fetch('http://localhost:5000/api')
      .then(response => response.json())
      .then(data => {
        setMessage(data.message); // Update state with the message from the backend
      })
      .catch(error => {
        console.error('Error fetching the API:', error);
      });
  }, []); // Empty dependency array to ensure it runs once on mount

  return (
    <div className="App">
      <h1>Response from Backend</h1>
      <p>{message ? message : 'Loading...'}</p>
    </div>
  );
}

export default App;