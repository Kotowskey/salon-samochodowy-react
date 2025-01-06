import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoginForm from '../auth/LoginForm';

const Navbar = () => {
  const { user, logoutUser } = useAuth();

  return (
    <nav className="bg-white shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-bold">Car Rental</Link>
          {user && (
            <>
              <Link to="/rentals" className="hover:text-blue-600">My Rentals</Link>
              {user.isDealer && (
                <Link to="/manage-cars" className="hover:text-blue-600">Manage Cars</Link>
              )}
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span>Welcome, {user.firstName}</span>
              <button 
                onClick={logoutUser}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <LoginForm />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;