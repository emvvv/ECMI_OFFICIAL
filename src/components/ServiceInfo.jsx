
import React from 'react';
import { revealOnScroll } from '../utils/revealOnScroll';

function ServiceInfo() {

  return (

   <section id ="serviceinfo" className="section__container-light">
    <div className="section__panel">
        <div className="section__container-row serviceinfo__mobile-hide">
            <h2 className="container__center">Worship<br/>Service</h2>
        </div>
            <div className="section__container-row">
                <p>SUNDAYS, LIVE AT 1342 Angono St., <br/>Poblacion, Makati</p>
                <h2>9AM</h2>
                <p>Get directions 
                <br />
                <a href="https://www.google.com/maps/place/ECMI+Makati/@14.5702102,121.0236402,817m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3397c90030c71a31:0xff2e5e39e28634ab!8m2!3d14.5702102!4d121.0262151!16s%2Fg%2F11xcw8j8pg?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D" target="_blank"> Google Maps</a><br />
                <a href="https://www.waze.com/en/live-map/directions/ph/ncr/makati-city/ecmi-makati?to=place.ChIJMRrHMADJlzMRqzSG4jleLv8" target="_blank"> Waze</a> <br />
                </p>
            </div>

    </div>
   </section>
  );
}

export default ServiceInfo;
