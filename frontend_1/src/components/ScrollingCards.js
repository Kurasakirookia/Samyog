// ScrollingCards.js
import React, { useEffect, useRef } from "react";
import "../css/ScrollingCards.css";

const cards = [
  "Portfolio tracking tools",
  "Daily market insights",
  "Community discussions",
  "Real-time signals",
  "Live trading sessions",
  "Expert-led courses",
];

const ScrollingCards = () => {
  const scrollRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollSpeed = 1;

    const animateScroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed;

        // Reset scroll to create infinite loop
        if (
          scrollContainer.scrollLeft >=
          scrollContainer.scrollWidth / 2
        ) {
          scrollContainer.scrollLeft = 0;
        }
      }

      animationRef.current = requestAnimationFrame(animateScroll);
    };

    animationRef.current = requestAnimationFrame(animateScroll);

    return () => cancelAnimationFrame(animationRef.current);
  }, []);
  
  return (
    <div className="scroll-card-wrapper" ref={scrollRef}>
      <div className="scroll-card-content">
        {[...cards, ...cards].map((text, idx) => (
          <div className="scroll-card" key={idx}>
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingCards;
