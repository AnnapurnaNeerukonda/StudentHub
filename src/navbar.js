import React from 'react';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './styles/Navbar.css'; 
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">StudentHub</div>
      <div className="navbar-icons">
        <FaUser title="User Details" className="navbar-icon" />
        <FaCog title="Settings" className="navbar-icon" />
        <FaSignOutAlt title="Logout" className="navbar-icon" />
      </div>
    </nav>
  );
};

export default Navbar;
