import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminHome from './pages/AdminHome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/auth/signup" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/:id" element={<Package />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/clients/:id" element={<Client />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/trainers/:id" element={<Trainer />} />
      </Routes>
    </Router>
  );
}

export default App;