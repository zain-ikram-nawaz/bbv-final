import React from 'react';

const CurvedSeparator2 = () => {
  return (
    <div className="relative w-full h-[32px] md:h-8 bg-[#534BFF] overflow-hidden z-10">
      <div
        className="absolute bottom-0 left-0 w-full h-[250px] md:h-[500px] bg-[#111111] rounded-t-full"
        style={{ transform: 'translateY(50%)' }}
      ></div>
    </div>
  );
};

export default CurvedSeparator2;