import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Send, CheckCircle, FileText, Upload, Loader2 } from 'lucide-react';
import { usePersonalInfo, useContactForm } from '../hooks/usePortfolio';

const ContactPage = () => {
  const { data: personalInfo, loading: personalLoading } = usePersonalInfo();
  const { submitForm, loading: submitting, error: submitError, success, resetForm } = useContactForm();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await submitForm(formData);
    
    if (result.success) {
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });
    }
  };

  const handleDownloadCV = () => {
    if (personalInfo?.cv_url) {
      window.open(personalInfo.cv_url, '_blank');
    }
  };

  if (personalLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
          <p className="text-white">Loading contact information...</p>
        </div>
      </div>
    );
  }

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo?.email || '',
      action: () => window.location.href = `mailto:${personalInfo?.email}`,
      color: 'from-blue-600 to-blue-400'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: personalInfo?.phone || '',
      action: () => window.location.href = `tel:${personalInfo?.phone}`,
      color: 'from-green-600 to-green-400'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Connect with me',
      action: () => window.open(personalInfo?.linkedin, '_blank'),
      color: 'from-blue-700 to-blue-500'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: personalInfo?.location || '',
      action: () => {},
      color: 'from-purple-600 to-purple-400'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-blue-600/20 border border-blue-600/30 rounded-full mb-6">
              <span className="text-blue-400 text-sm font-medium">Let's Connect</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Touch</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to discuss HR opportunities, collaborations, or have questions about my experience? 
              I'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
                <p className="text-gray-300 mb-8">
                  Feel free to reach out through any of the following methods. 
                  I typically respond within 24 hours.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="grid sm:grid-cols-2 gap-4">
                {contactMethods.map(({ icon: Icon, label, value, action, color }, index) => (
                  <div 
                    key={index}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-white/15 transition-all duration-300 cursor-pointer group"
                    onClick={action}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 bg-gradient-to-r ${color} rounded-xl group-hover:scale-110 transition-transform`}>
                        <Icon className="text-white" size={24} />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{label}</h3>
                        <p className="text-gray-300 text-sm">{value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Quick Actions</h3>
                
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-r from-red-600 to-red-400 rounded-xl">
                        <FileText className="text-white" size={24} />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">Download My CV</h4>
                        <p className="text-gray-300 text-sm">Get the complete overview of my experience</p>
                      </div>
                    </div>
                    <button 
                      onClick={handleDownloadCV}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <FileText size={16} />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl mr-4">
                    <Send className="text-white" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Send a Message</h2>
                </div>

                {/* Success Message */}
                {success && (
                  <div className="mb-6 p-4 bg-green-600/20 border border-green-600/30 rounded-lg">
                    <div className="flex items-center text-green-200">
                      <CheckCircle className="mr-2" size={20} />
                      <span>Message sent successfully! I'll get back to you soon.</span>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {submitError && (
                  <div className="mb-6 p-4 bg-red-600/20 border border-red-600/30 rounded-lg">
                    <p className="text-red-200">{submitError}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="text-white font-medium block mb-2">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full mt-2 bg-white/5 border border-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="text-white font-medium block mb-2">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full mt-2 bg-white/5 border border-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="your.email@company.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="company" className="text-white font-medium block mb-2">
                        Company/Organization
                      </label>
                      <input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full mt-2 bg-white/5 border border-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your company name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="text-white font-medium block mb-2">
                        Subject *
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full mt-2 bg-white/5 border border-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Brief subject line"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="text-white font-medium block mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full mt-2 bg-white/5 border border-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Tell me about your HR needs, opportunities, or questions..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 text-lg font-medium rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:scale-100 flex items-center justify-center space-x-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-white/20 rounded-lg p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="text-green-400 mr-2" size={24} />
                <h3 className="text-white font-semibold">Available for New Opportunities</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Currently open to discussing HR roles, consulting opportunities, and 
                professional collaborations. Looking forward to connecting with you!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;