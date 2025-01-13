import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCarById } from '../../services/carService';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const data = await getCarById(id);
        setCar(data);
      } catch (err) {
        setError('Car not found');
      }
    };
    fetchCar();
  }, [id]);

  if (error) {
    return <div className="container py-4"><div className="alert alert-danger">{error}</div></div>;
  }

  if (!car) {
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

  return (
    <div className="container py-4">
      <h1>{car.brand} {car.model}</h1>
      <ul>
        <li><strong>Year:</strong> {car.year}</li>
        <li><strong>Price:</strong> ${car.price}</li>
        <li><strong>Horse Power:</strong> {car.horsePower}</li>
        <li><strong>VIN:</strong> {car.vin}</li>
      </ul>
    </div>
  );
};

export default CarDetails;
