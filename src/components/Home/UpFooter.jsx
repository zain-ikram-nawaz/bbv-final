"use client";
import React, { useState } from "react";
import Footer from "./Footer";

export default function UpFooter() {
  const [openIndex, setOpenIndex] = useState(null);

  const dropdowns = [
    {
      heading: "What Van Models Do You Customize at Big Bear Vans?",
      text: "Our web development services include responsive design, e-commerce solutions, and custom web applications. We use the latest technologies to create fast, secure, and scalable websites that drive business growth."
    },
    {
      heading: "What Van Models Do You Customize at Big Bear Vans?",
      text: "We create intuitive and engaging user experiences that convert visitors into customers. Our design process includes user research, wireframing, prototyping, and usability testing to ensure the best possible results."
    },
    {
      heading: "What Van Models Do You Customize at Big Bear Vans?",
      text: "Our digital marketing strategies help businesses increase online visibility, generate leads, and boost sales. Services include SEO, PPC, social media marketing, email campaigns, and content marketing."
    },
    {
      heading: "What Van Models Do You Customize at Big Bear Vans?",
      text: "We develop native and cross-platform mobile applications for iOS and Android. Our apps are user-friendly, performant, and designed to provide exceptional user experiences across all devices."
    },
    {
      heading: "What Van Models Do You Customize at Big Bear Vans?",
      text: "Our consulting services help businesses leverage technology to achieve their goals. We provide strategic guidance, technology audits, and implementation plans tailored to your specific needs."
    },
  ];

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-12">


        {/* Dropdown Section */}
        <div className="w-full max-w-2xl bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/10">
          {dropdowns.map((item, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <button
                onClick={() => toggleDropdown(index)}
                className={`w-full text-left px-6 py-4 rounded-xl transition-all duration-300 flex justify-between items-center ${
                  openIndex === index
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                    : "bg-gray-800/70 hover:bg-gray-700/70 text-gray-200"
                }`}
              >
                <span className="font-semibold text-lg">{item.heading}</span>
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 py-4 text-purple-100 bg-gray-900/50 rounded-b-xl mt-1 border border-white/5">
                  <p>{item.text}</p>
                  {openIndex === index && (
                    <button className="mt-4 px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg transition-colors duration-300 text-sm">
                      Learn More
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}