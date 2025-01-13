import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import CarList from './components/cars/CarList';
import CarManagement from './components/cars/CarManagement';
import RentalList from './components/rentals/RentalList';

const PrivateRoute = ({ element, requiredRole }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && !user[requiredRole]) {
    return <Navigate to="/" replace />;
  }

  return element;
};

const AppRouter = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<CarList />} />
          <Route 
            path="/manage-cars" 
            element={
              <PrivateRoute 
                element={<CarManagement />} 
                requiredRole="isDealer" 
              />
            } 
          />
          <Route 
            path="/rentals" 
            element={
              <PrivateRoute 
                element={<RentalList />}
              />
            } 
          />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default AppRouter;