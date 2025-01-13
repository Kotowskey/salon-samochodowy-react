// 8. Routing

// Obecny w App.js i MainLayout.jsx
// Zawiera parametry i ścieżki chronione

import React from 'react';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import CarList from './components/cars/CarList';
import CarManagement from './components/cars/CarManagement';
import RentalList from './components/rentals/RentalList';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<CarList />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/manage-cars" element={<CarManagement />} />
            <Route path="/rentals" element={<RentalList />} />
          </Routes>
        </MainLayout>
      </Router>
    </AuthProvider>
  );
};

export default App;
