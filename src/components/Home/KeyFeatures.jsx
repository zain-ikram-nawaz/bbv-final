// src/components/Home/KeyFeatures.jsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { FaBolt, FaTint, FaHome, FaMoon, FaChair, FaCar, FaChevronRight } from 'react-icons/fa';
import { FaRegCopy } from 'react-icons/fa'; // Importing the new icon
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast, Toaster } from 'react-hot-toast';

gsap.registerPlugin(ScrollTrigger);

// Placeholder for a simple Modal component
const Modal = ({ title, content, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(modalRef.current, {
      opacity: 0,
      scale: 0.8
    }, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: 'power3.out'
    });
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4" onClick={onClose}>
      <div
        ref={modalRef}
        className="relative p-8 bg-[#5C54FF] rounded-lg shadow-xl w-full max-w-lg mx-auto text-white"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          aria-label="Close modal"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base">{content}</p>
      </div>
    </div>
  );
};

const featuresData = [
  {
    icon: <FaHome className="text-4xl mb-4 text-[#8C95FF]" />,
    title: 'Insulation and Paneling',
    shortItems: [
      'Fibre-insulated doors & windows',
      'Wood panel ceilings & walls',
    ],
    items: [
      'Fibre-insulated doors & windows',
      'Wood panel ceilings & walls',
      'Composite decks',
      'Sound dampening material',
      'Recycled denim insulation',
      'Weather-resistant sealants',
    ],
    modalContent: "Our state-of-the-art insulation and paneling system is designed for maximum thermal efficiency and sound dampening. We use a multi-layer approach with recycled materials to ensure your van is quiet and comfortable in any climate. The wood paneling is sourced from sustainable forests, giving your interior a natural, aesthetic feel while maintaining durability."
  },
  {
    icon: <FaBolt className="text-4xl mb-4 text-[#8C95FF]" />,
    title: 'Electrics',
    shortItems: [
      '800 amp hours of off-grid power',
      '12V 40 A DC-DC battery charger',
      'Solar panel',
    ],
    items: [
      '800 amp hours of off-grid power',
      '12V 40 A DC-DC battery charger',
      'Glycol heating system 12V A/C unit',
      'Solar panel',
      '16V Shore power connector fan',
      'Smart power monitoring system',
    ],
    progressData: { label: 'Battery Level', value: 85 },
    modalContent: "Our custom electrical systems are built to give you true off-grid freedom. With 800Ah of battery capacity and a robust solar setup, you can power all your appliances and electronics without worrying about finding a campsite. The smart monitoring system allows you to track your power consumption in real-time from a mobile app."
  },
  {
    icon: <FaTint className="text-4xl mb-4 text-[#8C95FF]" />,
    title: 'Water System',
    shortItems: [
      '30-gal freshwater tank',
      '20-gal grey water tank',
      'Hot & cold water',
    ],
    items: [
      '30-gal freshwater tank',
      '20-gal grey water tank',
      'Hot & cold water',
      'Activated carbon block filter',
      'UV sterilization unit',
      'On-demand water pump',
    ],
    modalContent: "The water system is a self-contained unit designed for convenience and efficiency. The large fresh and grey water tanks mean fewer stops to refill or empty. A state-of-the-art filtration system ensures your drinking water is always clean and safe, and the on-demand hot water heater gives you the comfort of home on the road."
  },
  {
    icon: <FaChair className="text-4xl mb-4 text-[#8C95FF]" />,
    title: 'Seating and Sleeping',
    shortItems: [
      '360° swivel seats',
      'Pit couch',
      'Elevator bed',
    ],
    items: [
      '360° swivel seats',
      'Pit couch',
      'Dinette area convertible to bed',
      'Elevator bed',
      'Custom memory foam mattresses',
    ],
    modalContent: "Our flexible seating and sleeping solutions maximize the use of space. The 360° swivel seats create an open living area, while the dinette area can be converted into an additional bed. The unique elevator bed system allows for a full-size bed to be lowered from the ceiling, giving you more living space during the day."
  },
  {
    icon: <FaMoon className="text-4xl mb-4 text-[#8C95FF]" />,
    title: 'Kitchen',
    shortItems: [
      'Pop-up countertop extension',
      'Outdoor fold-out table',
      'Hidden 3.3 cu ft/12v refrigerator',
    ],
    items: [
      'Pop-up countertop extension',
      'Outdoor fold-out table',
      'Hidden 3.3 cu ft/12v refrigerator',
      'Propane cooktop',
      'Oven',
      'Deep sink with flexible hose',
      'Designer backsplash Microwave',
    ],
    modalContent: "The kitchen is designed to be a fully functional culinary space on wheels. Features like a hidden refrigerator and a pop-up countertop maximize efficiency, while the propane cooktop and deep sink make meal prep and cleanup a breeze. The designer backsplash and quality materials give it a high-end, modern look."
  },
  {
    icon: <FaCar className="text-4xl mb-4 text-[#8C95FF]" />,
    title: 'Exterior',
    shortItems: [
      'Storage cabinets Audio system',
      'Full size mirror',
      'Light bars',
    ],
    items: [
      'Storage cabinets Audio system',
      'Full size mirror',
      'Unique floating & wall Skylight roof',
      'Lagun tables Electric swivel tables',
      'Light bars',
      'Rooftop deck',
      'Bike rack',
    ],
    modalContent: "The exterior of your van is not just a shell—it's part of the adventure. We can add a variety of external features, from a full-sized rooftop deck for stargazing to light bars for off-road visibility. Custom storage cabinets and a bike rack ensure you can bring all your gear along for the journey."
  },
];

