// 3. Weryfikacja typów
// 4. Komponent prezentacyjny
// 5. Komunikacja dwukierunkowa (CarList, CarCard)
// 6. Komponent reużywalny (używany w CarList i CarManagement)
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import BuyCarForm from './BuyCarForm';
import RentalForm from '../rentals/RentalForm';
import LeasingForm from '../rentals/LeasingForm';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const CarCard = ({ car, onRent, onUpdate }) => {
  const { user } = useAuth();
  const [showBuyForm, setShowBuyForm] = useState(false);
  const [showRentForm, setShowRentForm] = useState(false);
  const [showLeasingForm, setShowLeasingForm] = useState(false);
  const [actionError, setActionError] = useState('');
  const navigate = useNavigate();

  const handleBuySuccess = () => {
    setShowBuyForm(false);
    setActionError('');
    onUpdate?.();
  };

  const handleRentSubmit = async (rentalData) => {
    try {
      setActionError('');
      await onRent(rentalData);
      setShowRentForm(false);
      onUpdate?.();
    } catch (err) {
      setActionError('Failed to rent the car. Please try again.');
    }
  };

  const handleLeasingSuccess = () => {
    onUpdate?.();
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const renderForm = () => {
    if (showBuyForm) {
      return (
        <BuyCarForm
          car={car}
          onSuccess={handleBuySuccess}
          onCancel={() => {
            setShowBuyForm(false);
            setActionError('');
          }}
        />
      );
    }
    if (showRentForm) {
      return (
        <RentalForm
          car={car}
          onSubmit={handleRentSubmit}
          onCancel={() => {
            setShowRentForm(false);
            setActionError('');
          }}
        />
      );
    }
    if (showLeasingForm) {
      return (
        <LeasingForm
          car={car}
          onSuccess={handleLeasingSuccess}
          onCancel={() => {
            setShowLeasingForm(false);
            setActionError('');
          }}
        />
      );
    }
    return null;
  };

  return (
    <div className="card h-100 shadow">
      <div className="card-header bg-primary text-white">
        <h5 className="card-title mb-0 text-center">
          {car.brand} {car.model}
        </h5>
      </div>

      <div className="card-body">
        {renderForm() || (
          <>
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

            {actionError && (
              <div className="alert alert-danger mt-3">
                {actionError}
              </div>
            )}
          </>
        )}
      </div>

      {!showBuyForm && !showRentForm && !showLeasingForm && user && car.isAvailableForRent && (
        <div className="card-footer">
          <div className="d-grid gap-2">
            <button
              onClick={() => setShowRentForm(true)}
              className="btn btn-success"
            >
              <i className="bi bi-calendar-check me-2"></i>
              Rent Car
            </button>
            <button
              onClick={() => setShowBuyForm(true)}
              className="btn btn-primary"
              >
                <i className="bi bi-cart-check me-2"></i>
                Buy Car
              </button>
              <button
                onClick={() => setShowLeasingForm(true)}
                className="btn btn-info text-white"
              >
                <i className="bi bi-calculator me-2"></i>
                Calculate Leasing
              </button>
              <button
                onClick={() => navigate(`/cars/${car.id}`)}
                className="btn btn-secondary"
              >
                <i className="bi bi-info-circle me-2"></i>
                Details
              </button>
            </div>
          </div>
        )}
  
        {!showBuyForm && !showRentForm && !showLeasingForm && (!user || !car.isAvailableForRent) && (
          <div className="card-footer">
            <button className="btn btn-secondary w-100" disabled>
              <i className="bi bi-lock me-2"></i>
              {!user ? 'Login to Continue' : 'Not Available'}
            </button>
          </div>
        )}
  
        {car.horsePower > 300 && (
          <div className="position-absolute top-0 end-0 m-2">
            <span className="badge bg-danger">
              <i className="bi bi-lightning-charge-fill me-1"></i>
              {car.horsePower} HP
            </span>
          </div>
        )}
  
        <div className="position-absolute top-0 start-0 m-2">
          <span className="badge bg-success">
            <i className="bi bi-tag-fill me-1"></i>
            {formatPrice(car.price)}
          </span>
        </div>
      </div>
    );
  };
  
  CarCard.propTypes = {
    car: PropTypes.shape({
      id: PropTypes.number.isRequired,
      brand: PropTypes.string.isRequired,
      model: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      horsePower: PropTypes.number.isRequired,
      vin: PropTypes.string.isRequired,
      isAvailableForRent: PropTypes.bool.isRequired
    }).isRequired,
    onRent: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
  };
  
  export default CarCard;
  