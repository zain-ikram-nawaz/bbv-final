import React from 'react';

const InvertedCurvedSeparator2 = () => {
  return (
    <div className="relative w-full h-8 bg-[#EEEEEE] overflow-hidden z-10">
      <div
        // The height of the curve is now responsive.
        // It's smaller by default (mobile-first), and gets larger on medium and large screens.
        className="absolute top-0 left-0 w-full h-[200px] md:h-[300px] lg:h-[400px] 2xl:h-[500px] bg-[#111111] rounded-b-full"
        // The transform property is a percentage, so it automatically scales with the element's height.
        style={{ transform: 'translateY(-50%)' }}
      ></div>
    </div>
  );
};

export default InvertedCurvedSeparator2;
