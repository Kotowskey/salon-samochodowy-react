import React, { useState } from 'react';
import { buyCar } from '../../services/carService';
import PropTypes from 'prop-types';

const BuyCarForm = ({ car, onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBuy = async () => {
    try {
      setLoading(true);
      setError('');
      
      const result = await buyCar(car.id);
      
      if (result) {
        onSuccess?.();
      }
      
    } catch (err) {
      console.error('Purchase error:', err);
      setError(err.message || 'Failed to purchase the car. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">Purchase Confirmation</h3>
        
        <div className="mb-4">
          <h4 className="h5 mb-3">Car Details:</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Model:</strong> {car.brand} {car.model}
            </li>
            <li className="list-group-item">
              <strong>Year:</strong> {car.year}
            </li>
            <li className="list-group-item">
              <strong>VIN:</strong> {car.vin}
            </li>
            <li className="list-group-item">
              <strong>Horse Power:</strong> {car.horsePower}
            </li>
            <li className="list-group-item">
              <strong>Price:</strong> {formatPrice(car.price)}
            </li>
          </ul>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="d-grid gap-2">
          <button
            onClick={handleBuy}
            disabled={loading}
            className="btn btn-success"
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Processing...
              </>
            ) : (
              'Confirm Purchase'
            )}
          </button>
          
          <button
            onClick={onCancel}
            disabled={loading}
            className="btn btn-outline-secondary"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyCarForm;

BuyCarForm.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.number.isRequired,
    brand: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    vin: PropTypes.string.isRequired,
    horsePower: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired
  }),
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func
};