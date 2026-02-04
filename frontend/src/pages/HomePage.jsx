import React from 'react';
import { Link } from 'react-router-dom';
import { Download, MapPin, Mail, Phone, Linkedin, ExternalLink, Loader2 } from 'lucide-react';
import { usePersonalInfo } from '../hooks/usePortfolio';

const HomePage = () => {
  const { data: personalInfo, loading, error } = usePersonalInfo();

  const handleDownloadCV = () => {
    if (personalInfo?.cv_url) {
      window.open(personalInfo.cv_url, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
          <p className="text-white">Memuat portofolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Error Memuat Portofolio</h2>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  if (!personalInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Portofolio Tidak Ditemukan</h2>
          <p className="text-gray-300">Informasi personal tidak dapat dimuat.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Hero Section */}
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
            {/* Left Content */}
            <div className="space-y-8 lg:pr-8">
              {/* Main Title */}
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 bg-blue-600/20 border border-blue-600/30 rounded-full">
                  <span className="text-blue-400 text-sm font-medium">{personalInfo.title}</span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  {personalInfo.name.split(' ').slice(0, 2).join(' ')}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    {personalInfo.name.split(' ').slice(2).join(' ')}
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
                  {personalInfo.subtitle}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                  <div className="text-3xl font-bold text-blue-400">98%</div>
                  <div className="text-gray-300 text-sm">Pemenuhan MPP</div>
                </div>
                <div className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                  <div className="text-3xl font-bold text-purple-400">100%</div>
                  <div className="text-gray-300 text-sm">Akurasi Payroll</div>
                </div>
                <div className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl col-span-2 lg:col-span-1">
                  <div className="text-3xl font-bold text-green-400">8+</div>
                  <div className="text-gray-300 text-sm">Sertifikasi</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleDownloadCV}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
                >
                  <Download className="mr-2" size={20} />
                  Unduh CV
                </button>
                <Link to="/contact">
                  <button className="border border-white/30 text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300 w-full sm:w-auto flex items-center justify-center">
                    <Mail className="mr-2" size={20} />
                    Hubungi Saya
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Content - Profile Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl transform rotate-6"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-2xl transform -rotate-6"></div>
                
                {/* Main Image Container */}
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-2xl">
                  <img
                    src={personalInfo.profile_image}
                    alt={personalInfo.name}
                    className="w-80 h-96 object-cover rounded-2xl shadow-xl"
                  />
                  
                  {/* Floating Badge */}
                  <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl shadow-xl">
                    <div className="text-center">
                      <div className="font-bold text-lg">CHRP</div>
                      <div className="text-xs opacity-90">Certified</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Summary Section */}
      <div className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-8">
              About Me
            </h2>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8">
              <p className="text-gray-200 text-lg leading-relaxed text-center">
                {personalInfo.summary}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Contact */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Let's Connect
            </h2>
            <p className="text-gray-300 text-lg">
              Ready to discuss HR opportunities and collaboration
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Location */}
            <div className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300">
              <MapPin className="mx-auto mb-4 text-blue-400" size={32} />
              <h3 className="text-white font-semibold mb-2">Location</h3>
              <p className="text-gray-300 text-sm">{personalInfo.location}</p>
            </div>
            
            {/* Email */}
            <a 
              href={`mailto:${personalInfo.email}`}
              className="block text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 group"
            >
              <Mail className="mx-auto mb-4 text-purple-400 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-white font-semibold mb-2">Email</h3>
              <p className="text-gray-300 text-sm">{personalInfo.email}</p>
            </a>
            
            {/* LinkedIn */}
            <a 
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 group"
            >
              <Linkedin className="mx-auto mb-4 text-green-400 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-white font-semibold mb-2">LinkedIn</h3>
              <div className="flex items-center justify-center text-gray-300 text-sm">
                <span>Connect with me</span>
                <ExternalLink className="ml-1" size={14} />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;