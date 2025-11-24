
import React, { useState, useEffect, useRef } from 'react';
import { revealOnScroll } from '../utils/revealOnScroll';

function Ministries() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    if (!headerRef.current) return;
    const cleanup = revealOnScroll(headerRef.current, { threshold: 0.15, rootMargin: '0px 0px -10% 0px', once: true });
    return cleanup;
  }, []);

  const ministries = [
    {
      id: 1,
      image: "/ministries/youth.jpg",
      title: "LEGO Youth",
      description: "Love, Excel, Grow, Overcome - ECMI Youth Ministry"
    },
    {
      id: 2,
      image: "/ministries/men.jpg",
      title: "Men",
      description: "Community of godly men, who encourages and strengthen one another. "
    },
    {
      id: 3,
      image: "/ministries/women.jpg",
      title: "Women",
      description: "Women of God called to support one another in love and care"
    },
    {
      id: 4,
      image: "/ministries/kainos.jpg",
      title: "Kainos",
      description: "Young adult professionals community. Helps one another to navigate Christ-like living in their fields."
    },
    {
      id: 5,
      image: "/ministries/children.jpg",
      title: "Children",
      description: "Kids ages 4-12 learning and loving God's word"
    }
  ];

  const cardsPerView = 3;

  // Get the visible cards (handles infinite loop)
  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < cardsPerView; i++) {
      cards.push(ministries[(currentIndex + i) % ministries.length]);
    }
    return cards;
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? ministries.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ministries.length);
  };

  return (
    <section id="communities" className="section__container-light">
      <h2 ref={headerRef} className="section__header-secondary ministries__header">OUR COMMUNITY</h2>

      <div className="carousel-wrapper">
        {/* Left Arrow */}
        <button className="carousel-arrow left" onClick={goToPrevious} aria-label="Previous">
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        {/* Cards Container */}
        <div className="carousel-container">
          <div className="carousel-cards">
            {getVisibleCards().map((ministry, index) => (
              <div key={index} className="carousel-card">
                <img src={ministry.image} alt={ministry.title} />
                <div className="card-content">
                  <div className="card-title">{ministry.title}</div>
                  <div className="card-description">{ministry.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button className="carousel-arrow right" onClick={goToNext} aria-label="Next">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
}

export default Ministries;
