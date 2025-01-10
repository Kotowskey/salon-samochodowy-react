import { API_URL } from './config';

export const fetchWithAuth = async (endpoint, options = {}) => {
  try {
    const defaultOptions = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    const mergedOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers
      }
    };

    const response = await fetch(`${API_URL}${endpoint}`, mergedOptions);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};