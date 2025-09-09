import React from 'react';

const CurvedSeparator = () => {
  return (
    <div className="relative w-full h-8 bg-[#000000] overflow-hidden z-10">
      <div
        className="absolute bottom-0 left-0 w-full h-[250px] bg-[#F0F4F9] rounded-t-full"
        style={{ transform: 'translateY(50%)' }}
      ></div>
    </div>
  );
};

export default CurvedSeparator;