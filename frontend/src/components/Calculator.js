import React, { useState } from 'react';

function Calculator() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [result, setResult] = useState(0);

  const calculate = (operation) => {
    let res;
    if (operation === 'add') res = num1 + num2;
    else if (operation === 'subtract') res = num1 - num2;
    else if (operation === 'multiply') res = num1 * num2;
    setResult(res);
  };

  // Styles
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Arial, sans-serif',
  };

  const calculatorStyle = {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    margin: '0.5rem 0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  };

  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    margin: '0.5rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <div style={calculatorStyle}>
        <h2 style={{ marginBottom: '1.5rem' }}>Calculator</h2>
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(Number(e.target.value))}
          style={inputStyle}
        />
        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(Number(e.target.value))}
          style={inputStyle}
        />
        <div>
          <button onClick={() => calculate('add')} style={buttonStyle}>
            +
          </button>
          <button onClick={() => calculate('subtract')} style={buttonStyle}>
            -
          </button>
          <button onClick={() => calculate('multiply')} style={buttonStyle}>
            *
          </button>
        </div>
        <p style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
          Result: <strong>{result}</strong>
        </p>
      </div>
    </div>
  );
}

export default Calculator;