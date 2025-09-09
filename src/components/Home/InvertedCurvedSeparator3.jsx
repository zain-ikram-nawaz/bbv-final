import React from 'react';

const InvertedCurvedSeparator3 = () => {
  return (
    <div className="relative w-full h-[32px] md:h-7 bg-[#1A2B42] overflow-hidden z-10">
      <div
        className="absolute top-0 left-0 w-full h-[250px] md:h-[500px] bg-[#0C0C1F] rounded-b-full"
        style={{ transform: 'translateY(-50%)' }}
      ></div>
    </div>
  );
};

export default InvertedCurvedSeparator3;