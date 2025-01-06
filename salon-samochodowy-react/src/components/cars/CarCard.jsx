import React from 'react';
import { useAuth } from '../../context/AuthContext';

export const CarCard = ({ car, onRent }) => {
  const { user } = useAuth();

  return (
    <div className="card h-100 shadow-lg">
      {/* Nagłówek */}
      <div className="card-header bg-primary text-white text-center">
        <h5 className="card-title mb-0">
          {car.brand} {car.model}
        </h5>
      </div>

      {/* Treść karty */}
      <div className="card-body">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Year:</strong> {car.year}
          </li>
          <li className="list-group-item">
            <strong>Price:</strong> ${car.price}
          </li>
          <li className="list-group-item">
            <strong>Horse Power:</strong> {car.horsePower}
          </li>
          <li className="list-group-item">
            <strong>VIN:</strong> {car.vin}
          </li>
          <li
            className={`list-group-item fw-bold ${
              car.isAvailableForRent ? 'text-success' : 'text-danger'
            }`}
          >
            {car.isAvailableForRent ? 'Available' : 'Not Available'}
          </li>
        </ul>
      </div>

      {/* Przyciski */}
      <div className="card-footer text-center">
        {user && car.isAvailableForRent ? (
          <button
            onClick={() => onRent(car.id)}
            className="btn btn-success w-100"
          >
            Rent Car
          </button>
        ) : (
          <button className="btn btn-secondary w-100" disabled>
            {car.isAvailableForRent ? 'Login to Rent' : 'Not Available'}
          </button>
        )}
      </div>
    </div>
  );
};
