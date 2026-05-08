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
            <li><Link to="/prayers" onClick={closeAll}>Daily Prayers</Link></li>
            <li><Link to="/pranayama" onClick={closeAll}>Pranayama</Link></li>
            <li><Link to="/bhagavatam" onClick={closeAll}>Bhagavatam</Link></li>

            {/* 2nd Level / More Dropdown */}
            <li className={`dropdown ${openDropdown === 'more' ? 'open' : ''}`}>
              <a 
                href="#" 
                className="dropdown-toggle" 
                onClick={(e) => { e.preventDefault(); toggleDropdown('more'); }}
              >
                More <span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
                <li><Link to="/gita" onClick={closeAll}>Srimad Bhagawat Gita</Link></li>
                <li><Link to="/devas" onClick={closeAll}>Devi/devata</Link></li>
                <li><Link to="/view/docs/nepali-bhajans/html" onClick={closeAll}>Nepali Bhajans</Link></li>
                <li><Link to="/" onClick={closeAll}>Home Content</Link></li>
              </ul>
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