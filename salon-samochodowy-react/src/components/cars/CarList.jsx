import React, { useState, useEffect } from 'react';
import { CarCard } from './CarCard';
import { getAllCars } from '../../services/carService';
import { createRental } from '../../services/rentalService';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const data = await getAllCars();
      setCars(data);
    } catch (err) {
      setError('Failed to load cars');
    } finally {
      setLoading(false);
    }
  };

  const handleRent = async (carId) => {
    try {
      const rentalData = {
        carId,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days rental
      };
      await createRental(rentalData);
      fetchCars(); // Refresh car list
    } catch (err) {
      setError('Failed to rent car');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cars.map(car => (
        <CarCard key={car.id} car={car} onRent={handleRent} />
      ))}
    </div>
  );

};
export default CarList;