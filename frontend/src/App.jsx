import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import StartTest from './components/StartTest';
import Test from './components/Test';
import Result from './components/Result';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userAnswers, setUserAnswers] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<Login setToken={setToken} />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/start-test" element={<StartTest />} />
        <Route path="/test" element={<Test token={token} userAnswers={userAnswers} setUserAnswers={setUserAnswers} />} />
        <Route path="/result" element={<Result token={token} userAnswers={userAnswers} />} />
      </Routes>
    </Router>
  );
}

export default App;