const KeyFeatures = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const cardRefs = useRef([]);
  const progressBarRef = useRef(null);

  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    if (progressBarRef.current) {
      gsap.fromTo(progressBarRef.current, {
        scaleX: 0
      }, {
        scaleX: 1,
        transformOrigin: "left",
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: progressBarRef.current,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      });
    }
  }, []);

  const openModal = (feature) => {
    setModalContent(feature);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent({});
  };

  const copyToClipboard = (text, message) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(message);
    }).catch(err => {
      toast.error('Failed to copy. Please try again.');
    });
  };

  const copyBillOfMaterials = (items) => {
    const text = items.join('\n');
    copyToClipboard(text, 'Bill of Materials copied to clipboard!');
  };

  const copyPowerReport = () => {
    const report = `Power Report:\n- 800Ah Battery Capacity\n- 85% Battery Level\n- Solar Input: 250W`;
    copyToClipboard(report, 'Power Report copied to clipboard!');
  };

  const copyTankLevels = () => {
    const levels = `Tank Levels:\n- Freshwater: 30 gallons\n- Grey water: 20 gallons`;
    copyToClipboard(levels, 'Tank Levels copied to clipboard!');
  };

  const copyDimensions = () => {
    const dimensions = `Seating & Bed Dimensions:\n- Bed: 72" x 54"\n- Couch: 60" x 30"`;
    copyToClipboard(dimensions, 'Dimensions copied to clipboard!');
  };

  const copyKitchenList = (items) => {
    const text = items.join('\n');
    copyToClipboard(text, 'Kitchen Appliance list copied to clipboard!');
  };

  const copyExteriorSpecs = (items) => {
    const text = items.join('\n');
    copyToClipboard(text, 'Exterior Specifications copied to clipboard!');
  };

  return (
    <section className="relative bg-[#534BFF] text-white py-20 px-4">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="absolute top-0 left-0 w-full h-7 bg-[#F8F8F8] z-0"
        style={{
          backgroundImage: 'radial-gradient(ellipse at top, #F8F8F8 50%, transparent 50%)',
          backgroundSize: '100% 50px',
          backgroundPosition: 'center top',
          transform: 'translateY(-100%) rotateX(180deg)'
        }}
      ></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <h2 className="text-4xl md:text-7xl font-extrabold text-center mb-16" // Adjusted font size for responsiveness
          style={{
            background: 'linear-gradient(45deg, #edf3f0ff, #cadee0ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0px 4px 15px rgba(0,0,0,0.3))',
          }}
        >
          Key Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="bg-[#534BFF] p-8 rounded-lg shadow-lg flex flex-col items-start
                         transform transition-all duration-300 ease-in-out
                         hover:scale-[1.02] hover:shadow-2xl hover:bg-[#5C54FF] hover:border hover:border-[#8C95FF]
                         relative overflow-hidden group cursor-pointer"
              onClick={() => openModal(feature)}
            >
              <div className="absolute inset-0 border border-transparent rounded-lg
                                     group-hover:border-[#8C95FF] transition-all duration-300 ease-out"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#8C95FF]/20 to-[#B3F6FF]/20 opacity-0
                                     group-hover:opacity-100 transition-opacity duration-300 ease-out rounded-lg"></div>

              <div className="relative z-10 w-full">
                <div className="flex justify-between items-start">
                  {feature.icon}
                  <div className="relative z-20 flex flex-col space-y-2">
                    {/* Copy Functionality with FaRegCopy */}
                    {feature.title === 'Insulation and Paneling' && (
                      <button
                        onClick={(e) => { e.stopPropagation(); copyBillOfMaterials(feature.items); }}
                        className="p-2 text-white bg-transparent border border-[#8C95FF] rounded-full hover:bg-[#8C95FF] hover:text-[#534BFF] transition-all duration-300"
                        aria-label="Copy Bill of Materials"
                      >
                        <FaRegCopy />
                      </button>
                    )}
                    {feature.title === 'Electrics' && (
                      <button
                        onClick={(e) => { e.stopPropagation(); copyPowerReport(); }}
                        className="p-2 text-white bg-transparent border border-[#8C95FF] rounded-full hover:bg-[#8C95FF] hover:text-[#534BFF] transition-all duration-300"
                        aria-label="Copy Power Report"
                      >
                        <FaRegCopy />
                      </button>
                    )}
                    {feature.title === 'Water System' && (
                      <button
                        onClick={(e) => { e.stopPropagation(); copyTankLevels(); }}
                        className="p-2 text-white bg-transparent border border-[#8C95FF] rounded-full hover:bg-[#8C95FF] hover:text-[#534BFF] transition-all duration-300"
                        aria-label="Copy Tank Levels"
                      >
                        <FaRegCopy />
                      </button>
                    )}
                    {feature.title === 'Seating and Sleeping' && (
                      <button
                        onClick={(e) => { e.stopPropagation(); copyDimensions(); }}
                        className="p-2 text-white bg-transparent border border-[#8C95FF] rounded-full hover:bg-[#8C95FF] hover:text-[#534BFF] transition-all duration-300"
                        aria-label="Copy Dimensions"
                      >
                        <FaRegCopy />
                      </button>
                    )}
                    {feature.title === 'Kitchen' && (
                      <button
                        onClick={(e) => { e.stopPropagation(); copyKitchenList(feature.items); }}
                        className="p-2 text-white bg-transparent border border-[#8C95FF] rounded-full hover:bg-[#8C95FF] hover:text-[#534BFF] transition-all duration-300"
                        aria-label="Copy Appliance List"
                      >
                        <FaRegCopy />
                      </button>
                    )}
                    {feature.title === 'Exterior' && (
                      <button
                        onClick={(e) => { e.stopPropagation(); copyExteriorSpecs(feature.items); }}
                        className="p-2 text-white bg-transparent border border-[#8C95FF] rounded-full hover:bg-[#8C95FF] hover:text-[#534BFF] transition-all duration-300"
                        aria-label="Copy Exterior Specs"
                      >
                        <FaRegCopy />
                      </button>
                    )}
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-white">
                  {feature.title}
                </h3>
                
                <div className="relative overflow-hidden h-[120px]">
                  <ul className="list-none space-y-2 text-[#D1D1FF] mb-4 transition-transform duration-300 ease-in-out transform translate-y-0 group-hover:-translate-y-[150%]">
                    {feature.shortItems.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <FaChevronRight className="w-4 h-4 text-[#00FFC2] mr-2 flex-shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className="absolute top-0 left-0 w-full list-none space-y-2 text-white transition-transform duration-300 ease-in-out transform translate-y-[150%] group-hover:translate-y-0">
                    {feature.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <FaChevronRight className="w-4 h-4 text-[#00FFC2] mr-2 flex-shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Animated Progress Bar (Specific to Electrics) */}
                {feature.title === 'Electrics' && (
                  <div className="w-full h-3 bg-[#8C95FF]/30 rounded-full my-4 overflow-hidden">
                    <div
                      ref={progressBarRef}
                      className="h-full bg-gradient-to-r from-[#00FFC2] to-[#B3F6FF]"
                      style={{ width: `${feature.progressData.value}%` }}
                    ></div>
                    <p className="text-xs text-[#D1D1FF] mt-2 text-right">{feature.progressData.label}: {feature.progressData.value}%</p>
                  </div>
                )}
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(feature);
                  }}
                  className="mt-4 px-4 py-2 text-sm font-semibold text-white bg-transparent border border-[#8C95FF] rounded-full
                             hover:bg-[#8C95FF] hover:text-[#534BFF] transition-all duration-300"
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <Modal
          title={modalContent.title}
          content={modalContent.modalContent}
          onClose={closeModal}
        />
      )}
    </section>
  );
};

export default KeyFeatures;