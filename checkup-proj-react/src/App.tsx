import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import Login from './components/login';
import Test from './components/test'
import Card from './components/card1'
import Admin from './components/admin'

const App: React.FC = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
      <Route path="" element={<Login onLoginSuccess={handleLoginSuccess} />} />
      <Route path="/" element={isLoggedIn ? <Test /> : <Navigate to="/login" />} />
      <Route path="test" element={<Test />} />
      <Route path="/admin" element={<Admin/>} />
      <Route path="/card1" element={<Card />} />
      </Routes>
    </Router>
  );
};

export default App;
