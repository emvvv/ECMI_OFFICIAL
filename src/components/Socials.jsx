import React from 'react';

function Socials() {
  return (
    <section className='section__container-light '>
      <section className="section__panel">
        <div className='socials__row'>
          <h3 className='socials__heading'>CONNECT WITH US</h3>
          <div className='socials__icon--group'>
            <i className="fa-brands fa-facebook" aria-hidden="true"></i>
            <i className="fa-brands fa-instagram" aria-hidden="true"></i>
            <i className="fa-brands fa-youtube" aria-hidden="true"></i>
          </div>
        </div>

        <div className='socials__row'>
          <h3 className='socials__heading'>LEARN ABOUT US</h3>
          <div className='socials__button--group'>
            <button className='socials__btn'>OUR HISTORY</button>
          </div>
        </div>

      </section>
    </section>
  );
}

export default Socials;
