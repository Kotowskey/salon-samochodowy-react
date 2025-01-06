import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoginForm from '../auth/LoginForm';

const Navbar = () => {
  const { user, logoutUser } = useAuth();

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
                <button
                  onClick={logoutUser}
                  className="btn btn-outline-light"
                >
                  Logout
                </button>
              </>
            ) : (
              <LoginForm />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
