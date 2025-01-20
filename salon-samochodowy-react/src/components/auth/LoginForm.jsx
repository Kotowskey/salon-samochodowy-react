// 7. Walidacja formularzy (logowanie)
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import PropTypes from 'prop-types';

const LoginForm = () => {
  const { loginUser } = useAuth();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const success = await loginUser(credentials.username, credentials.password);
    if (!success) {
      setError('Invalid username or password');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex align-items-center gap-2">
      <div className="input-group">
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
          className="form-control form-control-sm"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
          className="form-control form-control-sm"
          required
        />
        <button 
          type="submit"
          className="btn btn-outline-light btn-sm"
        >
          Login
        </button>
      </div>
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </form>
  );
};

export default LoginForm;

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
  credentials: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  })
};