"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useId, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);

// --- Modal Component ---
const CardModal = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-[#191B2F] border border-gray-700 rounded-lg p-6 shadow-xl w-full max-w-lg mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl md:text-2xl font-bold text-white">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="text-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Card Functions & Calculators ---
const VanVolumeCalculator = () => {
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const volume = (length * width * height).toFixed(2);
  return (
    <div>
      <p className="mb-2">Calculate the interior volume of your dream van.</p>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-400">Length (ft)</label>
          <input type="number" value={length} onChange={e => setLength(e.target.value)} className="w-full px-3 py-2 mt-1 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#00FFFF]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400">Width (ft)</label>
          <input type="number" value={width} onChange={e => setWidth(e.target.value)} className="w-full px-3 py-2 mt-1 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#00FFFF]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400">Height (ft)</label>
          <input type="number" value={height} onChange={e => setHeight(e.target.value)} className="w-full px-3 py-2 mt-1 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#00FFFF]" />
        </div>
      </div>
      <p className="mt-4 text-lg font-semibold text-[#00FFFF]">Volume: {volume} cubic feet</p>
    </div>
  );
};

const MaintenanceCostEstimator = () => {
  const [miles, setMiles] = useState(15000);
  const [costPerMile, setCostPerMile] = useState(0.05);
  const totalCost = (miles * costPerMile).toFixed(2);
  return (
    <div>
      <p className="mb-2">Estimate your annual maintenance cost.</p>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-400">Annual Miles Driven</label>
          <input type="number" value={miles} onChange={e => setMiles(e.target.value)} className="w-full px-3 py-2 mt-1 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#00FFFF]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400">Cost per Mile ($)</label>
          <input type="number" step="0.01" value={costPerMile} onChange={e => setCostPerMile(e.target.value)} className="w-full px-3 py-2 mt-1 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#00FFFF]" />
        </div>
      </div>
      <p className="mt-4 text-lg font-semibold text-[#00FFFF]">Estimated Cost: ${totalCost}</p>
    </div>
  );
};

const CNCCutTimeEstimator = () => {
  const [length, setLength] = useState(10);
  const [feedRate, setFeedRate] = useState(50);
  const cutTime = (length / feedRate).toFixed(2);
  return (
    <div>
      <p className="mb-2">Estimate the time needed for a precise CNC cut.</p>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-400">Cut Length (inches)</label>
          <input type="number" value={length} onChange={e => setLength(e.target.value)} className="w-full px-3 py-2 mt-1 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#00FFFF]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400">Feed Rate (inches/min)</label>
          <input type="number" value={feedRate} onChange={e => setFeedRate(e.target.value)} className="w-full px-3 py-2 mt-1 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#00FFFF]" />
        </div>
      </div>
      <p className="mt-4 text-lg font-semibold text-[#00FFFF]">Estimated Cut Time: {cutTime} minutes</p>
    </div>
  );
};

const InsulationRValueCalculator = () => {
  const [materialLayers, setMaterialLayers] = useState([
    { name: 'Fiberglass', rValuePerInch: 3.7, thickness: 3.5 },
    { name: 'Plywood', rValuePerInch: 1.25, thickness: 0.75 }
  ]);
  const totalRValue = materialLayers.reduce((sum, layer) => sum + (layer.rValuePerInch * layer.thickness), 0).toFixed(2);
  return (
    <div>
      <p className="mb-2">Calculate the total R-value of your van's insulation.</p>
      <div className="space-y-3">
        {materialLayers.map((layer, index) => (
          <div key={index}>
            <p className="text-gray-400">{layer.name}</p>
            <label className="block text-sm font-medium text-gray-400">Thickness (inches)</label>
            <input
              type="number"
              value={layer.thickness}
              onChange={e => {
                const newLayers = [...materialLayers];
                newLayers[index].thickness = parseFloat(e.target.value);
                setMaterialLayers(newLayers);
              }}
              className="w-full px-3 py-2 mt-1 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#00FFFF]"
            />
          </div>
        ))}
      </div>
      <p className="mt-4 text-lg font-semibold text-[#00FFFF]">Total R-Value: {totalRValue}</p>
    </div>
  );
};

const SolarPowerCalculator = () => {
  const [watts, setWatts] = useState(250);
  const [hours, setHours] = useState(5);
  const [batteryCapacity, setBatteryCapacity] = useState(100);
  const AhNeeded = ((watts * hours) / 12).toFixed(2);
  const batteriesNeeded = (AhNeeded / batteryCapacity).toFixed(2);
  return (
    <div>
      <p className="mb-2">Calculate the battery capacity for your appliances.</p>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-400">Appliance Power (Watts)</label>
          <input type="number" value={watts} onChange={e => setWatts(e.target.value)} className="w-full px-3 py-2 mt-1 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#00FFFF]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400">Hours per Day</label>
          <input type="number" value={hours} onChange={e => setHours(e.target.value)} className="w-full px-3 py-2 mt-1 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#00FFFF]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400">Battery Capacity (Ah)</label>
          <input type="number" value={batteryCapacity} onChange={e => setBatteryCapacity(e.target.value)} className="w-full px-3 py-2 mt-1 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#00FFFF]" />
        </div>
      </div>
      <p className="mt-4 text-lg font-semibold text-[#00FFFF]">Amp-hours needed: {AhNeeded} Ah</p>
      <p className="text-lg font-semibold text-[#00FFFF]">Batteries needed: {batteriesNeeded}</p>
    </div>
  );
};

// --- Main Component ---
export default function WhyChooseUs() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const isDesktop = typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches;


  const openModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
    setModalTitle('');
  };

  const outerPath = "M0 0H400V330L300 330L275 350L125 350L100 330L0 330V0Z";
  const innerPath = "M3 3H397V327L297 327L274 347L126 347L103 327L3 327V3Z";
  const topOuterPath = "M0 250H400V20L300 20L275 0L125 0L100 20L0 20V250Z";
  const topInnerPath = "M3 247H397V23L297 23L274 3L126 3L103 23L3 23V247Z";

  const headerRef = useRef(null);
  const cardRefs = useRef([]);
  const imageRefs = useRef([]);
  const glareRefs = useRef([]);
  const cardInnerBorderRefs = useRef([]);
  const contentRefs = useRef([]);
  const buttonRefs = useRef([]);

  useEffect(() => {
    if (!isDesktop) return;

    // Initial height settings for cards
    gsap.set(cardRefs.current[0], { height: 650 });
    gsap.set(cardRefs.current[1], { height: 650 });
    gsap.set(cardRefs.current[2], { height: 550 });
    gsap.set(cardRefs.current[3], { height: 550 });
    gsap.set(cardRefs.current[4], { height: 550 });

    gsap.to(headerRef.current.querySelector('h2 span'), {
      duration: 1.5,
      delay: 0.5,
      text: "Big Bear Vans?",
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    cardRefs.current.forEach((card, index) => {
      const innerPathElement = cardInnerBorderRefs.current[index];
      const content = contentRefs.current[index];
      const length = innerPathElement ? innerPathElement.getTotalLength() : 0;

      if (innerPathElement) {
        gsap.set(innerPathElement, { strokeDasharray: length, strokeDashoffset: length });
      }

      gsap.fromTo(card, { opacity: 0, y: 50 }, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: index * 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
          onEnter: () => {
            if (innerPathElement) {
              gsap.to(innerPathElement, {
                strokeDashoffset: 0,
                duration: 1.5,
                ease: "power1.inOut"
              });
            }
            gsap.fromTo(content, { opacity: 0, y: 30, skewY: 5 }, {
              opacity: 1,
              y: 0,
              skewY: 0,
              duration: 0.8,
              delay: 0.5,
              ease: "power3.out"
            });
          },
          onLeaveBack: () => {
            if (innerPathElement) {
              gsap.to(innerPathElement, {
                strokeDashoffset: length,
                duration: 0.5,
                ease: "power1.out"
              });
            }
          }
        },
      });

      gsap.set(card, { transformPerspective: 800 });
      card.addEventListener('mouseenter', () => {
        setHoveredCardIndex(index);
        gsap.to(card, {
          rotationY: 5,
          scale: 1.05,
          duration: 0.5,
          ease: 'power2.out',
        });
        const fullContent = card.querySelector('.full-content');
        const teaserContent = card.querySelector('.teaser-content');
        if (fullContent && teaserContent) {
          gsap.to(teaserContent, { opacity: 0, height: 0, duration: 0.3 });
          gsap.to(fullContent, {
            opacity: 1,
            height: 'auto',
            duration: 0.5,
            delay: 0.3,
            ease: 'power2.out',
            onComplete: () => {
              gsap.to(card, {
                height: card.scrollHeight + 'px',
                duration: 0.5,
                ease: 'power2.out',
              });
            }
          });
        }
      });
      card.addEventListener('mouseleave', () => {
        setHoveredCardIndex(null);
        gsap.to(card, {
          rotationY: 0,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
        });
        const fullContent = card.querySelector('.full-content');
        const teaserContent = card.querySelector('.teaser-content');
        if (fullContent && teaserContent) {
          gsap.to(fullContent, { opacity: 0, height: 0, duration: 0.3 });
          gsap.to(teaserContent, { opacity: 1, height: 'auto', duration: 0.5, delay: 0.2 });
          const initialHeight = card.classList.contains('card-container-top') ? '650px' : '550px';
          gsap.to(card, { height: initialHeight, duration: 0.5, ease: 'power2.out' });
        }
      });
    });

    imageRefs.current.forEach((img, index) => {
      const container = img.closest('div');
      const glareElement = glareRefs.current[index];
      let glareTween;

      gsap.set(container, { transformStyle: 'preserve-3d', transformPerspective: 800 });
      gsap.set(img, { scale: 1 });
      if (glareElement) {
        gsap.set(glareElement, { x: '-100%', opacity: 0 });
      }

      container.addEventListener('mouseenter', () => {
        gsap.to(img, { scale: 1.08, duration: 0.4, ease: "power2.out" });
        gsap.to(container, { boxShadow: '0 20px 40px rgba(0,0,0,0.6)', duration: 0.4 });

        glareTween = gsap.fromTo(glareElement,
          { x: '-100%', opacity: 0 },
          { x: '100%', opacity: 1, duration: 1.5, ease: 'power1.inOut', repeat: -1, yoyo: true, delay: 0.2 }
        );
      });

      container.addEventListener('mouseleave', () => {
        gsap.to(img, { scale: 1, duration: 0.4, ease: "power2.out" });
        gsap.to(container, { boxShadow: '0 25px 50px rgba(0,0,0,0.2)', duration: 0.4 });

        if (glareTween) {
          glareTween.kill();
        }
        gsap.to(glareElement, { opacity: 0, x: '-100%', duration: 0.3 });
      });
    });

    imageRefs.current.forEach(img => {
      gsap.to(img, {
        y: (i, target) => -ScrollTrigger.maxScroll(window) * (parseFloat(target.dataset.speed) || 0),
        ease: "none",
        scrollTrigger: {
          trigger: img.closest('.group'),
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    });
  }, [isDesktop]);

  return (
    <>
      <style jsx global>{`
        .animated-gradient-text {
          background-image: linear-gradient(90deg, #534BFF, #140AFF, #00FFFF, #534BFF);
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: text-gradient-animation 3s ease-in-out infinite;
        }

        @keyframes text-gradient-animation {
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

        .animated-button-gradient {
          background-image: linear-gradient(90deg, #0A192F, #1F2937, #4B5563, #0A192F);
          background-size: 300% 100%;
          transition: background-position 0.5s ease-in-out, transform 0.3s ease, box-shadow 0.3s ease;
          animation: button-gradient-animation 5s ease-in-out infinite;
        }

        .animated-button-gradient:hover {
          background-position: 100% 0;
          transform: scale(1.05);
          box-shadow: 0 0 20px 5px rgba(50, 100, 200, 0.5);
        }

        @keyframes button-gradient-animation {
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
        .glare-effect {
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%);
        }
        .full-content {
          height: 0;
          overflow: hidden;
          opacity: 0;
          width: 100%;
        }
        .card-container-top {
          min-height: 650px;
          transition: min-height 0.5s ease-in-out;
        }
        .card-container-bottom {
          min-height: 550px;
          transition: min-height 0.5s ease-in-out;
        }
        .card-content-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }
      `}</style>
      <section className="relative w-full text-white py-16 md:py-24 overflow-hidden">
        {/* Dark Purple and Black Gradient Background */}
        <div
          className="absolute inset-0 bg-[#534BFF] z-0"
        />

        {/* Subtle Texture Overlay */}
        <div
          className="absolute inset-0 z-10 opacity-10"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000%2Fsvg\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 6V5zM6 5v1H5z\'/%3E%3C/g%3E%3C/svg%3E")'
          }}
        />

        {/* Main Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16" ref={headerRef}>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              Why Choose <span className="animated-gradient-text"></span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              At Big Bear Vans, we have a full-fledged team of van builders, CNC specialists, and engineers in Big Bear, CA, who work tirelessly to bring your vision to life. From campervans with bathrooms to luxury sprinter vans, we design every van to match your preferences.
            </p>
          </div>

          {/* Desktop Cards Section - Hidden on mobile */}
          <div className="hidden md:block">
            {/* Top Two Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 mx-auto max-w-5xl">
              {/* Card 1: True Custom Builds with the new shape */}
              <div className="relative w-full max-w-md mx-auto group card-container-top" ref={el => cardRefs.current[0] = el}>
                <svg
                  className="absolute inset-0 w-full h-full z-0"
                  viewBox="0 0 400 350"
                  preserveAspectRatio="none"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="hoverGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0A192F" />
                      <stop offset="33%" stopColor="#1E3A5F" />
                      <stop offset="66%" stopColor="#3A5F7D" />
                      <stop offset="100%" stopColor="#5C819C" />
                    </linearGradient>
                  </defs>
                  <path d={outerPath} fill="url(#backgroundGradient1)" />
                  <path d={innerPath} stroke="url(#hoverGradient1)" strokeWidth="3" fill="none" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <path d={innerPath} fill="transparent" stroke="#B0BDC9" strokeWidth="3" className="group-hover:opacity-0 transition-opacity duration-300" ref={el => cardInnerBorderRefs.current[0] = el} />
                  <defs>
                    <radialGradient id="backgroundGradient1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                      <stop offset="0%" style={{ stopColor: '#191B2F' }} />
                      <stop offset="100%" style={{ stopColor: '#0F0F1A' }} />
                    </radialGradient>
                  </defs>
                </svg>
                <div className="relative z-10 w-full h-full p-8 flex flex-col justify-start">
                  <div className="relative w-full h-48 rounded-md overflow-hidden mb-6 border-2 border-gray-700">
                    <div ref={el => glareRefs.current[0] = el} className="absolute inset-0 z-30 opacity-0 glare-effect"></div>
                    <Image src="/images/customizabledesigns.webp" alt="True Custom Builds" layout="fill" objectFit="cover" ref={el => imageRefs.current[0] = el} data-speed="0.05" />
                  </div>
                  <div className="card-content-wrapper">
                    <div className="card-text-content" ref={el => contentRefs.current[0] = el}>
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#00FFFF] transition-colors duration-300">True Custom Builds</h3>
                      <div className="relative w-full flex-grow flex flex-col justify-start">
                        <ul className="list-disc list-inside text-gray-300 space-y-2 teaser-content">
                          <li>Use of 3D scanners for precision.</li>
                          <li>CNC machines for any configuration.</li>
                          <li>Over 180 customized vans built.</li>
                        </ul>
                        <div className="full-content">
                          <p className="text-gray-300">No cookie-cutter builds here; Big Bear Vans is a truly custom campervan conversion shop. 3D scanners and two CNC machines that create any configuration and style you want in your campervan. From eco-friendly campervans and mobile office vans and luxury sprinter vans, we have successfully crafted more than 180 customized campervans with 5-star ratings.</p>
                        </div>
                      </div>
                    </div>
                    {/* <button ref={el => buttonRefs.current[0] = el} onClick={() => openModal('Van Volume Calculator', <VanVolumeCalculator />)} className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[calc(100%-4rem)] py-3 px-4 rounded-full bg-[#00FFFF] text-gray-900 font-semibold hover:bg-white transition-colors duration-300 transform hover:scale-105 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                      <span className="flex items-center justify-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 6a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM6 9a1 1 0 000 2h8a1 1 0 100-2H6z" /></svg>
                        <span>Calculate Your Van Space</span>
                      </span>
                    </button> */}
                  </div>
                </div>
              </div>
              {/* Card 2: Post Build Support with the new shape */}
              <div className="relative w-full max-w-md mx-auto group card-container-top" ref={el => cardRefs.current[1] = el}>
                <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 400 350" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="hoverGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0A192F" />
                      <stop offset="33%" stopColor="#1E3A5F" />
                      <stop offset="66%" stopColor="#3A5F7D" />
                      <stop offset="100%" stopColor="#5C819C" />
                    </linearGradient>
                  </defs>
                  <path d={outerPath} fill="url(#backgroundGradient2)" />
                  <path d={innerPath} stroke="url(#hoverGradient2)" strokeWidth="3" fill="none" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <path d={innerPath} fill="transparent" stroke="#B0BDC9" strokeWidth="3" className="group-hover:opacity-0 transition-opacity duration-300" ref={el => cardInnerBorderRefs.current[1] = el} />
                  <defs>
                    <radialGradient id="backgroundGradient2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%"><stop offset="0%" style={{ stopColor: '#191B2F' }} /><stop offset="100%" style={{ stopColor: '#0F0F1A' }} /></radialGradient>
                  </defs>
                </svg>
                <div className="relative z-10 w-full h-full p-8 flex flex-col justify-start">
                  <div className="relative w-full h-48 rounded-md overflow-hidden mb-6 border-2 border-gray-700">
                    <div ref={el => glareRefs.current[1] = el} className="absolute inset-0 z-30 opacity-0 glare-effect"></div>
                    <Image src="/WhyChooseBBV/post.jpg" alt="Post Build Support" layout="fill" objectFit="cover" ref={el => imageRefs.current[1] = el} data-speed="0.05" />
                  </div>
                  <div className="card-content-wrapper">
                    <div className="card-text-content" ref={el => contentRefs.current[1] = el}>
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#00FFFF] transition-colors duration-300">Post Build Support</h3>
                      <div className="relative w-full flex-grow flex flex-col justify-start">
                        <ul className="list-disc list-inside text-gray-300 space-y-2 teaser-content">
                          <li>1-year craftsmanship warranty.</li>
                          <li>Free 6-month maintenance.</li>
                          <li>Remote assistance available.</li>
                        </ul>
                        <div className="full-content">
                          <p className="text-gray-300">From that call to get key handover, we guide and support you at every step. Unlike other van makers, Big Bear Vans provides after-build support to its customers. We offer:</p>
                          <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
                            <li>1-year warranty on our craftsmanship.</li>
                            <li>Free maintenance for 6 months.</li>
                            <li>Visit our shop for servicing and installing upgrades.</li>
                            <li>Remote assistance on warranty issues.</li>
                            <li>24/7 Remote assistance for urgent issues</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* <button ref={el => buttonRefs.current[1] = el} onClick={() => openModal('Maintenance Cost Estimator', <MaintenanceCostEstimator />)} className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[calc(100%-4rem)] py-3 px-4 rounded-full bg-[#00FFFF] text-gray-900 font-semibold hover:bg-white transition-colors duration-300 transform hover:scale-105 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                      <span className="flex items-center justify-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 9h2a1 1 0 000-2H4a1 1 0 000 2zM3 14h2a1 1 0 000-2H3a1 1 0 000 2zM15 14h2a1 1 0 000-2h-2a1 1 0 000 2zM10 18a1 1 0 001-1v-1a1 1 0 10-2 0v1a1 1 0 001 1z" /></svg>
                        <span>Estimate Your Service Cost</span>
                      </span>
                    </button> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Three Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto max-w-6xl">
              {/* Card 3: CNC Technology */}
              <div className="relative w-full max-w-md mx-auto group card-container-bottom" ref={el => cardRefs.current[2] = el}>
                <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 400 250" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="hoverGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0A192F" /><stop offset="33%" stopColor="#1E3A5F" /><stop offset="66%" stopColor="#3A5F7D" /><stop offset="100%" stopColor="#5C819C" /></linearGradient>
                  </defs>
                  <path d={topOuterPath} fill="url(#backgroundGradient3)" />
                  <path d={topInnerPath} stroke="url(#hoverGradient3)" strokeWidth="3" fill="none" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <path d={topInnerPath} fill="transparent" stroke="#B0BDC9" strokeWidth="3" className="group-hover:opacity-0 transition-opacity duration-300" ref={el => cardInnerBorderRefs.current[2] = el} />
                  <defs>
                    <radialGradient id="backgroundGradient3" cx="50%" cy="50%" r="50%" fx="50%" fy="50%"><stop offset="0%" style={{ stopColor: '#191B2F' }} /><stop offset="100%" style={{ stopColor: '#0F0F1A' }} /></radialGradient>
                  </defs>
                </svg>
                <div className="relative z-10 w-full h-full p-8 pt-10 flex flex-col justify-start">
                  <div className="relative w-full h-48 rounded-md overflow-hidden mb-6 border-2 border-gray-700 mt-4">
                    <div ref={el => glareRefs.current[2] = el} className="absolute inset-0 z-30 opacity-0 glare-effect"></div>
                    <Image src="/WhyChooseBBV/CNC.jpg" alt="CNC Technology" layout="fill" objectFit="cover" ref={el => imageRefs.current[2] = el} data-speed="0.05" />
                  </div>
                  <div className="card-content-wrapper">
                    <div className="card-text-content" ref={el => contentRefs.current[2] = el}>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00FFFF] transition-colors duration-300">CNC Technology</h3>
                      <div className="relative w-full flex-grow flex flex-col justify-start">
                        <ul className="list-disc list-inside text-gray-300 space-y-2 teaser-content">
                          <li>Precise cuts and high quality.</li>
                          <li>Designed by CAD/CAM team.</li>
                          <li>3D scanners for accurate measurements.</li>
                        </ul>
                        <div className="full-content">
                          <p className="text-gray-300 flex-grow">At Big Bear Vans, we use state-of-the-art CNC (Computer Numerical Control) technology to take your van customization to the next level. Every van component is designed by our CAD/CAM team of machines, and scanned by 3D scanners to ensure precise cuts and the best quality.</p>
                        </div>
                      </div>
                    </div>
                    {/* <button ref={el => buttonRefs.current[2] = el} onClick={() => openModal('CNC Cut Time Estimator', <CNCCutTimeEstimator />)} className="mt-4 w-full py-3 px-4 rounded-full bg-[#00FFFF] text-gray-900 font-semibold hover:bg-white transition-colors duration-300 transform hover:scale-105">
                      <span className="flex items-center justify-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 102 0V8a1 1 0 00-.445-.832l-.445-.224z" clipRule="evenodd" /></svg>
                        <span>Estimate Cut Time</span>
                      </span>
                    </button> */}
                  </div>
                </div>
              </div>
              {/* Card 4: Quality Materials */}
              <div className="relative w-full max-w-md mx-auto group card-container-bottom" ref={el => cardRefs.current[3] = el}>
                <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 400 250" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="hoverGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0A192F" /><stop offset="33%" stopColor="#1E3A5F" /><stop offset="66%" stopColor="#3A5F7D" /><stop offset="100%" stopColor="#5C819C" /></linearGradient>
                  </defs>
                  <path d={topOuterPath} fill="url(#backgroundGradient4)" />
                  <path d={topInnerPath} stroke="url(#hoverGradient4)" strokeWidth="3" fill="none" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <path d={topInnerPath} fill="transparent" stroke="#B0BDC9" strokeWidth="3" className="group-hover:opacity-0 transition-opacity duration-300" ref={el => cardInnerBorderRefs.current[3] = el} />
                  <defs>
                    <radialGradient id="backgroundGradient4" cx="50%" cy="50%" r="50%" fx="50%" fy="50%"><stop offset="0%" style={{ stopColor: '#191B2F' }} /><stop offset="100%" style={{ stopColor: '#0F0F1A' }} /></radialGradient>
                  </defs>
                </svg>
                <div className="relative z-10 w-full h-full p-8 pt-10 flex flex-col justify-start">
                  <div className="relative w-full h-48 rounded-md overflow-hidden mb-6 border-2 border-gray-700 mt-4">
                    <div ref={el => glareRefs.current[3] = el} className="absolute inset-0 z-30 opacity-0 glare-effect"></div>
                    <Image src="/WhyChooseBBV/quality1.jpg" alt="Quality Materials" layout="fill" objectFit="cover" ref={el => imageRefs.current[3] = el} data-speed="0.05" />
                  </div>
                  <div className="card-content-wrapper">
                    <div className="card-text-content" ref={el => contentRefs.current[3] = el}>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00FFFF] transition-colors duration-300">Quality Materials</h3>
                      <div className="relative w-full flex-grow flex flex-col justify-start">
                        <ul className="list-disc list-inside text-gray-300 space-y-2 teaser-content">
                          <li>CNC-cut cabinets for durability.</li>
                          <li>Eco-friendly insulation.</li>
                          <li>High-quality flooring and bathrooms.</li>
                        </ul>
                        <div className="full-content">
                          <p className="text-gray-300 flex-grow">Big Bear Vans is known for using top-notch materials in camper vans. From CNC-cut cabinets and eco-friendly insulation to durable flooring and a spacious bathroom, we use only the best and the highest-quality materials to ensure your van stands the test of time.</p>
                        </div>
                      </div>
                    </div>
                    {/* <button ref={el => buttonRefs.current[3] = el} onClick={() => openModal('Insulation R-Value Calculator', <InsulationRValueCalculator />)} className="mt-4 w-full py-3 px-4 rounded-full bg-[#00FFFF] text-gray-900 font-semibold hover:bg-white transition-colors duration-300 transform hover:scale-105">
                      <span className="flex items-center justify-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 102 0V8a1 1 0 00-.445-.832l-.445-.224z" clipRule="evenodd" /></svg>
                        <span>Calculate Insulation R-Value</span>
                      </span>
                    </button> */}
                  </div>
                </div>
              </div>
              {/* Card 5: Off-grid Ready */}
              <div className="relative w-full max-w-md mx-auto group card-container-bottom" ref={el => cardRefs.current[4] = el}>
                <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 400 250" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="hoverGradient5" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0A192F" /><stop offset="33%" stopColor="#1E3A5F" /><stop offset="66%" stopColor="#3A5F7D" /><stop offset="100%" stopColor="#5C819C" /></linearGradient>
                  </defs>
                  <path d={topOuterPath} fill="url(#backgroundGradient5)" />
                  <path d={topInnerPath} stroke="url(#hoverGradient5)" strokeWidth="3" fill="none" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <path d={topInnerPath} fill="transparent" stroke="#B0BDC9" strokeWidth="3" className="group-hover:opacity-0 transition-opacity duration-300" ref={el => cardInnerBorderRefs.current[4] = el} />
                  <defs>
                    <radialGradient id="backgroundGradient5" cx="50%" cy="50%" r="50%" fx="50%" fy="50%"><stop offset="0%" style={{ stopColor: '#191B2F' }} /><stop offset="100%" style={{ stopColor: '#0F0F1A' }} /></radialGradient>
                  </defs>
                </svg>
                <div className="relative z-10 w-full h-full p-8 pt-10 flex flex-col justify-start">
                  <div className="relative w-full h-48 rounded-md overflow-hidden mb-6 border-2 border-gray-700 mt-4">
                    <div ref={el => glareRefs.current[4] = el} className="absolute inset-0 z-30 opacity-0 glare-effect"></div>
                    <Image src="/WhyChooseBBV/off-grid.jpg" alt="offgridready" layout="fill" objectFit="cover" ref={el => imageRefs.current[4] = el} data-speed="0.05" />
                  </div>
                  <div className="card-content-wrapper">
                    <div className="card-text-content" ref={el => contentRefs.current[4] = el}>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00FFFF] transition-colors duration-300">Off-grid Ready</h3>
                      <div className="relative w-full flex-grow flex flex-col justify-start">
                        <ul className="list-disc list-inside text-gray-300 space-y-2 teaser-content">
                          <li>Campervan solar panels.</li>
                          <li>Lithium battery banks.</li>
                          <li>Designed for bumpy rides.</li>
                        </ul>
                        <div className="full-content">
                          <p className="text-gray-300 flex-grow">Our customized campervans come equipped with all the necessary off-road accessories, like campervan solar panels, lithium battery banks, etc. They are designed to handle all the off-grid escapes, bumpy rides, and cross-country trips.</p>
                        </div>
                      </div>
                    </div>
                    {/* <button ref={el => buttonRefs.current[4] = el} onClick={() => openModal('Solar Power Calculator', <SolarPowerCalculator />)} className="mt-4 w-full py-3 px-4 rounded-full bg-[#00FFFF] text-gray-900 font-semibold hover:bg-white transition-colors duration-300 transform hover:scale-105">
                      <span className="flex items-center justify-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 11a1 1 0 000-2h1a1 1 0 000 2H4zM16 11a1 1 0 000-2h1a1 1 0 000 2h-1zM10 18a1 1 0 001-1v-1a1 1 0 10-2 0v1a1 1 0 001 1z" clipRule="evenodd" /></svg>
                        <span>Calculate Solar Needs</span>
                      </span>
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Cards Section - Hidden on desktop */}
          <div className="md:hidden">
            <div className="grid grid-cols-1 gap-8 mx-auto max-w-sm">
              {/* Card 1: True Custom Builds */}
              <div className="relative bg-[#1A1A1A] rounded-lg shadow-xl p-6">
                <div className="relative w-full h-48 rounded-md overflow-hidden mb-6 border-2 border-gray-700">
                  <Image src="/images/customizabledesigns.webp" alt="True Custom Builds" layout="fill" objectFit="cover" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">True Custom Builds</h3>
                <p className="text-gray-300">No cookie-cutter builds here; Big Bear Vans is a truly custom campervan conversion shop. 3D scanners and two CNC machines that create any configuration and style you want in your campervan. From eco-friendly campervans and mobile office vans and luxury sprinter vans, we have successfully crafted more than 180 customized campervans with 5-star ratings.</p>
                {/* <button onClick={() => openModal('Van Volume Calculator', <VanVolumeCalculator />)} className="mt-6 w-full py-3 px-4 rounded-full bg-[#00FFFF] text-gray-900 font-semibold hover:bg-white transition-colors duration-300 transform hover:scale-105">
                  <span className="flex items-center justify-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 6a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM6 9a1 1 0 000 2h8a1 1 0 100-2H6z" /></svg>
                    <span>Calculate Your Van Space</span>
                  </span>
                </button> */}
              </div>

              {/* Card 2: Post Build Support */}
              <div className="relative bg-[#1A1A1A] rounded-lg shadow-xl p-6">
                <div className="relative w-full h-48 rounded-md overflow-hidden mb-6 border-2 border-gray-700">
                  <Image src="/WhyChhoseBBV/post.jpg" alt="Post Build Support" layout="fill" objectFit="cover" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Post Build Support</h3>
                <p className="text-gray-300">From that call to get key handover, we guide and support you at every step. Unlike other van makers, Big Bear Vans provides after-build support to its customers. We offer:</p>
                <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
                  <li>1-year warranty on our craftsmanship.</li>
                  <li>Free maintenance for 6 months.</li>
                  <li>Visit our shop for servicing and installing upgrades.</li>
                  <li>Remote assistance on warranty issues.</li>
                  <li>24/7 Remote assistance for urgent issues</li>
                </ul>
                {/* <button onClick={() => openModal('Maintenance Cost Estimator', <MaintenanceCostEstimator />)} className="mt-6 w-full py-3 px-4 rounded-full bg-[#00FFFF] text-gray-900 font-semibold hover:bg-white transition-colors duration-300 transform hover:scale-105">
                  <span className="flex items-center justify-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 9h2a1 1 0 000-2H4a1 1 0 000 2zM3 14h2a1 1 0 000-2H3a1 1 0 000 2zM15 14h2a1 1 0 000-2h-2a1 1 0 000 2zM10 18a1 1 0 001-1v-1a1 1 0 10-2 0v1a1 1 0 001 1z" /></svg>
                    <span>Estimate Your Service Cost</span>
                  </span>
                </button> */}
              </div>

              {/* Card 3: CNC Technology */}
              <div className="relative bg-[#1A1A1A] rounded-lg shadow-xl p-6">
                <div className="relative w-full h-48 rounded-md overflow-hidden mb-6 border-2 border-gray-700">
                  <Image src="/images/CNCtechnology.jpg" alt="CNC Technology" layout="fill" objectFit="cover" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">CNC Technology</h3>
                <p className="text-gray-300">At Big Bear Vans, we use state-of-the-art CNC (Computer Numerical Control) technology to take your van customization to the next level. Every van component is designed by our CAD/CAM team of machines, and scanned by 3D scanners to ensure precise cuts and the best quality.</p>
                {/* <button onClick={() => openModal('CNC Cut Time Estimator', <CNCCutTimeEstimator />)} className="mt-6 w-full py-3 px-4 rounded-full bg-[#00FFFF] text-gray-900 font-semibold hover:bg-white transition-colors duration-300 transform hover:scale-105">
                  <span className="flex items-center justify-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 102 0V8a1 1 0 00-.445-.832l-.445-.224z" clipRule="evenodd" /></svg>
                    <span>Estimate Cut Time</span>
                  </span>
                </button> */}
              </div>

              {/* Card 4: Quality Materials */}
              <div className="relative bg-[#1A1A1A] rounded-lg shadow-xl p-6">
                <div className="relative w-full h-48 rounded-md overflow-hidden mb-6 border-2 border-gray-700">
                  {/* <Image src="/images/qualitymaterial.jpg" alt="Quality Materials" layout="fill" objectFit="cover" /> */}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Quality Materials</h3>
                <p className="text-gray-300">Big Bear Vans is known for using top-notch materials in camper vans. From CNC-cut cabinets and eco-friendly insulation to durable flooring and a spacious bathroom, we use only the best and the highest-quality materials to ensure your van stands the test of time.</p>
                {/* <button onClick={() => openModal('Insulation R-Value Calculator', <InsulationRValueCalculator />)} className="mt-6 w-full py-3 px-4 rounded-full bg-[#00FFFF] text-gray-900 font-semibold hover:bg-white transition-colors duration-300 transform hover:scale-105">
                  <span className="flex items-center justify-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 102 0V8a1 1 0 00-.445-.832l-.445-.224z" clipRule="evenodd" /></svg>
                    <span>Calculate Insulation R-Value</span>
                  </span>
                </button> */}
              </div>

              {/* Card 5: Off-grid Ready */}
              <div className="relative bg-[#1A1A1A] rounded-lg shadow-xl p-6">
                <div className="relative w-full h-48 rounded-md overflow-hidden mb-6 border-2 border-gray-700">
                  {/* <Image src="/images/offgridready.jpg" alt="offgridready" layout="fill" objectFit="cover" /> */}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Off-grid Ready</h3>
                <p className="text-gray-300">Our customized campervans come equipped with all the necessary off-road accessories, like campervan solar panels, lithium battery banks, etc. They are designed to handle all the off-grid escapes, bumpy rides, and cross-country trips.</p>
                {/* <button onClick={() => openModal('Solar Power Calculator', <SolarPowerCalculator />)} className="mt-6 w-full py-3 px-4 rounded-full bg-[#00FFFF] text-gray-900 font-semibold hover:bg-white transition-colors duration-300 transform hover:scale-105">
                  <span className="flex items-center justify-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 11a1 1 0 000-2h1a1 1 0 000 2H4zM16 11a1 1 0 000-2h1a1 1 0 000 2h-1zM10 18a1 1 0 001-1v-1a1 1 0 10-2 0v1a1 1 0 001 1z" clipRule="evenodd" /></svg>
                    <span>Calculate Solar Needs</span>
                  </span>
                </button> */}
              </div>
            </div>
          </div>

          {/* Call to Action Button */}
          <div className="text-center mt-16">
            <Link href={"/inquery"} className="relative inline-flex items-center justify-center px-10 py-4 rounded-full font-semibold overflow-hidden group shadow-lg animated-button-gradient">
              <span className="relative text-white z-10">Start Your Custom Build</span>
            </Link>
          </div>
        </div>
      </section>
      {showModal && <CardModal title={modalTitle} onClose={closeModal}>{modalContent}</CardModal>}
    </>
  );
}