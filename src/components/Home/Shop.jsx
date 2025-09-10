"use client"
import React from "react"
import ShapeCard from "../SvgShape/ShapeCard" // 👈 apna reusable ShapeCard import karo

export default function Shop() {

 const dummyVans = [
    {
      slug:"Camper Van Deluxe",
      _id: "1",
       gallery: ["/Shop/1.jpg"],
      van_listing: {
        title: "Camper Van Deluxe",
        description: "A stylish and comfortable van for your next road trip adventure."
      },
      sold: false,
      formatted_price: "$24,999"
    },
    {
      slug: "Adventure Van Pro",
      _id: "2",
       gallery: ["/Shop/2.jpg"],
      van_listing: {
        title: "Adventure Van Pro",
        description: "Fully equipped adventure van with modern interiors and durability."
      },
      sold: true,
      formatted_price: "$19,499"
    },
    {
      slug : "Classic Retro Van",
      _id: "3",
   gallery: ["/Shop/3.jpg"],
      van_listing: {
        title: "Classic Retro Van",
        description: "Vintage styled van with modern comfort and great performance."
      },
      sold: false,
      formatted_price: "$14,999"
    },
      {
        slug: "Classic Retro Van",
      _id: "4",
    gallery: ["/Shop/4.jpg"],
      van_listing: {
        title: "Classic Retro Van",
        description: "Vintage styled van with modern comfort and great performance."
      },
      sold: false,
      formatted_price: "$14,999"
    }
  ];



  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-start text-white px-4 py-10 md:py-16 lg:py-20">

      {/* Heading + Text */}
      <div className="text-center max-w-3xl mb-10 md:mb-16 lg:mb-20 px-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
         Shop
        </h1>
        <p className="text-base md:text-lg lg:text-xl leading-relaxed text-blue-100">
        Tired of wasting hours hunting for high-quality van accessories? Big Bear Vans is your one-stop shop. Need a rooftop hammock, awning windows for van conversion, or a rooftop tent for extra space? We’re here to help. Shop all of your campervan accessories from Big Bear Vans today.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="w-full max-w-3xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-x-6 md:gap-x-8 place-items-center ">
{dummyVans?.slice(0, 4).map((item, i) => (
  <ShapeCard
    key={i}
    shape={i % 4 < 2 ? "shopBottomCard" : "shopTopCard"} // 0,1 -> Top | 2,3 -> Bottom
    color="#2194f6"

  >
    <img
      src={item.gallery[0] || "/images/van-sample.jpg"}
      alt={item.van_listing?.title}
      className="w-full h-full object-cover rounded-xl"
    />
  </ShapeCard>
))}



        </div>

        {/* Explore Button */}
        <div className="text-center mt-10">
          <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-8 md:py-4 md:px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-lg md:text-xl">
            Buy Campervan Accessories
          </button>
        </div>
      </div>
    </div>
  )
}
