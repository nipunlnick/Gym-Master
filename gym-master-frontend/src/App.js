import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DateProvider } from './context/DateContext';

import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Trainers from './pages/Trainers';
import TrainerProfile from './pages/TrainerProfile';
import Clients from './pages/Clients';
import ClientProfile from './pages/ClientProfile';
import Packages from './pages/Packages';

function App() {
  return (
    <DateProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/trainers/:trainerId" element={<TrainerProfile />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/:clientId" element={<ClientProfile />} />
          <Route path="/packages" element={<Packages />} />
        </Routes>
      </Router>
    </DateProvider>
  );
}

export default App;