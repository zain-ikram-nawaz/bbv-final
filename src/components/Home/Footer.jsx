import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
   <footer
  className="w-full bg-black text-white pt-16 pb-8 relative"
  style={{
    backgroundImage: "url('/images/footer.jpg')", // apni image ka path yaha do
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Overlay for readability */}
  <div className="absolute inset-0 bg-black/70"></div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    {/* Main Footer Content */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {/* Brand Section */}
      <div>
       <Image src={"/images/bbv-logo.png"} width={200} height={200} alt='logo'></Image>
        <p className="text-gray-300 mb-6">
          Wherever the road leads you is your home. Our custom Transit or Sprinter camper vans are designed to make every journey memorable.
        </p>

        {/* Contact Info */}
        <div className="space-y-3">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-purple-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
            <div>
              <p className="text-gray-300">+1 (951) 441-9748</p>
              <p className="text-gray-300">+1 (951) 441-9719</p>
            </div>
          </div>

          <div className="flex items-center">
            <svg className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <p className="text-gray-300">info@bigbearvans.com</p>
          </div>

          <div className="flex items-start">
            <svg className="w-5 h-5 text-purple-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <p className="text-gray-300">320 W Big Bear Blvd, Big Bear City, California, 92314, USA</p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="text-lg font-semibold mb-6 relative inline-block pb-2">
          Quick Links
          <span className="absolute left-0 bottom-0 w-1/2 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"></span>
        </h4>
        <ul className="space-y-3">
          {['Home', 'About Us', 'Vans For Sale', 'Portfolio', 'Layouts', '3D Van Builder', 'Process'].map((item) => (
            <li key={item}>
              <a
                href="#"
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300 flex items-center group"
              >
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Business Hours + Social */}
      <div>
        <h4 className="text-lg font-semibold mb-6 relative inline-block pb-2">
          Business Hours
          <span className="absolute left-0 bottom-0 w-1/2 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"></span>
        </h4>
        <div className="mb-6">
          <p className="text-gray-300 mb-2">
            <span className="font-medium text-white">Monday – Saturday:</span> 9 AM – 6 PM
          </p>
          <p className="text-gray-300">
            <span className="font-medium text-white">Sunday:</span> By Appointment
          </p>
        </div>

        {/* Social Media Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 relative inline-block pb-2">
            Follow Us
            <span className="absolute left-0 bottom-0 w-1/2 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"></span>
          </h4>
          <div className="flex space-x-4">
            {/* Example Social */}
            <a href="#" className="bg-gray-800 hover:bg-purple-600 transition-all duration-300 p-3 rounded-full">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* Copyright */}
    <div className="pt-8 border-t border-gray-700 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Big Bear Vans. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-gray-400 hover:text-purple-400 text-sm transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  </div>
</footer>

  );
};

export default Footer;