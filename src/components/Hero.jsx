
import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import ScheduledButton from "./ScheduledButton";



function Hero() {
  const navigate = useNavigate();
  const location = useLocation();

  const goToServiceInfo = () => {
    if (location.pathname === '/') {
      const el = document.getElementById('serviceinfo');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    navigate('/', { state: { scrollTo: 'serviceinfo' } });
  };

  const goToPrayerRequestLink = () => {
    // simply navigate to the prayer request page
    navigate('/PrayerRequest');
  }

  return (
   <section className="hero__section">
    <div className="hero__title-container">
        <img className="hero__logo" src="/alternate_all_white.png"/> 
        <h2>Love God Love People</h2>
    </div>
  <div className="hero__button-container">
    <button className="hero__button" onClick={goToServiceInfo}>Worship with us</button>
    <button className="hero__button" onClick={goToPrayerRequestLink}>Need Prayer?</button>
  </div>
  <div className="hero__button-container">
    <ScheduledButton/>
  </div>

</section>
  );
}

export default Hero;
