import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, XCircle } from 'lucide-react';
import { createRoot } from 'react-dom/client';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState(null); // 'success' or 'error'
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus(null);
    console.log('Form submitted:', formData);

    // Simulate API call
    setTimeout(() => {
      // In a real application, you would handle the response from the server
      const isSuccess = Math.random() > 0.2; // 80% chance of success
      if (isSuccess) {
        setFormStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: '',
        });
      } else {
        setFormStatus('error');
      }
    }, 1000);
  };

  return (
    <div className="bg-white text-gray-800 font-inter antialiased">
      {/* Header Section */}
      <header className="absolute top-0 left-0 right-0 z-10 p-6 flex justify-between items-center text-white">
        <h1 className="text-xl font-bold">BIG BEAR VANS</h1>
        <nav className="hidden md:flex space-x-6 text-sm font-semibold">
          <a href="#" className="hover:text-amber-400 transition-colors">Home</a>
          <a href="#" className="hover:text-amber-400 transition-colors">About</a>
          <a href="#" className="hover:text-amber-400 transition-colors">Services</a>
          <a href="#" className="hover:text-amber-400 transition-colors">Contact</a>
          <a href="#" className="hover:text-amber-400 transition-colors">Testimonials</a>
        </nav>
        <button className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center text-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
        <img
          src="https://placehold.co/1920x1080/000000/FFFFFF?text=Contact+Background"
          alt="Van interior"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
          style={{ filter: 'brightness(0.5)' }}
        />
        <div className="relative z-10 p-8 md:p-12 space-y-4 rounded-lg">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">Contact Us</h2>
          <p className="text-white max-w-2xl mx-auto text-sm md:text-base">
            Contact us today for a free consultation. We are experts in custom van conversions, specializing in personalized solutions for adventurers, digital nomads, and families.
          </p>
          <div className="flex justify-center space-x-4 mt-6">
            <button className="bg-amber-400 text-gray-900 px-6 py-3 rounded-full font-bold shadow-lg hover:bg-amber-500 transition-colors">
              Call Us
            </button>
            <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-bold shadow-lg hover:bg-gray-200 transition-colors">
              Email Us
            </button>
          </div>
        </div>
      </section>

      {/* Consultation Section */}
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Schedule a Free Consultation Call</h3>
            <p className="text-gray-600">
              Pick a date & time that works for you.
            </p>
          </div>
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8 border-t-8 border-t-indigo-600">
            {/* Left side: Content */}
            <div className="md:w-1/2 flex-grow">
              <div className="flex items-start space-x-4">
                <span className="text-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
                </span>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">B&B Van Conversions</h4>
                  <p className="text-gray-600 text-sm">Free consultation call</p>
                </div>
              </div>
              <ul className="mt-6 space-y-4 text-gray-600 text-sm list-inside">
                <li className="flex items-center space-x-2">
                  <span className="text-amber-400">
                    <CheckCircle className="w-5 h-5" />
                  </span>
                  <span>Free, no-obligation consultation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-amber-400">
                    <CheckCircle className="w-5 h-5" />
                  </span>
                  <span>Speak with our conversion experts</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-amber-400">
                    <CheckCircle className="w-5 h-5" />
                  </span>
                  <span>Discuss your unique vision & project details</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-amber-400">
                    <CheckCircle className="w-5 h-5" />
                  </span>
                  <span>Get your questions answered</span>
                </li>
              </ul>
              <div className="mt-6 border-t pt-4 text-gray-600 text-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>530-555-0100</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>contact@bigbearvans.com</span>
                </div>
              </div>
            </div>
            {/* Right side: Calendar (Placeholder) */}
            <div className="md:w-1/2 bg-gray-50 rounded-xl p-6 border border-gray-200">
              <p className="text-center font-bold text-gray-900 mb-4">Select a Date & Time</p>
              <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500">
                {daysOfWeek.map((day, index) => (
                  <span key={index} className="font-bold">{day}</span>
                ))}
                {Array.from({ length: 30 }).map((_, index) => (
                  <span key={index} className="p-2 cursor-pointer rounded-full hover:bg-indigo-100 hover:text-indigo-600">
                    {index + 1}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-16 md:py-24 bg-indigo-600 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-3xl text-center z-10 relative">
          <h3 className="text-3xl md:text-4xl font-extrabold mb-2">Contact Us For a Custom Quote</h3>
          <p className="text-indigo-100 mb-8">
            Please fill out the form below to get an estimated quote for your custom van conversion.
          </p>
          <div className="bg-white text-gray-900 rounded-3xl shadow-xl p-8 md:p-12 relative">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <textarea
                name="message"
                placeholder="Message/Project Details"
                rows="4"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>

              {formStatus === 'success' && (
                <div className="flex items-center text-green-600 bg-green-50 p-3 rounded-lg">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>Thank you! Your message has been sent.</span>
                </div>
              )}
              {formStatus === 'error' && (
                <div className="flex items-center text-red-600 bg-red-50 p-3 rounded-lg">
                  <XCircle className="w-5 h-5 mr-2" />
                  <span>Oops! Something went wrong. Please try again.</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center md:space-x-12">
            <div className="md:w-1/2 mb-8 md:mb-0 space-y-4">
              <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                Our Van Conversion Shop in <span className="text-indigo-600">Big Bear City</span>
              </h3>
              <p className="text-gray-600">
                Come visit our shop to discuss your project in person and see some of our finished vans.
              </p>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                  <span>543 Van Conversion Dr.</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span>Big Bear City, CA 92314</span>
                </p>
              </div>
              <p className="text-gray-600">
                <strong>Hours:</strong> Mon - Fri: 9am - 5pm, Sat: 10am - 3pm, Sun: Closed
              </p>
            </div>
            <div className="md:w-1/2 w-full">
              <div className="bg-gray-200 rounded-xl overflow-hidden shadow-lg h-64 md:h-80">
                <img
                  src="https://placehold.co/800x600/e5e7eb/6b7280?text=Map+Location"
                  alt="Map location"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h3 className="text-3xl md:text-4xl font-extrabold mb-8">Our Work</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              <img
                src="https://placehold.co/600x400/374151/FFFFFF?text=Van+Interior"
                alt="Van 1"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              <img
                src="https://placehold.co/600x400/374151/FFFFFF?text=Van+Exterior"
                alt="Van 2"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              <img
                src="https://placehold.co/600x400/374151/FFFFFF?text=Van+Details"
                alt="Van 3"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default ContactUs;


