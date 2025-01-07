import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const RegisterForm = () => {
  const { registerUser } = useAuth();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const success = await registerUser(
      credentials.username,
      credentials.password,
      credentials.firstName,
      credentials.lastName
    );

    if (success) {
      setSuccessMessage('Registration successful! You can now log in.');
      setCredentials({
        username: '',
        password: '',
        firstName: '',
        lastName: ''
      });
    } else {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Username"
        value={credentials.username || ''}
        onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
        className="border p-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password || ''}
        onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="First Name"
        value={credentials.firstName || ''}
        onChange={(e) => setCredentials((prev) => ({ ...prev, firstName: e.target.value }))}
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={credentials.lastName || ''}
        onChange={(e) => setCredentials((prev) => ({ ...prev, lastName: e.target.value }))}
        className="border p-2 rounded"
        required
      />
      <button 
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Register
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
    </form>
  );
};

export default RegisterForm;
