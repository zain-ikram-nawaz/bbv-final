"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [userName, setUserName] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    setMounted(true);
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = localStorage.getItem("theme") || (systemPrefersDark ? "dark" : "light");
    setIsDarkMode(initialTheme === "dark");
    document.documentElement.classList.toggle("dark", initialTheme === "dark");

    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);

    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data.city && data.region) {
          setUserLocation(`${data.city}, ${data.region}`);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!mounted) return;
    gsap.fromTo(
      ".hero-title-main",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    gsap.fromTo(
      ".hero-subtitle",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3 }
    );
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-[70vh] md:h-[90vh] bg-black text-white overflow-hidden">
      {/* Background gradient + van image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-0 right-0 h-full w-2/5 blur-3xl opacity-70"
          style={{ background: "radial-gradient(circle at 0% 50%, #140AFF, transparent 70%)" }}
        ></div>
        <img
          src="/images/van-hero.png"
          alt="BigBearVans camper van"
          className="van-image absolute bottom-0 left-1/2 -translate-x-1/2 h-1/2 md:h-full md:w-3/6 md:left-auto md:right-0 md:translate-x-0 z-0"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-end p-6 md:p-12 md:w-3/5">
        <div className="max-w-lg md:max-w-xl lg:max-w-2xl text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
            {userName ? (
              <span>Hello, {userName}! </span>
            ) : (
              <span className="hero-title-main">Customized Camper </span>
            )}
            <TypeAnimation
              sequence={["Vans", 2000, "Builders", 2000, "Solutions", 2000]}
              wrapper="span"
              repeat={Infinity}
              className="hero-title-accent text-[#140AFF]"
            />
          </h1>
          <p className="hero-subtitle text-base md:text-xl text-gray-300 mb-6">
            Buy, customize or shop van accessories from Big Bear Vans today.
          </p>
          {userLocation && (
            <p className="text-sm text-gray-400 mb-6">📍 Near you in {userLocation}</p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/van-for-sale"
              className="hero-buttons px-6 py-3 rounded-full font-semibold bg-[#140AFF] text-white hover:bg-[#0e08d8] transition"
            >
              Vans for Sale
            </Link>
            <Link
              href="/inquery"
              className="hero-buttons px-6 py-3 rounded-full font-semibold bg-white text-[#140AFF] border border-[#140AFF] hover:bg-gray-100 transition"
            >
              Custom Build
            </Link>
          </div>
        </div>
      </div>

      {/* Chatbot Button */}
      <button
        onClick={() => setShowChatbot(!showChatbot)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-[#140AFF] text-white shadow-lg"
      >
        💬
      </button>

      {showChatbot && (
        <div className="fixed bottom-20 right-6 w-72 h-80 bg-white dark:bg-gray-900 rounded-lg shadow-xl p-4">
          <h3 className="font-bold text-lg mb-2 text-black dark:text-white">AI Assistant</h3>
          <div className="flex-1 overflow-y-auto text-gray-600 dark:text-gray-300 text-sm">
            Hello! How can I help you today?
          </div>
          <input
            type="text"
            placeholder="Type your message..."
            className="mt-3 w-full p-2 rounded-lg border bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
      )}
    </div>
  );
}
