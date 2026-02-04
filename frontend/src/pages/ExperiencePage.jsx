import React, { useState } from 'react';
import { Calendar, MapPin, ChevronDown, ChevronUp, Building2, CheckCircle } from 'lucide-react';
import { experiences } from '../data/mock';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

const ExperiencePage = () => {
  const [expandedCards, setExpandedCards] = useState({});

  const toggleCard = (id) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-blue-600/20 border border-blue-600/30 rounded-full mb-6">
              <span className="text-blue-400 text-sm font-medium">Professional Journey</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Experience</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A comprehensive overview of my professional journey in Human Resources, 
              showcasing achievements, responsibilities, and career growth.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-600 via-purple-600 to-blue-600 hidden md:block"></div>
            
            {/* Experience Cards */}
            <div className="space-y-8">
              {experiences.map((exp, index) => {
                const isExpanded = expandedCards[exp.id];
                const isEven = index % 2 === 0;
                
                return (
                  <div key={exp.id} className="relative">
                    {/* Timeline Dot */}
                    <div className="absolute left-6 w-5 h-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-black hidden md:block z-10"></div>
                    
                    {/* Card Container */}
                    <div className={`md:ml-20 ${isEven ? 'md:mr-20' : 'md:ml-32'}`}>
                      <Card className={`bg-white/10 backdrop-blur-sm border-white/20 p-8 hover:bg-white/15 transition-all duration-500 ${
                        isExpanded ? 'shadow-2xl scale-105' : 'hover:scale-102'
                      }`}>
                        {/* Card Header */}
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex-1">
                            <div className="flex items-center mb-3">
                              <Building2 className="text-blue-400 mr-3" size={24} />
                              <span className="text-blue-400 font-semibold text-lg">{exp.company}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">
                              {exp.title}
                            </h3>
                            <div className="flex flex-wrap gap-4 text-gray-300 text-sm">
                              <div className="flex items-center">
                                <Calendar className="mr-2" size={16} />
                                {exp.period}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="mr-2" size={16} />
                                {exp.location}
                              </div>
                            </div>
                          </div>
                          
                          {/* Expand Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleCard(exp.id)}
                            className="text-white hover:text-blue-400 hover:bg-white/10"
                          >
                            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </Button>
                        </div>

                        {/* Achievements - Show first 2 by default, all when expanded */}
                        <div className="space-y-3">
                          <h4 className="text-white font-semibold mb-4 flex items-center">
                            <CheckCircle className="text-green-400 mr-2" size={20} />
                            Key Achievements
                          </h4>
                          
                          {exp.achievements
                            .slice(0, isExpanded ? exp.achievements.length : 2)
                            .map((achievement, idx) => (
                              <div key={idx} className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-3 flex-shrink-0"></div>
                                <p className="text-gray-200 leading-relaxed">{achievement}</p>
                              </div>
                            ))
                          }
                          
                          {/* Show more indicator */}
                          {!isExpanded && exp.achievements.length > 2 && (
                            <div className="pt-3">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleCard(exp.id)}
                                className="text-blue-400 hover:text-white hover:bg-white/10 font-medium"
                              >
                                +{exp.achievements.length - 2} more achievements
                              </Button>
                            </div>
                          )}
                        </div>
                      </Card>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-white/20 p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Bring This Experience to Your Team?
              </h3>
              <p className="text-gray-300 mb-6">
                Let's discuss how my HR expertise can contribute to your organization's success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                  Schedule a Call
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white hover:text-black px-8 py-3"
                >
                  View My Skills
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperiencePage;