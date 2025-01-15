// Struktura danych (1pkt) - liczby, stringi, tablice, obiekty
// Funkcjonalności - dodawanie, usuwanie, edycja


import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { createCar, updateCar, deleteCar, getAllCars } from '../../services/carService';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CarManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editCar, setEditCar] = useState(null);
  const [newCar, setNewCar] = useState({
    brand: '',
    model: '',
    year: '',
    vin: '',
    price: '',
    horsePower: '',
    isAvailableForRent: true
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Check if user is a dealer
    if (!user?.isDealer) {
      navigate('/');
      return;
    }
    fetchCars();
  }, [user, navigate]);

  const fetchCars = async () => {
    try {
      const data = await getAllCars();
      setCars(data);
    } catch (err) {
      setError('Failed to load cars');
      console.error('Error loading cars:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    try {
      await createCar(newCar);
      setSuccessMessage('Car added successfully!');
      setNewCar({
        brand: '',
        model: '',
        year: '',
        vin: '',
        price: '',
        horsePower: '',
        isAvailableForRent: true
      });
      fetchCars();
    } catch (error) {
      setError(error.message || 'Error adding car');
      console.error('Error adding car:', error);
    }
  };

  const handleDelete = async (carId) => {
    if (!user?.isDealer) {
      setError('Only dealers can delete cars');
      return;
    }

    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await deleteCar(carId);
        setSuccessMessage('Car deleted successfully!');
        fetchCars();
      } catch (error) {
        setError(error.message || 'Error deleting car');
        console.error('Error deleting car:', error);
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    try {
      const updatedCar = await updateCar(editCar.id, editCar); 
      setEditCar(null);
      setSuccessMessage('Car updated successfully!');
      fetchCars(); 
    } catch (error) {
      setError(error.message || 'Error updating car');
      console.error('Error updating car:', error);
    }
  };
  
  
  const handleEdit = (car) => {
    setEditCar(car); 
};
const EditCarModal = ({ car, onClose }) => {
  return (
    <Modal show={car != null} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Car</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleUpdate}>
          <input type="text" placeholder="Brand" value={car?.brand} onChange={(e) => setEditCar({...editCar, brand: e.target.value})} required />
          <input type="text" placeholder="Model" value={car?.model} onChange={(e) => setEditCar({...editCar, model: e.target.value})} required />
          <input type="number" placeholder="Year" value={car?.year} onChange={(e) => setEditCar({...editCar, year: e.target.value})} required />
          <input type="text" placeholder="VIN" value={car?.vin} onChange={(e) => setEditCar({...editCar, vin: e.target.value})} required />
          <input type="number" placeholder="Price" value={car?.price} onChange={(e) => setEditCar({...editCar, price: e.target.value})} required />
          <input type="number" placeholder="Horse Power" value={car?.horsePower} onChange={(e) => setEditCar({...editCar, horsePower: e.target.value})} required />
          <Button type="submit">Update Car</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};


  if (!user?.isDealer) {
    return null; // or return an unauthorized message
  }

  if (loading) {
    return (
      <div className="container">
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Car Management</h2>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError('')} aria-label="Close"></button>
        </div>
      )}

      {successMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {successMessage}
          <button type="button" className="btn-close" onClick={() => setSuccessMessage('')} aria-label="Close"></button>
        </div>
      )}

      {/* Add Car Form */}
      <div className="card mb-4">
        <div className="card-header">
          <h3 className="card-title mb-0">Add New Car</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="brand" className="form-label">Brand</label>
                <input
                  type="text"
                  className="form-control"
                  id="brand"
                  value={newCar.brand}
                  onChange={(e) => setNewCar(prev => ({ ...prev, brand: e.target.value }))}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="model" className="form-label">Model</label>
                <input
                  type="text"
                  className="form-control"
                  id="model"
                  value={newCar.model}
                  onChange={(e) => setNewCar(prev => ({ ...prev, model: e.target.value }))}
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="year" className="form-label">Year</label>
                <input
                  type="number"
                  className="form-control"
                  id="year"
                  value={newCar.year}
                  onChange={(e) => setNewCar(prev => ({ ...prev, year: e.target.value }))}
                  min="1886"
                  max={new Date().getFullYear() + 1}
                  required
                />
              </div>
              <div className="col-md-8">
                <label htmlFor="vin" className="form-label">VIN (17 characters)</label>
                <input
                  type="text"
                  className="form-control"
                  id="vin"
                  value={newCar.vin}
                  onChange={(e) => setNewCar(prev => ({ ...prev, vin: e.target.value.toUpperCase() }))}
                  pattern="[A-HJ-NPR-Z0-9]{17}"
                  maxLength="17"
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="price" className="form-label">Price</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    value={newCar.price}
                    onChange={(e) => setNewCar(prev => ({ ...prev, price: e.target.value }))}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="horsePower" className="form-label">Horse Power</label>
                <input
                  type="number"
                  className="form-control"
                  id="horsePower"
                  value={newCar.horsePower}
                  onChange={(e) => setNewCar(prev => ({ ...prev, horsePower: e.target.value }))}
                  min="1"
                  required
                />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Add Car
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="container py-4">{editCar && <EditCarModal car={editCar} onClose={() => setEditCar(null)} />}</div>
      {/* Car List */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title mb-0">Existing Cars</h3>
        </div>
        <div className="card-body">
          {cars.length === 0 ? (
            <p className="text-muted">No cars available.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Year</th>
                    <th>VIN</th>
                    <th>Price</th>
                    <th>Horse Power</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map(car => (
                    <tr key={car.id}>
                      <td>{car.brand}</td>
                      <td>{car.model}</td>
                      <td>{car.year}</td>
                      <td>{car.vin}</td>
                      <td>${car.price.toLocaleString()}</td>
                      <td>{car.horsePower}</td>
                      <td>
                        <span className={`badge ${car.isAvailableForRent ? 'bg-success' : 'bg-danger'}`}>
                          {car.isAvailableForRent ? 'Available' : 'Not Available'}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(car.id)}
                          className="btn btn-danger btn-sm"
                          disabled={!car.isAvailableForRent}
                          title={!car.isAvailableForRent ? "Cannot delete a car that is currently rented or sold" : ""}
                        >
                          <i className="bi bi-trash"></i> Delete
                        </button>
                        <button
                           onClick={() => handleEdit(car)}
                           className="btn btn-primary btn-sm ms-2"
                           disabled={!car.isAvailableForRent}
                           title={!car.isAvailableForRent ? "Cannot edit a car that is currently rented or sold" : ""}
                        >
                             <i className="bi bi-pencil"></i> Edit
                          </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarManagement;