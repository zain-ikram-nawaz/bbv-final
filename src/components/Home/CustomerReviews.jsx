"use client";
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { motion, AnimatePresence } from "framer-motion";
import { X, ThumbsUp, ThumbsDown, Flag, Copy } from "lucide-react";
import { useInView } from "react-intersection-observer";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Reusable Star Rating Component
const StarRating = ({ rating, hover }) => {
  const starColor = hover ? 'text-yellow-400' : 'text-gray-400';
  return (
    <div className="flex justify-center md:justify-start gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? starColor : 'text-gray-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

// Review Card Component with new effects and animations
const ReviewCard = ({ review, index, handleVote, votes, isLoggedIn, handleReport }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const contentRef = useRef(null);
  const parallaxRef = useRef(null);
  const glowRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);
  const isDesktop = typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches;


  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`"${review.text}" - ${review.name}`).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  useEffect(() => {
    if (!isDesktop) return; // Only run desktop animations on desktop

    const card = cardRef.current;
    if (!card) return;

    // GSAP Card Staggered Reveal Animation
    gsap.fromTo(card,
      { y: 50, clipPath: 'inset(100% 0 0 0)' },
      {
        y: 0,
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.5,
        ease: 'power3.out',
        delay: index * 0.1,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // GSAP 3D Tilt Effect
    gsap.set(card, { transformStyle: "preserve-3d" });
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateX = gsap.utils.mapRange(0, rect.height, -5, 5, e.clientY - centerY);
      const rotateY = gsap.utils.mapRange(0, rect.width, 5, -5, e.clientX - centerX);
      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.5,
        ease: "power2.out",
      });

      // Interactive Mouse Follower Glow
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      gsap.to(glowRef.current, {
        x: mouseX - 25,
        y: mouseY - 25,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };
    
    const handleMouseEnter = () => {
      setIsHovered(true);
      gsap.to(glowRef.current, { scale: 1, duration: 0.5 });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });
      gsap.to(glowRef.current, { scale: 0, opacity: 0, duration: 0.5 });
    };
    
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    // Parallax Background Effect
    gsap.to(parallaxRef.current, {
      y: -20,
      ease: "none",
      scrollTrigger: {
        trigger: card,
        scrub: true,
        start: "top bottom",
        end: "bottom top"
      }
    });

    // Content fly-in animation
    gsap.fromTo(contentRef.current.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
        }
      }
    );

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [index, isDesktop]);

  // Mobile-friendly card variant
  const MobileReviewCard = () => (
    <div className="relative w-full p-6 bg-[#1B1B2A] rounded-lg shadow-lg flex flex-col items-center text-center">
      <div className="flex flex-col items-center w-full">
        <StarRating rating={review.rating} hover={true} />
        <p className="text-xs italic mb-2 mt-2 text-gray-200">"{review.text}"</p>
        <div className="flex flex-wrap justify-center gap-1 mt-1">
          {review.keywords && review.keywords.map((keyword, i) => (
            <span key={i} className="text-[10px] px-1 py-0.5 rounded-full bg-white/10 text-gray-300">
              {keyword}
            </span>
          ))}
        </div>
      </div>
      <h4 className="font-semibold text-sm mt-4 text-white">{review.name}</h4>
      {isLoggedIn && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={(e) => { e.stopPropagation(); handleVote(review.id, 'up'); }}
            className={`flex items-center justify-center h-6 w-6 rounded-full transition-colors duration-300 ${votes[review.id] === 'up' ? 'text-green-500 bg-green-500/20' : 'text-gray-400 hover:text-green-500'}`}
          >
            <ThumbsUp size={12} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleVote(review.id, 'down'); }}
            className={`flex items-center justify-center h-6 w-6 rounded-full transition-colors duration-300 ${votes[review.id] === 'down' ? 'text-red-500 bg-red-500/20' : 'text-gray-400 hover:text-red-500'}`}
          >
            <ThumbsDown size={12} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleCopy(e); }}
            className="flex items-center justify-center h-6 w-6 text-xs font-semibold rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <Copy size={12} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleReport(review.id); }}
            className="flex items-center justify-center h-6 w-6 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <Flag size={12} />
          </button>
        </div>
      )}
    </div>
  );

  return isDesktop ? (
    <div
      ref={cardRef}
      className="relative w-72 h-[360px] flex-shrink-0 group transition-all duration-300 transform-gpu cursor-pointer"
    >
      {/* Parallax Background Layer */}
      <div 
        ref={parallaxRef} 
        className="absolute inset-0 bg-cover bg-center rounded-lg z-0 opacity-20 transition-opacity duration-300"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M50 0 L100 25 L75 100 L25 100 L0 75 Z\' fill=\'%23888\' opacity=\'0.2\'/%3E%3C/svg%3E")',
          backgroundSize: '100px',
        }}
      ></div>

      {/* Interactive Mouse Follower Glow */}
      <div 
        ref={glowRef} 
        className="absolute w-12 h-12 rounded-full blur-md bg-[#00FFFF] opacity-0 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
      ></div>

      {/* Dynamic Border Glow on Hover */}
      <div className={`absolute inset-0 rounded-lg pointer-events-none transition-all duration-300 ${isHovered ? 'animate-border-pulse' : ''}`}></div>
      
      {/* Main Card Content */}
      <div className={`
          relative z-10 card-style-default rounded-lg p-4 w-full h-full backdrop-blur-md transition-all duration-300 text-center flex flex-col items-center justify-between
          ${isHovered ? 'card-style-hover' : ''}
        `}
      >
        <div ref={contentRef} className="w-full flex flex-col items-center justify-between h-full">
          <div className="flex flex-col items-center w-full">
            <div className={`flex justify-center md:justify-start gap-1 mb-1 ${isHovered ? 'animate-star-pulse' : ''}`}>
              <StarRating rating={review.rating} hover={isHovered} />
            </div>
            {/* The primary change is here: text-gray-200 for better visibility */}
            <p className={`text-xs italic mb-2 mt-1 transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-200'}`}>"{review.text}"</p>
            
            {/* AI-Powered Keywords */}
            <div className="flex flex-wrap justify-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {review.keywords && review.keywords.map((keyword, i) => (
                <span key={i} className="text-[10px] px-1 py-0.5 rounded-full bg-white/10 text-gray-300">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col items-center w-full mt-auto">
            {/* The primary change is here: text-white for better visibility */}
            <h4 className={`font-semibold text-sm transition-colors duration-300 ${isHovered ? 'text-white' : 'text-white'}`}>{review.name}</h4>
            
            {isLoggedIn && (
              <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* Upvote Button */}
                <button
                  onClick={(e) => { e.stopPropagation(); handleVote(review.id, 'up'); }}
                  className={`flex items-center justify-center h-6 w-6 rounded-full transition-colors duration-300 ${votes[review.id] === 'up' ? 'text-green-500 bg-green-500/20' : 'text-gray-400 hover:text-green-500 hover:bg-white/10'}`}
                >
                  <ThumbsUp size={12} />
                </button>
                {/* Downvote Button */}
                <button
                  onClick={(e) => { e.stopPropagation(); handleVote(review.id, 'down'); }}
                  className={`flex items-center justify-center h-6 w-6 rounded-full transition-colors duration-300 ${votes[review.id] === 'down' ? 'text-red-500 bg-red-500/20' : 'text-gray-400 hover:text-red-500 hover:bg-white/10'}`}
                >
                  <ThumbsDown size={12} />
                </button>
                {/* Copy Content Button */}
                <button
                  onClick={handleCopy}
                  className="flex items-center justify-center h-6 w-6 text-xs font-semibold rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors relative"
                >
                  <span className={`transition-opacity duration-300 ${isCopied ? 'opacity-0' : 'opacity-100'}`}>
                    <Copy size={12} />
                  </span>
                  <span className={`absolute inset-0 flex items-center justify-center text-[8px] transition-opacity duration-300 ${isCopied ? 'opacity-100' : 'opacity-0'}`}>
                    Copied!
                  </span>
                </button>
                {/* Report Review Button */}
                <button
                  onClick={(e) => { e.stopPropagation(); handleReport(review.id); }}
                  className="flex items-center justify-center h-6 w-6 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <Flag size={12} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <MobileReviewCard />
  );
};

