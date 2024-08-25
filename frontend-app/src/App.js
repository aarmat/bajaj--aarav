import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      // Clear previous errors
      setError('');

      // Parse JSON input
      const data = JSON.parse(jsonInput);

      // Make POST request to the backend
      const result = await axios.post('http://localhost:3001/bfhl', { data });

      // Set response data
      setResponse(result.data);
    } catch (err) {
      // Handle error and set error message
      setError('Invalid JSON format or server error');
    }
  };

  return (
    <div>
      <h1>JSON Input</h1>
      <textarea
        rows="5"
        cols="50"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON here, e.g., {"data":["M","1","334","4","B","Z","a"]}'
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {response && (
        <div>
          <h2>Response</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
