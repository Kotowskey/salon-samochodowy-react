const API_URL = 'http://localhost:4200';

export const getAllCars = async () => {
  const response = await fetch(`${API_URL}/cars`, {
    credentials: 'include'
  });
  return response.json();
};

export const getCarById = async (id) => {
  const response = await fetch(`${API_URL}/cars/${id}`, {
    credentials: 'include'
  });
  return response.json();
};

export const createCar = async (carData) => {
  const response = await fetch(`${API_URL}/cars`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(carData)
  });
  return response.json();
};

export const updateCar = async (id, carData) => {
  const response = await fetch(`${API_URL}/cars/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(carData)
  });
  return response.json();
};

export const deleteCar = async (id) => {
  const response = await fetch(`${API_URL}/cars/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });
  return response.json();
};