import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './LOGIN/login';
import './App'
import SignUp from './SignUp/SignUp';
import { AuthProvider } from './AuthContext.jsx';
import Questions from './q-ascreen/qscreen.jsx';
function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/home" element={<h1>Home</h1>} />
        <Route path="/questions" element={<Questions />} />
        {/* Add more routes as needed */}
        {/* <Route path="/calculator" element={<Calculator />} /> */}
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
