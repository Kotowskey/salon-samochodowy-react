const API_URL = 'http://localhost:4200';

export const fetchWithAuth = async (endpoint, options = {}) => {
 const defaultOptions = {
   credentials: 'include',
   headers: {
     'Content-Type': 'application/json'
   }
 };

 const response = await fetch(`${API_URL}${endpoint}`, {
   ...defaultOptions,
   ...options
 });

 if (!response.ok) {
   throw new Error(`HTTP error! status: ${response.status}`);
 }

 return response.json();
};

export const api = {
 auth: {
   login: (credentials) => fetchWithAuth('/login', {
     method: 'POST',
     body: JSON.stringify(credentials)
   }),
   logout: () => fetchWithAuth('/logout', { method: 'POST' }),
   register: (userData) => fetchWithAuth('/register', {
     method: 'POST', 
     body: JSON.stringify(userData)
   })
 },
 cars: {
   getAll: () => fetchWithAuth('/cars'),
   getById: (id) => fetchWithAuth(`/cars/${id}`),
   create: (carData) => fetchWithAuth('/cars', {
     method: 'POST',
     body: JSON.stringify(carData)
   }),
   update: (id, carData) => fetchWithAuth(`/cars/${id}`, {
     method: 'PUT',
     body: JSON.stringify(carData)
   }),
   delete: (id) => fetchWithAuth(`/cars/${id}`, { method: 'DELETE' }),
   rent: (id) => fetchWithAuth(`/cars/${id}/rent`, { method: 'POST' }),
   return: (id) => fetchWithAuth(`/cars/${id}/return`, { method: 'POST' })
 },
 rentals: {
   getAll: () => fetchWithAuth('/rentals'),
   create: (rentalData) => fetchWithAuth('/rentals', {
     method: 'POST',
     body: JSON.stringify(rentalData)
   }),
   delete: (id) => fetchWithAuth(`/rentals/${id}`, { method: 'DELETE' })
 }
};