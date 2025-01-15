import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarById } from '../../services/carService';
import PropTypes from 'prop-types';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        const data = await getCarById(id);
        if (data) {
          setCar(data);
        } else {
          setError('Car not found');
        }
      } catch (err) {
        setError('Failed to load car details');
        console.error('Error fetching car:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="container py-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">
          <h4 className="alert-heading">Error</h4>
          <p>{error}</p>
          <hr />
          <button
            className="btn btn-outline-danger"
            onClick={() => navigate('/')}
          >
            Back to Car List
          </button>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="container py-4">
        <div className="alert alert-warning">
          <h4 className="alert-heading">Car Not Found</h4>
          <p>The requested car could not be found.</p>
          <hr />
          <button
            className="btn btn-outline-warning"
            onClick={() => navigate('/')}
          >
            Back to Car List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h1 className="h3 mb-0">{car.brand} {car.model}</h1>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h4 className="mb-3">Vehicle Information</h4>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Year:</strong> {car.year}
                </li>
                <li className="list-group-item">
                  <strong>Price:</strong> {formatPrice(car.price)}
                </li>
                <li className="list-group-item">
                  <strong>Horse Power:</strong> {car.horsePower} HP
                </li>
                <li className="list-group-item">
                  <strong>VIN:</strong> {car.vin}
                </li>
                <li className="list-group-item">
                  <strong>Status:</strong>{' '}
                  <span className={`badge ${car.isAvailableForRent ? 'bg-success' : 'bg-danger'}`}>
                    {car.isAvailableForRent ? 'Available' : 'Not Available'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <button
            className="btn btn-secondary me-2"
            onClick={() => navigate('/')}
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back to Car List
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;

CarDetails.propTypes = {
  car: PropTypes.shape({
    brand: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    horsePower: PropTypes.number.isRequired,
    vin: PropTypes.string.isRequired,
    isAvailableForRent: PropTypes.bool.isRequired
  })
};