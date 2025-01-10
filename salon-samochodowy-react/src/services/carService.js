import { API_URL } from './config';

export const getAllCars = async () => {
  try {
    const response = await fetch(`${API_URL}/cars`, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Błąd pobierania samochodów');
    }

    return response.json();
  } catch (error) {
    console.error('Get cars error:', error);
    throw error;
  }
};

export const getCarById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/cars/${id}`, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Błąd pobierania samochodu');
    }

    return response.json();
  } catch (error) {
    console.error('Get car error:', error);
    throw error;
  }
};

export const createCar = async (carData) => {
  try {
    const response = await fetch(`${API_URL}/cars`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(carData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Błąd tworzenia samochodu');
    }

    return response.json();
  } catch (error) {
    console.error('Create car error:', error);
    throw error;
  }
};

export const updateCar = async (id, carData) => {
  try {
    const response = await fetch(`${API_URL}/cars/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(carData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Błąd aktualizacji samochodu');
    }

    return response.json();
  } catch (error) {
    console.error('Update car error:', error);
    throw error;
  }
};

export const deleteCar = async (id) => {
  try {
    const response = await fetch(`${API_URL}/cars/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Błąd usuwania samochodu');
    }

    return response.json();
  } catch (error) {
    console.error('Delete car error:', error);
    throw error;
  }
};