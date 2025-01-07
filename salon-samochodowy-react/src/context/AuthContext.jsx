import React, { createContext, useState, useContext } from 'react';
import { login, logout, register } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = async (username, password) => {
    try {
      const data = await login(username, password);
      if (data.user) {
        setUser(data.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logoutUser = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const registerUser = async (username, password, firstName, lastName) => {
    try {
      console.log('Registering user:', { username, password, firstName, lastName });
  
      // Wywołanie funkcji register z authService
      const data = await register(username, password, firstName, lastName);
  
      console.log('API response:', data);
  
      // Sprawdzenie, czy odpowiedź zawiera dane użytkownika
      if (data && data.user) {
        setUser(data.user); // Zapisanie użytkownika w stanie (jeśli wymagane)
        console.log('User registered successfully:', data.user);
        return true;
      }
  
      // Obsługa sytuacji, gdy API zwraca odpowiedź, ale brak danych użytkownika
      console.error('Registration failed: Missing user in response');
      return false;
    } catch (error) {
      // Obsługa błędów i logowanie szczegółów
      console.error('Register error:', error.message || error);
  
      // Możesz dodać więcej szczegółów na podstawie struktury błędów zwracanych przez API
      if (error.response && error.response.data) {
        console.error('API Error details:', error.response.data);
      }
  
      return false;
    }
  };
  
  
  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser,registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);