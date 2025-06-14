
import React, { useState, useEffect, useMemo } from 'react';

const Starfield = ({
  starCount = 100,
  starColor = [255, 255, 255],
  speedFactor = 0.05,
  backgroundColor = 'transparent',
}) => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: starCount }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.5,
      }));
      setStars(newStars);
    };
    generateStars();
    window.addEventListener('resize', generateStars);
    return () => window.removeEventListener('resize', generateStars);
  }, [starCount]);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ backgroundColor }}
    >
      {stars.map((star, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-white animate-star-twinkle"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Starfield;
