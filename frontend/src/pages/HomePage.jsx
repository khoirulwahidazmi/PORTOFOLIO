import React from 'react';
import { Link } from 'react-router-dom';
import { Download, MapPin, Mail, Linkedin, ExternalLink, Loader2, GraduationCap, Trophy, Award, Calendar } from 'lucide-react';
import { usePersonalInfo, useEducation, useCertifications } from '../hooks/usePortfolio';

const HomePage = () => {
  const { data: personalInfo, loading, error } = usePersonalInfo();
  const { data: education, loading: educationLoading } = useEducation();
  const { data: certifications, loading: certificationsLoading } = useCertifications();

  const totalLoading = loading || educationLoading || certificationsLoading;

  const handleDownloadCV = () => {
    if (personalInfo?.cv_url) {
      window.open(personalInfo.cv_url, '_blank');
    }
  };

  if (totalLoading) {
    return (
      <div className=\"min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center\">
        <div className=\"flex flex-col items-center space-y-4\">
          <Loader2 className=\"w-8 h-8 text-blue-400 animate-spin\" />
          <p className=\"text-white\">Memuat portofolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className=\"min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center\">
        <div className=\"text-center text-white\">
          <h2 className=\"text-2xl font-bold mb-4\">Error Memuat Portofolio</h2>
          <p className=\"text-gray-300\">{error}</p>
        </div>
      </div>
    );
  }

  if (!personalInfo) {
    return (
      <div className=\"min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center\">
        <div className=\"text-center text-white\">
          <h2 className=\"text-2xl font-bold mb-4\">Portofolio Tidak Ditemukan</h2>
          <p className=\"text-gray-300\">Informasi personal tidak dapat dimuat.</p>
        </div>
      </div>
    );
  }

  return (
    <div className=\"min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800\">
      {/* Hero Section */}
      <div className=\"pt-20 pb-16\">
        <div className=\"container mx-auto px-6\">
          <div className=\"grid lg:grid-cols-2 gap-12 items-center min-h-screen\">
            {/* Left Content */}
            <div className=\"space-y-8 lg:pr-8\">
              {/* Main Title */}
              <div className=\"space-y-4\">
                <div className=\"inline-block px-4 py-2 bg-blue-600/20 border border-blue-600/30 rounded-full\">
                  <span className=\"text-blue-400 text-sm font-medium\">{personalInfo.title}</span>
                </div>
                <h1 className=\"text-5xl lg:text-7xl font-bold text-white leading-tight\">
                  {personalInfo.name.split(' ').slice(0, 2).join(' ')}
                  <br />
                  <span className=\"text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400\">
                    {personalInfo.name.split(' ').slice(2).join(' ')}
                  </span>
                </h1>
                <p className=\"text-xl lg:text-2xl text-gray-300 leading-relaxed\">
                  {personalInfo.subtitle}
                </p>
              </div>

              {/* Quick Stats */}
              <div className=\"grid grid-cols-2 lg:grid-cols-3 gap-6\">
                <div className=\"text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl\">
                  <div className=\"text-3xl font-bold text-blue-400\">98%</div>
                  <div className=\"text-gray-300 text-sm\">Pemenuhan MPP</div>
                </div>
                <div className=\"text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl\">
                  <div className=\"text-3xl font-bold text-purple-400\">100%</div>
                  <div className=\"text-gray-300 text-sm\">Akurasi Payroll</div>
                </div>
                <div className=\"text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl col-span-2 lg:col-span-1\">
                  <div className=\"text-3xl font-bold text-green-400\">8+</div>
                  <div className=\"text-gray-300 text-sm\">Sertifikasi</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className=\"flex flex-col sm:flex-row gap-4\">
                <button 
                  onClick={handleDownloadCV}
                  className=\"bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center\"
                >
                  <Download className=\"mr-2\" size={20} />
                  Unduh CV
                </button>
                <Link to=\"/contact\">
                  <button className=\"border border-white/30 text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300 w-full sm:w-auto flex items-center justify-center\">
                    <Mail className=\"mr-2\" size={20} />
                    Hubungi Saya
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Content - Profile Image */}
            <div className=\"flex justify-center lg:justify-end\">
              <div className=\"relative\">
                {/* Background Elements */}
                <div className=\"absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl transform rotate-6\"></div>
                <div className=\"absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-2xl transform -rotate-6\"></div>
                
                {/* Main Image Container */}
                <div className=\"relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-2xl\">
                  <img
                    src={personalInfo.profile_image}
                    alt={personalInfo.name}
                    className=\"w-80 h-96 object-cover rounded-2xl shadow-xl\"
                  />
                  
                  {/* Floating Badge untuk CHRP */}
                  <div className=\"absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl shadow-xl\">
                    <div className=\"text-center\">
                      <div className=\"font-bold text-lg\">CHRP</div>
                      <div className=\"text-xs opacity-90\">Bersertifikat</div>
                    </div>
                  </div>
                  
                  {/* Floating Badge untuk Gelar S.H. */}
                  <div className=\"absolute -top-4 -left-4 bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-2xl shadow-xl\">
                    <div className=\"text-center\">
                      <div className=\"font-bold text-lg\">S.H.</div>
                      <div className=\"text-xs opacity-90\">Sarjana Hukum</div>
                    </div>
                  </div>
                  
                  {/* Additional Education Badge */}
                  <div className=\"absolute top-1/2 -left-6 bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-4 py-2 rounded-2xl shadow-xl transform -rotate-12\">
                    <div className=\"text-center\">
                      <div className=\"font-bold text-sm\">UNISMA</div>
                      <div className=\"text-xs opacity-90\">2020-2024</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Summary Section */}
      <div className=\"py-16 bg-white/5 backdrop-blur-sm\">
        <div className=\"container mx-auto px-6\">
          <div className=\"max-w-4xl mx-auto\">
            <h2 className=\"text-3xl lg:text-4xl font-bold text-white text-center mb-8\">
              Tentang Saya
            </h2>
            <div className=\"bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8\">
              <p className=\"text-gray-200 text-lg leading-relaxed text-center\">
                {personalInfo.summary}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Education Section */}
      {education && (
        <div className=\"py-16\">
          <div className=\"container mx-auto px-6\">
            <div className=\"max-w-6xl mx-auto\">
              <div className=\"text-center mb-12\">
                <h2 className=\"text-3xl lg:text-4xl font-bold text-white mb-4\">
                  Latar Belakang <span className=\"text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400\">Pendidikan</span>
                </h2>
                <p className=\"text-gray-300 text-lg\">
                  Fondasi akademik yang kuat dalam bidang hukum
                </p>
              </div>
              
              <div className=\"bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8\">
                <div className=\"flex items-center mb-6\">
                  <div className=\"p-4 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl mr-4\">
                    <GraduationCap className=\"text-white\" size={32} />
                  </div>
                  <div>
                    <h3 className=\"text-2xl font-bold text-white\">{education.degree}</h3>
                    <p className=\"text-green-400 font-semibold\">{education.university}</p>
                    <p className=\"text-gray-300\">{education.period}</p>
                  </div>
                  
                  <div className=\"ml-auto flex items-center p-4 bg-yellow-600/20 border border-yellow-600/30 rounded-lg\">
                    <Trophy className=\"text-yellow-400 mr-3\" size={24} />
                    <div>
                      <span className=\"text-white font-semibold\">IPK: {education.gpa}</span>
                      <div className=\"text-yellow-300 text-sm\">Cum Laude</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Certifications Gallery */}
      {certifications && certifications.length > 0 && (
        <div className=\"py-16 bg-white/5 backdrop-blur-sm\">
          <div className=\"container mx-auto px-6\">
            <div className=\"max-w-6xl mx-auto\">
              <div className=\"text-center mb-12\">
                <h2 className=\"text-3xl lg:text-4xl font-bold text-white mb-4\">
                  Galeri <span className=\"text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400\">Sertifikat</span>
                </h2>
                <p className=\"text-gray-300 text-lg\">
                  Sertifikat profesional dan pelatihan yang telah saya peroleh
                </p>
              </div>
              
              {/* Certificates Grid */}
              <div className=\"grid md:grid-cols-2 lg:grid-cols-3 gap-6\">
                {certifications.slice(0, 6).map((cert, index) => {
                  const colors = [
                    'from-blue-600 to-blue-400',
                    'from-purple-600 to-purple-400', 
                    'from-green-600 to-green-400',
                    'from-orange-600 to-orange-400',
                    'from-pink-600 to-pink-400',
                    'from-red-600 to-red-400'
                  ];
                  const colorClass = colors[index % colors.length];
                  
                  return (
                    <div key={cert._id} className=\"group\">
                      <div className=\"bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-white/15 hover:scale-105 transition-all duration-300\">
                        <div className=\"flex items-start justify-between mb-4\">
                          <div className={`p-3 bg-gradient-to-r ${colorClass} rounded-xl`}>
                            <Award className=\"text-white\" size={24} />
                          </div>
                          <div className={`bg-gradient-to-r ${colorClass}/20 border border-white/20 px-3 py-1 rounded-full text-xs text-white`}>
                            {cert.type}
                          </div>
                        </div>
                        
                        <h3 className=\"text-lg font-bold text-white mb-2\">
                          {cert.title}
                        </h3>
                        
                        <p className=\"text-gray-300 text-sm mb-3\">
                          {cert.issuer}
                        </p>
                        
                        <div className=\"flex items-center justify-between\">
                          <div className=\"flex items-center text-sm text-gray-400\">
                            <Calendar className=\"mr-2\" size={16} />
                            {cert.date}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Contact */}
      <div className=\"py-16\">
        <div className=\"container mx-auto px-6\">
          <div className=\"text-center mb-12\">
            <h2 className=\"text-3xl lg:text-4xl font-bold text-white mb-4\">
              Mari Terhubung
            </h2>
            <p className=\"text-gray-300 text-lg\">
              Siap mendiskusikan peluang HR dan kolaborasi
            </p>
          </div>
          
          <div className=\"grid md:grid-cols-3 gap-6 max-w-4xl mx-auto\">
            {/* Location */}
            <div className=\"text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300\">
              <MapPin className=\"mx-auto mb-4 text-blue-400\" size={32} />
              <h3 className=\"text-white font-semibold mb-2\">Lokasi</h3>
              <p className=\"text-gray-300 text-sm\">{personalInfo.location}</p>
            </div>
            
            {/* Email */}
            <a 
              href={`mailto:${personalInfo.email}`}
              className=\"block text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 group\"
            >
              <Mail className=\"mx-auto mb-4 text-purple-400 group-hover:scale-110 transition-transform\" size={32} />
              <h3 className=\"text-white font-semibold mb-2\">Email</h3>
              <p className=\"text-gray-300 text-sm\">{personalInfo.email}</p>
            </a>
            
            {/* LinkedIn */}
            <a 
              href={personalInfo.linkedin}
              target=\"_blank\"
              rel=\"noopener noreferrer\"
              className=\"block text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 group\"
            >
              <Linkedin className=\"mx-auto mb-4 text-green-400 group-hover:scale-110 transition-transform\" size={32} />
              <h3 className=\"text-white font-semibold mb-2\">LinkedIn</h3>
              <div className=\"flex items-center justify-center text-gray-300 text-sm\">
                <span>Terhubung dengan saya</span>
                <ExternalLink className=\"ml-1\" size={14} />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;