import React from 'react'
import HomeCarouselData from '../data/HomeCarouselData'
import "../css/Carousel.css"
import { Link } from 'react-router-dom'
import { useState } from 'react'
const Carousel = () => {
 const [centerIndex, setCenterIndex] = useState(1); // center starts at index 1

  const getIndex = (offset) => {
    const total = HomeCarouselData.length;
    return (centerIndex + offset + total) % total;
  };

  const handleClick = (position) => {
    if (position === 'left') {
      setCenterIndex((prev) => (prev - 1 + HomeCarouselData.length) % HomeCarouselData.length);
    } else if (position === 'right') {
      setCenterIndex((prev) => (prev + 1) % HomeCarouselData.length);
    }
  };
  return (
    <div className="carousel">
    <div className="carousel-container">
            {/* Left Item */}
            <div
                className="carousel-item left"
                onClick={() => handleClick('left')}
                style={{ backgroundImage: `url(${HomeCarouselData[getIndex(-1)].image})` }}
            >
                <div className="carousel-text">{HomeCarouselData[getIndex(-1)].title}</div>
            </div>

            {/* Center Item */}
            <div
                className="carousel-item center"
                style={{ backgroundImage: `url(${HomeCarouselData[getIndex(0)].image})` }}
            >
                <div className="carousel-text">{HomeCarouselData[getIndex(0)].title}</div>
            </div>

            {/* Right Item */}
            <div
                className="carousel-item right"
                onClick={() => handleClick('right')}
                style={{ backgroundImage: `url(${HomeCarouselData[getIndex(1)].image})` }}
            >
                <div className="carousel-text">{HomeCarouselData[getIndex(1)].title}</div>
            </div>
      </div>
      <div className="more_container">
        <Link to='/events' className='texts more'>More..</Link>
      </div>
    </div>
  );
}

export default Carousel
