import React, { useState, useEffect } from 'react';
import { getAllRentals, deleteRental } from '../../services/rentalService';
import { getCarById } from '../../services/carService';
import { useAuth } from '../../context/AuthContext';
import PropTypes from 'prop-types';

const RentalList = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      const data = await getAllRentals();
      const rentalsWithCars = await Promise.all(
        data.map(async (rental) => {
          const car = await getCarById(rental.carId);
          return { ...rental, car };
        })
      );
      setRentals(rentalsWithCars);
    } catch (err) {
      setError('Failed to load rentals');
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (rentalId) => {
    try {
      await deleteRental(rentalId);
      fetchRentals();
    } catch (err) {
      setError('Failed to return car');
    }
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">My Rentals</h2>
      <div className="grid gap-4">
        {rentals.length === 0 ? (
          <p className="text-gray-500 text-center">No active rentals found</p>
        ) : (
          rentals.map(rental => (
            <div key={rental.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">
                    {rental.car?.brand} {rental.car?.model}
                  </h3>
                  <div className="mt-2 space-y-1 text-gray-600">
                    <p>Start Date: {new Date(rental.startDate).toLocaleDateString()}</p>
                    <p>End Date: {new Date(rental.endDate).toLocaleDateString()}</p>
                    <p>VIN: {rental.car?.vin}</p>
                    <p>Price: ${rental.car?.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleReturn(rental.carId)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  Return Car
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RentalList;

RentalList.propTypes = {
  rentals: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    car: PropTypes.shape({
      brand: PropTypes.string.isRequired,
      model: PropTypes.string.isRequired,
      vin: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    })
  })),
  onReturn: PropTypes.func.isRequired
};