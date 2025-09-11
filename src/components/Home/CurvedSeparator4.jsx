import React from 'react';

const CurvedSeparator4 = ({bg="#9c3932"}) => {
  return (
    <div className="relative w-full h-[32px] md:h-8 overflow-hidden z-10"
      style={{ backgroundColor: bg }} 
    >
      <div
        className="absolute bottom-0 left-0 w-full h-[250px] md:h-[500px] bg-[#EEEEEE] rounded-t-full"
        style={{ transform: 'translateY(50%)' }}
      ></div>
    </div>
  );
};

export default CurvedSeparator4;