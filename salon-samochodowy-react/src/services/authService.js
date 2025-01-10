import { API_URL } from './config';

export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Błąd logowania');
    }

    return response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Błąd wylogowania');
    }

    return response.json();
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const register = async (username, password, firstName, lastName) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        username,
        password,
        firstName,
        lastName
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Błąd rejestracji');
    }

    return response.json();
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};