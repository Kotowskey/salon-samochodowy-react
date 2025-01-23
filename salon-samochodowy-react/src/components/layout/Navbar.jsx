// 4. Komponent prezentacyjny

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate('/');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-lg">
        <div className="container">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <i className="bi bi-car-front me-2"></i>
            <span className="fw-bold">Car Rental</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {user && (
                <>
                  <li className="nav-item">
                    <Link to="/rentals" className="nav-link">
                      <i className="bi bi-clipboard-check me-1"></i>
                      My Rentals
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/purchased-cars" className="nav-link">
                      <i className="bi bi-cart-check me-1"></i>
                      My Cars
                    </Link>
                  </li>
                  {user.isDealer && (
                    <li className="nav-item">
                      <Link to="/manage-cars" className="nav-link">
                        <i className="bi bi-gear me-1"></i>
                        Manage Cars
                      </Link>
                    </li>
                  )}
                </>
              )}
            </ul>

            <div className="d-flex align-items-center">
              {user ? (
                <div className="d-flex align-items-center gap-3">
                  <span className="text-white">
                    <i className="bi bi-person-circle me-2"></i>
                    Welcome, {user.firstName}
                  </span>
                  <button 
                    onClick={handleLogout} 
                    className="btn btn-outline-light btn-sm"
                  >
                    <i className="bi bi-box-arrow-right me-1"></i>
                    Logout
                  </button>
                </div>
              ) : (
                <div className="d-flex align-items-center gap-2">
                  <LoginForm />
                  <button
                    onClick={() => setIsRegisterOpen(true)}
                    className="btn btn-outline-light btn-sm"
                  >
                    <i className="bi bi-person-plus me-1"></i>
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {isRegisterOpen && (
        <div 
          className="modal fade show d-block" 
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-person-plus me-2"></i>
                  Create Account
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsRegisterOpen(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <RegisterForm />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;