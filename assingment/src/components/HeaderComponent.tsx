import React from 'react';
import './HeaderComponent.css'
import { NavLink } from 'react-router-dom';

function HeaderComponent() {
    return (
        <div className="navbar">
            <h3 className='title'>HighCharts</h3>
            <div className='navlinks-container'>
                <NavLink to = "/"  style={({ isActive }) => isActive
      ? {
          color: '#000000', fontWeight: 'bold', 
        }
      : { color: '#545e6f',  textDecoration: 'none' }
  }>ViewMode</NavLink>
            </div>
            <div className='navlinks-container' >
                <NavLink to = "/settings" style={({ isActive }) => isActive
      ? {
          color: '#000000', fontWeight: 'bold', 
        }
      : { color: '#545e6f',  textDecoration: 'none' }}>Settings</NavLink>
            </div>
        </div>
    )

}

export default HeaderComponent;