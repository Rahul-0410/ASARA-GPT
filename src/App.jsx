import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './LOGIN/login';
import './App'
import SignUp from './SignUp/SignUp';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/home" element={<h1>Home</h1>} />
        {/* Add more routes as needed */}
        {/* <Route path="/calculator" element={<Calculator />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
