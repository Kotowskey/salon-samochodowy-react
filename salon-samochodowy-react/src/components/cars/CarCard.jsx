import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import BuyCarForm from './BuyCarForm';

export const CarCard = ({ car, onRent, onUpdate }) => {
  const { user } = useAuth();
  const [showBuyForm, setShowBuyForm] = useState(false);
  const [actionError, setActionError] = useState('');

  const handleBuySuccess = () => {
    setShowBuyForm(false);
    setActionError('');
    onUpdate?.();
  };

  const handleRentClick = async () => {
    try {
      setActionError('');
      await onRent(car.id);
    } catch (err) {
      setActionError('Failed to rent the car. Please try again.');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="card h-100 shadow">
      {/* Header */}
      <div className="card-header bg-primary text-white">
        <h5 className="card-title mb-0 text-center">
          {car.brand} {car.model}
        </h5>
      </div>

      {/* Body */}
      <div className="card-body">
        {showBuyForm ? (
          <BuyCarForm
            car={car}
            onSuccess={handleBuySuccess}
            onCancel={() => {
              setShowBuyForm(false);
              setActionError('');
            }}
          />
        ) : (
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Year:</strong> {car.year}
            </li>
            <li className="list-group-item">
              <strong>Price:</strong> {formatPrice(car.price)}
            </li>
            <li className="list-group-item">
              <strong>Horse Power:</strong> {car.horsePower}
            </li>
            <li className="list-group-item">
              <strong>VIN:</strong> {car.vin}
            </li>
            <li className={`list-group-item fw-bold ${
              car.isAvailableForRent ? 'text-success' : 'text-danger'
            }`}>
              {car.isAvailableForRent ? 'Available' : 'Not Available'}
            </li>
          </ul>
        )}

        {actionError && (
          <div className="alert alert-danger mt-3" role="alert">
            {actionError}
          </div>
        )}
      </div>

      {/* Footer with actions */}
      {!showBuyForm && user && car.isAvailableForRent && (
        <div className="card-footer">
          <div className="d-grid gap-2">
            <button
              onClick={handleRentClick}
              className="btn btn-success"
            >
              Rent Car
            </button>
            <button
              onClick={() => {
                setShowBuyForm(true);
                setActionError('');
              }}
              className="btn btn-primary"
            >
              Buy Car
            </button>
          </div>
        </div>
      )}

      {/* Not logged in or car not available message */}
      {!showBuyForm && (!user || !car.isAvailableForRent) && (
        <div className="card-footer">
          <button className="btn btn-secondary w-100" disabled>
            {!user ? 'Login to Continue' : 'Not Available'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CarCard;