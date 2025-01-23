// 4. Komponent prezentacyjny

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import CarList from '../cars/CarList';
import CarManagement from '../cars/CarManagement';
import RentalList from '../rentals/RentalList';
import PurchasedCarsList from '../cars/PurchasedCarsList';
import CarDetails from '../cars/CarDetails';
import { useAuth } from '../../context/AuthContext';

const MainLayout = () => {
  const { user } = useAuth();

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar />
      <main className="container py-4 flex-grow-1">
        <Routes>
          <Route path="/" element={<CarList />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/rentals" element={
            user ? <RentalList /> : <Navigate to="/" replace />
          } />
          <Route path="/purchased-cars" element={
            user ? <PurchasedCarsList /> : <Navigate to="/" replace />
          } />
          <Route path="/manage-cars" element={
            user?.isDealer ? <CarManagement /> : <Navigate to="/" replace />
          } />
        </Routes>
      </main>
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <div className="container">
          <p className="mb-0">&copy; {new Date().getFullYear()} Car Rental System</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;