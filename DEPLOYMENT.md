# 🚀 Deployment Guide - EduManage

This guide will walk you through deploying your EduManage application to GitHub and Netlify.

## 📋 Prerequisites

Before starting, ensure you have:
- [x] Node.js 16+ installed
- [x] Git installed and configured
- [x] GitHub account
- [x] Netlify account
- [x] MongoDB Atlas account (for database)
- [x] Backend hosting solution (Heroku, Railway, etc.)

## 🗂️ Pre-Deployment Checklist

### ✅ Environment Setup
- [ ] All environment variables configured
- [ ] Database connection working
- [ ] Backend API endpoints tested
- [ ] Frontend builds successfully
- [ ] No console errors in production build

### ✅ File Preparation
- [ ] `.gitignore` file in place
- [ ] `netlify.toml` configured
- [ ] Environment example files created
- [ ] README.md updated with project details

## 🌐 Step 1: Prepare for Deployment

### 1.1 Update Configuration Files

**Update `netlify.toml`:**
```toml
# Update the API proxy URL
[[redirects]]
  from = "/api/*"
  to = "https://YOUR-BACKEND-URL.com/api/:splat"  # Replace with your backend URL
  status = 200
  force = true
```

**Update `frontend/public/index.html`:**
```html
<!-- Update these URLs with your actual domain -->
<meta property="og:url" content="https://YOUR-APP-NAME.netlify.app" />
<link rel="canonical" href="https://YOUR-APP-NAME.netlify.app" />
```

**Update `frontend/public/robots.txt`:**
```txt
# Update sitemap URL
Sitemap: https://YOUR-APP-NAME.netlify.app/sitemap.xml
```

### 1.2 Environment Variables Setup

**Frontend (`.env.local`):**
```bash
REACT_APP_API_URL=https://YOUR-BACKEND-URL.com/api
REACT_APP_APP_NAME=EduManage
REACT_APP_ENV=production
```

**Backend (`.env`):**
```bash
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/edumanage
JWT_SECRET=your-super-secret-jwt-key
CORS_ORIGINS=https://YOUR-APP-NAME.netlify.app
```

## 📦 Step 2: Deploy Backend (Choose One)

### Option A: Heroku Deployment

1. **Create Heroku Account & Install CLI**
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login
```

2. **Create Heroku App**
```bash
# Create new app
heroku create your-edumanage-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI="your-mongodb-connection-string"
heroku config:set JWT_SECRET="your-jwt-secret"
heroku config:set CORS_ORIGINS="https://your-app-name.netlify.app"
```

3. **Deploy Backend**
```bash
# Add Heroku remote
git remote add heroku https://git.heroku.com/your-edumanage-api.git

# Deploy backend only
git subtree push --prefix backend heroku main
```

### Option B: Railway Deployment

1. **Go to [Railway.app](https://railway.app)**
2. **Connect GitHub Repository**
3. **Select Backend Folder**
4. **Add Environment Variables:**
   - `NODE_ENV=production`
   - `MONGODB_URI=your-connection-string`
   - `JWT_SECRET=your-secret`
   - `CORS_ORIGINS=https://your-app-name.netlify.app`
5. **Deploy Automatically**

### Option C: DigitalOcean App Platform

1. **Go to [DigitalOcean](https://www.digitalocean.com/products/app-platform)**
2. **Create New App**
3. **Connect GitHub Repository**
4. **Configure Build Settings:**
   - Source Directory: `backend`
   - Build Command: `npm install`
   - Run Command: `npm start`
5. **Add Environment Variables**
6. **Deploy**

## 📱 Step 3: Deploy Frontend to Netlify

### Option A: GitHub Integration (Recommended)

1. **Push to GitHub**
```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - Ready for deployment"

# Create main branch
git branch -M main

# Add GitHub remote (replace with your repository URL)
git remote add origin https://github.com/yourusername/edumanage.git

# Push to GitHub
git push -u origin main
```

2. **Connect to Netlify**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "New site from Git"
   - Choose GitHub and authorize
   - Select your repository
   - Configure build settings:
     ```
     Base directory: frontend
     Build command: npm run build
     Publish directory: frontend/build
     ```

3. **Add Environment Variables in Netlify**
   - Go to Site settings → Environment variables
   - Add variables:
     ```
     REACT_APP_API_URL = https://your-backend-url.com/api
     REACT_APP_APP_NAME = EduManage
     REACT_APP_ENV = production
     ```

4. **Deploy**
   - Netlify will automatically build and deploy
   - Get your live URL: `https://amazing-site-name.netlify.app`

### Option B: Manual Deploy with Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Build the frontend
cd frontend
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=build

# Follow prompts to create new site or link existing one
```

## 🗄️ Step 4: Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for free account

2. **Create Cluster**
   - Choose cloud provider and region
   - Select free tier (M0 Sandbox)
   - Name your cluster

3. **Configure Database Access**
   - Database Access → Add New Database User
   - Choose password authentication
   - Set username and password
   - Grant read/write access

4. **Configure Network Access**
   - Network Access → Add IP Address
   - Add `0.0.0.0/0` for global access (or specific IPs)

5. **Get Connection String**
   - Clusters → Connect → Connect your application
   - Copy connection string
   - Replace `<password>` with your database user password

6. **Update Environment Variables**
   - Update backend environment with connection string
   - Redeploy backend application

## 🔧 Step 5: Post-Deployment Configuration

### 5.1 Update URLs in Code

**Update these files with your actual deployment URLs:**

1. **Frontend API URL** (`frontend/src/services/api.js`):
```javascript
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://your-backend-url.com/api',
  // ... rest of config
});
```

2. **CORS Configuration** (Backend):
```javascript
// In your backend CORS setup
const corsOptions = {
  origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
};
```

### 5.2 Test Deployment

1. **Frontend Tests:**
   - [ ] Homepage loads correctly
   - [ ] Navigation works
   - [ ] Login/register functionality
   - [ ] API calls succeed
   - [ ] Mobile responsiveness

2. **Backend Tests:**
   - [ ] API endpoints respond
   - [ ] Database connections work
   - [ ] Authentication flows
   - [ ] File uploads (if applicable)
   - [ ] CORS headers correct

### 5.3 Custom Domain (Optional)

**For Netlify:**
1. Go to Site settings → Domain management
2. Add custom domain
3. Follow DNS configuration instructions
4. Enable HTTPS (automatic with Let's Encrypt)

## 🔍 Step 6: Monitoring & Analytics

### 6.1 Enable Analytics

**Google Analytics (Optional):**
1. Create Google Analytics account
2. Get tracking ID
3. Add to environment variables:
   ```bash
   REACT_APP_GA_TRACKING_ID=GA_MEASUREMENT_ID
   ```
4. Uncomment GA code in `index.html`

**Netlify Analytics:**
- Go to Site overview → Analytics
- Enable Netlify Analytics (paid feature)

### 6.2 Error Monitoring

**Sentry Setup (Optional):**
1. Create Sentry account
2. Get DSN
3. Add to backend environment:
   ```bash
   SENTRY_DSN=your-sentry-dsn
   ```

## 🚨 Troubleshooting

### Common Issues

**Build Fails:**
```bash
# Clear cache and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

