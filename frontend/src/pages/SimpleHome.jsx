import React from 'react';
import { personalInfo } from '../data/mock';

const SimpleHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-20">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-4">
            {personalInfo.name}
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            {personalInfo.title}
          </p>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {personalInfo.summary}
          </p>
        </div>
        
        <div className="mt-12 text-center">
          <img
            src={personalInfo.profileImage}
            alt={personalInfo.name}
            className="w-64 h-80 object-cover rounded-2xl mx-auto shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default SimpleHome;