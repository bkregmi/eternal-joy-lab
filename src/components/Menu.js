import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../data/AuthContext';

const Menu = () => {
  const { user, logout } = useAuth();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => setOpenDropdown(openDropdown === name ? null : name);
  const toggleNav = () => setIsNavCollapsed(!isNavCollapsed);

  const closeAll = () => {
    setOpenDropdown(null);
    setIsNavCollapsed(true);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" onClick={closeAll}>Eternal Bliss Lab</Link>
        <button type="button" className="navbar-toggler" onClick={toggleNav} aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavCollapsed ? '' : 'show'}`} id="myNavbar">
          <ul className="navbar-nav me-auto">

            {/* Sadhana Category */}
            <li className={`nav-item dropdown ${openDropdown === 'sadhana' ? 'show' : ''}`}>
              <a href="#" className="nav-link dropdown-toggle" onClick={(e) => { e.preventDefault(); toggleDropdown('sadhana'); }}>
                Sadhana
              </a>
              <ul className={`dropdown-menu ${openDropdown === 'sadhana' ? 'show' : ''}`}>
                <li><Link className="dropdown-item" to="/blissful-stuties" onClick={closeAll}>Blissful Stuties</Link></li>
                <li><Link className="dropdown-item" to="/prayers" onClick={closeAll}>Daily Prayer</Link></li>
                <li><Link className="dropdown-item" to="/pranayama" onClick={closeAll}>Pranayama</Link></li>
                <li><Link className="dropdown-item" to="/yogasana" onClick={closeAll}>Yogasana</Link></li>
                {user && <li><Link className="dropdown-item" to="/personal-audio" onClick={closeAll}>Personal Audio</Link></li>}
                <li><Link className="dropdown-item" to="/devas" onClick={closeAll}>Devi/Devata Prayers</Link></li>
              </ul>
            </li>

            {/* Swadhaya Category */}
            <li className={`nav-item dropdown ${openDropdown === 'swadhaya' ? 'show' : ''}`}>
              <a href="#" className="nav-link dropdown-toggle" onClick={(e) => { e.preventDefault(); toggleDropdown('swadhaya'); }}>
                Swadhaya
              </a>
              <ul className={`dropdown-menu ${openDropdown === 'swadhaya' ? 'show' : ''}`}>
                <li><Link className="dropdown-item" to="/scripture-verses" onClick={closeAll}>Scripture Verses</Link></li>
                <li><Link className="dropdown-item" to="/scripture-audio" onClick={closeAll}>Scripture Audio</Link></li>
              </ul>
            </li>

            {/* Satsanga Category */}
            <li className={`nav-item dropdown ${openDropdown === 'satsanga' ? 'show' : ''}`}>
              <a href="#" className="nav-link dropdown-toggle" onClick={(e) => { e.preventDefault(); toggleDropdown('satsanga'); }}>
                Satsanga
              </a>
              <ul className={`dropdown-menu ${openDropdown === 'satsanga' ? 'show' : ''}`}>
                <li><Link className="dropdown-item" to="/bhajans" onClick={closeAll}>Nepali Bhajans</Link></li>
                <li><Link className="dropdown-item" to="/satsanga-audio" onClick={closeAll}>Saturday Satsanga</Link></li>
                <li><span className="dropdown-item disabled">Satsang Videos</span></li>
              </ul>
            </li>

            {/* Sewa Category */}
            <li className={`nav-item dropdown ${openDropdown === 'sewa' ? 'show' : ''}`}>
              <a href="#" className="nav-link dropdown-toggle" onClick={(e) => { e.preventDefault(); toggleDropdown('sewa'); }}>
                Sewa
              </a>
              <ul className={`dropdown-menu ${openDropdown === 'sewa' ? 'show' : ''}`}>
                <li><h6 className="dropdown-header">Opportunities to Serve</h6></li>
                <li><span className="dropdown-item disabled">Community Projects</span></li>
                <li><span className="dropdown-item disabled">Volunteer Work</span></li>
                <li><Link className="dropdown-item" to="/add-sloka" onClick={closeAll}>Add Sloka</Link></li>
                {user && <li><Link className="dropdown-item" to="/manage-media" onClick={closeAll}>Manage Media</Link></li>}
                <li><Link className="dropdown-item" to="/" onClick={closeAll}>Home Content</Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/wisdom" onClick={closeAll}>Wisdom</Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            {!user ? (
              <li className="nav-item">
                <Link className="nav-link" to="/login" onClick={closeAll}>
                  <i className="bi bi-person"></i> Login
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); logout(); closeAll(); }}>
                  <i className="bi bi-box-arrow-in-right"></i> Logout ({user.username})
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
