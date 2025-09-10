"use client"
import React, { useState } from "react";
import Link from "next/link";

// SVG Icons
const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
  // console.log(van,"van")

  if (!van) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold text-blue-900 mb-4">Van Not Found</h1>
          <p className="text-gray-600 mb-6">The van you're looking for doesn't exist or has been moved.</p>
          <Link
            href="/van-for-sale"
            className="inline-flex items-center bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors"
          >
            <ArrowLeftIcon />
            <span className="ml-2">Back to All Vans</span>
          </Link>
        </div>
      </div>
    );
  }

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all"
          >
            <XMarkIcon />
          </button>

          <button
            onClick={() => navigateImage("prev")}
            className="absolute left-4 text-white p-3 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all"
          >
            <ChevronLeftIcon />
          </button>

          <button
            onClick={() => navigateImage("next")}
            className="absolute right-4 text-white p-3 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all"
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

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/vans"
            className="inline-flex items-center text-blue-700 font-medium hover:text-blue-900 transition-colors group"
          >
            <ChevronLeftIcon />
            <span className="ml-1 group-hover:ml-2 transition-all">Back to All Vans</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="mb-12 rounded-2xl overflow-hidden shadow-xl">
          <img
            src={van.gallery?.[0]}
            alt={van.van_listing?.title}
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Title & Description */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
            {van.van_listing?.title}
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {van.van_listing?.description}
          </p>
          {van.sold && (
            <p className="mt-4 text-red-600 font-semibold text-lg">(This van has been sold)</p>
          )}
        </div>

        {/* Gallery Section */}
        {van.gallery && van.gallery.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {van.gallery.map((img, index) => (
                <div
                  key={index}
                  className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={img}
                      alt={`${van.van_listing?.title} ${index + 1}`}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Features */}
        {van.detailed_features && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Features & Amenities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {van.detailed_features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md border border-blue-100"
                >
                  <h3 className="font-semibold text-lg text-blue-800 mb-4 pb-2 border-b border-blue-100">
                    {feature.category}
                  </h3>
                  <ul className="space-y-2">
                    {feature.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <div className="bg-blue-100 rounded-full p-1 mt-0.5 mr-3 flex-shrink-0">
                          <svg
                            className="w-4 h-4 text-blue-700"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
