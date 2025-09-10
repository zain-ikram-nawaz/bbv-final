"use client";
import React from "react";

export default function Vector48({ className = "", bg = "transparent" ,color}) {
  return (
    <div
      className={`w-full h-[5vh] relative overflow-hidden ${className}`}
      style={{ backgroundColor: bg }} // 👈 background dynamic (black/white)
    >
      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 1441 1479"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMin slice" // 👈 top aligned
      >
        <path className={`${className}`}
          d="M219.153 51.4199L-1 51.4199L-1 1479L1440 1479L1440 51.4199L1211.42 51.4199L1164.02 0L270.768 0L219.153 51.4199Z"
          fill={color} // 👈 blue shape
        />
      </svg>
    </div>
  );
}
