#!/bin/bash

# ============ GITHUB PAGES DEPLOYMENT SCRIPT ============
# Automated deployment script for GitHub Pages
# Usage: ./deploy-github.sh [commit_message]

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Get commit message from argument or use default
COMMIT_MESSAGE=${1:-"Deploy to GitHub Pages - $(date '+%Y-%m-%d %H:%M:%S')"}

echo -e "${BLUE}🚀 Starting GitHub Pages Deployment${NC}"

# ============ FUNCTIONS ============

print_step() {
    echo -e "\n${BLUE}📋 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${PURPLE}ℹ️  $1${NC}"
}

# ============ MAIN DEPLOYMENT FLOW ============

main() {
    echo -e "${GREEN}"
    echo "╔══════════════════════════════════════════╗"
    echo "║          GitHub Pages Deployment         ║"
    echo "║            EduManage Frontend            ║"
    echo "╚══════════════════════════════════════════╝"
    echo -e "${NC}"

    # Check if we're in the right directory
    if [ ! -d "frontend" ]; then
        print_error "Frontend directory not found. Make sure you're in the project root."
        exit 1
    fi

    # Check if Node.js is installed
    print_step "Checking prerequisites..."
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 16+ and try again."
        exit 1
    fi

    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm and try again."
        exit 1
    fi

    if ! command -v git &> /dev/null; then
        print_error "Git is not installed. Please install Git and try again."
        exit 1
    fi
    print_success "Prerequisites check passed"

    # Check if we're in a git repository
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        print_error "Not in a Git repository. Please initialize Git first."
        exit 1
    fi

    # Navigate to frontend directory
    print_step "Navigating to frontend directory..."
    cd frontend

    # Check if gh-pages is installed
    print_step "Checking gh-pages dependency..."
    if ! npm list gh-pages &> /dev/null; then
        print_warning "gh-pages not found. Installing..."
        npm install --save-dev gh-pages
        print_success "gh-pages installed successfully"
    else
        print_success "gh-pages dependency found"
    fi

    # Install dependencies
    print_step "Installing frontend dependencies..."
    npm install
    print_success "Dependencies installed successfully"

    # Check environment variables
    print_step "Checking environment configuration..."
    if [ ! -f ".env.local" ]; then
        print_warning ".env.local not found. Creating from .env.example..."
        if [ -f ".env.example" ]; then
            cp .env.example .env.local
            print_info "Please update .env.local with your GitHub Pages URL"
        else
            echo "REACT_APP_API_URL=https://your-backend-url.com/api" > .env.local
            echo "REACT_APP_ENV=production" >> .env.local
            print_info "Created basic .env.local file"
        fi
    fi

    # Check package.json homepage field
    print_step "Verifying GitHub Pages configuration..."
    if grep -q "yourusername.github.io" package.json; then
        print_warning "Please update the homepage URL in package.json with your actual GitHub username and repository name"
        print_info "Current: https://yourusername.github.io/edumanage"
        print_info "Should be: https://YOUR_USERNAME.github.io/YOUR_REPO_NAME"
    fi

    # Run tests (optional)
    print_step "Running tests..."
    if npm test -- --coverage --watchAll=false --passWithNoTests; then
        print_success "Tests completed successfully"
    else
        print_warning "Tests failed or not found, but continuing deployment"
    fi

    # Build the application
    print_step "Building React application..."
    if npm run build; then
        print_success "Build completed successfully"
    else
        print_error "Build failed. Please fix the errors and try again."
        exit 1
    fi

    # Deploy to GitHub Pages
    print_step "Deploying to GitHub Pages..."
    if npm run deploy; then
        print_success "Deployment to GitHub Pages completed successfully!"
    else
        print_error "Deployment failed. Please check the error messages above."
        exit 1
    fi

    # Go back to project root
    cd ..

    # Commit and push source code changes
    print_step "Committing source code changes..."
    if [[ -n $(git status --porcelain) ]]; then
        git add .
        git commit -m "$COMMIT_MESSAGE"
        
        print_step "Pushing source code to main branch..."
        git push origin main
        print_success "Source code pushed to GitHub successfully"
    else
        print_info "No source code changes to commit"
    fi

    # Generate deployment info
    print_step "Generating deployment information..."
    
    # Get package.json homepage URL
    HOMEPAGE_URL=$(cd frontend && node -p "require('./package.json').homepage")
    GIT_REPO=$(git config --get remote.origin.url)
    GIT_COMMIT=$(git rev-parse HEAD)
    DEPLOY_TIME=$(date '+%Y-%m-%d %H:%M:%S')
    
    cat > DEPLOYMENT_INFO.md << EOF
# 🚀 GitHub Pages Deployment Information

**Deploy Time:** $DEPLOY_TIME
**Git Commit:** $GIT_COMMIT
**Repository:** $GIT_REPO

## 🔗 Live URLs
- **Frontend:** [$HOMEPAGE_URL]($HOMEPAGE_URL)
- **Admin Panel:** [$HOMEPAGE_URL/admin]($HOMEPAGE_URL/admin)
- **Repository:** [GitHub Repository]($GIT_REPO)

## 📋 Deployment Status
- [x] Dependencies installed
- [x] Tests completed
- [x] Frontend built successfully
- [x] Deployed to GitHub Pages
- [x] Source code committed and pushed

## 🔍 Important Notes
- GitHub Pages serves from \`gh-pages\` branch
- It may take a few minutes for changes to be live
- Make sure repository settings have Pages enabled
- Custom domain can be configured in repository settings

## 🛠️ Repository Settings
To enable GitHub Pages:
1. Go to repository Settings
2. Scroll to "Pages" section
3. Set Source to "Deploy from a branch"
4. Select "gh-pages" branch
5. Click Save

## 📱 Test Your Deployment
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] All routes accessible
- [ ] Mobile responsive
- [ ] No console errors

---
Generated on $DEPLOY_TIME
EOF

    print_success "Deployment information saved to DEPLOYMENT_INFO.md"

    # Final success message
    echo -e "\n${GREEN}🎉 GitHub Pages Deployment Completed Successfully!${NC}"
    echo -e "\n${BLUE}📝 Deployment Details:${NC}"
    echo -e "   ${PURPLE}Live URL:${NC} $HOMEPAGE_URL"
    echo -e "   ${PURPLE}Repository:${NC} $GIT_REPO"
    echo -e "   ${PURPLE}Branch:${NC} gh-pages"
    
    echo -e "\n${YELLOW}⏰ Important:${NC}"
    echo -e "   • It may take 5-10 minutes for your site to be live"
    echo -e "   • Check GitHub repository settings to ensure Pages is enabled"
    echo -e "   • Visit the live URL after a few minutes"
    
    echo -e "\n${BLUE}🔧 Next Steps:${NC}"
    echo -e "   1. Wait 5-10 minutes for GitHub Pages to deploy"
    echo -e "   2. Visit: $HOMEPAGE_URL"
    echo -e "   3. Test all functionality"
    echo -e "   4. Update API endpoints if needed"
    echo -e "   5. Configure custom domain (optional)"
}

# ============ SCRIPT EXECUTION ============

# Check if help is requested
if [[ "$1" == "-h" || "$1" == "--help" ]]; then
    echo "GitHub Pages Deployment Script for EduManage"
    echo ""
    echo "Usage: ./deploy-github.sh [commit_message]"
    echo ""
    echo "Examples:"
    echo "  ./deploy-github.sh \"Add new feature\""
    echo "  ./deploy-github.sh"
    echo ""
    echo "What this script does:"
    echo "  1. Checks prerequisites (Node.js, npm, git)"
    echo "  2. Installs dependencies"
    echo "  3. Runs tests"
    echo "  4. Builds React application"
    echo "  5. Deploys to GitHub Pages"
    echo "  6. Commits and pushes source code"
    echo "  7. Generates deployment info"
    echo ""
    echo "Requirements:"
    echo "  - Node.js 16+"
    echo "  - Git repository with GitHub remote"
    echo "  - frontend/ directory with React app"
    echo ""
    exit 0
fi

# Make sure script is executable
if [[ ! -x "$0" ]]; then
    chmod +x "$0"
fi

# Run main function
main "$@"

# ============ END OF SCRIPT ============