**API Calls Fail:**
- Check CORS configuration
- Verify environment variables
- Check network/firewall settings
- Ensure backend is running

**Environment Variables Not Working:**
- Check variable names (must start with `REACT_APP_`)
- Restart development server after changes
- Verify variables in Netlify dashboard

**Database Connection Issues:**
- Check MongoDB Atlas network access
- Verify connection string format
- Check database user permissions

### Logs and Debugging

**Netlify Logs:**
- Deploy logs: Site overview → Deploys
- Function logs: Functions tab
- Analytics: Site overview → Analytics

**Backend Logs:**
- Heroku: `heroku logs --tail -a your-app-name`
- Railway: Check dashboard logs
- DigitalOcean: Check app platform logs

## 🔄 Continuous Deployment

### Automatic Deployment Setup

**For Netlify (GitHub Integration):**
- Pushes to `main` branch auto-deploy to production
- Pull requests create deploy previews
- Branch deploys for feature branches

**Branch Protection (Recommended):**
1. Go to GitHub repository → Settings → Branches
2. Add rule for `main` branch
3. Require pull request reviews
4. Require status checks

### Deployment Workflow

```bash
# Development workflow
git checkout -b feature/new-feature
# Make changes
git add .
git commit -m "Add new feature"
git push origin feature/new-feature

# Create pull request on GitHub
# Netlify creates deploy preview
# Review and merge to main
# Auto-deploy to production
```

## 📝 Environment Management

### Multiple Environments

**Development:**
- Local development
- Environment: `development`
- API: `http://localhost:5001/api`

**Staging:**
- Deploy previews
- Environment: `staging`
- API: `https://staging-api.your-domain.com/api`

**Production:**
- Main deployment
- Environment: `production`
- API: `https://api.your-domain.com/api`

### Environment Variables by Stage

```bash
# Development
REACT_APP_ENV=development
REACT_APP_API_URL=http://localhost:5001/api

# Staging
REACT_APP_ENV=staging  
REACT_APP_API_URL=https://staging-api.your-domain.com/api

# Production
REACT_APP_ENV=production
REACT_APP_API_URL=https://api.your-domain.com/api
```

## ✅ Final Checklist

Before going live, ensure:

- [ ] All environment variables set correctly
- [ ] Database is accessible and populated
- [ ] Backend API is responding
- [ ] Frontend builds and deploys successfully
- [ ] Authentication flows work end-to-end
- [ ] All major features tested
- [ ] Mobile responsiveness verified
- [ ] SEO meta tags updated
- [ ] Analytics tracking configured
- [ ] Error monitoring setup
- [ ] Backup procedures in place
- [ ] Documentation updated
- [ ] Demo accounts created and tested

## 🎉 Success!

Your EduManage application is now live! 

**Next Steps:**
1. Share your live URLs
2. Gather user feedback
3. Monitor performance and errors
4. Plan future features and improvements

**Live URLs:**
- Frontend: `https://your-app-name.netlify.app`
- Backend: `https://your-backend-url.com`
- Admin Panel: `https://your-app-name.netlify.app/admin`

---

**Need Help?**
- Check the [README.md](./README.md) for detailed documentation
- Open an issue on GitHub
- Contact support team

Happy deploying! 🚀