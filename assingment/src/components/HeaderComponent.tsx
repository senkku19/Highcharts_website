import React, {useEffect, useState} from 'react';
import './css/HeaderComponent.css'
import { NavLink } from 'react-router-dom';

function HeaderComponent() {
    const [position, setPosition] = useState(window.scrollY);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            let scrolling = window.scrollY

            setVisible(position>scrolling);
            setPosition(scrolling);
        };

        window.addEventListener("scroll", handleScroll);
        return(() => {
            window.removeEventListener("scroll", handleScroll);
        })
    })

    const csl = visible ? "visible" : "hidden";



    return (
        <header className={csl}>
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
                <NavLink to = "/settingsview" style={({ isActive }) => isActive
      ? {
          color: '#000000', fontWeight: 'bold', 
        }
      : { color: '#545e6f',  textDecoration: 'none' }}>Settings</NavLink>
            </div>
        </header>
    )

}

export default HeaderComponent;