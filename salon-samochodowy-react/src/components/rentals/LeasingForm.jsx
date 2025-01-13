import React, { useState } from 'react';

const LeasingForm = ({ car, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    downPayment: '',
    months: ''
  });
  const [leasingDetails, setLeasingDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:4200/cars/${car.id}/leasing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          downPayment: Number(formData.downPayment),
          months: Number(formData.months)
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to calculate leasing details');
      }

      const data = await response.json();
      setLeasingDetails(data);
    } catch (err) {
      setError(err.message || 'Failed to process leasing request');
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
      <div className="card-header bg-info text-white">
        <h5 className="card-title mb-0">Leasing Calculator</h5>
      </div>
      
      <div className="card-body">
        <div className="mb-4">
          <h6 className="mb-3">Vehicle Information:</h6>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Model:</strong> {car.brand} {car.model}
            </li>
            <li className="list-group-item">
              <strong>Year:</strong> {car.year}
            </li>
            <li className="list-group-item">
              <strong>Total Price:</strong> {formatPrice(car.price)}
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="downPayment" className="form-label">Down Payment</label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
                type="number"
                id="downPayment"
                className="form-control"
                value={formData.downPayment}
                onChange={(e) => setFormData(prev => ({ ...prev, downPayment: e.target.value }))}
                min="0"
                max={car.price}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="months" className="form-label">Lease Term</label>
            <select
              id="months"
              className="form-select"
              value={formData.months}
              onChange={(e) => setFormData(prev => ({ ...prev, months: e.target.value }))}
              required
            >
              <option value="">Select lease term</option>
              <option value="12">12 months</option>
              <option value="24">24 months</option>
              <option value="36">36 months</option>
              <option value="48">48 months</option>
              <option value="60">60 months</option>
            </select>
          </div>

          {error && (
            <div className="alert alert-danger mb-3">
              {error}
            </div>
          )}

          {leasingDetails && (
            <div className="alert alert-success mb-3">
              <h6 className="alert-heading mb-2">Leasing Details</h6>
              <div className="row">
                <div className="col-6">
                  <p className="mb-1"><strong>Monthly Payment:</strong></p>
                  <h4 className="text-success">{formatPrice(leasingDetails.monthlyRate)}</h4>
                </div>
                <div className="col-6">
                  <p className="mb-1">Total Price: {formatPrice(leasingDetails.totalPrice)}</p>
                  <p className="mb-1">Down Payment: {formatPrice(leasingDetails.downPayment)}</p>
                  <p className="mb-0">Balance: {formatPrice(leasingDetails.remainingAmount)}</p>
                </div>
              </div>
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
              {loading ? 'Calculating...' : 'Calculate Payment'}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onCancel}
              disabled={loading}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeasingForm;