"use client";
import React, { useState } from "react";
import Footer from "./Footer";

export default function UpFooter() {
  const [openIndex, setOpenIndex] = useState(null);

  const dropdowns = [
    {
      heading: "What Van Models Do You Customize at Big Bear Vans?",
      text: "At Big Bear Vans, we mainly customize Mercedes-Benz Sprinter, RAM ProMaster, and Ford Transit vans."
    },
    {
      heading: "How Long Does It Take to Build a Custom Campervan?",
      text: "It depends on various factors like your requirements, our availability, etc. Since we do all the things manually, it takes us about 4 to 5 months to design and build a fully customizable campervan."
    },
    {
      heading: " What Guarantee Do You Offer?",
      text: "All our van conversions come with a 1-year warranty against workmanship defects, starting from the pickup date. Moreover, we also offer a 3-year extended warranty on our craftsmanship. Please note that while Big Bear Vans warrants its services, this warranty does not cover third-party products themselves."
    },
    {
      heading: "Do You Offer 4x4 or AWD Camper Vans?",
      text: "We offer both 4x4 and AWD camper vans. You can choose from our 4x4 custom Sprinter vans for off-grid capability or opt for an AWD van for better stability and performance."
    },
    {
      heading: "Do I need to own a van, or can you source one for my conversion?",
      text: "We can convert a campervan you already have, or we can also source a fully customized Class B RV for you. We have contacts with dealers and can get you a van with up to an $8000 discount on the MSRP tag."
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
        <div className="w-full max-w-2xl bg-whit backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/10">
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
                  {/* {openIndex === index && (
                    <button className="mt-4 px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg transition-colors duration-300 text-sm">
                      Learn More
                    </button>
                  )} */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}