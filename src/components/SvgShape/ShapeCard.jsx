// ShapeCard.jsx
import React from "react";

const ShapeCard = ({
  children,
  shape = "triangle", // default shape
  color = "#fffff",
  className = ""
}) => {
  // ✅ Add as many shapes as you like here
  const shapePoints = {
    triangle: { type: "polygon", value: "50,0 0,100 100,100", viewBox: "0 0 100 100" },

    hexagon: { type: "polygon", value: "25,0 75,0 100,50 75,100 25,100 0,50", viewBox: "0 0 100 100" },

    customRect: {
      type: "path",
      value:
        "M382 0C390.837 0 398 7.16344 398 16V457C398 465.837 390.837 473 382 473H16C7.16344 473 0 465.837 0 457V16C0 7.16345 7.16345 0 16 0H91.0195C94.4761 1.03674 97.5292 3.22574 99.6211 6.27734L107.003 17.0459C109.986 21.3982 114.924 24 120.2 24H271.887C277.749 24 283.142 20.7941 285.942 15.6445L289.901 8.36426C292.702 3.21482 298.095 0.00985755 303.957 0.00976562H378C378.181 0.00976562 378.361 0.00596836 378.541 0H382Z",
      viewBox: "0 0 398 473"
    },

    fancyBlob: {
      type: "path",
      value:
        "M50 0C80 0 100 20 100 50C100 80 80 100 50 100C20 100 0 80 0 50C0 20 20 0 50 0Z",
      viewBox: "0 0 100 100"
    },
      shopBottomCard: {
    type: "path",
    value:
      "M145.476 476.831H21C12.1634 476.831 5 469.668 5 460.831L5 21.0198C5 12.1755 12.1755 5.00888 21.0198 5.01983L621.02 5.76269C629.849 5.77362 637 12.9339 637 21.7627L637 461.613C637 470.45 629.837 477.613 621 477.613H483.532C478.575 477.613 473.897 479.911 470.868 483.835L459.331 498.778C456.301 502.702 451.623 505 446.666 505L186.398 505C182.078 505 177.943 503.254 174.93 500.158L156.943 481.673C153.931 478.577 149.795 476.831 145.476 476.831Z",
    viewBox: "0 0 642 510",
  },
   shopTopCard: {
  type: "path",
  value:
    "M601.417 0C610.254 0 617.417 7.16344 617.417 16V457C617.417 465.837 610.254 473 601.417 473H16C7.16344 473 0 465.837 0 457V16C2.73827e-06 7.16345 7.16345 1.72757e-07 16 0H145.405C147.762 0.707117 149.945 1.95378 151.768 3.66797L168.769 19.6553C171.736 22.4458 175.656 23.9999 179.729 24H429.098C433.812 24 438.286 21.9211 441.326 18.3184L451.979 5.69141C455.019 2.08852 459.494 0.00998318 464.208 0.00976562H595.212C595.393 0.00976371 595.574 0.00598245 595.754 0H601.417Z",
  viewBox: "0 0 618 473"
}
  };

  const shapeData = shapePoints[shape];
  const clipId = `clip-${shape}`;

  return (
    <div className={`shape-card relative w-full max-w-sm mx-auto ${className}`}>
      <svg
        viewBox={shapeData.viewBox}
        preserveAspectRatio="none"
        className="w-full h-auto"
      >
        <defs>
          <clipPath id={clipId}>
            {shapeData.type === "polygon" ? (
              <polygon points={shapeData.value} />
            ) : (
              <path d={shapeData.value} />
            )}
          </clipPath>
        </defs>

        {/* Background Shape */}
        {shapeData.type === "polygon" ? (
          <polygon points={shapeData.value} fill={color} />
        ) : (
          <path d={shapeData.value} fill={color} />
        )}

        {/* Content clipped inside */}
        <foreignObject
          x="0"
          y="0"
          width="100%"
          height="100%"
          clipPath={`url(#${clipId})`}
        >
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            className="w-full h-full flex flex-col items-center justify-center text-white text-center  border-2"
          >
            {children}
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};

export default ShapeCard;
