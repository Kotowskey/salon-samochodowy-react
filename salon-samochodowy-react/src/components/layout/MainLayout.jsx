// Komponent prezentacyjny

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import CarList from '../cars/CarList';
import CarManagement from '../cars/CarManagement';
import RentalList from '../rentals/RentalList';
import CarDetails from '../cars/CarDetails';
import { useAuth } from '../../context/AuthContext';

const MainLayout = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<CarList />} />
          {user?.isDealer && (
            <Route path="/manage-cars" element={<CarManagement />} />
          )}
          <Route path="/rentals" element={<RentalList />} />
          <Route path="/cars/:id" element={<CarDetails />} />
        </Routes>
      </main>
    </div>
  );
};

export default MainLayout;