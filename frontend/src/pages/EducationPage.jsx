import React, { useState } from 'react';
import { GraduationCap, Award, Calendar, MapPin, Star, Trophy, BookOpen, Users } from 'lucide-react';
import { education, certifications, organizationalExperience } from '../data/mock';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

const EducationPage = () => {
  const [activeTab, setActiveTab] = useState('education');

  const tabs = [
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'organizations', label: 'Organizations', icon: Users }
  ];

  const getCertificationTypeColor = (type) => {
    const colorMap = {
      'Professional Certification': 'from-blue-600 to-blue-400',
      'Training Program': 'from-purple-600 to-purple-400',
      'Online Bootcamp': 'from-green-600 to-green-400',
      'Technical Training': 'from-orange-600 to-orange-400',
      'Language Proficiency': 'from-pink-600 to-pink-400',
      'Technical Certification': 'from-red-600 to-red-400'
    };
    return colorMap[type] || 'from-gray-600 to-gray-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-green-600/20 border border-green-600/30 rounded-full mb-6">
              <span className="text-green-400 text-sm font-medium">Academic & Professional Development</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Certifications</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              My academic foundation and continuous professional development through 
              certifications, training programs, and organizational leadership.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map(({ id, label, icon: Icon }) => {
              const isActive = activeTab === id;
              return (
                <Button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  variant={isActive ? 'default' : 'outline'}
                  className={`px-8 py-4 rounded-xl transition-all duration-300 text-lg ${
                    isActive
                      ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg'
                      : 'border-white/30 text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="mr-3" size={20} />
                  {label}
                </Button>
              );
            })}
          </div>

          {/* Content Sections */}
          <div className="max-w-6xl mx-auto">
            {/* Education Section */}
            {activeTab === 'education' && (
              <div className="space-y-8">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-8 hover:bg-white/15 transition-all duration-300">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column - Main Info */}
                    <div>
                      <div className="flex items-center mb-6">
                        <div className="p-4 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl mr-4">
                          <GraduationCap className="text-white" size={32} />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-white">{education.degree}</h2>
                          <p className="text-green-400 font-semibold">{education.university}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center text-gray-300">
                          <BookOpen className="mr-3" size={20} />
                          <span>{education.faculty} - {education.major}</span>
                        </div>
                        
                        <div className="flex items-center text-gray-300">
                          <Calendar className="mr-3" size={20} />
                          <span>{education.period}</span>
                        </div>
                        
                        <div className="flex items-center text-gray-300">
                          <MapPin className="mr-3" size={20} />
                          <span>{education.location}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <Trophy className="mr-3 text-yellow-400" size={20} />
                          <span className="text-white font-semibold">GPA: {education.gpa}</span>
                          <Badge className="ml-3 bg-yellow-600/20 text-yellow-300 border-yellow-600/30">
                            Cum Laude
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right Column - Achievements */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <Star className="mr-2 text-yellow-400" size={24} />
                        Academic Achievements
                      </h3>
                      
                      <div className="space-y-4">
                        {education.achievements.map((achievement, index) => (
                          <div key={index} className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
                            <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                            <p className="text-gray-200">{achievement}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Certifications Section */}
            {activeTab === 'certifications' && (
              <div className="grid md:grid-cols-2 gap-6">
                {certifications.map((cert) => {
                  const colorClass = getCertificationTypeColor(cert.type);
                  
                  return (
                    <Card key={cert.id} className="bg-white/10 backdrop-blur-sm border-white/20 p-6 hover:bg-white/15 hover:scale-105 transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 bg-gradient-to-r ${colorClass} rounded-xl`}>
                          <Award className="text-white" size={24} />
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={`bg-gradient-to-r ${colorClass.replace('from-', 'from-').replace('to-', 'to-')}/20 border-white/20`}
                        >
                          {cert.type}
                        </Badge>
                      </div>
                      
                      <h3 className="text-lg font-bold text-white mb-2">
                        {cert.title}
                      </h3>
                      
                      <p className="text-gray-300 font-medium mb-3">
                        {cert.issuer}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-400">
                          <Calendar className="mr-2" size={16} />
                          {cert.date}
                        </div>
                        
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="w-4 h-4 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Organizations Section */}
            {activeTab === 'organizations' && (
              <div className="space-y-8">
                {organizationalExperience.map((org) => (
                  <Card key={org.id} className="bg-white/10 backdrop-blur-sm border-white/20 p-8 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-center mb-6">
                      <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl mr-4">
                        <Users className="text-white" size={32} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{org.title}</h3>
                        <p className="text-purple-400 font-semibold">{org.organization}</p>
                        <div className="flex items-center text-gray-300 mt-2">
                          <Calendar className="mr-2" size={16} />
                          <span>{org.period}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-white font-semibold mb-4 flex items-center">
                        <Trophy className="text-yellow-400 mr-2" size={20} />
                        Leadership Achievements
                      </h4>
                      
                      {org.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg">
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-3 flex-shrink-0"></div>
                          <p className="text-gray-200">{achievement}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Statistics Overview */}
          <div className="mt-16">
            <Card className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border-white/20 p-8">
              <h3 className="text-2xl font-bold text-white text-center mb-8">
                Professional Development Summary
              </h3>
              
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-green-400">4.00</div>
                  <div className="text-gray-300 text-sm">Academic Excellence</div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-blue-400">{certifications.length}</div>
                  <div className="text-gray-300 text-sm">Professional Certifications</div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-purple-400">2+</div>
                  <div className="text-gray-300 text-sm">Years Leadership Experience</div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-yellow-400">3</div>
                  <div className="text-gray-300 text-sm">Languages Proficient</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Card className="bg-gradient-to-r from-green-600/20 to-purple-600/20 border-white/20 p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Continuous Learning & Growth
              </h3>
              <p className="text-gray-300 mb-6">
                My commitment to professional development ensures I stay current with 
                industry trends and best practices. Ready to bring this expertise to your organization.
              </p>
              <Button className="bg-gradient-to-r from-green-600 to-purple-600 hover:from-green-700 hover:to-purple-700 text-white px-8 py-3">
                Discuss Opportunities
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationPage;