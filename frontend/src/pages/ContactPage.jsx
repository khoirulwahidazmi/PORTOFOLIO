import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Send, CheckCircle, FileText, Upload } from 'lucide-react';
import { personalInfo } from '../data/mock';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock form submission - will be replaced with backend integration
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });
      
      setIsSubmitting(false);
    }, 2000);
  };

  const handleDownloadCV = () => {
    window.open(personalInfo.cvUrl, '_blank');
  };

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo.email,
      action: () => window.location.href = `mailto:${personalInfo.email}`,
      color: 'from-blue-600 to-blue-400'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: personalInfo.phone,
      action: () => window.location.href = `tel:${personalInfo.phone}`,
      color: 'from-green-600 to-green-400'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Connect with me',
      action: () => window.open(personalInfo.linkedin, '_blank'),
      color: 'from-blue-700 to-blue-500'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: personalInfo.location,
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
                  <Card 
                    key={index}
                    className="bg-white/10 backdrop-blur-sm border-white/20 p-6 hover:bg-white/15 transition-all duration-300 cursor-pointer group"
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
                  </Card>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Quick Actions</h3>
                
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
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
                    <Button 
                      onClick={handleDownloadCV}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      <FileText className="mr-2" size={16} />
                      Download
                    </Button>
                  </div>
                </Card>
                
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-xl">
                        <Upload className="text-white" size={24} />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">View My Certificates</h4>
                        <p className="text-gray-300 text-sm">Browse through my professional certifications</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white hover:text-black"
                    >
                      <Upload className="mr-2" size={16} />
                      View Docs
                    </Button>
                  </div>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-8">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl mr-4">
                    <Send className="text-white" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Send a Message</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-white font-medium">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-2 bg-white/5 border-white/20 text-white placeholder-gray-400"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-white font-medium">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-2 bg-white/5 border-white/20 text-white placeholder-gray-400"
                        placeholder="your.email@company.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company" className="text-white font-medium">
                        Company/Organization
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="mt-2 bg-white/5 border-white/20 text-white placeholder-gray-400"
                        placeholder="Your company name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="subject" className="text-white font-medium">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="mt-2 bg-white/5 border-white/20 text-white placeholder-gray-400"
                        placeholder="Brief subject line"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-white font-medium">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="mt-2 bg-white/5 border-white/20 text-white placeholder-gray-400 resize-none"
                      placeholder="Tell me about your HR needs, opportunities, or questions..."
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 text-lg font-medium rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2" size={20} />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-16">
            <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-white/20 p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="text-green-400 mr-2" size={24} />
                <h3 className="text-white font-semibold">Available for New Opportunities</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Currently open to discussing HR roles, consulting opportunities, and 
                professional collaborations. Looking forward to connecting with you!
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;