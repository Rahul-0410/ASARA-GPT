import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Intro from './intro/Intro.jsx';
import Login from './LOGIN/login';
import './App'
import SignUp from './SignUp/SignUp';
import { AuthProvider } from './AuthContext.jsx';
import Questions from './q-ascreen/qscreen.jsx';

import Home from './Home/home.jsx';
function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/questions" element={<Questions />} />
        {/* Add more routes as needed */}
        {/* <Route path="/calculator" element={<Calculator />} /> */}
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
