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
    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Enter username"
          value={credentials.username}
          onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          value={credentials.password}
          onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">First Name</label>
        <input
          type="text"
          id="firstName"
          placeholder="Enter first name"
          value={credentials.firstName}
          onChange={(e) => setCredentials(prev => ({ ...prev, firstName: e.target.value }))}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">Last Name</label>
        <input
          type="text"
          id="lastName"
          placeholder="Enter last name"
          value={credentials.lastName}
          onChange={(e) => setCredentials(prev => ({ ...prev, lastName: e.target.value }))}
          className="form-control"
          required
        />
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      <div className="d-grid gap-2">
        <button 
          type="submit"
          className="btn btn-primary"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;