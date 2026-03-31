
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
 
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (target) => {
    // If we're already on the home page, just scroll to target
    if (location.pathname === '/') {
      if (target === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      closeMenu();
      return;
    }

    // Otherwise navigate to home and pass state so Home will scroll after mount
    navigate('/', { state: { scrollTo: target } });
    closeMenu();
  };

  return (
    <header>
      <div className="nav__container">
        <button onClick={() => handleNavigate('home')} className="nav__logo-button" style={{ background: 'none', border: 'none', padding: 0 }}>
          <img src="/alternate_white.png" alt="Logo"/>
        </button>

        <div className="nav__dropdown-menu">
          <i className="fa-solid fa-bars" onClick={toggleMenu} style={{ cursor: 'pointer' }}></i>
        </div>

        {isMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <div className="menu-backdrop" onClick={closeMenu}></div>

            {/* Menu */}
            <nav className="nav__menu">
              <div className="nav__menu-header">
                <h2>Menu</h2>
                <i className="fa-solid fa-xmark" onClick={closeMenu} style={{ cursor: 'pointer' }}></i>
              </div>
              <ul>
                <li><button className="nav__menu-link" onClick={() => handleNavigate('home')}>HOME</button></li>
                <li><button className="nav__menu-link" onClick={() => handleNavigate('sermons')}>SERMONS</button></li>
                <li><button className="nav__menu-link" onClick={() => handleNavigate('communities')}>COMMUNITIES</button></li>
                <li><RouterLink
                  className="nav__menu-link"
                  to="/about"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    closeMenu();
                  }}
                >ABOUT</RouterLink></li>
              </ul>
            </nav>
          </>
        )}

      </div>
    </header>
  );
}

export default Header;
