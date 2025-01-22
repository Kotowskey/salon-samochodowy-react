const API_URL = 'http://localhost:4200';
  
export const getAllRentals = async () => {
  const response = await fetch(`${API_URL}/rentals`, {
    credentials: 'include'
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch rentals');
  }
  
  return response.json();
};

export const createRental = async (rentalData) => {
  const response = await fetch(`${API_URL}/rentals`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json' 
    },
    credentials: 'include',
    body: JSON.stringify(rentalData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create rental');
  }

  return response.json();
};

export const deleteRental = async (id) => {
  const response = await fetch(`${API_URL}/rentals/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete rental');
  }

  return response.json();
};