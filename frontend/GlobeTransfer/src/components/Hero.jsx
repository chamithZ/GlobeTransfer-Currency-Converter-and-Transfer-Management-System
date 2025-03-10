import React from 'react';

export default function HeroSection({ onShowConverter }) {
  return (
    <div className="w-full bg-blue-50 py-12 px-6 md:py-16 text-center">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          <span className="block">Send Money Globally</span>
          <span className="block text-blue-600">Fast, Secure, Affordable</span>
        </h1>
        
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Transfer money to over 150 countries with competitive exchange rates and low fees. 
          Globe Transfer is trusted by millions of customers worldwide.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-10">
          <button
            onClick={onShowConverter}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:bg-blue-700 transition duration-300"
          >
            Start a Transfer
          </button>
          
          <button className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:bg-gray-50 transition duration-300">
            Learn More
          </button>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8">
          <div className="bg-white px-4 py-2 rounded-lg shadow-md">
            <p className="text-blue-600 font-bold">150+</p>
            <p className="text-sm text-gray-600">Countries</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-md">
            <p className="text-blue-600 font-bold">10M+</p>
            <p className="text-sm text-gray-600">Customers</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-md">
            <p className="text-blue-600 font-bold">$0 Fee</p>
            <p className="text-sm text-gray-600">First Transfer</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-md">
            <p className="text-blue-600 font-bold">24/7</p>
            <p className="text-sm text-gray-600">Support</p>
          </div>
        </div>
      </div>
    </div>
  );
}