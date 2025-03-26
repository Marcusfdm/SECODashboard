// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SECODashboard from './SECODashboard';
// Remove incorrect CSS import
// import './styles/App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SECODashboard />} />
          <Route path="*" element={<SECODashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;