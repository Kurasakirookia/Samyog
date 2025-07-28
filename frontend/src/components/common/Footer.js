import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer Component
 * 
 * This is the main footer for all public pages.
 * Features:
 * - College/University information
 * - Quick navigation links
 * - Contact information
 * - Social media links
 * - Copyright information
 * - Responsive design for all devices
 */
const Footer = () => {
  
  // ============ FOOTER DATA ============
  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/events', label: 'Events' },
    { path: '/teachers', label: 'Faculty' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' }
  ];

  const academicLinks = [
    { path: '/admissions', label: 'Admissions' },
    { path: '/courses', label: 'Courses' },
    { path: '/research', label: 'Research' },
    { path: '/library', label: 'Library' },
    { path: '/student-life', label: 'Student Life' }
  ];

  const socialLinks = [
    { 
      name: 'Facebook', 
      url: 'https://facebook.com/college', 
      icon: '📘',
      color: 'hover:text-blue-600' 
    },
    { 
      name: 'Twitter', 
      url: 'https://twitter.com/college', 
      icon: '🐦',
      color: 'hover:text-blue-400' 
    },
    { 
      name: 'Instagram', 
      url: 'https://instagram.com/college', 
      icon: '📷',
      color: 'hover:text-pink-600' 
    },
    { 
      name: 'LinkedIn', 
      url: 'https://linkedin.com/college', 
      icon: '💼',
      color: 'hover:text-blue-700' 
    },
    { 
      name: 'YouTube', 
      url: 'https://youtube.com/college', 
      icon: '📹',
      color: 'hover:text-red-600' 
    }
  ];

  const contactInfo = {
    address: '123 Education Street, Knowledge City, KC 12345',
    phone: '+1 (555) 123-4567',
    email: 'info@edumanage.edu',
    admissions: 'admissions@edumanage.edu'
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============ MAIN FOOTER CONTENT ============ */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* === COLLEGE INFORMATION SECTION === */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl">🎓</span>
              <h3 className="text-xl font-bold text-white">EduManage</h3>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Empowering minds and shaping futures through quality education. 
              Join our community of learners, innovators, and leaders.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${social.color} transition-colors text-xl`}
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* === QUICK LINKS SECTION === */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors duration-200 block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* === ACADEMIC LINKS SECTION === */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Academic</h4>
            <ul className="space-y-2">
              {academicLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors duration-200 block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* === CONTACT INFORMATION SECTION === */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Info</h4>
            <div className="space-y-3">
              
              {/* Address */}
              <div className="flex items-start space-x-2">
                <span className="text-blue-400 mt-1">📍</span>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {contactInfo.address}
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-2">
                <span className="text-green-400">📞</span>
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {contactInfo.phone}
                </a>
              </div>

              {/* General Email */}
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">✉️</span>
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {contactInfo.email}
                </a>
              </div>

              {/* Admissions Email */}
              <div className="flex items-center space-x-2">
                <span className="text-purple-400">🎯</span>
                <a 
                  href={`mailto:${contactInfo.admissions}`}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {contactInfo.admissions}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ============ NEWSLETTER SUBSCRIPTION ============ */}
        <div className="border-t border-gray-800 py-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold mb-2 text-white">Stay Updated</h4>
            <p className="text-gray-300 mb-4 text-sm">
              Subscribe to our newsletter for the latest news and events
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* ============ BOTTOM COPYRIGHT SECTION ============ */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            
            {/* Copyright Text */}
            <div className="text-gray-400 text-sm text-center md:text-left mb-4 md:mb-0">
              © {new Date().getFullYear()} EduManage College. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6 text-sm">
              <Link 
                to="/privacy" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                to="/accessibility" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Accessibility
              </Link>
            </div>
          </div>
        </div>

        {/* ============ BACK TO TOP BUTTON ============ */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-50"
          title="Back to top"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </footer>
  );
};

export default Footer;