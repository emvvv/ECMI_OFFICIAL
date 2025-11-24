
import React, { useEffect, useRef } from 'react';
import { revealOnScroll } from '../utils/revealOnScroll';

function Sermons() {
  const headerRef = useRef(null);

  useEffect(() => {
    if (!headerRef.current) return;
    const cleanupHeader = revealOnScroll(headerRef.current, { threshold: 0.15, rootMargin: '0px 0px -10% 0px', once: true });
    // Reveal iframes and the 'See more' button as they enter view
    const cleanupIframes = revealOnScroll('.sermon-iframe', { threshold: 0.12, rootMargin: '0px 0px -10% 0px', once: true });
    const cleanupButton = revealOnScroll('.sermon-button', { threshold: 0.2, rootMargin: '0px 0px -5% 0px', once: true });

    return () => {
      if (cleanupHeader) cleanupHeader();
      if (cleanupIframes) cleanupIframes();
      if (cleanupButton) cleanupButton();
    };
  }, []);

  return (
    <section id="sermons" className="section__container-light">
      <h2 ref={headerRef} className="section__header-primary sermons__header">WATCH OUR LATEST MESSAGES </h2>
      <div className="video-container">

<iframe   
  className="sermon-iframe"
  src="https://www.youtube.com/embed/HpAvBIwbUOI?si=DZo5fbl1sMFCVQ-8" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  referrerpolicy="strict-origin-when-cross-origin" 
  allowfullscreen>
</iframe>


<iframe
 className="sermon-iframe"
  src="https://www.youtube.com/embed/uZz9JPXtNFg?si=qlF5Y-Oq_AFVEXl2" 
  title="YouTube video player" frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
</iframe>
</div>

<a className="sermon-button" href="https://www.youtube.com/@ecmimakati" target="_blank" 
>See more</a>
</section>
  );
}

export default Sermons;
