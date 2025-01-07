const API_URL = 'http://localhost:4200';

export const login = async (username, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password })
  });
  return response.json();
};

export const logout = async () => {
  return fetch(`${API_URL}/logout`, {
    method: 'POST',
    credentials: 'include'
  });
};

export const register = async (username, password,firstName,lastName) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({username, password,firstName,lastName})
  });
  return response.json();
};