
import React from 'react';

function Sermons() {
  return (
<section className="section__container-light">
<h2 className="section__header-primary">WATCH OUR LATEST MESSAGES </h2>
<div className="video-container">
<iframe
  className="sermon-iframe"
  src="https://www.youtube.com/embed/oE3ZwnXZ0AA?si=4Kl7TDp1IogSpLK3"
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerPolicy="strict-origin-when-cross-origin"
  allowFullScreen
></iframe>

<iframe
  className="sermon-iframe"
  src="https://www.youtube.com/embed/uUNo2pSfdG0?si=bp5gstgskLA8XSYc"
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerPolicy="strict-origin-when-cross-origin"
  allowFullScreen
></iframe>
</div>
</section>
  );
}

export default Sermons;
