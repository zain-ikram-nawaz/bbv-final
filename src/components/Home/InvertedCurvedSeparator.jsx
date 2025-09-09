import React from 'react';

const InvertedCurvedSeparator = () => {
  return (
    <div className="relative w-full h-8 md:h-8 bg-[#534BFF] overflow-hidden z-10">
      <div
        className="absolute top-0 left-0 w-full h-[250px] md:h-[500px] bg-[#F0F4F9] rounded-b-full"
        style={{ transform: 'translateY(-50%)' }}
      ></div>
    </div>
  );
};

export default InvertedCurvedSeparator;