import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './Dashboard';
import Cadastro from './pages/Cadastro';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      
      <Route path="/cadastro" element={<Cadastro />} />

      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>

  );
}