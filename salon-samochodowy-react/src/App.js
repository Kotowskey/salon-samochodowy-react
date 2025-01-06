import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import LoginForm from './components/auth/LoginForm';
import CarList from './components/cars/CarList';
import CarManagement from './components/cars/CarManagement';
import RentalList from './components/rentals/RentalList';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<CarList />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/manage-cars" element={<CarManagement />} />
            <Route path="/rentals" element={<RentalList />} />
          </Routes>
        </MainLayout>
      </AuthProvider>
    </Router>
  );
};

export default App;