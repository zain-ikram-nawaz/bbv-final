// src/components/BookingPage.jsx
"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';

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

  const fullOuterPath = "M0 20L100 20L125 0L275 0L300 20L400 20V280L300 280L275 300L125 300L100 280L0 280Z";
  const encodedSvg = encodeURIComponent(`
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="${fullOuterPath}" fill="#212121" />
      <path d="${fullOuterPath}" stroke="#FFF6F6" stroke-width="3" />
    </svg>
  `);

  return (
    <div className="min-h-screen bg-[#534BFF] flex flex-col items-center justify-center p-4 md:p-11 relative overflow-hidden">
      <div
        className={`relative w-full md:w-11/12 lg:w-4/5 h-auto min-h-[500px] md:h-[600px] mt-16 md:mt-20 mb-6 md:mb-8 p-4 md:p-6 lg:p-12 ${
          isMobile
            ? "bg-[#212121] rounded-xl border-2 border-[#FFF6F6]"
            : ""
        }`}
        style={!isMobile ? {
          backgroundImage: `url("data:image/svg+xml;utf8,${encodedSvg}")`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        } : {}}
      >
        <div className="flex flex-col lg:flex-row h-full">
          <div className="w-full lg:w-1/2 p-4 md:p-8 flex flex-col justify-between">
            <div>
              <Image
                src="/images/bbv-logo.png"
                alt="Big Bear Vans Logo"
                width={isMobile ? 150 : 200}
                height={isMobile ? 40 : 50}
                className="mb-4 mx-auto"
              />
              <div className="pl-0 md:pl-6">
                <div className="flex items-center space-x-2 justify-center md:justify-start">
                  <Image
                    src="/images/bbv-logo.png"
                    alt="Big Bear Vans Icon"
                    width={isMobile ? 24 : 32}
                    height={isMobile ? 24 : 32}
                    className="rounded-full"
                  />
                  <span className="text-lg md:text-xl font-semibold text-white">Big Bear Vans</span>
                </div>
                <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-white holographic-text text-center md:text-left mt-4">
                  Plan your Custom van Build!
                </h1>
                <div className="flex items-center text-gray-300 justify-center md:justify-start mt-2">
                  <Clock size={isMobile ? 16 : 18} className="mr-2" /> 1 hr 30 min
                </div>
                <p className="text-gray-200 mt-4 text-sm md:text-base text-center md:text-left">
                  If you have more query, contact the host number below.
                </p>
                <p className="text-base md:text-lg font-bold text-white text-center md:text-left mt-2">
                  Host – <span className="text-[#534BFF]">+1 951-441-9748</span>
                </p>
              </div>

              <div className="mt-6 md:mt-8 flex flex-col md:flex-row justify-between text-xs text-gray-400 space-y-2 md:space-y-0 text-center md:text-left">
                <Link href="#" className="neon-link">Cookie Setting</Link>
                <Link href="#" className="neon-link">Report Abuse</Link>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 p-4 md:p-8 border-t md:border-t-0 md:border-l border-gray-700 flex flex-col justify-center items-center text-center mt-4 md:mt-0">
            <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 text-white holographic-text">Select a Date & Time</h2>
            <p className="text-gray-400 text-xs md:text-sm mb-3 md:mb-4">August 2025</p>
            <div className="grid grid-cols-7 gap-1 md:gap-2 text-xs md:text-sm text-center text-white mb-4 md:mb-6 w-full">
              {['MON', 'TUS', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((dayName, index) => (
                <div key={index} className="text-gray-400 font-semibold text-xs md:text-sm">
                  {dayName}
                </div>
              ))}
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`p-1 md:p-2 rounded-lg flex items-center justify-center cursor-pointer relative overflow-hidden transition-colors duration-200 ${
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
            <div className="text-gray-400 text-xs">Time zone</div>
          </div>
        </div>
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