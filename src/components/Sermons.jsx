
import React, { useEffect, useRef } from 'react';
import { revealOnScroll } from '../utils/revealOnScroll';

function Sermons() {
  const headerRef = useRef(null);

  useEffect(() => {
    if (!headerRef.current) return;
    const cleanup = revealOnScroll(headerRef.current, { threshold: 0.15, rootMargin: '0px 0px -10% 0px', once: true });
    return cleanup;
  }, []);

  return (
    <section className="section__container-light">
      <h2 ref={headerRef} className="section__header-primary sermons__header">WATCH OUR LATEST MESSAGES </h2>
      <div className="video-container">
<iframe
  className="sermon-iframe"
  src="https://www.youtube.com/embed/oE3ZwnXZ0AA?si=4Kl7TDp1IogSpLK3"
  title="YouTube video player"
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
