// VanById.jsx
"use client";
import React, { useState, useRef, useEffect, useId } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { TextPlugin } from 'gsap/dist/TextPlugin';
import SplitText from 'gsap/dist/SplitText';
import styles from './VanById.module.css';
import { FaChevronRight, FaRegCopy } from 'react-icons/fa';
import { FaBolt, FaTint, FaHome, FaMoon, FaChair, FaCar } from 'react-icons/fa';
import { Toaster, toast } from 'react-hot-toast';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, TextPlugin, SplitText);
}

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

// =========================================================================================
// UPDATED: The DetailedFeatureCard component with new icon colors
// =========================================================================================
const DetailedFeatureCard = ({ feature, index, openModal }) => {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const iconRef = useRef(null);
    const titleRef = useRef(null);
    const copyButtonRef = useRef(null);

    const getIcon = (category) => {
        const iconColor = "text-[#49B5E8]";
        switch(category) {
            case 'Electrics': return <FaBolt ref={iconRef} className={`text-4xl mb-4 ${iconColor}`} />;
            case 'Electrical System': return <FaBolt ref={iconRef} className={`text-4xl mb-4 ${iconColor}`} />;
            case 'Vibro Insulation': return <FaHome ref={iconRef} className={`text-4xl mb-4 ${iconColor}`} />;
            case 'Insulation and Paneling': return <FaHome ref={iconRef} className={`text-4xl mb-4 ${iconColor}`} />;
            case 'Paneling and Insulation': return <FaHome ref={iconRef} className={`text-4xl mb-4 ${iconColor}`} />;
            case 'Water System': return <FaTint ref={iconRef} className={`text-4xl mb-4 ${iconColor}`} />;
            case 'Heating and Cooling': return <FaMoon ref={iconRef} className={`text-4xl mb-4 ${iconColor}`} />;
            case 'Seating and Sleeping': return <FaChair ref={iconRef} className={`text-4xl mb-4 ${iconColor}`} />;
            case 'Seating': return <FaChair ref={iconRef} className={`text-4xl mb-4 ${iconColor}`} />;
            case 'Sleeping': return <FaChair ref={iconRef} className={`text-4xl mb-4 ${iconColor}`} />;
            case 'Kitchen': return <FaMoon ref={iconRef} className={`text-4xl mb-4 ${iconColor}`} />;
            case 'Interior': return <FaMoon ref={iconRef} className={`text-4xl mb-4 ${iconColor}`} />;
            case 'Exterior': return <FaCar ref={iconRef} className={`text-4xl mb-4 ${iconColor}`} />;
            default: return null;
        }
    };

    useEffect(() => {
        gsap.fromTo(cardRef.current, { opacity: 0, y: 50 }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: index * 0.1,
            scrollTrigger: {
                trigger: cardRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
            },
        });
    }, [index]);

    const handleMouseEnter = () => {
        setIsHovered(true);
        gsap.to(cardRef.current, { scale: 1.05, duration: 0.3, ease: "power2.out" });
        gsap.to(iconRef.current, { rotation: 5, yoyo: true, repeat: 3, duration: 0.2 });
        gsap.to(titleRef.current, { x: 5, yoyo: true, repeat: 3, duration: 0.2 });
        gsap.to(copyButtonRef.current, { scale: 1.1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        gsap.to(cardRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });
        gsap.to(iconRef.current, { rotation: 0, duration: 0.3 });
        gsap.to(titleRef.current, { x: 0, duration: 0.3 });
        gsap.to(copyButtonRef.current, { scale: 1, duration: 0.3 });
    };

    const copyItems = (e) => {
      e.stopPropagation();
      const text = feature.items.join('\n');
      navigator.clipboard.writeText(text).then(() => {
          toast.success(`${feature.category} features copied!`);
      }).catch(err => {
          toast.error('Failed to copy. Please try again.');
      });
    };

    return (
        <div
            ref={cardRef}
            className="bg-[#212121] p-8 rounded-lg shadow-lg flex flex-col items-start
                     transform transition-all duration-300 ease-in-out
                     hover:shadow-2xl hover:border hover:border-[#8C95FF] hover:bg-[#2A2A2A]
                     relative overflow-hidden group cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="absolute inset-0 border border-transparent rounded-lg
                             group-hover:border-[#8C95FF] transition-all duration-300 ease-out"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#8C95FF]/20 to-[#B3F6FF]/20 opacity-0
                             group-hover:opacity-100 transition-opacity duration-300 ease-out rounded-lg"></div>

            <div className="relative z-10 w-full">
                <div className="flex justify-between items-start">
                    {getIcon(feature.category)}
                    {/* The copy button is now positioned even closer to the top-right */}
                    <button
                        ref={copyButtonRef}
                        onClick={copyItems}
                        className="p-2 text-white bg-transparent border border-[#8C95FF] rounded-full hover:bg-[#8C95FF] hover:text-[#534BFF] transition-all duration-300 absolute top-2 right-2 z-20" // Changed top-4 and right-4 to top-2 and right-2
                        aria-label="Copy features"
                    >
                        <FaRegCopy />
                    </button>
                </div>
                <h3 ref={titleRef} className="text-2xl font-bold mb-4 text-white">{feature.category}</h3>

                <div className="relative overflow-hidden">
                    <ul className="list-none space-y-2 text-[#D1D1FF] mb-4 transition-all duration-300 ease-in-out">
                        {feature.items.map((item, itemIndex) => (
                            <li
                                key={itemIndex}
                                className={`flex items-start transition-all duration-300 ease-in-out transform ${
                                    isHovered || itemIndex < 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 h-0'
                                }`}
                                style={{
                                    transitionDelay: isHovered ? `${itemIndex * 0.05}s` : `0s`,
                                    height: isHovered || itemIndex < 3 ? 'auto' : '0',
                                    overflow: 'hidden'
                                }}
                            >
                                <FaChevronRight className="w-4 h-4 text-[#7A83FF] mr-2 flex-shrink-0 mt-1" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
// =========================================================================================

const CardFrame = ({ children, curveType, className, imageSrc, borderColor }) => {
    const uniqueId = useId();
    const framePaths = {
        top: {
            outer: "M0 0H100L125 20L275 20L300 0H400V300H0V0Z",
            inner: "M3 3H103L126 23L274 23L297 3H397V297H3V3Z",
        },
        bottom: {
            outer: "M0 0H400V280L300 280L275 300L125 300L100 280L0 280V0Z",
            inner: "M3 3H397V277L297 277L274 297L126 297L103 277L3 277V3Z",
        },
        fullCurve: {
            outer: "M0 0H100L125 20L275 20L300 0H400V280L300 280L275 300L125 300L100 280L0 280V0Z",
            inner: "M3 3H103L126 23L274 23L297 3H397V277L297 277L274 297L126 297L103 277L3 277V3Z",
        },
        tallerCard: {
            outer: "M0 0H100L125 20L275 20L300 0H400V320L300 320L275 340L125 340L100 320L0 320V0Z",
            inner: "M3 3H103L126 23L274 23L297 3H397V317L297 317L274 337L126 337L103 317L3 317V3Z"
        }
    };
    const getPaths = () => {
        switch(curveType) {
            case 'top':
                return { outer: framePaths.top.outer, inner: framePaths.top.inner };
            case 'bottom':
                return { outer: framePaths.bottom.outer, inner: framePaths.bottom.inner };
            case 'fullCurve':
                return { outer: framePaths.fullCurve.outer, inner: framePaths.fullCurve.inner };
            case 'tallerCard':
                return { outer: framePaths.tallerCard.outer, inner: framePaths.tallerCard.inner };
            default:
                return { outer: framePaths.bottom.outer, inner: framePaths.bottom.inner };
        }
    };
    const currentPaths = getPaths();
    const viewBoxHeight = curveType === 'tallerCard' ? 340 : 300;
    const imageEffectClasses = "transition-all duration-300 ease-in-out origin-center group-hover:scale-110 group-hover:brightness-110";
    return (
        <div className={`relative w-full h-full flex items-center justify-center ${className} overflow-hidden group`}>
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox={`0 0 400 ${viewBoxHeight}`}
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                <defs>
                    <pattern
                        id={`image-pattern-${uniqueId}`}
                        width="100%"
                        height="100%"
                        viewBox={`0 0 400 ${viewBoxHeight}`}
                        preserveAspectRatio="xMidYMid slice"
                    >
                        <image
                            href={imageSrc}
                            x="0" y="0" width="400" height={viewBoxHeight}
                            preserveAspectRatio="xMidYMid slice"
                            className={imageEffectClasses}
                        />
                    </pattern>
                </defs>
                <path d={currentPaths.outer} fill="#F0F4F9" />
                <path
                    d={currentPaths.inner}
                    fill={`url(#image-pattern-${uniqueId})`}
                />
                <path
                    d={currentPaths.inner}
                    stroke={borderColor || "#800080"}
                    strokeWidth="3"
                    fill="none"
                />
            </svg>
        </div>
    );
};

const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);
const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);
const XMarkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);
const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

export default function VanById({ van }) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [buttonHoverEffect, setButtonHoverEffect] = useState('hover-border-glow');
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({});
    const [isMounted, setIsMounted] = useState(false);

    const heroImageRef = useRef(null);
    const heroOverlayRef = useRef(null);
    const heroContentRef = useRef(null);
    const titleRef = useRef(null);
    const santaMonicaSpanRef = useRef(null);
    const montrealSpanRef = useRef(null);
    const galleryHeadingRef = useRef(null);
    const featuresHeadingRef = useRef(null);
    const galleryContainerRef = useRef(null);
    const featuresContainerRef = useRef(null);
    const buttonRef = useRef(null);


    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!van || !isMounted) {
            return;
        }

        gsap.fromTo(
            heroImageRef.current,
            { scale: 1.15 },
            {
                scale: 1,
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: heroImageRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.5,
                },
            }
        );

        gsap.fromTo(
            heroOverlayRef.current,
            { opacity: 0 },
            { opacity: 0.7, duration: 1.5, ease: 'power2.out' }
        );

        gsap.fromTo(
            Array.from(heroContentRef.current.children).filter(child => child !== titleRef.current && child !== buttonRef.current),
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.1,
                ease: 'power3.out',
                delay: 0.8,
            }
        );

        const titleElement = titleRef.current;
        if (titleElement) {
            const split = new SplitText(titleElement, { type: "words,chars" });
            gsap.from(split.chars, {
                opacity: 0,
                y: 20,
                filter: 'blur(5px)',
                stagger: 0.05,
                duration: 0.6,
                ease: 'power3.out',
                delay: 0.5,
                onComplete: () => {
                    split.revert();
                }
            });
        }

        const santaMonicaSpan = santaMonicaSpanRef.current;
        if (santaMonicaSpan) {
            gsap.to(santaMonicaSpan, {
                backgroundPositionX: "-200%",
                ease: "none",
                duration: 8,
                repeat: -1,
                modifiers: {
                    backgroundPositionX: (value) => {
                        const bgSize = parseFloat(getComputedStyle(santaMonicaSpan).backgroundSize);
                        return parseFloat(value) % bgSize + "px";
                    }
                }
            });
        }

        const montrealSpan = montrealSpanRef.current;
        if (montrealSpan) {
            gsap.to(montrealSpan, {
                backgroundPositionX: "-200%",
                ease: "none",
                duration: 8,
                repeat: -1,
                modifiers: {
                    backgroundPositionX: (value) => {
                        const bgSize = parseFloat(getComputedStyle(montrealSpan).backgroundSize);
                        return parseFloat(value) % bgSize + "px";
                    }
                }
            });
        }

        gsap.fromTo(
            buttonRef.current,
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.0,
                ease: 'power2.out',
                delay: 1.8,
            }
        );

        const imageElement = heroImageRef.current;
        const glitchTl = gsap.timeline({ paused: true });
        glitchTl.to(imageElement, {
            x: 'random(-5, 5)',
            y: 'random(-5, 5)',
            rotation: 0,
            duration: 0.08,
            repeat: 3,
            yoyo: true,
            ease: 'rough({ template: none.out, strength: 0.8, points: 10, taper: "none", randomize: true, clamp: false})',
        }).to(imageElement, { x: 0, y: 0, rotation: 0, duration: 0.05 });

        const handleMouseEnter = () => glitchTl.restart();
        imageElement.addEventListener('mouseenter', handleMouseEnter);

        const effects = ['hover-border-glow', 'hover-electric-pulse', 'hover-neon-flicker'];
        let effectIndex = 0;
        const intervalId = setInterval(() => {
            setButtonHoverEffect(effects[effectIndex]);
            effectIndex = (effectIndex + 1) % effects.length;
        }, 3000);

        const galleryHeading = galleryHeadingRef.current;
        if (galleryHeading) {
            gsap.fromTo(
                galleryHeading,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: galleryHeading,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }

        const featuresHeading = featuresHeadingRef.current;
        if (featuresHeading) {
            gsap.fromTo(
                featuresHeading,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: featuresHeading,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }

        return () => {
            imageElement.removeEventListener('mouseenter', handleMouseEnter);
            clearInterval(intervalId);
            // This is the key fix: check if SplitText.get exists before calling it
            if (SplitText && SplitText.get && titleElement) {
                const splitInstance = SplitText.get(titleElement);
                if (splitInstance) {
                    splitInstance.revert();
                }
            }
        };

    }, [van, isMounted]);

    if (!van) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
                <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-lg">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Van Not Found</h1>
                    <p className="text-gray-600 mb-6">The van you're looking for doesn't exist or has been moved.</p>
                    {/* <Link
                        href="/van/van-for-sale"
                        className="inline-flex items-center bg-orange-600 text-white px-6 py-3 rounded-full hover:bg-orange-700 transition-colors"
                    >
                        <ArrowLeftIcon />
                        <span className="ml-2">Back to All Vans</span>
                    </Link> */}
                </div>
            </div>
        );
    }

    const openLightbox = (index) => {
        setLightboxOpen(true);
        setCurrentImageIndex(index);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const navigateImage = (direction) => {
        if (direction === "next") {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === van.gallery.length - 1 ? 0 : prevIndex + 1
            );
        } else {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? van.gallery.length - 1 : prevIndex - 1
            );
        }
    };

    const isSantaMonicaVan = van.van_listing?.title.includes('Santa Monica');
    const isMontrealVan = van.van_listing?.title.includes('Montreal');

    const renderHeading = () => {
        if (isSantaMonicaVan) {
            const title = van.van_listing?.title;
            const parts = title ? title.split('Santa Monica') : [];
            return (
                <h1 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
                    {parts[0]}
                    <span ref={santaMonicaSpanRef} className={styles.santaMonicaGradient}>
                        Santa Monica
                    </span>
                    {parts[1]}
                </h1>
            );
        }
        if (isMontrealVan) {
            const title = van.van_listing?.title;
            const parts = title ? title.split('AWD Montreal 170') : [];
            return (
                <h1 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight text-white">
                    {parts[0]}
                    <span ref={montrealSpanRef} className={styles.santaMonicaGradient}>
                        AWD Montreal 170
                    </span>
                    {parts[1]}
                </h1>
            );
        }
        return (
            <h1 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight text-white">
                {van.van_listing?.title}
            </h1>
        );
    };

    const renderGalleryHeading = () => {
        const title = "Explore the Interior & Exterior";
        const parts = title.split('Interior & Exterior');
        return (
            <div className="text-center">
                <h2 ref={galleryHeadingRef} className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight inline-block">
                    {parts[0]}
                    <span className={styles.exploreGradient}>
                        Interior & Exterior
                    </span>
                </h2>
            </div>
        );
    };

    const renderFeaturesHeading = () => {
      return (
          <div className="text-center">
              <h2 ref={featuresHeadingRef} className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight inline-block">
                  <span className={styles.featuresGradient}>
                      Features & Amenities
                  </span>
              </h2>
          </div>
      );
    };

    const galleryImages = van.gallery.slice(1);
    const firstRow = galleryImages.slice(0, 3);
    const secondRow = galleryImages.slice(3, 6);
    const thirdRow = galleryImages.slice(6, 9);
    const lastRow = galleryImages.slice(9);

    const getBorderColor = (index) => {
        return index % 2 === 0 ? "#800080" : "#000000";
    };

    const openModal = (content) => {
        setModalContent(content);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalContent({});
    };

    // Calculate the number of cards in the last row for centering
    const lastRowCards = van.detailed_features ? van.detailed_features.length % 3 : 0;
    const isSingleCard = lastRowCards === 1;
    const isTwoCards = lastRowCards === 2;

    return (
        <div className="min-h-screen bg-white pt-20">
            {lightboxOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 text-white p-2 rounded-full bg-gray-900 bg-opacity-50 hover:bg-opacity-70 transition-all"
                    >
                        <XMarkIcon />
                    </button>
                    <button
                        onClick={() => navigateImage("prev")}
                        className="absolute left-4 text-white p-3 rounded-full bg-gray-900 bg-opacity-50 hover:bg-opacity-70 transition-all"
                    >
                        <ChevronLeftIcon />
                    </button>
                    <button
                        onClick={() => navigateImage("next")}
                        className="absolute right-4 text-white p-3 rounded-full bg-gray-900 bg-opacity-50 hover:bg-opacity-70 transition-all"
                    >
                        <ChevronRightIcon />
                    </button>
                    <div className="max-w-4xl mx-auto p-4">
                        <img
                            src={van.gallery[currentImageIndex]}
                            alt={`${van.van_listing?.title} ${currentImageIndex + 1}`}
                            className="max-h-screen w-auto mx-auto rounded-lg"
                        />
                    </div>
                </div>
            )}
            <div className="relative w-full h-screen overflow-hidden">
                <img
                    ref={heroImageRef}
                    src={van.gallery?.[0]}
                    alt={van.van_listing?.title}
                    className="w-full h-full object-cover"
                />
                <div
                    ref={heroOverlayRef}
                    className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-transparent opacity-70"
                ></div>
                {/* MODIFIED: Adjusted top position for Montreal content to move it up more. */}
                <div ref={heroContentRef} className={`absolute z-10 flex flex-col items-start justify-start text-white ${isMontrealVan ? 'top-[5%]' : 'top-1/5'} left-12 right-12`}>
                    <div className="mb-8">
                        {renderHeading()}
                        {/* MODIFIED: Increased paragraph width for Montreal page */}
                        <p className={`text-lg md:text-xl text-white ${isMontrealVan ? 'max-w-[75%]' : 'max-w-2xl'}`}>
                            {van.van_listing?.description}
                        </p>
                    </div>

                    {isMontrealVan ? (
                        // New block for Montreal van's unique specifications
                        // MODIFIED: Increased width to 'w-full' for full width and adjusted spacing
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full space-y-4 md:space-y-0 md:space-x-12 mb-8">
                            <div className="flex flex-col items-start w-full md:w-auto">
                                <h3 className="text-xl font-bold border-b-2 border-white mb-1">Make & Model</h3>
                                <p className="text-lg">Mercedes-Benz Sprinter</p>
                            </div>
                            <div className="flex flex-col items-start w-full md:w-auto">
                                <h3 className="text-xl font-bold border-b-2 border-white mb-1">Wheelbase</h3>
                                <p className="text-lg">170</p>
                            </div>
                            <div className="flex flex-col items-start w-full md:w-auto">
                                <h3 className="text-xl font-bold border-b-2 border-white mb-1">Drivetrain</h3>
                                <p className="text-lg">AWD</p>
                            </div>
                            <div className="flex flex-col items-start w-full md:w-auto">
                                <h3 className="text-xl font-bold border-b-2 border-white mb-1">Sit & Sleep</h3>
                                <p className="text-lg">4-5</p>
                            </div>
                            <div className="flex flex-col items-start w-full md:w-auto">
                                <h3 className="text-xl font-bold border-b-2 border-white mb-1">Price</h3>
                                <p className="text-lg">{van.van_listing.price}</p>
                            </div>
                        </div>
                    ) : (
                        // Original block for other vans
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-6 gap-x-12 mb-8">
                            {van.van_listing?.specifications?.make_model && (
                                <div className="text-white">
                                    <h3 className="text-md font-bold border-b-2 border-white mb-1 w-1/2">Make & Model</h3>
                                    <p className="text-md">{van.van_listing.specifications.make_model}</p>
                                </div>
                            )}
                            {van.van_listing?.specifications?.wheelbase && (
                                <div className="text-white">
                                    <h3 className="text-md font-bold border-b-2 border-white mb-1 w-1/2">Wheelbase</h3>
                                    <p className="text-md">{van.van_listing.specifications.wheelbase}</p>
                                </div>
                            )}
                            {van.van_listing?.specifications?.drivetrain && (
                                <div className="text-white">
                                    <h3 className="text-md font-bold border-b-2 border-white mb-1 w-1/2">Drivetrain</h3>
                                    <p className="text-md">{van.van_listing.specifications.drivetrain}</p>
                                </div>
                            )}
                            {van.van_listing?.specifications?.capacity?.sits && (
                                <div className="text-white">
                                    <h3 className="text-md font-bold border-b-2 border-white mb-1 w-1/2">Sit & Sleep</h3>
                                    <p className="text-md">{van.van_listing.specifications.capacity.sits} | {van.van_listing.specifications.capacity.sleeps}</p>
                                </div>
                            )}
                            {van.van_listing?.price && (
                                <div className="text-white">
                                    <h3 className="text-md font-bold border-b-2 border-white mb-1 w-1/2">Price</h3>
                                    <p className="text-md">{van.van_listing.price}</p>
                                </div>
                            )}
                            {van.sold && (
                                <div className="flex items-center">
                                    <span className="inline-block bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-full transform rotate-[-5deg] shadow-lg">
                                        SOLD
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                    {/* MODIFIED: Ensured button width is auto */}
                    <div ref={buttonRef} className="mt-4">
                        <Link
                            href="https://calendly.com/info-bigbearvans/custom-build-your-campervan"
                            className={isMontrealVan ? `${styles.ctaButton} inline-block w-auto px-8 py-4 rounded-full font-semibold transition-colors shadow-lg` : `${styles.animatedButton} ${styles[buttonHoverEffect]} inline-block w-auto px-8 py-4 rounded-full font-semibold transition-colors shadow-lg`}
                        >
                            Book a call now
                        </Link>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
                <div className="mb-8">
                    {/* <Link
                        href="/van/van-for-sale"
                        className="inline-flex items-center text-orange-600 font-medium hover:text-orange-700 transition-colors group"
                    >
                        <ChevronLeftIcon />
                        <span className="ml-1 group-hover:ml-2 transition-all">Back to All Vans</span>
                    </Link> */}
                </div>
                {van.gallery && van.gallery.length > 1 && (
                    <div className="mb-16">
                        {renderGalleryHeading()}
                        {/* First Row: 3 images, bottom curve */}
                        <div ref={galleryContainerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                            {firstRow.map((img, index) => (
                                <div
                                    key={index}
                                    className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                                    onClick={() => openLightbox(index + 1)}
                                >
                                    <CardFrame
                                        curveType="bottom"
                                        imageSrc={img}
                                        borderColor={getBorderColor(index)}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Second Row: 3 images, tallerCard */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                               {secondRow.map((img, index) => (
                                   <div
                                       key={index + firstRow.length}
                                       className="relative w-full aspect-[5/4] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                                       onClick={() => openLightbox(index + firstRow.length + 1)}
                                   >
                                       <CardFrame
                                           curveType="tallerCard"
                                           imageSrc={img}
                                           borderColor={getBorderColor(index + firstRow.length)}
                                       />
                                   </div>
                               ))}
                        </div>

                        {/* Third Row: 3 images, tallerCard (same as second row) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                               {thirdRow.map((img, index) => (
                                   <div
                                       key={index + firstRow.length + secondRow.length}
                                       className="relative w-full aspect-[5/4] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                                       onClick={() => openLightbox(index + firstRow.length + secondRow.length + 1)}
                                   >
                                       <CardFrame
                                           curveType="tallerCard"
                                           imageSrc={img}
                                           borderColor={getBorderColor(index + firstRow.length + secondRow.length)}
                                       />
                                   </div>
                               ))}
                        </div>

                        {/* Last Row: Remaining images, top curve */}
                        <div className="flex justify-center flex-wrap gap-4 mt-4">
                               {lastRow.map((img, index) => (
                                   <div
                                       key={index + firstRow.length + secondRow.length + thirdRow.length}
                                       className="relative w-full aspect-[4/3] max-w-sm rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                                       onClick={() => openLightbox(index + firstRow.length + secondRow.length + thirdRow.length + 1)}
                                   >
                                       <CardFrame
                                           curveType="top"
                                           imageSrc={img}
                                           borderColor={getBorderColor(index + firstRow.length + secondRow.length + thirdRow.length)}
                                       />
                                   </div>
                               ))}
                        </div>
                    </div>
                )}
            </div>
            {/* Features Section */}
            <div className="bg-[#111111] py-8 md:py-16">
                <div className="max-w-7xl mx-auto px-4" ref={featuresContainerRef}>
                    {van.detailed_features && (
                        <>
                            <Toaster position="top-right" reverseOrder={false} />
                            {renderFeaturesHeading()}
                            {/* NEW: Conditional centering for the last row of feature cards */}
                            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 ${van.detailed_features.length % 3 !== 0 && 'lg:justify-items-center'}`}>
                                {van.detailed_features.map((feature, index) => (
                                    <DetailedFeatureCard key={index} feature={feature} index={index} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 text-center bg-[#111111]">
                <a
                    href="https://calendly.com/info-bigbearvans/custom-build-your-campervan"
                    className={`${styles.ctaButton} inline-block w-auto px-8 py-4 rounded-full font-semibold transition-colors shadow-lg`}
                >
                    Book a Free Consult
                </a>
            </div>
            {showModal && (
                <Modal
                    title={modalContent.title}
                    content={modalContent.content}
                    onClose={closeModal}
                />
            )}
        </div>
    );
}