import React from 'react';

const CurvedSeparator3 = () => {
  return (
    <div className="relative w-full h-8 bg-[#EEEEEE] overflow-hidden z-10">
      <div
        className="absolute bottom-0 left-0 w-full h-[250px] md:h-[500px] bg-[#0C0C1F] rounded-t-full"
        style={{ transform: 'translateY(50%)' }}
      ></div>
    </div>
  );
};

export default CurvedSeparator3;