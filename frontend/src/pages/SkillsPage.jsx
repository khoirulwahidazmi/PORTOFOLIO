import React, { useState } from 'react';
import { 
  Users, 
  Settings, 
  Monitor, 
  Heart, 
  Brain, 
  Target,
  Star,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';
import { skills, languages } from '../data/mock';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

const SkillsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const skillCategories = [
    { id: 'all', label: 'All Skills', icon: Star },
    { id: 'professional', label: 'Professional', icon: Users },
    { id: 'technical', label: 'Technical', icon: Settings },
    { id: 'technology', label: 'Technology', icon: Monitor },
    { id: 'soft', label: 'Soft Skills', icon: Heart }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-purple-600/20 border border-purple-600/30 rounded-full mb-6">
              <span className="text-purple-400 text-sm font-medium">Professional Expertise</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Competencies</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A comprehensive overview of my professional skills, technical expertise, 
              and personal competencies developed through years of HR experience.
            </p>
          </div>

          {/* Skill Categories Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {skillCategories.map(({ id, label, icon: Icon }) => {
              const isActive = activeCategory === id;
              return (
                <Button
                  key={id}
                  onClick={() => setActiveCategory(id)}
                  variant={isActive ? 'default' : 'outline'}
                  className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'border-white/30 text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="mr-2" size={18} />
                  {label}
                </Button>
              );
            })}
          </div>

          {/* Skills Grid */}
          <div className="space-y-8">
            {/* Professional Skills */}
            {(activeCategory === 'all' || activeCategory === 'professional') && (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-8 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl mr-4">
                    <Users className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Professional Skills</h3>
                </div>
                
                <div className="grid gap-3">
                  {skills.professional.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                      <div className="flex items-center">
                        <CheckCircle2 className="text-blue-400 mr-3 flex-shrink-0" size={20} />
                        <span className="text-gray-200 font-medium">{skill}</span>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
            
            {/* Technical Skills */}
            {(activeCategory === 'all' || activeCategory === 'technical') && (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-8 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-purple-600 to-purple-400 rounded-xl mr-4">
                    <Settings className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Technical Skills</h3>
                </div>
                
                <div className="grid gap-3">
                  {skills.technical.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                      <div className="flex items-center">
                        <CheckCircle2 className="text-blue-400 mr-3 flex-shrink-0" size={20} />
                        <span className="text-gray-200 font-medium">{skill}</span>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
            
            {/* Technology Skills */}
            {(activeCategory === 'all' || activeCategory === 'technology') && (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-8 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-green-600 to-green-400 rounded-xl mr-4">
                    <Monitor className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Technology Stack</h3>
                </div>
                
                <div className="grid gap-3">
                  {skills.technology.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                      <div className="flex items-center">
                        <CheckCircle2 className="text-blue-400 mr-3 flex-shrink-0" size={20} />
                        <span className="text-gray-200 font-medium">{skill}</span>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
            
            {/* Soft Skills - Special Layout */}
            {(activeCategory === 'all' || activeCategory === 'soft') && (
              <div>
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-pink-600 to-pink-400 rounded-xl mr-4">
                    <Heart className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Soft Skills</h3>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-gradient-to-r from-pink-600 to-pink-400 rounded-xl mr-3">
                        <Users className="text-white" size={20} />
                      </div>
                      <h4 className="text-lg font-bold text-white">Social Skills</h4>
                    </div>
                    <div className="space-y-2">
                      {skills.soft.social.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="bg-pink-600/20 text-pink-200 border-pink-600/30">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                  
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-gradient-to-r from-purple-600 to-purple-400 rounded-xl mr-3">
                        <Brain className="text-white" size={20} />
                      </div>
                      <h4 className="text-lg font-bold text-white">Process Skills</h4>
                    </div>
                    <div className="space-y-2">
                      {skills.soft.process.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="bg-purple-600/20 text-purple-200 border-purple-600/30">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                  
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-gradient-to-r from-green-600 to-green-400 rounded-xl mr-3">
                        <Target className="text-white" size={20} />
                      </div>
                      <h4 className="text-lg font-bold text-white">Core Skills</h4>
                    </div>
                    <div className="space-y-2">
                      {skills.soft.generic.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="bg-green-600/20 text-green-200 border-green-600/30">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>

          {/* Languages Section */}
          <div className="mt-16">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-8">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-orange-600 to-orange-400 rounded-xl mr-4">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white">Languages</h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {languages.map((lang, index) => (
                  <div key={index} className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                    <h4 className="text-xl font-bold text-white mb-2">{lang.language}</h4>
                    <Badge 
                      variant="secondary" 
                      className={`${
                        lang.level === 'Native' 
                          ? 'bg-green-600/20 text-green-200 border-green-600/30'
                          : 'bg-blue-600/20 text-blue-200 border-blue-600/30'
                      }`}
                    >
                      {lang.level}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-white/20 p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Let's Put These Skills to Work
              </h3>
              <p className="text-gray-300 mb-6">
                Ready to leverage my expertise for your organization's HR needs? 
                Let's discuss how I can contribute to your team's success.
              </p>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3">
                Get In Touch
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;