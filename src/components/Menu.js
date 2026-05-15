import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
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
          <Link className="navbar-brand" to="/" onClick={closeAll}>Eternal Joy Lab</Link>
        </div>
        <div className={`collapse navbar-collapse ${isNavCollapsed ? '' : 'in'}`} id="myNavbar">
          <ul className="nav navbar-nav">
            {/* Sadhana Category */}
            <li className={`dropdown ${openDropdown === 'sadhana' ? 'open' : ''}`}>
              <a href="#" className="dropdown-toggle" onClick={(e) => { e.preventDefault(); toggleDropdown('sadhana'); }}>
                Sadhana <span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
                <li><Link to="/prayers" onClick={closeAll}>Daily Prayers</Link></li>
                <li><Link to="/pranayama" onClick={closeAll}>Pranayama</Link></li>
                <li><Link to="/yogasana" onClick={closeAll}>Yogasana</Link></li>
                <li><Link to="/personal-audio" onClick={closeAll}>Personal Audio</Link></li>
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
                <li><Link to="/" onClick={closeAll}>Home Content</Link></li>
              </ul>
            </li>

            <li>
              <Link to="/wisdom" onClick={closeAll}>Wisdom</Link>
            </li>
          </ul>

          <ul className="nav navbar-nav navbar-right">
            {/* 
                Note: On S3, Facebook PHP login logic won't work.
                You will eventually need a JS-based auth solution or 
                point these to your existing auth endpoints if they stay on a server.
            */}
            <li><a href="#"><span className="glyphicon glyphicon-user"></span> Login</a></li>
            <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menu;