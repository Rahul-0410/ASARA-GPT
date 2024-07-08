import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './LOGIN/login';
import './App'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Add more routes as needed */}
        {/* <Route path="/calculator" element={<Calculator />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
