import React, { useState } from 'react';
import { createCar, deleteCar } from '../../services/carService';

const CarManagement = () => {
  const [newCar, setNewCar] = useState({
    brand: '',
    model: '',
    year: '',
    vin: '',
    price: '',
    horsePower: '',
    isAvailableForRent: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCar(newCar);
      setNewCar({
        brand: '',
        model: '',
        year: '',
        vin: '',
        price: '',
        horsePower: '',
        isAvailableForRent: true
      });
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
        <h2 className="text-xl font-bold">Add New Car</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Brand"
            value={newCar.brand}
            onChange={(e) => setNewCar(prev => ({ ...prev, brand: e.target.value }))}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Model"
            value={newCar.model}
            onChange={(e) => setNewCar(prev => ({ ...prev, model: e.target.value }))}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Year"
            value={newCar.year}
            onChange={(e) => setNewCar(prev => ({ ...prev, year: e.target.value }))}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="VIN"
            value={newCar.vin}
            onChange={(e) => setNewCar(prev => ({ ...prev, vin: e.target.value }))}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newCar.price}
            onChange={(e) => setNewCar(prev => ({ ...prev, price: e.target.value }))}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Horse Power"
            value={newCar.horsePower}
            onChange={(e) => setNewCar(prev => ({ ...prev, horsePower: e.target.value }))}
            className="border p-2 rounded"
            required
          />
        </div>
        <button 
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Car
        </button>
      </form>
    </div>
  );
};

export default CarManagement;