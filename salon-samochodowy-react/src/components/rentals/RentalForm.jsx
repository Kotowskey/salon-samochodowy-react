// 3. Weryfikacja typów
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const RentalForm = ({ car, onSubmit, onCancel }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!startDate || !endDate) {
        throw new Error('Please select both start and end dates');
      }

      const start = new Date(startDate);
      const end = new Date(endDate);

      if (start >= end) {
        throw new Error('End date must be after start date');
      }

      const rentalData = {
        carId: car.id,
        startDate: start.toISOString(),
        endDate: end.toISOString()
      };

      await onSubmit(rentalData);
    } catch (err) {
      setError(err.message || 'Failed to create rental');
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

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title mb-4">Rent a Car</h3>
        
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
              <strong>Daily Rate:</strong> {formatPrice(car.price/500)}
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="startDate" className="form-label">Start Date</label>
            <input
              type="date"
              id="startDate"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={today}
              max={maxDateStr}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="endDate" className="form-label">End Date</label>
            <input
              type="date"
              id="endDate"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || today}
              max={maxDateStr}
              required
            />
          </div>

          {error && (
            <div className="alert alert-danger mb-3">
              {error}
            </div>
          )}

          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              )}
              {loading ? 'Processing...' : 'Confirm Rental'}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

RentalForm.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.number.isRequired,
    brand: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default RentalForm;