# 🎓 EduManage - College Management System

A full-stack web application for college/university management with separate interfaces for public users and administrators.

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-site-id/deploy-status)](https://app.netlify.com/sites/your-site-name/deploys)

## 🌟 Live Demo

- **Frontend (Netlify)**: [https://your-app-name.netlify.app](https://your-app-name.netlify.app)
- **Backend (Your hosting)**: [https://your-api-domain.com](https://your-api-domain.com)

### Demo Accounts
```
Admin Account:
Email: admin@edumanage.edu
Password: admin123

Regular User:
Email: user@edumanage.edu  
Password: user123
```

## ✨ Features

### 🌐 Public Features
- **Responsive Design**: Mobile-first, works on all devices
- **Event Browsing**: View upcoming events with filtering and search
- **Faculty Directory**: Browse teachers by department with detailed profiles
- **Modern UI**: Clean, professional design with smooth animations
- **SEO Optimized**: Meta tags and structured data

### 🔐 Authentication System
- **JWT Authentication**: Secure login with token-based auth
- **Role-based Access**: Admin and regular user permissions
- **Protected Routes**: Automatic redirects for unauthorized access
- **Session Management**: Persistent login with refresh tokens

### ⚙️ Admin Dashboard
- **Event Management**: Full CRUD operations for events
- **Faculty Management**: Manage teacher profiles and information
- **Real-time Analytics**: Dashboard with key metrics and insights
- **File Uploads**: Image upload for events and faculty
- **User Management**: View and manage registered users

## 🏗️ Tech Stack

### Frontend
- **React 18**: Modern React with hooks and context
- **React Router 6**: Client-side routing with protection
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **React Toastify**: Toast notifications

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **MongoDB**: Database with Mongoose ODM
- **JWT**: JSON Web Tokens for authentication
- **Multer**: File upload handling
- **Bcrypt**: Password hashing

### Deployment
- **Frontend**: Netlify, GitHub Pages, or Vercel
- **Backend**: Heroku, Railway, DigitalOcean, or Render
- **Database**: MongoDB Atlas (Cloud database)
- **File Storage**: Cloudinary or AWS S3

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- MongoDB database (local or Atlas)
- Git for version control

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/edumanage.git
cd edumanage
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
# Add your MongoDB connection string, JWT secret, etc.

# Start development server
npm run dev
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create environment file
echo "REACT_APP_API_URL=http://localhost:5001/api" > .env.local

# Start development server
npm start
```

### 4. Access Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001
- **API Documentation**: http://localhost:5001/api-docs

## 📁 Project Structure

```
edumanage/
├── frontend/                 # React frontend application
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── contexts/       # React contexts
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   ├── package.json
│   └── README.md
├── backend/                 # Node.js backend API
│   ├── controllers/        # Route controllers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── config/           # Configuration files
│   ├── package.json
│   └── server.js
├── .gitignore
├── netlify.toml           # Netlify configuration
└── README.md             # This file
```

## 🌍 Deployment Guide

### Deploy Frontend

#### Option 1: GitHub Pages (Free)
```bash
# Quick deployment to GitHub Pages
./deploy-github.sh "Initial deployment"
```
📖 **Detailed Guide:** See [GITHUB_PAGES_SETUP.md](GITHUB_PAGES_SETUP.md)

#### Option 2: Netlify

#### Option 1: GitHub Integration (Recommended)

1. **Push to GitHub**:
```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/edumanage.git
git push -u origin main
```

2. **Connect to Netlify**:
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "New site from Git"
   - Choose GitHub and select your repository
   - Configure build settings:
     ```
     Base directory: frontend
     Build command: npm run build
     Publish directory: frontend/build
     ```

3. **Environment Variables**:
   - In Netlify dashboard → Site settings → Environment variables
   - Add: `REACT_APP_API_URL` = `https://your-backend-url.com/api`

4. **Deploy**:
   - Netlify will automatically build and deploy
   - Get your live URL: `https://amazing-site-name.netlify.app`

#### Option 2: Manual Deploy

```bash
# Build the frontend
cd frontend
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --dir=build
```

### Deploy Backend

#### Heroku Deployment
```bash
# Install Heroku CLI and login
heroku login

# Create Heroku app
heroku create your-app-name-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your-mongodb-connection-string
heroku config:set JWT_SECRET=your-jwt-secret

# Deploy
git subtree push --prefix backend heroku main
```

#### Railway Deployment
1. Connect GitHub repository to [Railway](https://railway.app)
2. Select the backend folder
3. Add environment variables
4. Deploy automatically

### Database Setup (MongoDB Atlas)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for global access)
5. Get connection string
6. Update environment variables

## 🔧 Configuration Files

### Netlify Configuration (`netlify.toml`)
```toml
[build]
  base = "frontend"
  command = "npm run build"
  publish = "build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Environment Variables

#### Frontend (`.env.local`)
```bash
REACT_APP_API_URL=https://your-backend-url.com/api
REACT_APP_APP_NAME=EduManage
```

#### Backend (`.env`)
```bash
NODE_ENV=production
PORT=5001
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-super-secret-jwt-key
```

## 📱 API Endpoints

### Public Endpoints
```
GET    /api/public/events           # Get all events
GET    /api/public/events/:id       # Get single event
GET    /api/public/teachers         # Get all teachers
GET    /api/public/teachers/branch/:branch  # Get teachers by branch
```

### Authentication
```
POST   /api/auth/register          # User registration
POST   /api/auth/login             # User login
GET    /api/auth/current           # Get current user
```

### Admin Endpoints (Protected)
```
GET    /api/admin/events           # Get all events (admin view)
POST   /api/admin/events           # Create new event
PUT    /api/admin/events/:id       # Update event
DELETE /api/admin/events/:id       # Delete event

GET    /api/admin/teachers         # Get all teachers (admin view)
POST   /api/admin/teachers         # Create new teacher
PUT    /api/admin/teachers/:id     # Update teacher
DELETE /api/admin/teachers/:id     # Delete teacher
```

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm test                    # Run tests
npm run test:coverage      # Run with coverage
```

### Backend Testing
```bash
cd backend
npm test                   # Run tests
npm run test:watch        # Run in watch mode
```

## 🔍 Monitoring & Analytics

### Performance Monitoring
- **Netlify Analytics**: Built-in site analytics
- **Google Analytics**: Add tracking ID to frontend
- **Lighthouse**: Performance auditing

### Error Tracking
- **Sentry**: Error monitoring and reporting
- **LogRocket**: Session replay and debugging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/frontend/README.md` for detailed frontend docs
- **Issues**: Create an issue on GitHub
- **Email**: support@edumanage.com

## 🚀 Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] File management system
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Progressive Web App (PWA)

---

Made with ❤️ by [Your Name](https://github.com/yourusername)