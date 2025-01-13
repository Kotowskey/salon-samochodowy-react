import React, { useState, useEffect } from 'react';
import { CarCard } from './CarCard';
import { getAllCars } from '../../services/carService';
import { createRental } from '../../services/rentalService';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    brand: '',
    priceMin: '',
    priceMax: '',
    year: '',
    onlyAvailable: false
  });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const data = await getAllCars();
      setCars(data);
    } catch (err) {
      setError('Failed to load cars');
      console.error('Error fetching cars:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRent = async (carId) => {
    try {
      const rentalData = {
        carId,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days rental
      };
      await createRental(rentalData);
      await fetchCars(); // Refresh car list
    } catch (err) {
      setError('Failed to rent car');
      console.error('Error renting car:', err);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const filteredCars = cars.filter(car => {
    if (filters.brand && !car.brand.toLowerCase().includes(filters.brand.toLowerCase())) {
      return false;
    }
    if (filters.priceMin && car.price < parseFloat(filters.priceMin)) {
      return false;
    }
    if (filters.priceMax && car.price > parseFloat(filters.priceMax)) {
      return false;
    }
    if (filters.year && car.year !== parseInt(filters.year)) {
      return false;
    }
    if (filters.onlyAvailable && !car.isAvailableForRent) {
      return false;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Filters</h5>
          <div className="row g-3">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Brand"
                name="brand"
                value={filters.brand}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Min Price"
                name="priceMin"
                value={filters.priceMin}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Max Price"
                name="priceMax"
                value={filters.priceMax}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Year"
                name="year"
                value={filters.year}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-3">
              <div className="form-check mt-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="availableOnly"
                  name="onlyAvailable"
                  checked={filters.onlyAvailable}
                  onChange={handleFilterChange}
                />
                <label className="form-check-label" htmlFor="availableOnly">
                  Show only available cars
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4">
        <h2 className="h4">Available Cars ({filteredCars.length})</h2>
      </div>

      {/* Car grid */}
      {filteredCars.length === 0 ? (
        <div className="alert alert-info">
          No cars found matching your criteria.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredCars.map(car => (
            <div className="col" key={car.id}>
              <CarCard
                car={car}
                onRent={handleRent}
                onUpdate={fetchCars}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarList;