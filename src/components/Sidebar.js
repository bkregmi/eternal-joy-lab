import React from 'react';
import { Link } from 'react-router-dom';
import CalendarEvents from './CalendarEvents';

const Sidebar = () => {
  return (
    <div className="sidebar-content">
      <div className="widget-bhajans" style={{ marginTop: '20px' }}>
        <h4 className="sh3">Sadhana</h4>
        <ul className="sidebar-menu">
          <li><Link to="/blissful-stuties">Blissful Stuties</Link></li>
          <li><Link to="/prayers">Daily Prayer</Link></li>
        </ul>
        <h4 className="sh3">Nepali Bhajans</h4>
        <p>Traditional bhajans and resources.</p>
      </div>
    </div>
  );
};

export default Sidebar;