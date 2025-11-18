
import React, { useState } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
 
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
<header>
<div className="nav__container">
    
    <img src="assets/alternate_white.png" alt="Logo"/>
   
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
            <li><a href="#home" onClick={closeMenu}>HOME</a></li>
            <li><a href="#service-info" onClick={closeMenu}>SERMONS</a></li>
            <li><a href="#ministries" onClick={closeMenu}>MINISTRIES</a></li>
            <li><a href="#contact" onClick={closeMenu}>ABOUT</a></li>
          </ul>
        </nav>
      </>
    )}

</div>

</header> 
 

  );
}

export default Header;
