import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openRegisterModal = () => setIsRegisterOpen(true);
  const closeRegisterModal = () => setIsRegisterOpen(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-lg">
      <div className="container">
        {/* Logo lub tytuł */}
        <Link to="/" className="navbar-brand fw-bold">
          Car Rental
        </Link>

        {/* Przycisk do rozwijania nawigacji w widoku mobilnym */}
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

        {/* Linki nawigacyjne */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user && (
              <>
                <li className="nav-item">
                  <Link to="/rentals" className="nav-link">
                    My Rentals
                  </Link>
                </li>
                {user.isDealer && (
                  <li className="nav-item">
                    <Link to="/manage-cars" className="nav-link">
                      Manage Cars
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>

          {/* Prawa strona nawigacji: logowanie / wylogowanie */}
          <div className="d-flex align-items-center">
            {user ? (
              <>
                <span className="text-white me-3">Welcome, {user.firstName}</span>
                <button onClick={logoutUser} className="btn btn-outline-light">
                  Logout
                </button>
              </>
            ) : (
              <>
                <LoginForm />
                <button
                  onClick={openRegisterModal}
                  className="btn btn-outline-light ms-2"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal z formularzem rejestracji */}
      {isRegisterOpen && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Register</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeRegisterModal}
                ></button>
              </div>
              <div className="modal-body">
                <RegisterForm />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
