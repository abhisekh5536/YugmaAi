import { useState } from 'react'
import './App.css'

import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Home from "./assets/components/home";
import Navbar from './assets/components/navbar';
import Builder from './assets/components/builder';
import About from './assets/components/about';
import Dashboard from './assets/components/dashboard';
import Login from './assets/components/login';
import Signup from './assets/components/signup';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/about" element={<About />} />

          <Route path="/dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
