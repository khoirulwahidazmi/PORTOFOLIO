import React, { useState } from 'react';
import { 
  Users, 
  Settings, 
  Monitor, 
  Heart, 
  Star,
  CheckCircle2,
  TrendingUp,
  Loader2
} from 'lucide-react';
import { useSkills, useLanguages } from '../hooks/usePortfolio';

const SkillsPage = () => {
  const { data: skills, loading: skillsLoading, error: skillsError } = useSkills();
  const { data: languages, loading: languagesLoading, error: languagesError } = useLanguages();
  const [activeCategory, setActiveCategory] = useState('all');

  const skillCategories = [
    { id: 'all', label: 'All Skills', icon: Star },
    { id: 'professional', label: 'Professional', icon: Users },
    { id: 'technical', label: 'Technical', icon: Settings },
    { id: 'technology', label: 'Technology', icon: Monitor },
    { id: 'soft', label: 'Soft Skills', icon: Heart }
  ];

  const loading = skillsLoading || languagesLoading;
  const error = skillsError || languagesError;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
          <p className="text-white">Loading skills...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Error Loading Skills</h2>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  const renderSkillSection = (title, skillList, category, iconColor) => {
    if (activeCategory !== 'all' && activeCategory !== category) return null;
    
    return (
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8 hover:bg-white/15 transition-all duration-300">
        <div className="flex items-center mb-6">
          <div className={`p-3 bg-gradient-to-r ${iconColor} rounded-xl mr-4`}>
            {category === 'professional' && <Users className="text-white" size={24} />}
            {category === 'technical' && <Settings className="text-white" size={24} />}
            {category === 'technology' && <Monitor className="text-white" size={24} />}
          </div>
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
        
        <div className="grid gap-3">
          {skillList && skillList.map((skill, index) => (
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
      </div>
    );
  };

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
                <button
                  key={id}
                  onClick={() => setActiveCategory(id)}
                  className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'border border-white/30 text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          {/* Skills Grid */}
          <div className="space-y-8">
            {/* Professional Skills */}
            {skills && renderSkillSection('Professional Skills', skills.professional, 'professional', 'from-blue-600 to-blue-400')}
            
            {/* Technical Skills */}
            {skills && renderSkillSection('Technical Skills', skills.technical, 'technical', 'from-purple-600 to-purple-400')}
            
            {/* Technology Skills */}
            {skills && renderSkillSection('Technology Stack', skills.technology, 'technology', 'from-green-600 to-green-400')}
            
            {/* Soft Skills - Special Layout */}
            {skills && (activeCategory === 'all' || activeCategory === 'soft') && (
              <div>
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-pink-600 to-pink-400 rounded-xl mr-4">
                    <Heart className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Soft Skills</h3>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Social Skills */}
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-gradient-to-r from-pink-600 to-pink-400 rounded-xl mr-3">
                        <Users className="text-white" size={20} />
                      </div>
                      <h4 className="text-lg font-bold text-white">Social Skills</h4>
                    </div>
                    <div className="space-y-2">
                      {skills.soft?.social?.map((skill, index) => (
                        <div key={index} className="bg-pink-600/20 text-pink-200 border border-pink-600/30 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Process Skills */}
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-gradient-to-r from-purple-600 to-purple-400 rounded-xl mr-3">
                        <Settings className="text-white" size={20} />
                      </div>
                      <h4 className="text-lg font-bold text-white">Process Skills</h4>
                    </div>
                    <div className="space-y-2">
                      {skills.soft?.process?.map((skill, index) => (
                        <div key={index} className="bg-purple-600/20 text-purple-200 border border-purple-600/30 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Generic Skills */}
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-gradient-to-r from-green-600 to-green-400 rounded-xl mr-3">
                        <CheckCircle2 className="text-white" size={20} />
                      </div>
                      <h4 className="text-lg font-bold text-white">Core Skills</h4>
                    </div>
                    <div className="space-y-2">
                      {skills.soft?.generic?.map((skill, index) => (
                        <div key={index} className="bg-green-600/20 text-green-200 border border-green-600/30 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Languages Section */}
          <div className="mt-16">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-orange-600 to-orange-400 rounded-xl mr-4">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white">Languages</h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {languages && languages.map((lang, index) => (
                  <div key={index} className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                    <h4 className="text-xl font-bold text-white mb-2">{lang.language}</h4>
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      lang.level === 'Native' 
                        ? 'bg-green-600/20 text-green-200 border border-green-600/30'
                        : 'bg-blue-600/20 text-blue-200 border border-blue-600/30'
                    }`}>
                      {lang.level}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-white/20 rounded-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Let's Put These Skills to Work
              </h3>
              <p className="text-gray-300 mb-6">
                Ready to leverage my expertise for your organization's HR needs? 
                Let's discuss how I can contribute to your team's success.
              </p>
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg transition-colors">
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;