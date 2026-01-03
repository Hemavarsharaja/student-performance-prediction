import React, { useState } from 'react';
import './App.css';
import StudentForm from './components/StudentForm';
import ResultCard from './components/ResultCard';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePredict = async (formData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Student Performance Predictor</h1>
        <p>Predict student pass/fail status and expected score</p>
      </header>

      <main className="app-main">
        <StudentForm onSubmit={handlePredict} loading={loading} />

        {loading && <p className="loading">Predicting...</p>}
        {error && <p className="error">Error: {error}</p>}
        {result && <ResultCard result={result} />}
      </main>
    </div>
  );
}

export default App;
