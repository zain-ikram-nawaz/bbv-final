"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TypeAnimation } from 'react-type-animation';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Placeholder for a simple Modal component
const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="relative p-8 bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-lg mx-4 text-black dark:text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

// Placeholder for a simple ChatbotModal component
const ChatbotModal = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
    <div className="w-full max-w-sm h-full max-h-[60vh] bg-white dark:bg-gray-900 rounded-lg shadow-xl flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-bold text-lg">BigBearVans Assistant</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300">&times;</button>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        <p className="text-sm text-gray-500 dark:text-gray-400">Hello! I'm your AI van assistant. How can I help you today?</p>
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <input type="text" placeholder="Type your message..." className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none" />
      </div>
    </div>
  </div>
);

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [vansForSale, setVansForSale] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [showChatbot, setShowChatbot] = useState(false);
  const [userLocation, setUserLocation] = useState('');
  const [isNavOpen, setIsNavOpen] = useState(false); // New state for mobile nav

  useEffect(() => {
    setMounted(true);
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = localStorage.getItem("theme") || (systemPrefersDark ? "dark" : "light");
    setIsDarkMode(initialTheme === "dark");
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const fetchVansData = async () => {
      const fakeCount = Math.floor(Math.random() * (25 - 5 + 1)) + 5;
      setVansForSale(fakeCount);
    };
    fetchVansData();

    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }

    const fetchUserLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        if (data.city && data.region) {
          setUserLocation(`${data.city}, ${data.region}`);
        }
      } catch (error) {
        console.error("Failed to fetch user location:", error);
      }
    };
    fetchUserLocation();
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode, mounted]);

  useEffect(() => {
    if (mounted) {
      const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });
      tl.fromTo(".hero-subtitle", { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, "-=0.3")
        .fromTo(".hero-buttons", { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.2 }, "-=0.3")
        .fromTo(".van-image", { opacity: 0, x: 200, scale: 0.8 }, { opacity: 1, x: 0, scale: 1 }, "-=0.5")
        .fromTo(".logo-animation", { opacity: 0, y: -20 }, { opacity: 1, y: 0 }, "-=1.2")
        .fromTo(".nav-links-animation", { opacity: 0, y: -20 }, { opacity: 1, y: 0, stagger: 0.1 }, "-=1");

      // GSAP ScrollTrigger Animations
      gsap.to(".van-image", {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: ".van-image",
          start: "top bottom",
          end: "top center",
          scrub: true,
          toggleActions: "play reverse play reverse",
        },
      });

      gsap.to(".hero-content-container", {
        opacity: 0,
        y: -100,
        ease: "power1.in",
        scrollTrigger: {
          trigger: ".hero-content-container",
          start: "center center",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, [mounted]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const van = document.querySelector(".van-image");
      if (van) {
        const xPos = (window.innerWidth / 2 - e.clientX) / 40;
        const yPos = (window.innerHeight / 2 - e.clientY) / 40;
        gsap.to(van, { x: xPos, y: yPos, duration: 0.5, ease: "power1.out" });
      }
    };

    if (mounted) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (mounted) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [mounted]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative w-full h-screen bg-[#000000] text-white overflow-hidden starlight-bg">
      {/* Background container with responsive sizing */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-0 right-0 h-full w-2/5 z-0 blur-3xl opacity-70"
          style={{
            background: 'radial-gradient(circle at 0% 50%, #140AFF, transparent 70%)',
          }}
        ></div>
        {/* Adjusted image positioning for mobile and desktop */}
        <img
          src="/images/van-hero.png"
          alt="BigBearVans camper van"
          className="van-image absolute bottom-0 left-1/2 -translate-x-1/2 h-1/2 w-auto object-cover md:h-full md:w-3/6 md:left-auto md:right-0 md:translate-x-0 z-0"
        />
      </div>
      {/* Hero Content - Adjusted for mobile-first approach */}
      <div className="relative z-10 h-full flex items-end p-6 md:p-10 md:w-3/5 hero-content-container">
        <div className="max-w-lg md:max-w-xl lg:max-w-2xl px-4 md:px-0 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4">
            {userName ? (
              <span style={{ color: '#ffffff' }}>Hello, {userName}! </span>
            ) : (
              <span className="hero-title-main" style={{ color: '#ffffff' }}>Customized Camper </span>
            )}
            <TypeAnimation
              sequence={[
                'Vans', 2000,
                'Builders', 2000,
                'Solutions', 2000,
              ]}
              wrapper="span"
              repeat={Infinity}
              className="hero-title-accent"
              style={{ color: '#140AFF' }}
            />
          </h1>
          <p className="hero-subtitle text-lg md:text-xl text-gray-300 max-w-sm mb-8 mx-auto md:mx-0">
          Buy, customize or shop van accessories from Big Bear Vans today.
          </p>
          {userLocation && (
            <p className="text-sm text-gray-400 mb-4">
              <span role="img" aria-label="pin">📍</span> Located near you in {userLocation}
            </p>
          )}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
            <Link href="/van-for-sale" className="hero-buttons relative inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold overflow-hidden group transform transition-transform duration-300 hover:scale-105">
              <span className="absolute inset-0 w-full h-full bg-gradient-animated z-0"></span>
              <span className="relative text-white z-10">Vans for Sale</span>
            </Link>

            <button
              // onClick={() => setShowModal(true)}
              className="hero-buttons relative inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold overflow-hidden group transform transition-transform duration-300 hover:scale-105"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-animated z-0"></span>
              <Link href={"/contact"}>
              <span className="relative text-white z-10">Custom Build</span>
              </Link>
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2 className="text-2xl font-bold mb-4">Choose Your Base Van</h2>
          <p className="text-gray-600 mb-6">Select a model to begin your custom build journey.</p>
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors">
              <img src="/images/sprinter-van.png" alt="Sprinter Van" className="h-24 mx-auto mb-2" />
              <p className="font-semibold text-black">Mercedes-Benz Sprinter</p>
            </button>
            <button className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors">
              <img src="/images/transit-van.png" alt="Transit Van" className="h-24 mx-auto mb-2" />
              <p className="font-semibold text-black">Ford Transit</p>
            </button>
          </div>
        </Modal>
      )}

      {/* Chatbot Button */}
      <button
        onClick={() => setShowChatbot(!showChatbot)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-[var(--primary)] text-white shadow-lg glow"
        aria-label="Open AI chat assistant"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle-code"><path d="M7.9 20A9.3 9.3 0 0 1 4 16.1L2 22l6-2"/><path d="M12 2a10 10 0 0 1 8.6 15.6L22 22l-4.1-1.9A10 10 0 0 1 2 12V2z"/><path d="M9.8 8.6L7 11.4l2.8 2.8"/><path d="M14.2 8.6l2.8 2.8-2.8 2.8"/></svg>
      </button>

      {showChatbot && <ChatbotModal onClose={() => setShowChatbot(false)} />}
    </div>
  );
}