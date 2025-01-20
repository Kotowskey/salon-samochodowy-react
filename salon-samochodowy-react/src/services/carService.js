// 8. Operacje HTTP
// GET getAllCars - pobranie wszystkich samochodów
// POST createCar - dodanie nowego samochodu
// GET getCarById - pobranie szczegółów samochodu
// PUT updateCar - aktualizacja danych samochodu
// DELETE deleteCar - usunięcie samochodu
// POST buyCar - zakup samochodu

const API_URL = 'http://localhost:4200';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'API request failed');
  }
  return response.json();
};

export const getAllCars = async () => {
  try {
    const response = await fetch(`${API_URL}/cars`, {
      credentials: 'include'
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
};

export const getCarById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/cars/${id}`, {
      credentials: 'include'
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching car:', error);
    throw error;
  }
};

export const createCar = async (carData) => {
  try {
    const response = await fetch(`${API_URL}/cars`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(carData)
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error creating car:', error);
    throw error;
  }
};

export const updateCar = async (id, carData) => {
  try {
    const response = await fetch(`${API_URL}/cars/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(carData)
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error updating car:', error);
    throw error;
  }
};

export const deleteCar = async (id) => {
  try {
    const response = await fetch(`${API_URL}/cars/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error deleting car:', error);
    throw error;
  }
};

export const buyCar = async (id) => {
  try {
    const response = await fetch(`${API_URL}/cars/${id}/buy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error buying car:', error);
    throw error;
  }
};