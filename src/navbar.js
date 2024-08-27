import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    navigate('/');
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">StudentHub</div>
      <div className="navbar-icons">
        <FaUser
          title="User Details"
          className="navbar-icon"
          onClick={() => navigate('/user-details')}
        />
        <FaCog title="Settings" className="navbar-icon" />
        <FaSignOutAlt
          onClick={handleLogout}
          title="Logout"
          className="navbar-icon"
        />
      </div>
    </nav>
  );
};

export default Navbar;
