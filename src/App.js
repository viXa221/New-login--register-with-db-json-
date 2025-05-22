// App.js
import LoginForm from './Components/LoginForm';
import RegistrationForm from './Components/RegistrationForm';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; // Премахни Navigate, useState, useEffect, ако не ги ползваш тук
import React from 'react'; // useState, useEffect премахнати, ако не са нужни за App.js директно
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/login">Вход</Link></li>
            <li><Link to="/register">Регистрация</Link></li>
          </ul>
        </nav>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/register" element={<RegistrationForm/>}/>
          <Route path="/login" element={<LoginForm/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;