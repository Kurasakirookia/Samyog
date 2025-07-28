import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

/**
 * LoginPage Component
 * 
 * This page handles user authentication/login.
 * Features:
 * - Email/password login form
 * - Form validation with real-time feedback
 * - Remember me functionality
 * - Forgot password link
 * - Redirect after successful login
 * - Error handling and user feedback
 * - Loading states during authentication
 */
const LoginPage = () => {
  // ============ STATE MANAGEMENT ============
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ============ HOOKS ============
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the intended destination or default to home
  const from = location.state?.from?.pathname || '/';

  // ============ FORM VALIDATION ============
  /**
   * Validate individual form fields
   */
  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value) {
          return 'Email is required';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address';
        }
        return '';
      
      case 'password':
        if (!value) {
          return 'Password is required';
        }
        if (value.length < 6) {
          return 'Password must be at least 6 characters';
        }
        return '';
      
      default:
        return '';
    }
  };

  /**
   * Validate entire form
   */
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'rememberMe') {
        const error = validateField(key, formData[key]);
        if (error) {
          newErrors[key] = error;
        }
      }
    });
    return newErrors;
  };

  // ============ EVENT HANDLERS ============
  /**
   * Handle input changes with real-time validation
   */
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: inputValue
    }));

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Validate field in real-time (except for checkboxes)
    if (type !== 'checkbox') {
      const error = validateField(name, inputValue);
      if (error) {
        setErrors(prev => ({
          ...prev,
          [name]: error
        }));
      }
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Attempt login
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        toast.success('Login successful! Welcome back.');
        
        // Handle remember me functionality
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        
        // Redirect to intended destination or home
        navigate(from, { replace: true });
      } else {
        // Login failed
        toast.error(result.error || 'Login failed. Please try again.');
        setErrors({ submit: result.error || 'Login failed. Please try again.' });
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle demo login (for testing purposes)
   */
  const handleDemoLogin = async (userType) => {
    const demoCredentials = {
      admin: { email: 'admin@edumanage.edu', password: 'admin123' },
      user: { email: 'user@edumanage.edu', password: 'user123' }
    };

    const credentials = demoCredentials[userType];
    
    setFormData({
      email: credentials.email,
      password: credentials.password,
      rememberMe: false
    });

    // Auto-submit the form with demo credentials
    setIsSubmitting(true);
    try {
      const result = await login(credentials.email, credentials.password);
      if (result.success) {
        toast.success(`Demo ${userType} login successful!`);
        navigate(from, { replace: true });
      }
    } catch (error) {
      toast.error('Demo login failed. Please try manual login.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      
      {/* ============ PAGE HEADER ============ */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign in to your account</h2>
        <p className="text-gray-600">
          Or{' '}
          <Link
            to="/auth/register"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            create a new account
          </Link>
        </p>
      </div>

      {/* ============ DEMO LOGIN BUTTONS ============ */}
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800 mb-3 font-medium">Demo Accounts (for testing):</p>
        <div className="flex gap-2">
          <button
            onClick={() => handleDemoLogin('admin')}
            disabled={isSubmitting}
            className="flex-1 px-3 py-2 text-xs bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
          >
            Admin Demo
          </button>
          <button
            onClick={() => handleDemoLogin('user')}
            disabled={isSubmitting}
            className="flex-1 px-3 py-2 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            User Demo
          </button>
        </div>
      </div>

      {/* ============ LOGIN FORM ============ */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Display form-level errors */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{errors.submit}</p>
              </div>
            </div>
          </div>
        )}

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
              errors.email ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
              errors.password ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link
              to="/auth/forgot-password"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </div>
            ) : (
              'Sign in'
            )}
          </button>
        </div>
      </form>

      {/* ============ ADDITIONAL LINKS ============ */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/auth/register"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign up here
          </Link>
        </p>
      </div>

      {/* ============ HELP SECTION ============ */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Need help?</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Contact support: support@edumanage.edu</li>
          <li>• Office hours: Mon-Fri, 9AM-5PM</li>
          <li>• Phone: +1 (555) 123-4567</li>
        </ul>
      </div>
    </div>
  );
};

export default LoginPage;