import React from 'react';
import { useAuth } from '../../context/AuthContext';

export const CarCard = ({ car, onRent }) => {
  const { user } = useAuth();

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold">{car.brand} {car.model}</h2>
      <div className="mt-2 space-y-1">
        <p>Year: {car.year}</p>
        <p>Price: ${car.price}</p>
        <p>Horse Power: {car.horsePower}</p>
        <p>VIN: {car.vin}</p>
        <p className={car.isAvailableForRent ? 'text-green-600' : 'text-red-600'}>
          {car.isAvailableForRent ? 'Available' : 'Not Available'}
        </p>
      </div>
      {user && car.isAvailableForRent && (
        <button
          onClick={() => onRent(car.id)}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
        >
          Rent Car
        </button>
      )}
    </div>
  );
};