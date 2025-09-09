import React from 'react';

const CurvedSeparator4 = () => {
  return (
    <div className="relative w-full h-[32px] md:h-8 bg-[#1A2B42] overflow-hidden z-10">
      <div
        className="absolute bottom-0 left-0 w-full h-[250px] md:h-[500px] bg-[#EEEEEE] rounded-t-full"
        style={{ transform: 'translateY(50%)' }}
      ></div>
    </div>
  );
};

export default CurvedSeparator4;