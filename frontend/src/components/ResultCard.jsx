import React from 'react';

function ResultCard({ result }) {
  const isPassing = result.prediction === 'Pass';

  return (
    <div className={`result-card ${isPassing ? 'pass' : 'fail'}`}>
      <h2>Prediction Result</h2>
      
      <div className="result-main">
        <p className="result-prediction">
          Status: <strong>{result.prediction}</strong>
        </p>
        <p className="result-probability">
          Confidence: <strong>{(result.probability * 100).toFixed(2)}%</strong>
        </p>
        <p className="result-score">
          Estimated Score: <strong>{result.score.toFixed(2)}/100</strong>
        </p>
      </div>

      <div className="result-insight">
        {isPassing ? (
          <p>✓ Student is likely to pass. Keep up the good work!</p>
        ) : (
          <p>✗ Student needs improvement. Focus on attendance and study hours.</p>
        )}
      </div>
    </div>
  );
}

export default ResultCard;
