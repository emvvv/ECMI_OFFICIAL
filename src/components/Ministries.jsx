
import React, { useState } from 'react';

function Ministries() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const ministries = [
    {
      id: 1,
      image: "assets/ministries/youth.jpg",
      title: "LEGO Youth",
      description: "Kids Church is available every Sunday at all our service times. Ages 1–12."
    },
    {
      id: 2,
      image: "assets/ministries/worship.jpg",
      title: "Favor Youth",
      description: "Youth services happen every Saturday at 4PM. For high-schoolers ages 13–17."
    },
    {
      id: 3,
      image: "assets/ministries/multimedia.jpg",
      title: "Favor Movement",
      description: "Our young adult community for students and professionals. Ages 18–25."
    },
    {
      id: 4,
      image: "assets/ministries/multimedia.jpg",
      title: "Favor Movement",
      description: "Our young adult community for students and professionals. Ages 18–25."
    },
    {
      id: 5,
      image: "assets/ministries/multimedia.jpg",
      title: "Favor Movement",
      description: "Our young adult community for students and professionals. Ages 18–25."
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
    <section className="section__container-light">
      <h2 className="section__header-secondary">OUR MINISTRY</h2>

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
