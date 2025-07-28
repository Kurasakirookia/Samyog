# 🎓 EduManage Frontend Documentation

A comprehensive React application for college/university management with separate interfaces for public users and administrators.

## 📋 Table of Contents

- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Component Architecture](#component-architecture)
- [Routing System](#routing-system)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Getting Started](#getting-started)
- [Development Guide](#development-guide)

## 🏗️ Project Structure

```
frontend/src/
├── components/           # Reusable UI components
│   ├── common/          # Shared components
│   │   ├── PublicHeader.js     # Public site navigation
│   │   ├── Footer.js           # Site footer
│   │   ├── AdminHeader.js      # Admin dashboard header
│   │   ├── AdminSidebar.js     # Admin navigation sidebar
│   │   └── LoadingSpinner.js   # Loading indicator
│   ├── auth/            # Authentication components
│   │   ├── ProtectedRoute.js   # Route protection
│   │   └── AdminRoute.js       # Admin-only routes
│   └── layouts/         # Page layout wrappers
│       ├── PublicLayout.js     # Public pages layout
│       ├── AdminLayout.js      # Admin pages layout
│       └── AuthLayout.js       # Login/register layout
├── pages/               # Main application pages
│   ├── public/          # Public accessible pages
│   │   ├── HomePage.js         # Landing page
│   │   ├── EventsPage.js       # Events listing
│   │   ├── EventDetailsPage.js # Single event view
│   │   ├── TeachersPage.js     # Faculty directory
│   │   ├── AboutPage.js        # About us
│   │   └── ContactPage.js      # Contact information
│   ├── auth/            # Authentication pages
│   │   ├── LoginPage.js        # User login
│   │   └── RegisterPage.js     # User registration
│   └── admin/           # Admin dashboard pages
│       ├── AdminDashboard.js   # Dashboard overview
│       ├── AdminEvents.js      # Events management
│       └── AdminTeachers.js    # Faculty management
├── contexts/            # React Context providers
│   └── AuthContext.js          # Authentication state
├── services/            # API service layer
│   ├── api.js                  # Base API configuration
│   ├── authService.js          # Authentication APIs
│   └── eventService.js         # Event management APIs
├── utils/               # Utility functions
└── App.js              # Main application component
```

## ✨ Key Features

### 🌐 Public Features
- **Responsive Design**: Mobile-first, works on all devices
- **Event Browsing**: View upcoming events with filtering
- **Faculty Directory**: Browse teachers by department
- **Search Functionality**: Find events and faculty quickly
- **Modern UI**: Clean, professional design with smooth animations

### 🔐 Authentication System
- **Secure Login**: JWT-based authentication
- **Role-based Access**: Admin and regular user roles
- **Protected Routes**: Automatic redirects for unauthorized access
- **Remember Me**: Persistent login sessions
- **Demo Accounts**: Quick testing with pre-configured accounts

### ⚙️ Admin Dashboard
- **Event Management**: Full CRUD operations for events
- **Faculty Management**: Manage teacher profiles and information
- **Real-time Stats**: Dashboard with key metrics
- **File Uploads**: Image upload for events and faculty
- **Responsive Admin Panel**: Works on desktop and mobile

## 🧱 Component Architecture

### Layout Components

#### PublicLayout
```javascript
// Wraps all public pages with header and footer
<PublicLayout>
  <Outlet /> // Page content goes here
</PublicLayout>
```

#### AdminLayout
```javascript
// Provides admin dashboard structure
<AdminLayout>
  <AdminHeader />
  <AdminSidebar />
  <MainContent>
    <Outlet /> // Admin page content
  </MainContent>
</AdminLayout>
```

### Authentication Components

#### ProtectedRoute
```javascript
// Ensures user is logged in
<ProtectedRoute>
  <PrivateComponent />
</ProtectedRoute>
```

#### AdminRoute
```javascript
// Ensures user has admin privileges
<AdminRoute>
  <AdminOnlyComponent />
</AdminRoute>
```

## 🛣️ Routing System

### Route Structure
```javascript
// Public routes (accessible to everyone)
/                    → HomePage
/events              → EventsPage
/events/:id          → EventDetailsPage
/teachers            → TeachersPage
/about               → AboutPage
/contact             → ContactPage

// Authentication routes
/auth/login          → LoginPage
/auth/register       → RegisterPage

// Protected admin routes
/admin               → AdminDashboard
/admin/events        → AdminEvents
/admin/teachers      → AdminTeachers
```

### Route Protection
```javascript
// Three levels of protection:
1. Public Routes     → No authentication required
2. Protected Routes  → Requires login
3. Admin Routes      → Requires admin role
```

## 🗄️ State Management

### AuthContext
Central authentication state management:

```javascript
const authState = {
  user: null,              // Current user data
  token: null,             // JWT token
  isAuthenticated: false,  // Login status
  loading: false,          // Loading state
  error: null             // Error messages
};

// Available methods:
login(email, password)     // User login
register(userData)         // User registration
logout()                   // User logout
isAdmin()                 // Check admin status
```

### Usage Example
```javascript
import { useAuth } from '../../contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <LoginPrompt />;
  }
  
  return <UserDashboard user={user} />;
}
```

## 🔌 API Integration

### Service Layer Architecture
All API calls are centralized in service classes:

#### AuthService
```javascript
authService.login(email, password)
authService.register(userData)
authService.getCurrentUser()
```

#### EventService
```javascript
// Public methods
eventService.getAllEvents(params)
eventService.getEventById(id)
eventService.getFeaturedEvents()

// Admin methods
eventService.createEvent(eventData)
eventService.updateEvent(id, eventData)
eventService.deleteEvent(id)
```

### API Configuration
```javascript
// Base configuration in api.js
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatic token injection
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Backend API running on localhost:5001

### Installation
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
touch .env.local

# Add environment variables
echo "REACT_APP_API_URL=http://localhost:5001/api" >> .env.local

# Start development server
npm start
```

### Demo Accounts
```javascript
// Admin Account
Email: admin@edumanage.edu
Password: admin123

// Regular User Account
Email: user@edumanage.edu
Password: user123
```

## 💡 Development Guide

### Adding New Pages

1. **Create Page Component**
```javascript
// src/pages/public/NewPage.js
import React from 'react';

const NewPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1>New Page</h1>
      {/* Page content */}
    </div>
  );
};

export default NewPage;
```

2. **Add Route to App.js**
```javascript
// In App.js, add to public routes section
<Route path="/new-page" element={<NewPage />} />
```

3. **Update Navigation**
```javascript
// In PublicHeader.js, add to navigationLinks array
{ path: '/new-page', label: 'New Page', icon: '🆕' }
```

### Creating API Services

1. **Create Service Class**
```javascript
// src/services/newService.js
import api from './api';

class NewService {
  async getData() {
    try {
      const response = await api.get('/endpoint');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Request failed');
    }
  }
}

export const newService = new NewService();
```

2. **Use in Components**
```javascript
import { newService } from '../services/newService';

const MyComponent = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await newService.getData();
        setData(result);
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };
    
    loadData();
  }, []);
  
  return <div>{/* Render data */}</div>;
};
```

### Styling Guidelines

- **Tailwind CSS**: Use utility classes for styling
- **Responsive Design**: Mobile-first approach
- **Consistent Colors**: Blue theme with gray accents
- **Icons**: Emoji icons for visual appeal

### Form Patterns

```javascript
// Standard form with validation
const [formData, setFormData] = useState({ field: '' });
const [errors, setErrors] = useState({});

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Validate
  const validation = validateForm(formData);
  if (!validation.isValid) {
    setErrors(validation.errors);
    return;
  }
  
  // Submit
  try {
    await apiCall(formData);
    toast.success('Success!');
  } catch (error) {
    toast.error(error.message);
  }
};
```

### Error Handling

```javascript
// Standard error handling pattern
try {
  const result = await apiCall();
  // Handle success
} catch (error) {
  // Show user-friendly error
  toast.error(error.message);
  
  // Log detailed error for debugging
  console.error('API Error:', error);
}
```

## 🎨 UI/UX Features

- **Loading States**: Spinners and skeletons for better UX
- **Toast Notifications**: Real-time feedback for user actions
- **Responsive Navigation**: Collapsible menu for mobile
- **Hover Effects**: Smooth transitions and interactions
- **Form Validation**: Real-time feedback with error messages
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 📱 Responsive Design

- **Mobile First**: Designed for mobile, enhanced for desktop
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible Layouts**: Grid and flexbox for adaptive content
- **Touch Friendly**: Large tap targets for mobile devices

---

This frontend provides a solid foundation for a college management system with modern React patterns, comprehensive error handling, and excellent user experience across all devices.