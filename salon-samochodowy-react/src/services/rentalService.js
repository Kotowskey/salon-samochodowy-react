import { API_URL } from './config';

export const getAllRentals = async () => {
  try {
    const response = await fetch(`${API_URL}/rentals`, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Błąd pobierania wynajmów');
    }

    return response.json();
  } catch (error) {
    console.error('Get rentals error:', error);
    throw error;
  }
};

export const createRental = async (rentalData) => {
  try {
    const response = await fetch(`${API_URL}/rentals`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(rentalData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Błąd tworzenia wynajmu');
    }

    return response.json();
  } catch (error) {
    console.error('Create rental error:', error);
    throw error;
  }
};

export const deleteRental = async (id) => {
  try {
    const response = await fetch(`${API_URL}/rentals/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Błąd usuwania wynajmu');
    }

    return response.json();
  } catch (error) {
    console.error('Delete rental error:', error);
    throw error;
  }
};