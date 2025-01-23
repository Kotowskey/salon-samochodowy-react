import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import PropTypes from 'prop-types';

const PurchasedCarsList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const fetchPurchasedCars = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:4200/cars', {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch cars');
      }

      const allCars = await response.json();
      const purchasedCars = allCars.filter(car => car.ownerId === user?.id);
      setCars(purchasedCars);
    } catch (err) {
      setError('Failed to load purchased cars');
      console.error('Error fetching cars:', err);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchPurchasedCars();
  }, [fetchPurchasedCars]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (loading) return (
    <div className="text-center py-4">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="alert alert-danger" role="alert">
      {error}
    </div>
  );

  return (
    <div className="container py-4">
      <h2 className="mb-4">My Purchased Cars</h2>
      {cars.length === 0 ? (
        <div className="alert alert-info">
          You haven't purchased any cars yet.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {cars.map(car => (
            <div key={car.id} className="col">
              <div className="card h-100 shadow">
                <div className="card-header bg-success text-white">
                  <h5 className="card-title mb-0">{car.brand} {car.model}</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <strong>Year:</strong> {car.year}
                    </li>
                    <li className="list-group-item">
                      <strong>Price:</strong> {formatPrice(car.price)}
                    </li>
                    <li className="list-group-item">
                      <strong>VIN:</strong> {car.vin}
                    </li>
                    <li className="list-group-item">
                      <strong>Horse Power:</strong> {car.horsePower} HP
                    </li>
                  </ul>
                </div>
                {car.horsePower > 300 && (
                  <div className="position-absolute top-0 end-0 m-2">
                    <span className="badge bg-danger">
                      <i className="bi bi-lightning-charge-fill me-1"></i>
                      {car.horsePower} HP
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

PurchasedCarsList.propTypes = {
  cars: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    brand: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    vin: PropTypes.string.isRequired,
    horsePower: PropTypes.number.isRequired,
    ownerId: PropTypes.number.isRequired
  }))
};

export default PurchasedCarsList;