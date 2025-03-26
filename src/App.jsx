// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SECODashboard from './pages/SECODashboard';
import './styles/App.css';

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