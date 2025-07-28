import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/common/LoadingSpinner';

/**
 * HomePage Component
 * 
 * This is the main landing page for public visitors.
 * Features:
 * - Hero section with welcome message
 * - Featured events showcase
 * - Faculty highlights
 * - Quick stats and achievements
 * - Call-to-action sections
 * - Responsive design for all devices
 */
const HomePage = () => {
  // ============ STATE MANAGEMENT ============
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [featuredTeachers, setFeaturedTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ============ LIFECYCLE ============
  useEffect(() => {
    loadHomePageData();
  }, []);

  // ============ DATA LOADING ============
  /**
   * Load featured content for home page
   */
  const loadHomePageData = async () => {
    try {
      setLoading(true);
      // Simulate API calls - replace with actual API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - replace with actual API responses
      setFeaturedEvents([
        {
          id: 1,
          title: 'Annual Tech Conference 2024',
          date: '2024-03-15',
          venue: 'Main Auditorium',
          image: '/api/placeholder/400/250',
          description: 'Join us for the biggest tech event of the year featuring industry leaders and innovative presentations.'
        },
        {
          id: 2,
          title: 'Cultural Fest',
          date: '2024-03-22',
          venue: 'Campus Grounds',
          image: '/api/placeholder/400/250',
          description: 'Celebrate diversity and creativity in our annual cultural festival with performances and exhibitions.'
        },
        {
          id: 3,
          title: 'Science Exhibition',
          date: '2024-04-05',
          venue: 'Science Block',
          image: '/api/placeholder/400/250',
          description: 'Discover groundbreaking research and innovative projects from our science departments.'
        }
      ]);

      setFeaturedTeachers([
        {
          id: 1,
          name: 'Dr. Sarah Johnson',
          designation: 'Professor',
          branch: 'Computer Science',
          image: '/api/placeholder/150/150',
          achievements: 'Published 50+ research papers'
        },
        {
          id: 2,
          name: 'Prof. Michael Chen',
          designation: 'Associate Professor',
          branch: 'Engineering',
          image: '/api/placeholder/150/150',
          achievements: 'Industry Expert with 20+ years'
        },
        {
          id: 3,
          name: 'Dr. Emily Davis',
          designation: 'Head of Department',
          branch: 'Mathematics',
          image: '/api/placeholder/150/150',
          achievements: 'Award-winning researcher'
        }
      ]);

    } catch (err) {
      setError('Failed to load homepage data');
    } finally {
      setLoading(false);
    }
  };

  // ============ STATS DATA ============
  const collegeStats = [
    { label: 'Students Enrolled', value: '5,000+', icon: '👨‍🎓' },
    { label: 'Faculty Members', value: '200+', icon: '👩‍🏫' },
    { label: 'Research Projects', value: '150+', icon: '🔬' },
    { label: 'Years of Excellence', value: '25+', icon: '🏆' }
  ];

  const features = [
    {
      title: 'Quality Education',
      description: 'World-class curriculum designed to prepare students for the future',
      icon: '📚'
    },
    {
      title: 'Research Excellence',
      description: 'Cutting-edge research facilities and opportunities for innovation',
      icon: '🔬'
    },
    {
      title: 'Industry Connections',
      description: 'Strong partnerships with leading companies for internships and placements',
      icon: '🤝'
    },
    {
      title: 'Campus Life',
      description: 'Vibrant student community with diverse activities and organizations',
      icon: '🎭'
    }
  ];

  // ============ LOADING STATE ============
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" message="Loading homepage..." />
      </div>
    );
  }

  // ============ ERROR STATE ============
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadHomePageData}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      
      {/* ============ HERO SECTION ============ */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-blue-200">EduManage</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Empowering minds, shaping futures. Join our community of learners, innovators, and leaders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/events"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Explore Events
              </Link>
              <Link
                to="/teachers"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Meet Faculty
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {collegeStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-blue-100 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURES SECTION ============ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose EduManage?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide a comprehensive educational experience that prepares students for success in their careers and life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURED EVENTS SECTION ============ */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Upcoming Events
              </h2>
              <p className="text-xl text-gray-600">
                Don't miss out on our exciting upcoming events
              </p>
            </div>
            <Link
              to="/events"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Events
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span className="mr-2">📅</span>
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span className="mr-2">📍</span>
                    {event.venue}
                  </div>
                  <Link
                    to={`/events/${event.id}`}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURED FACULTY SECTION ============ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet Our Faculty
              </h2>
              <p className="text-xl text-gray-600">
                Learn from industry experts and renowned academics
              </p>
            </div>
            <Link
              to="/teachers"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Faculty
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTeachers.map((teacher) => (
              <div key={teacher.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6 text-center">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-1 text-gray-900">{teacher.name}</h3>
                  <p className="text-blue-600 mb-1">{teacher.designation}</p>
                  <p className="text-gray-600 mb-2">{teacher.branch}</p>
                  <p className="text-sm text-gray-500">{teacher.achievements}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CALL TO ACTION SECTION ============ */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Take the first step towards your future. Explore our programs and start your journey with us today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/about"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Learn More About Us
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;