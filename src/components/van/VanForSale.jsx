"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import InvertedCurvedSeparator from "../Home/CurvedSeparator"
import InvertedCurvedSeparator2 from "../Home/CurvedSeparator2"
import ShapeCard from '../SvgShape/ShapeCard';

export default function VanForSale({ data }) {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState(null);

  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">No vans available at the moment.</p>
      </div>
    );
  }

  const unsoldVans = data?.filter((van) => !van.sold);
  const soldVans = data?.filter((van) => van.sold);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/vanForSalebg.jpg')" }}>
        <div className="absolute inset-0  bg-opacity-50 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">Camper Vans For Sale at Big Bear Vans</h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-6 max-w-2xl">
            Explore our range of custom-built camper vans designed for adventure, comfort, and unforgettable journeys on the open road.
          </p>
          <Link href="/van-for-sale">
            <button className=" text-white font-semibold px-8 py-3 rounded-full transition-colors">
              Explore Vans
            </button>
          </Link>
        </div>
      </div>
<InvertedCurvedSeparator/>
      {/* Available Vans */}
    {/* Available Vans */}
<div className="max-w-7xl bg-white mx-auto px-6 py-20 text-center">
  <h2 className="text-3xl font-bold text-green-700 mb-4">Available Vans</h2>
  <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
    Check out our currently available camper vans ready for your next adventure.
  </p>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 justify-items-center">
    {unsoldVans.map((van, idx) => {
      const vehicle = van.vehicle_listing;
      const isHovered = hoveredCard === idx;

      return (
        <ShapeCard
  shape="customRectMirror"
  key={van.slug}
  className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 cursor-pointer w-full max-w-sm"
  onMouseEnter={() => setHoveredCard(idx)}
  onMouseLeave={() => setHoveredCard(null)}
  onClick={() => router.push(`/van-for-sale/${van.slug}`)}
>
  {/* Image Container */}
  <div className="relative w-full h-72 sm:h-80 overflow-hidden rounded-t-2xl">
    <img
      src={van.gallery?.[0] || '/images/default.jpg'}
      alt={vehicle?.title || 'Van Image'}
      className="w-full h-full object-cover object-center transition-transform duration-700"
    />

    {/* Overlay on Hover for unsold vans */}
    {isHovered && !van.sold && (
      <div className="absolute inset-0 bg-blue-900 bg-opacity-70 flex items-center justify-center transition-opacity duration-300">
        <Link
          href={`/van-for-sale/${van.slug}`}
          className="bg-white text-blue-900 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
        >
          Quick View
        </Link>
      </div>
    )}

    {/* SOLD Tag */}
    {van.sold && (
      <div className="absolute top-3 left-3 px-2 py-1 bg-red-600 text-white font-bold rounded z-20 text-sm">
        SOLD
      </div>
    )}

    {/* FOR SALE Tag for unsold vans */}
    {!van.sold && (
      <div className="absolute top-3 left-3 px-2 py-1 bg-green-600 text-white font-bold rounded z-20 text-sm">
        FOR SALE
      </div>
    )}
  </div>

  {/* Content Section */}
  <div className="p-4">
    <h2 className="text-lg font-bold text-blue-900 mb-1">
      {vehicle?.title || 'Untitled Van'}
    </h2>
    <p className="text-gray-600 mb-3 line-clamp-2">
      {vehicle?.description || 'No description available.'}
    </p>

    {/* View Details button for unsold vans */}
    {!van.sold && (
      <Link
        href={`/van-for-sale/${van.slug}`}
        className="block w-full bg-black text-white text-center py-2 rounded-lg font-medium transition-colors"
      >
        View Details
      </Link>
    )}
  </div>
</ShapeCard>

      );
    })}
  </div>
</div>


      {/* Sold Vans */}
   {/* Sold Vans */}
<InvertedCurvedSeparator2/>
{soldVans.length > 0 && (
  <div className="max-w-7xl mx-auto px-6 py-20 text-center ">
    <h2 className="text-3xl font-bold text-red-700 mb-4">Sold Vans</h2>
    <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
      These vans have already found their new owners. See what makes them so special!
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center opacity-70">
      {soldVans.map((van, idx) => {
        const vehicle = van.vehicle_listing;
        const isHovered = hoveredCard === idx;

        return (
          <ShapeCard
            shape="shopTopCard"
            key={van.slug}
            className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 w-full max-w-sm cursor-not-allowed"
            // ❌ onClick hata diya (disable)
            onMouseEnter={() => setHoveredCard(idx)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Image Container with fixed height and object-cover */}
            <div className="relative w-full h-72 sm:h-80 overflow-hidden rounded-t-2xl">
              <img
                src={van.gallery?.[0] || "/images/default.jpg"}
                alt={vehicle?.title}
                className="w-full h-full object-cover object-center transition-transform duration-700"
              />
              {/* SOLD Badge */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-extrabold text-red-600 transform rotate-[-20deg] opacity-80">
                  SOLD
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h2 className="text-lg font-bold text-blue-900 mb-1">
                {vehicle?.title}
              </h2>
              {vehicle?.description && (
                <p className="text-gray-600 mb-3 line-clamp-2">
                  {vehicle.description}
                </p>
              )}
            </div>
          </ShapeCard>
        );
      })}
    </div>
  </div>
)}

    </div>
  );
}
