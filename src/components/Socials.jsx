import React from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
function Socials() {
  const navigate = useNavigate();
  return (
    <section className='section__container-light '>
      <section className="section__panel">
        <div className='socials__row'>
          <h3 className='socials__heading'>CONNECT WITH US</h3>
          <div className='socials__icon--group'>
            <a href='https://www.facebook.com/ECMIMakatiOfficial' target='_blank'><i className="fa-brands fa-facebook socials__i" aria-hidden="true"></i></a>
            <a href='https://www.instagram.com/ecmimakatiofficial/?utm_source=ig_web_button_share_sheet' target='_blank'><i className="fa-brands fa-instagram socials__i" aria-hidden="true"></i></a>
            {/* <a href='https://www.youtube.com/@ecmimakati' target='_blank'><i className="fa-brands fa-youtube socials__i" aria-hidden="true"></i></a> */}
          </div>
        </div>

        <div className='socials__row'>
        <h3 className='socials__heading'>LEARN ABOUT US</h3>
          <div className='socials__button--group'>
            <button className='socials__btn' onClick={() => navigate('/about')}>OUR HISTORY</button>
          </div>
        </div>

      </section>
    </section>
  );
}

export default Socials;
