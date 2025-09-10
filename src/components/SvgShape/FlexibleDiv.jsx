"use client";
import React from "react";

const shapes = {
 shopBackground: {
    value:
      "M219.153 51.4199L-1 51.4199L-1 1479L1440 1479L1440 51.4199L1211.42 51.4199L1164.02 0L270.768 0L219.153 51.4199Z",
    viewBox: "0 0 1440 1479",
  },
  customRect: {
    value: "M0 0h1440v800H0z",
    viewBox: "0 0 1440 800"
  },

};

export default function FlexibleDiv({
  shape = "customRect",
  color = "#111111",
  className = "",
  children
}) {
  const shapeData = shapes[shape] || shapes.customRect;
  const [, , vbW = 1440, vbH = 800] = (shapeData.viewBox || "0 0 1440 800")
    .split(" ")
    .map(Number);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Background shape */}
      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox={shapeData.viewBox}
     preserveAspectRatio="xMidYMid slice"

      >
        <path d={shapeData.value} fill={color} />
      </svg>

      {/* Foreground content (no clipping effect) */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
