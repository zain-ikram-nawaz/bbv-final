"use client";
import Link from "next/link";
import { useState, useEffect, useId, useRef } from "react";
import { gsap } from "gsap";

// The single, versatile CardFrame component
const CardFrame = ({ children, curveType, className, imageSrc, borderColor }) => {
  const uniqueId = useId(); // Generates a unique ID for this instance

  // SVG paths for the card frames with the new notch shape
  const framePaths = {
    top: {
      outer: "M0 0H100L125 20L275 20L300 0H400V300H0V0Z",
      inner: "M3 3H103L126 23L274 23L297 3H397V297H3V3Z",
    },
    bottom: {
      outer: "M0 0H400V280L300 280L275 300L125 300L100 280L0 280V0Z",
      inner: "M3 3H397V277L297 277L274 297L126 297L103 277L3 277V3Z",
    },
    fullCurve: {
      outer: "M0 0H100L125 20L275 20L300 0H400V280L300 280L275 300L125 300L100 280L0 280V0Z",
      inner: "M3 3H103L126 23L274 23L297 3H397V277L297 277L274 297L126 297L103 277L3 277V3Z",
    },
    tallerCard: {
      outer: "M0 0H100L125 20L275 20L300 0H400V320L300 320L275 340L125 340L100 320L0 320V0Z",
      inner: "M3 3H103L126 23L274 23L297 3H397V317L297 317L274 337L126 337L103 317L3 317V3Z"
    }
  };

  const getPaths = () => {
    switch(curveType) {
      case 'top':
        return { outer: framePaths.top.outer, inner: framePaths.top.inner };
      case 'bottom':
        return { outer: framePaths.bottom.outer, inner: framePaths.bottom.inner };
      case 'fullCurve':
        return { outer: framePaths.fullCurve.outer, inner: framePaths.fullCurve.inner };
      case 'tallerCard':
        return { outer: framePaths.tallerCard.outer, inner: framePaths.tallerCard.inner };
      default:
        return { outer: framePaths.bottom.outer, inner: framePaths.bottom.inner };
    }
  };
 
  const currentPaths = getPaths();
  const viewBoxHeight = curveType === 'tallerCard' ? 340 : 300;
 
  const imageEffectClasses = "transition-all duration-300 ease-in-out origin-center group-hover:scale-110 group-hover:brightness-110";

  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className} overflow-hidden group`}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 400 ${viewBoxHeight}`}
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <pattern
            id={`image-pattern-${uniqueId}`}
            width="100%"
            height="100%"
            viewBox={`0 0 400 ${viewBoxHeight}`}
            preserveAspectRatio="xMidYMid slice"
          >
            <image
              href={imageSrc}
              x="0" y="0" width="400" height={viewBoxHeight}
              preserveAspectRatio="xMidYMid slice"
              className={imageEffectClasses}
            />
          </pattern>
        </defs>

        <path d={currentPaths.outer} fill="#F0F4F9" />
        
        <path
          d={currentPaths.inner}
          fill={`url(#image-pattern-${uniqueId})`}
        />

        <path
          d={currentPaths.inner}
          stroke={borderColor || "#800080"} // Set the border color here
          strokeWidth="3"
          fill="none"
        />
      </svg>
    </div>
  );
};

// DreamDriveway component
export default function DreamDriveway() {
    const [mounted, setMounted] = useState(false);
 
    // Refs for each row
    const firstRowRef = useRef(null);
    const secondRowRef = useRef(null);
    const thirdRowRef = useRef(null);

    useEffect(() => {
      setMounted(true);
      
      const allRows = [firstRowRef, secondRowRef, thirdRowRef];

      allRows.forEach(rowRef => {
        if (rowRef.current) {
            const cards = gsap.utils.toArray(rowRef.current.children);
            gsap.from(cards, {
                y: 100,
                opacity: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.2
            });
        }
      });
    }, []);

    if (!mounted) {
      return null;
    }

    const images = [
      { src: "/images/cardimage1.jpg", alt: "Camper van interior bathroom" },
      { src: "/images/cardimage2.jpg", alt: "Camper van kitchen with beach view" },
      { src: "/images/cardimage3.webp", alt: "Camper van cozy interior with bed" },
      { src: "/images/cardimage4.jpg", alt: "Camper van modern kitchen counter" },
      { src: "/images/cardimage5.jpg", alt: "Camper van interior with open feel" },
      { src: "/images/cardimage6.jpg", alt: "Camper van rear view with open door" },
      { src: "/images/cardimage7.jpg", alt: "Custom camper van exterior" },
    ];

    const firstRow = images.slice(0, 3);
    const secondRow = images.slice(3, 6);
    const lastRow = images.slice(6);

    return (
      <div className="relative w-full bg-white text-gray-800 py-16 md:py-24 overflow-hidden">
        <div className="text-center mb-12 px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            From Dream to <span className="bg-gradient-text">Your Driveway</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Take a look at some of our best custom vans.
          </p>
        </div>

        {/* First Row - No negative margin on mobile */}
        <div ref={firstRowRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto px-6 mb-5">
          {firstRow.map((image, index) => (
            <div
              key={index}
              className="relative w-full aspect-[4/3]"
            >
              <CardFrame
                curveType="bottom"
                imageSrc={image.src}
                borderColor={index === 1 ? "black" : "#800080"}
              />
            </div>
          ))}
        </div>

        {/* Second Row - Negative margin applied only on md screens and up */}
        <div ref={secondRowRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto px-6 md:mt-[-2rem] mb-5">
          {secondRow.map((image, index) => (
            <div
              key={index + firstRow.length}
              className={`relative w-full ${index === 1 ? 'aspect-[5/4]' : 'aspect-[4/3]'}`}
            >
              <CardFrame
                curveType={index === 1 ? "tallerCard" : "top"}
                imageSrc={image.src}
                borderColor={index === 0 || index === 2 ? "black" : "#800080"}
              />
            </div>
          ))}
        </div>

        {/* Third Row - Use flexbox for single card, no negative margin on mobile */}
        <div ref={thirdRowRef} className="flex justify-center max-w-6xl mx-auto px-6 md:mt-[-2rem] mb-4">
          {lastRow.map((image, index) => (
            <div
              key={index + firstRow.length + secondRow.length}
              className="relative w-full aspect-[4/3] max-w-sm"
            >
              <CardFrame
                curveType="top"
                imageSrc={image.src}
                borderColor="black"
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link href="#" className="relative inline-flex items-center justify-center px-10 py-4 rounded-full font-semibold overflow-hidden group shadow-lg">
            <span className="absolute inset-0 w-full h-full bg-gradient-button z-0"></span>
            <span className="relative text-white z-10">Explore our Portfolio</span>
          </Link>
        </div>
      </div>
    );
  }