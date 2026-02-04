import React from 'react';
import { skills, languages } from '../data/mock';

const SkillsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-20">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Competencies</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive overview of my professional skills and expertise.
          </p>
        </div>

        {/* Professional Skills */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Professional Skills</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {skills.professional.map((skill, index) => (
              <div key={index} className="flex items-center p-4 bg-white/5 rounded-lg">
                <span className="text-gray-200">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Skills */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Technical Skills</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {skills.technical.map((skill, index) => (
              <div key={index} className="flex items-center p-4 bg-white/5 rounded-lg">
                <span className="text-gray-200">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Technology Stack</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {skills.technology.map((skill, index) => (
              <div key={index} className="flex items-center p-4 bg-white/5 rounded-lg">
                <span className="text-gray-200">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Languages</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {languages.map((lang, index) => (
              <div key={index} className="text-center p-6 bg-white/5 rounded-xl">
                <h4 className="text-xl font-bold text-white mb-2">{lang.language}</h4>
                <span className="text-blue-400">{lang.level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;