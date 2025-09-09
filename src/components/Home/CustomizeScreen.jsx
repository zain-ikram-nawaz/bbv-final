"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const CustomizeSection = () => {
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  const imageRef = useRef(null);
  const mobileImageWrapperRef = useRef(null);
  const desktopImageWrapperRef = useRef(null);

  useEffect(() => {
    // Fade-in animations
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      textContainerRef.current,
      { opacity: 0, scale: 0.9, y: 40 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, filter: "blur(10px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
        },
      }
    );

    // Hover effects for buttons
    const buttons = document.querySelectorAll(".customize-btn");
    buttons.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(el, {
          scale: 1.1,
          backgroundColor: "#534BFF",
          color: "#fff",
          borderColor: "#534BFF",
          boxShadow: "0 8px 25px rgba(83, 75, 255, 0.4)",
          duration: 0.3,
        });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el, {
          scale: 1,
          backgroundColor: "white",
          color: "#534BFF",
          borderColor: "#534BFF",
          boxShadow: "0 0px 0px rgba(0,0,0,0)",
          duration: 0.3,
        });
      });
    });

    // Hover glow effect for images (mobile + desktop)
    [mobileImageWrapperRef.current, desktopImageWrapperRef.current].forEach(
      (imgWrapper) => {
        if (!imgWrapper) return;
        imgWrapper.addEventListener("mouseenter", () => {
          gsap.to(imgWrapper, {
            scale: 1.05,
            boxShadow:
              "0 0 8px rgba(180,220,255,0.6), 0 0 20px rgba(200,230,255,0.5)",
            duration: 0.4,
          });
        });
        imgWrapper.addEventListener("mouseleave", () => {
          gsap.to(imgWrapper, {
            scale: 1,
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            duration: 0.4,
          });
        });
      }
    );
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#111111] text-white py-16 md:py-20">
      <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center" ref={containerRef}>
        {/* Headings */}
        <h2 className="text-3xl md:text-5xl font-extrabold mb-3 text-white">
       Customize Your Van
        </h2>
        <h3 className="text-2xl md:text-4xl font-extrabold mb-6">
          <span className="text-white">With</span>{" "}
          <span className="animated-heading-bbv">Big Bear Vans</span>
        </h3>
        <p className="max-w-3xl mx-auto text-sm md:text-lg text-gray-300 mb-10">
         At Big Bear Vans, we don’t do one-size-fits-all custom van conversions. Therefore, you’ll not find any generic templates here. We build every campervan according to your lifestyle, habits, and travel plans. We will finalize van design and handpick amenities like an off-grid electrical system and a customized kitchen to create your perfect home on wheels.
        </p>

        {/* Card + Image container */}
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between lg:max-w-[1200px] mx-auto">
          {/* Card */}
          <div
            ref={textContainerRef}
            className="relative w-full lg:w-[60%] p-6 md:p-10 rounded-lg bg-[#F8F8F8] shadow-2xl z-10 text-black flex flex-col items-center lg:items-start"
          >
            <h4 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-4 customize-underline">
              Customize
            </h4>
            <p className="text-gray-700 text-sm md:text-lg mb-6 leading-relaxed text-center lg:text-left">
              Whether you want a mobile office, a family van, or a retirement travel setup, we build custom conversions to match your lifestyle.
            </p>
            <div className="flex flex-col space-y-3 md:flex-row md:space-x-4 md:space-y-0">
             <Link href={"/contact"}>
              <button className="customize-btn px-6 py-3 rounded-full font-semibold text-[#534BFF] bg-white border border-[#534BFF]">
                Customize
              </button></Link>
              <button className="customize-btn px-6 py-3 rounded-full font-semibold text-[#534BFF] bg-white border border-[#534BFF]">
                Buy
              </button>
              <button className="customize-btn px-6 py-3 rounded-full font-semibold text-[#534BFF] bg-white border border-[#534BFF]">
                Shop
              </button>
            </div>
          </div>

          {/* Mobile Image */}
          <div
            ref={mobileImageWrapperRef}
            className="mt-6 w-full h-[220px] md:h-[300px] rounded-lg shadow-2xl overflow-hidden lg:hidden"
          >
            <Image
              src="/images/img1.jpg"
              alt="Customized camper van interior"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Desktop Image */}
          <div
            ref={desktopImageWrapperRef}
            className="hidden lg:block lg:w-[35%] h-[350px] rounded-lg shadow-2xl overflow-hidden"
          >
            <Image
              ref={imageRef}
              src="/images/img1.jpg"
              alt="Customized camper van interior"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .animated-heading-bbv {
          background: linear-gradient(
            to right,
            #0f95be,
            #534bff,
            #140aff,
            #0f95be
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% 100%;
          animation: animated-gradient 5s ease-in-out infinite;
        }
        @keyframes animated-gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .customize-underline::after {
          content: "";
          position: absolute;
          width: 0;
          height: 4px;
          bottom: -6px;
          left: 0;
          background-color: #534bff;
          transition: width 0.3s ease-in-out;
        }
        .customize-underline:hover::after {
          width: 100%;
        }
      `}</style>
    </section>
  );
};

export default CustomizeSection;
