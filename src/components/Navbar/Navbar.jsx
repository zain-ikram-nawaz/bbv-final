"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = localStorage.getItem("theme") || (systemPrefersDark ? "dark" : "light");
    setIsDarkMode(initialTheme === "dark");
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <>
      {/* Navbar Container */}
      <header className="sticky top-0 w-full z-50 px-6 py-1 md:px-10 md:py-1 flex items-center justify-between bg-black bg-opacity-60 backdrop-blur-lg">
        <div className="flex-shrink-0 logo-animation">
          <img src="/images/bbv-logo.png" alt="BigBearVans Logo" className="h-[4.5rem] w-auto" />
        </div>

        {/* Desktop Navigation */}
       <nav className="hidden md:flex flex-grow justify-center items-center space-x-8 text-sm font-medium">
  {/* Main Links */}
  {[
    { name: "Home", href: "/" },
    { name: "Vans For Sale", href: "/van-for-sale" },
    // { name: "Portfolio", href: "/portfolio" },
    // { name: "About Us", href: "/about" },
    // { name: "Layouts", href: "/layouts" },
    // { name: "3D Van Builder", href: "/3d-van-builder" },
    // { name: "Process", href: "/process" },
  ].map((link) => (
    <Link
      key={link.name}
      href={link.href}
      className="nav-links-animation text-gray-300 hover:text-[var(--primary)] transition-colors"
    >
      {link.name}
    </Link>
  ))}
</nav>

        {/* Right Side (Dark Mode + Contact + Mobile Menu) */}
        <div className="flex-shrink-0 flex items-center space-x-4">
          {/* Dark Mode */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          >
            {isDarkMode ? "🌞" : "🌙"}
          </button>

          {/* Contact Us */}
          <Link href="/contact" className="relative hidden md:inline-flex items-center justify-center px-6 py-2 rounded-full font-semibold overflow-hidden group">
            <span className="absolute inset-0 w-full h-full bg-gradient-animated z-0"></span>
            <span className="relative text-white z-10">Contact Us</span>
          </Link>

          {/* Hamburger (Mobile) */}
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="md:hidden p-2 text-white"
            aria-label="Open navigation menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="lucide lucide-menu">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-64 bg-black bg-opacity-90 backdrop-blur-lg p-6 transform transition-transform duration-300 ease-in-out ${
          isNavOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-end mb-8">
          <button onClick={() => setIsNavOpen(false)} className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              className="lucide lucide-x">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
  <nav className="flex flex-col space-y-4 text-lg font-medium">
  {/* Main Links */}
  <div className="flex flex-col space-y-2">
    {[
      { name: "Home", href: "/" },
      { name: "Vans For Sale", href: "/van-for-sale" },
      // { name: "Portfolio", href: "/portfolio" },
      // { name: "About Us", href: "/about" },
      // { name: "Layouts", href: "/layouts" },
      // { name: "3D Van Builder", href: "/3d-van-builder" },
      // { name: "Process", href: "/process" },
    ].map((link) => (
      <Link
        key={link.name}
        href={link.href}
        className="nav-links-animation text-gray-300 hover:text-[var(--primary)] transition-colors"
        onClick={() => setIsNavOpen(false)}
      >
        {link.name}
      </Link>
    ))}
  </div>

  {/* CTA Button */}
  <div className="mt-4">
    <Link
      href="/contact"
      className="relative inline-flex items-center justify-center px-6 py-2 rounded-full font-semibold overflow-hidden group"
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-animated z-0"></span>
      <span className="relative text-white z-10">Contact Us</span>
    </Link>
  </div>
</nav>

      </div>
    </>
  );
}
