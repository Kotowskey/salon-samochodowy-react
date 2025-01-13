const API_URL = 'http://localhost:4200';

export const getAllCars = async () => {
  const response = await fetch(`${API_URL}/cars`, {
    credentials: 'include'
  });
  if (!response.ok) {
    throw new Error('Failed to fetch cars');
  }
  return response.json();
};

export const getCarById = async (id) => {
  const response = await fetch(`${API_URL}/cars/${id}`, {
    credentials: 'include'
  });
  if (!response.ok) {
    throw new Error('Failed to fetch car');
  }
  return response.json();
};

export const createCar = async (carData) => {
  const response = await fetch(`${API_URL}/cars`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(carData)
  });
  if (!response.ok) {
    throw new Error('Failed to create car');
  }
  return response.json();
};

export const updateCar = async (id, carData) => {
  const response = await fetch(`${API_URL}/cars/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(carData)
  });
  if (!response.ok) {
    throw new Error('Failed to update car');
  }
  return response.json();
};

export const deleteCar = async (id) => {
  const response = await fetch(`${API_URL}/cars/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });
  if (!response.ok) {
    throw new Error('Failed to delete car');
  }
  return response.json();
};

export const buyCar = async (id) => {
  try {
    const response = await fetch(`${API_URL}/cars/${id}/buy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to purchase car');
    }
    
    return response.json();
  } catch (error) {
    console.error('Buy car error:', error);
    throw error;
  }
};