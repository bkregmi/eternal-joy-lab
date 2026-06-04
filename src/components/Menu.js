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
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" onClick={toggleNav}>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand" to="/" onClick={closeAll}>Eternal Bliss Lab</Link>
        </div>
        <div className={`collapse navbar-collapse ${isNavCollapsed ? '' : 'in'}`} id="myNavbar">
          <ul className="nav navbar-nav">
            {/* Sadhana Category */}
            <li className={`dropdown ${openDropdown === 'sadhana' ? 'open' : ''}`}>
              <a href="#" className="dropdown-toggle" onClick={(e) => { e.preventDefault(); toggleDropdown('sadhana'); }}>
                Sadhana <span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
                <li><Link to="/blissful-stuties" onClick={closeAll}>Blissful Stuties</Link></li>
                <li><Link to="/prayers" onClick={closeAll}>Daily Prayer</Link></li>
                <li><Link to="/pranayama" onClick={closeAll}>Pranayama</Link></li>
                <li><Link to="/yogasana" onClick={closeAll}>Yogasana</Link></li>
                {user && <li><Link to="/personal-audio" onClick={closeAll}>Personal Audio</Link></li>}
                <li><Link to="/devas" onClick={closeAll}>Devi/Devata Prayers</Link></li>
              </ul>
            </li>

            {/* Swadhaya Category */}
            <li className={`dropdown ${openDropdown === 'swadhaya' ? 'open' : ''}`}>
              <a href="#" className="dropdown-toggle" onClick={(e) => { e.preventDefault(); toggleDropdown('swadhaya'); }}>
                Swadhaya <span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
                <li><Link to="/scripture-verses" onClick={closeAll}>Scripture Verses</Link></li>
                <li><Link to="/scripture-audio" onClick={closeAll}>Scripture Audio</Link></li>
              </ul>
            </li>

            {/* Satsanga Category */}
            <li className={`dropdown ${openDropdown === 'satsanga' ? 'open' : ''}`}>
              <a href="#" className="dropdown-toggle" onClick={(e) => { e.preventDefault(); toggleDropdown('satsanga'); }}>
                Satsanga <span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
                <li><Link to="/bhajans" onClick={closeAll}>Nepali Bhajans</Link></li>
                <li><Link to="/satsanga-audio" onClick={closeAll}>Saturday Satsanga</Link></li>
                <li className="disabled"><a href="#">Satsang Videos</a></li>
              </ul>
            </li>

            {/* Sewa Category */}
            <li className={`dropdown ${openDropdown === 'sewa' ? 'open' : ''}`}>
              <a href="#" className="dropdown-toggle" onClick={(e) => { e.preventDefault(); toggleDropdown('sewa'); }}>
                Sewa <span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
                <li className="dropdown-header">Opportunities to Serve</li>
                <li className="disabled"><a href="#">Community Projects</a></li>
                <li className="disabled"><a href="#">Volunteer Work</a></li>
                <li><Link to="/add-sloka" onClick={closeAll}>Add Sloka</Link></li>
                {user && <li><Link to="/manage-media" onClick={closeAll}>Manage Media</Link></li>}
                <li><Link to="/" onClick={closeAll}>Home Content</Link></li>
              </ul>
            </li>

            <li>
              <Link to="/wisdom" onClick={closeAll}>Wisdom</Link>
            </li>
          </ul>

          <ul className="nav navbar-nav navbar-right">
            {!user ? (
              <li><Link to="/login" onClick={closeAll}><span className="glyphicon glyphicon-user"></span> Login</Link></li>
            ) : (
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); logout(); closeAll(); }}>
                  <span className="glyphicon glyphicon-log-in"></span> Logout ({user.username})
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