import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from "../contexts/AuthContext";

function STNav() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const { logout } = useAuth()
  // this is the userid
  const id = 222;
  const sessionid = 123;
  const stsessionid = 232124;

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const closeMobileMenuSignOut = () => {
    setClick(false)
    logout()
    };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            HuzzahPlay

          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/dash/{id}' className='nav-links' onClick={closeMobileMenu}>
                Dash
              </Link>
            </li>

            <li className='nav-item'>
              <Link to='/session/{sessionid}' className='nav-links' onClick={closeMobileMenu}>
                Session
              </Link>
            </li>

            <li className='nav-item'>
              <Link to='/studentsession/{stsessionid}' className='nav-links' onClick={closeMobileMenu}>
                Student Session
              </Link>
            </li>

            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenuSignOut}>
                Sign out
              </Link>
            </li>
          </ul>


        </div>
      </nav>
    </>
  );
}

export default STNav;
