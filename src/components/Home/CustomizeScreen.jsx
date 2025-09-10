"use client";

import React, { useState, useEffect, useRef, useId } from "react";

// NOTE: It is assumed that GSAP and ScrollTrigger are loaded via a <script> tag
// in your main HTML file.

// An array of image sources for the grid
const images = [
  "/images/img3.jpg",
  "/images/img2.jpg",
  "/images/img1.jpg",
  "/images/img5.webp",
];

// Helper Component 1: ImageModal
// --- THIS COMPONENT HAS BEEN UPDATED ---
const ImageModal = ({ src, onClose }) => {
  // Close modal on 'Escape' key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!src) return null;

  return (
    // This is the full-screen backdrop. It acts as the positioning container for the button.
    <div
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose} // Close on backdrop click
    >
      {/* Container for the image, centered on the screen */}
      <div
        className="relative flex items-center justify-center max-w-[23vw] max-h-[40vh]"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
      >
        <img
          src={src}
          alt="Expanded view"
          className="object-contain max-h-full max-w-full rounded-lg shadow-2xl"
        />
      </div>

      {/* UPDATED BUTTON: Now a direct child of the backdrop */}
      <button
        onClick={onClose}
        aria-label="Close image view"
        // NEW CLASSES: Positions the button in the top-right of the viewport
        className="absolute top-6 right-6 bg-white text-black rounded-full h-10 w-10 flex items-center justify-center font-bold text-2xl z-[51] transition-transform hover:scale-110"
      >
        &times;
      </button>
    </div>
  );
};

// Helper Component 2: CardFrame (No changes needed here)
const CardFrame = ({ imageSrc, curveType, borderColor, viewBoxHeight, onImageClick }) => {
  const uniqueId = useId();
  const magneticRef = useRef(null);

  // Magnetic mouse-follow effect
  useEffect(() => {
    const el = magneticRef.current;
    if (!el || !window.gsap) return;

    const gsap = window.gsap;
    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "power3" });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.15);
      yTo(y * 0.15);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const framePaths = {
    standard: {
      top: { outer: "M0 0H100L125 20L275 20L300 0H400V300H0V0Z", inner: "M3 3H103L126 23L274 23L297 3H397V297H3V3Z" },
      bottom: { outer: "M0 0H400V280L300 280L275 300L125 300L100 280L0 280V0Z", inner: "M3 3H397V277L297 277L274 297L126 297L103 277L3 277V3Z" },
    },
    tall: {
      top: { outer: "M0 0H100L125 20L275 20L300 0H400V480H0V0Z", inner: "M3 3H103L126 23L274 23L297 3H397V477H3V3Z" },
      bottom: { outer: "M0 0H400V460L300 460L275 480L125 480L100 460L0 460V0Z", inner: "M3 3H397V457L297 457L274 477L126 477L103 457L3 457V3Z" },
    },
  };

  const selectedPaths = viewBoxHeight === 480 ? framePaths.tall : framePaths.standard;
  const currentPaths = curveType === 'top' ? selectedPaths.top : selectedPaths.bottom;
  const imageEffectClasses = "transition-all duration-500 ease-in-out origin-center group-hover:scale-110 group-hover:brightness-105 group-hover:saturate-150";

  return (
    <div
      ref={magneticRef}
      className="group w-full h-full cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => onImageClick(imageSrc)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500 ease-out group-hover:[transform:rotateY(var(--rotate-y))_rotateX(var(--rotate-x))_scale(1.05)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 400 ${viewBoxHeight}`}
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id={`image-pattern-${uniqueId}`} width="100%" height="100%" viewBox={`0 0 400 ${viewBoxHeight}`} preserveAspectRatio="xMidYMid slice">
              <image href={imageSrc} x="0" y="0" width="400" height={viewBoxHeight} preserveAspectRatio="xMidYMid slice" className={`${imageEffectClasses} card-image-inner`} />
            </pattern>
          </defs>
          <path d={currentPaths.outer} fill="#222222" />
          <path d={currentPaths.inner} fill={`url(#image-pattern-${uniqueId})`} />
          <path
            d={currentPaths.inner}
            stroke={borderColor || "#8380d9ff"}
            strokeWidth="3"
            fill="none"
            className="card-border transition-all duration-500 ease-out group-hover:filter group-hover:[filter:drop-shadow(0_0_8px_var(--glow-color))]"
            style={{ '--glow-color': borderColor }}
          />
        </svg>
      </div>
    </div>
  );
};

// Main Component: CustomizeSection (No changes needed here)
const CustomizeSection = () => {
  const sectionRef = useRef(null);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (window.gsap && window.ScrollTrigger) {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const tlText = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none none",
          },
        });
        tlText.fromTo(".text-content-animate", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1.2, ease: "power3.out", stagger: 0.2 });
        tlText.fromTo(".customize-btn", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }, "-=0.8");

        const imageWrappers = gsap.utils.toArray(".image-wrapper");
        imageWrappers.forEach((wrapper) => {
          const border = wrapper.querySelector(".card-border");
          const tlGrid = gsap.timeline({
            scrollTrigger: {
              trigger: wrapper,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
          tlGrid.fromTo(wrapper, { opacity: 0, scale: 0.8, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power3.out" });
          if (border) {
            tlGrid.from(border, {
              strokeDasharray: (i, el) => el.getTotalLength(),
              strokeDashoffset: (i, el) => el.getTotalLength(),
              duration: 1.5,
              ease: "power2.inOut",
            }, 0.2);
          }
        });

        gsap.utils.toArray(".image-wrapper").forEach((wrapper) => {
          const image = wrapper.querySelector(".card-image-inner");
          gsap.to(image, {
            y: "-40px",
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });

      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <>
      <section ref={sectionRef} className="relative w-full overflow-hidden bg-[#534BFF] text-white py-20 lg:py-32">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 lg:ml-1 text-content-animate">
                <span className="animated-heading-bbv">Customize</span>
              </h2>
              <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 text-content-animate">
                At Big Bear Vans, we don’t do one-size-fits-all custom van conversions. Therefore, you’ll not find any generic templates here. We build every campervan according to your lifestyle, habits, and travel plans. We will finalize van design and handpick amenities like an off-grid electrical system and a customized kitchen to create your perfect home on wheels.
              </p>
              <button className="customize-btn px-8 py-3 rounded-full font-semibold lg:ml-1">
                Start Your Custom Build
              </button>
            </div>
            <div className="lg:w-1/2 w-full mt-10 lg:mt-0">
              <div className="grid grid-cols-2 gap-x-3 items-start">
                {images.map((src, index) => {
                  const isTall = index === 0 || index === 3;
                  const currentViewBoxHeight = isTall ? 480 : 300;
                  const curveDirection = index > 1 ? "top" : "bottom";
                  const cardBorderColor = isTall ? "#0f95be" : "#8380d9ff";

                  let marginTopClass = "";
                  if (index === 1) marginTopClass = "mt-8";
                  else if (index === 2) marginTopClass = "-mt-2";
                  else if (index === 3) marginTopClass = "-mt-36";

                  return (
                    <div
                      key={index}
                      className={`image-wrapper relative w-full ${isTall ? "h-[30rem]" : "h-[19rem]"} ${marginTopClass}`}
                    >
                      <CardFrame
                        imageSrc={src}
                        curveType={curveDirection}
                        borderColor={cardBorderColor}
                        viewBoxHeight={currentViewBoxHeight}
                        onImageClick={setActiveImage}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ImageModal src={activeImage} onClose={() => setActiveImage(null)} />

      <style jsx>{`
        .animated-heading-bbv {
          background: linear-gradient(
            to right,
            #eaeeefff,
            #8380d9ff,
            #eaeaf1ff,
            #0f95be
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% 100%;
          animation: animated-gradient 3s ease-in-out infinite;
        }

        .customize-btn {
          background: linear-gradient(
            90deg,
            #604055ff,
            #5853e5ff,
            #06b6d4,
            #382130
          );
          background-size: 200% auto;
          animation: animated-gradient 4s linear infinite;
          border: none;
          color: white;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .customize-btn:hover {
          transform: scale(1.05);
          color: white !important;
        }

        @keyframes animated-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </>
  );
};

export default CustomizeSection;