// Main Customer Reviews Component
const CustomerReviews = () => {
  const { ref, inView } = useInView({ threshold: 0.2 });
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Example state for user authentication
  const [votes, setVotes] = useState({}); // To track votes
  const marqueeRef1 = useRef(null);
  const marqueeRef2 = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.matchMedia('(min-width: 768px)').matches);
    };
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  const handleVote = (id, type) => {
    setVotes(prevVotes => ({
      ...prevVotes,
      [id]: prevVotes[id] === type ? null : type
    }));
  };

  const handleReport = (id) => {
    console.log(`Review with ID ${id} has been reported.`);
    alert('Review reported. Thank you for your feedback.');
  };

  useEffect(() => {
    if (!isDesktop) return; // Only run marquee on desktop

    const pauseMarquee = (e) => {
      const marquee = e.currentTarget.querySelector('.marquee-left, .marquee-right');
      if (marquee) {
        gsap.to(marquee, { animationPlayState: 'paused', duration: 0.2 });
      }
    };

    const resumeMarquee = (e) => {
      const marquee = e.currentTarget.querySelector('.marquee-left, .marquee-right');
      if (marquee) {
        gsap.to(marquee, { animationPlayState: 'running', duration: 0.2 });
      }
    };

    const container1 = marqueeRef1.current;
    const container2 = marqueeRef2.current;

    if (container1) {
      container1.addEventListener('mouseenter', pauseMarquee);
      container1.addEventListener('mouseleave', resumeMarquee);
    }
    if (container2) {
      container2.addEventListener('mouseenter', pauseMarquee);
      container2.addEventListener('mouseleave', resumeMarquee);
    }

    return () => {
      if (container1) {
        container1.removeEventListener('mouseenter', pauseMarquee);
        container1.removeEventListener('mouseleave', resumeMarquee);
      }
      if (container2) {
        container2.removeEventListener('mouseenter', pauseMarquee);
        container2.removeEventListener('mouseleave', resumeMarquee);
      }
    };
  }, [isDesktop]);

  const reviews = [
    {
      id: 1,
      name: "Erik Christy",
      rating: 5,
      text: "Big Bear Vans built an amazing custom campervan for me. They have a really nice team to work with, and I was able to really work closely with them on getting exactly what I wanted in my design. I am a remote worker, so I wanted to have an office space as well as a beefy electrical system, a full kitchen, a shower, and a bed area. I've gotten so many compliments on my buildout and couldn't be happier with how it turned out. Highly recommend Big Bear Vans if you're looking to buy a camper van.",
      keywords: ["custom campervan", "remote worker", "electrical system", "full kitchen"]
    },
    {
      id: 2,
      name: "Danora Ramsey",
      rating: 5,
      text: "Big Bear Vans did a full conversion for my MB Sprinter, and I could not be happier! I had very specific requests, and they met all of my requests and are truly a completely customizable conversion company. I went to about three different conversion companies, and I was only given certain planned layouts and certain colors. Not at Big Bear Vans, they accommodated my every wish. I came back for a couple of upgrades, and they gladly accommodated me. I highly suggest Big Bear Vans for your conversion!",
      keywords: ["full conversion", "MB Sprinter", "customizable", "knowledgeable"]
    },
    {
      id: 3,
      name: "Aleksandr Penkin",
      rating: 4,
      text: "They built my Mercedes Sprinter. These guys did amazing work! I'm so in love with my van, and for sure I'll recommend it to everyone! I only used to come once, as I accidentally broke my Maxx Air fan, and they replaced it for me. Thanks to these amazing builders. I will come soon as they move to the new shop!",
      keywords: ["Mercedes Sprinter", "amazing work", "recommend", "builders"]
    },
    {
      id: 4,
      name: "Jessica P.",
      rating: 5,
      text: "The attention to detail and material selection advice was invaluable. The final parts exceeded our expectations.",
      keywords: ["attention to detail", "material selection", "exceeded expectations"]
    },
    {
      id: 5,
      name: "Chris B.",
      rating: 5,
      text: "Seamless integration from CAD file to delivered part. A truly professional and reliable service.",
      keywords: ["seamless integration", "professional", "reliable service"]
    },
    {
      id: 6,
      name: "Maria G.",
      rating: 5,
      text: "They handled our complex custom parts with ease. The fast delivery was a huge bonus for our project timeline.",
      keywords: ["complex custom parts", "fast delivery", "project timeline"]
    },
  ];

  const fullReviews = [...reviews, ...reviews, ...reviews];

  return (
    <>
      <style jsx global>{`
        .animated-gradient-text-customers {
          background-image: linear-gradient(90deg, #5733FF, #140AFF, #00FFFF, #5733FF);
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: text-gradient-animation 3s ease-in-out infinite;
        }

        @keyframes text-gradient-animation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animated-background-gradient-3 {
          background: linear-gradient(135deg, #0D1B2A, #1A2A40, #2C3E50);
          background-size: 400% 400%;
          animation: background-gradient-animation-3 15s ease infinite;
        }

        @keyframes background-gradient-animation-3 {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes marquee-left {
          from { transform: translateX(0%); }
          to { transform: translateX(-50%); }
        }
        .marquee-left {
          animation: marquee-left 40s linear infinite;
        }

        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0%); }
        }
        .marquee-right {
          animation: marquee-right 40s linear infinite;
        }

        .fade-edges {
          -webkit-mask-image: linear-gradient(to right, transparent 5%, white 20%, white 80%, transparent 95%);
          mask-image: linear-gradient(to right, transparent 5%, white 20%, white 80%, transparent 95%);
        }

        .card-style-default {
          background-color: #1B1B2A;
          border-width: 1px;
          border-style: solid;
          border-color: #33334F;
          border-radius: 0.5rem; /* rounded-lg */
          padding: 1rem; /* p-4 */
        }
        
        .card-style-hover {
          background-color: #3C4477;
          border-width: 3px;
          border-style: solid;
          border-image: linear-gradient(to right, #534BFF, #00FFFF, #534BFF) 1;
        }

        /* New Effects */
        @keyframes glint {
          from { transform: translateX(-100%); }
          to { transform: translateX(200%); }
        }
        .animate-glint {
          animation: glint 3s linear infinite;
          animation-play-state: running;
        }
        .marquee-container:hover .animate-glint {
          animation-play-state: paused;
        }

        @keyframes border-pulse {
          0%, 100% {
            box-shadow: 0 0 8px rgba(0, 255, 255, 0.4);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 15px rgba(0, 255, 255, 0.8), 0 0 20px rgba(83, 75, 255, 0.6);
            transform: scale(1.02);
          }
        }
        .animate-border-pulse {
          animation: border-pulse 1.5s ease-in-out infinite;
        }

        @keyframes star-pulse-animation {
          0%, 100% {
            transform: scale(1);
            filter: brightness(1);
          }
          50% {
            transform: scale(1.1);
            filter: brightness(1.5);
          }
        }
        .animate-star-pulse svg {
          animation: star-pulse-animation 1s ease-in-out infinite;
        }
        .animate-star-pulse svg:nth-child(2) { animation-delay: 0.1s; }
        .animate-star-pulse svg:nth-child(3) { animation-delay: 0.2s; }
        .animate-star-pulse svg:nth-child(4) { animation-delay: 0.3s; }
        .animate-star-pulse svg:nth-child(5) { animation-delay: 0.4s; }
      `}</style>
      <section 
        id="customer-reviews" 
        className="relative w-full text-white py-16 md:py-24"
      >
        <div className="absolute inset-0 animated-background-gradient-3 z-0" />
        <div
          className="absolute inset-0 z-10 opacity-10"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000%2Fsvg\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 6V5zM6 5v1H5z\'/%3E%3C/g%3E%3C/svg%3E")',
          }}
        />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            See Why Our <span className="animated-gradient-text-customers">Customers Love Us</span>
          </h2>
        </div>

        {/* Desktop Layout - Conditionally rendered */}
        {isDesktop && (
          <div className="relative z-10 mt-12 py-8 overflow-hidden">
            {/* First Row of Reviews (moving left) */}
            <div className="relative flex overflow-hidden mt-8 md:mt-12 fade-edges marquee-container" ref={marqueeRef1}>
              <div className="flex space-x-8 marquee-left">
                {fullReviews.map((review, index) => (
                  <ReviewCard 
                    key={index} 
                    review={review} 
                    index={index} 
                    handleVote={handleVote} 
                    votes={votes}
                    isLoggedIn={isLoggedIn}
                    handleReport={handleReport}
                  />
                ))}
              </div>
            </div>

            {/* Second Row of Reviews (moving right) */}
            <div className="relative flex overflow-hidden mt-8 md:mt-12 py-8 overflow-hidden fade-edges marquee-container" ref={marqueeRef2}>
              <div className="flex space-x-8 marquee-right">
                {fullReviews.map((review, index) => (
                  <ReviewCard 
                    key={index} 
                    review={review} 
                    index={index} 
                    handleVote={handleVote} 
                    votes={votes}
                    isLoggedIn={isLoggedIn}
                    handleReport={handleReport}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Layout - Conditionally rendered */}
        {!isDesktop && (
          <div className="relative z-10 mt-12 px-4 space-y-8">
            {reviews.map((review, index) => (
              <div key={index} className="relative w-full p-6 bg-[#1B1B2A] rounded-lg shadow-xl text-center">
                <div className="flex flex-col items-center w-full">
                  <StarRating rating={review.rating} hover={true} />
                  <p className="text-xs italic mb-2 mt-2 text-gray-200">"{review.text}"</p>
                  <div className="flex flex-wrap justify-center gap-1 mt-1">
                    {review.keywords && review.keywords.map((keyword, i) => (
                      <span key={i} className="text-[10px] px-1 py-0.5 rounded-full bg-white/10 text-gray-300">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                <h4 className="font-semibold text-sm mt-4 text-white">{review.name}</h4>
                {isLoggedIn && (
                  <div className="flex gap-2 mt-4 justify-center">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleVote(review.id, 'up'); }}
                      className={`flex items-center justify-center h-6 w-6 rounded-full transition-colors duration-300 ${votes[review.id] === 'up' ? 'text-green-500 bg-green-500/20' : 'text-gray-400 hover:text-green-500'}`}
                    >
                      <ThumbsUp size={12} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleVote(review.id, 'down'); }}
                      className={`flex items-center justify-center h-6 w-6 rounded-full transition-colors duration-300 ${votes[review.id] === 'down' ? 'text-red-500 bg-red-500/20' : 'text-gray-400 hover:text-red-500'}`}
                    >
                      <ThumbsDown size={12} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleCopy(e); }}
                      className="flex items-center justify-center h-6 w-6 text-xs font-semibold rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                    >
                      <Copy size={12} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleReport(review.id); }}
                      className="flex items-center justify-center h-6 w-6 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                    >
                      <Flag size={12} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default CustomerReviews;