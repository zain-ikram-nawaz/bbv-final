"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from 'split-type';
import ShapeCard from "../SvgShape/ShapeCard";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function VanImage({van}) {
  const [mounted, setMounted] = useState(false);
  const vanImageRef = useRef(null);
  const headingRef = useRef(null);
  console.log(van,"from backend")
 const dummyVans = [

    {
      slug : "Montreal 170 AWD Blue Gray",
      _id: "1",
      gallery: ["/images/Montreal 170 AWD Blue Gray.png"],
      van_listing: {
        title: "Montreal 170 AWD Blue Gray",
        description: "Our Montreal 170 AWD blue-gray is a thoroughly insulated and winter-ready campervan, which is designed for 4-5 people.."
      },
      sold: false,
      formatted_price: "$$196,000"
    },
    {
      slug:"Santa Monica V6 Turbo",
      _id: "2",
      gallery: ["/images/Santa Monica V6 Turbo.png"],
      van_listing: {
        title: "Santa Monica V6 Turbo",
        description: "The Santa Monica V6 Turbo is the ultimate adventure vehicle. With its powerful V6 Turbo engine."
      },
      sold: false,
      formatted_price: "$$224,542"
    },
    {
      slug : "Santa Monica Gray Gas",
      _id: "3",
      gallery: ["/images/Santa Monica Gray Gas.png"],
      van_listing: {
        title: "Santa Monica Gray Gas",
        description: "The Santa Monica Gray Gas is the perfect blend of style, comfort, and adventure. This custom camper van features a spacious interior with ample storage.."
      },
      sold: true,
      formatted_price: "$$139,000"
    }
  ];
const data = van && van.length > 0 ? van : dummyVans;


  useEffect(() => {
    setMounted(true);

    if (mounted) {
      // Split the heading text for character-level animation
      const splitHeading = new SplitType(headingRef.current, { types: 'chars' });
      const chars = splitHeading.chars;

      // GSAP Animation for the heading characters
      gsap.fromTo(chars,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // GSAP Animation for the van image
      gsap.fromTo(vanImageRef.current,
        { opacity: 0, y: 100, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: vanImageRef.current,
            start: "top 70%",
            end: "top 30%",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
        }
      );

      // Parallax effect for the background elements
      gsap.to(".tech-grid-bg", {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: vanImageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".tech-glow-bg", {
        y: "-15%",
        ease: "none",
        scrollTrigger: {
          trigger: vanImageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative w-full min-h-screen py-20 overflow-hidden bg-[#F8F8F8] text-gray-900">
      {/* High-tech background elements (shades of white/light gray) */}
      <div className="absolute inset-0 z-0">
        {/* Subtle grid pattern */}
        <div
          className="tech-grid-bg absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(200,200,200,0.1) 0px, rgba(200,200,200,0.1) 1px, transparent 1px, transparent 100px), repeating-linear-gradient(90deg, rgba(200,200,200,0.1) 0px, rgba(200,200,200,0.1) 1px, transparent 1px, transparent 100px)',
            backgroundSize: '100px 100px',
          }}
        ></div>
        {/* Soft, glowing shapes - Adjusted for responsiveness */}
        <div
          className="tech-glow-bg absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"
        ></div>
        <div
          className="tech-glow-bg absolute bottom-1/4 right-1/4 w-40 h-40 md:w-80 md:h-80 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-fast"
        ></div>
        <div
          className="tech-glow-bg absolute top-1/2 left-1/2 w-32 h-32 md:w-64 md:h-64 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse-slow-reverse"
        ></div>
      </div>

      {/* Heading - Responsive font size */}
      <div className="relative z-10 text-center  mb-16 px-4">
        <h2
          ref={headingRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl  font-extrabold tracking-tight leading-tight"
        >
         Start Your Adventure With
        </h2>
        <h2

          className="text-4xl sm:text-5xl text-blue-600 md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight"
        >
        Big Bear Vans
        </h2>
        <p className="mt-4 text-sm sm:text-base md:text-xl text-gray-600 md:px-10">
       It doesn’t matter if you’re a family with kids or pets looking for an off-road experience, a person wanting a mobile office with a view, or a retiree ready to roam the open road; we do custom van conversions according to the needs of our clients in California and the surrounding states.
        </p>
      </div>
<div className="flex flex-col justify-center items-center z-10 text-center mb-16 px-4">
    <h2
          ref={headingRef}
          className="text-2xl font-semibold sm:text-3xl md:text-3xl lg:text-4xl tracking-tight leading-tight"
        >
      Buy
        </h2>
        <p className="mt-4 text-sm sm:text-base md:text-xl text-gray-600 w-[60vw]">
    Want to hit the road sooner? Browse our inventory of vans for sale. Whether you’re looking for a fully equipped Ford Transit camper or Mercedes Sprinter 4x4, we’ve got you covered. Simply pay, sign, collect the keys, and drive away in your new mobile home. Skip the wait today. Your dream RV is just a click away.
        </p>
</div>
      {/* Main Content Area - Centering the image */}
 <div className="relative z-10 w-full h-full flex flex-col items-center py-10 md:py-10 px-4">
  {/* Grid for Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center w-full max-w-5xl">
    {[...data]
      .sort((a, b) => (b.sold === false) - (a.sold === true)) // ✅ sold=true waale pehle
      .slice(0, 3) // sirf 3 items
      .map((item, i) => (
        <ShapeCard
          key={item._id}
          shape="customRectMirror"
          color="#181818"
          className="w-full sm:w-[300px] md:w-[260px] shadow-lg group"
        >
          {/* Image Section */}
          <div className="w-full h-full relative overflow-hidden">
            <img
              src={item.gallery[0] || "/images/van-sample.jpg"}
              alt={item.van_listing?.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
            />

            {/* Sold / For Sale Tag */}
            <span
              className={`absolute top-3 left-0 px-2 py-1 text-xs font-bold rounded z-20 ${
                item.sold ? "bg-red-500 text-white" : "bg-green-600 text-white"
              }`}
            >
              {item.sold ? "SOLD" : "FOR SALE"}
            </span>
          </div>

          {/* Content Section */}
          <div className="w-full flex flex-col justify-between h-[calc(100%-160px)] bg-black bg-opacity-80">
            <div>
              <h3 className="text-lg font-bold text-white p-1">
                {item.van_listing?.title}
              </h3>
              <p className="text-sm text-gray-400 line-clamp-3 p-1">
                {item.van_listing?.description}
              </p>
            </div>

            {/* Price + Button */}
            <div className="flex items-center justify-between p-2">
              <span className="text-lg font-semibold">
                {item.formatted_price}
              </span>

              {item.sold ? (
                <button
                  disabled
                  className="bg-gray-500 text-white px-3 py-1 rounded-md text-lg cursor-not-allowed opacity-70"
                >
                  Sold Out
                </button>
              ) : (
                <Link href={`/van-for-sale/${item.slug}`}>
                  <button className="bg-black text-white px-3 py-1 rounded-md transition text-lg">
                    See More
                  </button>
                </Link>
              )}
            </div>
          </div>
        </ShapeCard>
      ))}
  </div>

  {/* Explore Button */}
  <Link href="/van-for-sale" className="mt-10">
    <button className="bg-black text-white px-4 py-2 rounded-md transition text-sm">
      Explore Vans
    </button>
  </Link>
</div>





      {/* Keyframe animations and styles */}
      <style jsx>{`
        /* Existing keyframes for background glows */
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1) translateX(0) translateY(0); opacity: 0.3; }
          50% { transform: scale(1.1) translateX(20px) translateY(10px); opacity: 0.4; }
        }
        @keyframes pulse-fast {
          0%, 100% { transform: scale(1) translateX(0) translateY(0); opacity: 0.2; }
          50% { transform: scale(1.05) translateX(-15px) translateY(-5px); opacity: 0.3; }
        }
        @keyframes pulse-slow-reverse {
          0%, 100% { transform: scale(1) translateX(0) translateY(0); opacity: 0.25; }
          50% { transform: scale(0.9) translateX(-10px) translateY(20px); opacity: 0.35; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 15s infinite ease-in-out;
        }
        .animate-pulse-fast {
          animation: pulse-fast 10s infinite ease-in-out;
        }
        .animate-pulse-slow-reverse {
          animation: pulse-slow-reverse 18s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}