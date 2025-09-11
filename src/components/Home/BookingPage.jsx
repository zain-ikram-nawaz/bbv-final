
"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Vector48 from './vector48';

export default function BookingPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-indexed (0 = Jan, 8 = Sep)

  const numDays = daysInMonth(currentYear, currentMonth);
  const firstDay = firstDayOfMonth(currentYear, currentMonth);
  const adjustedFirstDay = (firstDay + 6) % 7;

  const calendarDays = [];
  for (let i = 0; i < adjustedFirstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= numDays; i++) {
    calendarDays.push(i);
  }

  const handleDateClick = (day, e) => {
    setSelectedDate(day);
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    e.currentTarget.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  useEffect(() => {
    setMounted(true);

    // Check if device is mobile
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  if (!mounted) return null;

  // const fullOuterPath = "M0 20L100 20L125 0L275 0L300 20L400 20V280L300 280L275 300L125 300L100 280L0 280Z";
  // const encodedSvg = encodeURIComponent(`
  //   <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
  //     <path d="${fullOuterPath}" fill="#212121" />
  //     <path d="${fullOuterPath}" stroke="#FFF6F6" stroke-width="3" />
  //   </svg>
  // `);

  return (
    <div className="min-h-screen bg-[#534BFF] flex flex-col items-center justify-center p-4 md:p-11 relative overflow-hidden">
<div className="py-4 space-y-2">
<h2 className="text-4xl md:text-5xl text-center font-extrabold text-white mb-6 leading-tight">
           Contact us<span className="animated-gradient-text"></span>
            </h2>
  <h1 className="text-center text-xl font-semibold text-white ">
    Schedule a Free Consultation Call Today
  </h1>
    <p className="text-center text-white md:w-[50vw]">
    Have questions? Let’s talk. Book a free call with our experts in California and discuss your vision with us.
  </p>
</div>

  <Vector48 bg='' color="#212121" className='rounded-lg'/>
   <div
  className={`
    w-full
    grid grid-cols-1 md:grid-cols-2
 bg-[#212121]
 rounded-lg
    overflow-hidden
  `}
  // style={{
  //   backgroundImage: `url("data:image/svg+xml;utf8,${encodedSvg}")`,
  //   backgroundSize: "cover",
  //   backgroundPosition: "center",
  // }}
>
  {/* Left Section */}
  <div className="flex flex-col justify-center items-center md:items-start p-6">
    {/* Logo & Info */}
    <Image
      src="/logos/logo BBV-03.svg"
      alt="Big Bear Vans Logo"
      width={isMobile ? 100 : 150}
      height={isMobile ? 40 : 50}
      className="mb-4"
    />
    <h1 className="text-xl md:text-3xl font-bold text-white text-center md:text-left">
      Plan your Custom Van Build!
    </h1>
    <p className="text-gray-200 mt-4 text-sm md:text-base text-center md:text-left">
      If you have more query, contact the host number below.
    </p>
    <p className="text-base md:text-lg font-bold text-white mt-2 text-center md:text-left">
      Host – <span className="text-[#534BFF]">+1 (951)-441-9748</span>
    </p>
  </div>

  {/* Right Section (Calendar) */}
  <div className="border-t md:border-t-0 md:border-l border-gray-700 flex flex-col justify-center items-center p-6">
    <h2 className="text-xl md:text-3xl font-bold mb-4 text-white">Select a Date & Time</h2>
    <p className="text-gray-400 text-xs md:text-sm mb-4">September 2025</p>
    <div className="grid grid-cols-7 gap-2 text-xs md:text-sm text-center text-white w-full">
      {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((dayName, index) => (
        <div key={index} className="text-gray-400 font-semibold">{dayName}</div>
      ))}
      {calendarDays.map((day, index) => (
        <div
          key={index}
          className={`p-2 rounded-lg flex items-center justify-center cursor-pointer relative overflow-hidden transition-colors duration-200 ${
            day
              ? selectedDate === day
                ? 'bg-[#534BFF] text-white'
                : 'hover:bg-gray-700'
              : 'text-gray-600 cursor-not-allowed'
          }`}
          onClick={(e) => day && handleDateClick(day, e)}
        >
          {day || ''}
        </div>
      ))}
    </div>
    <div className="text-gray-400 text-xs mt-3">Time zone</div>
  </div>
</div>
{/* Contact Form Section */}
  <p className='pt-20 pb-4'>Prefer Email? Send us your questions, and we’ll get back to you ASAP!</p>
<div className="w-full flex items-center justify-center">
  <form
    action="#"
    method="POST"
    className="w-full max-w-2xl shadow-lg rounded-2xl p-8 space-y-2"
  >
    {/* <h2 className="text-2xl font-bold text-white text-center">Contact Us</h2> */}

    <div>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Full Name"
        className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
        required
      />
    </div>

    <div>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email Address"
        className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
        required
      />
    </div>

    <div>
      <input
        type="tel"
        id="phone"
        name="phone"
        placeholder="Phone Number"
        className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
      />
    </div>

    <div>
      <textarea
        id="comment"
        name="comment"
        rows="4"
        placeholder="Your Comment"
        className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
        required
      ></textarea>
    </div>

    <div className="text-center">
      <button
        type="submit"
        className="w-full sm:w-auto bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-md border border-blue-600 hover:bg-blue-50 transition"
      >
        Submit
      </button>
    </div>
  </form>
</div>



      {/* Extra CSS Effects */}
      <style jsx>{`
        .holographic-text {
          background: linear-gradient(270deg, #fff, #a5b4fc, #fff);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 4s infinite linear;
        }
        @keyframes shine {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        .pulse-button {
          box-shadow: 0 0 15px rgba(83, 75, 255, 0.6);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 10px rgba(83,75,255,0.6); }
          50% { box-shadow: 0 0 25px rgba(20,10,255,0.9); }
        }

        .neon-link {
          position: relative;
          color: #bbb;
          transition: color 0.3s;
        }
        .neon-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #534BFF, #140AFF);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .neon-link:hover::after {
          transform: scaleX(1);
        }

        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple-effect 0.6s linear;
          background-color: rgba(83, 75, 255, 0.4);
          width: 50px;
          height: 50px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0);
        }
        @keyframes ripple-effect {
          to {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          .ripple {
            width: 30px;
            height: 30px;
          }
        }
      `}</style>
    </div>
  );
}