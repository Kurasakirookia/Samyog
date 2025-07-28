#!/bin/bash

# ============ EDUMANAGE DEPLOYMENT SCRIPT ============
# Automated deployment script for GitHub and Netlify
# Usage: ./deploy.sh [environment]
# Environments: dev, staging, production

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default environment
ENVIRONMENT=${1:-production}

echo -e "${BLUE}🚀 Starting EduManage Deployment - Environment: $ENVIRONMENT${NC}"

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

check_prerequisites() {
    print_step "Checking prerequisites..."
    
    # Check if Node.js is installed
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 16+ and try again."
        exit 1
    fi
    
    # Check if Git is installed
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed. Please install Git and try again."
        exit 1
    fi
    
    # Check if we're in a git repository
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        print_error "Not in a Git repository. Please initialize Git first."
        exit 1
    fi
    
    print_success "Prerequisites check passed"
}

install_dependencies() {
    print_step "Installing dependencies..."
    
    # Frontend dependencies
    if [ -d "frontend" ]; then
        print_step "Installing frontend dependencies..."
        cd frontend
        npm install
        cd ..
        print_success "Frontend dependencies installed"
    fi
    
    # Backend dependencies
    if [ -d "backend" ]; then
        print_step "Installing backend dependencies..."
        cd backend
        npm install
        cd ..
        print_success "Backend dependencies installed"
    fi
}

run_tests() {
    print_step "Running tests..."
    
    # Frontend tests
    if [ -d "frontend" ]; then
        print_step "Running frontend tests..."
        cd frontend
        if npm test -- --coverage --watchAll=false; then
            print_success "Frontend tests passed"
        else
            print_warning "Frontend tests failed, but continuing deployment"
        fi
        cd ..
    fi
    
    # Backend tests (if available)
    if [ -d "backend" ] && [ -f "backend/package.json" ]; then
        cd backend
        if grep -q "\"test\"" package.json; then
            print_step "Running backend tests..."
            if npm test; then
                print_success "Backend tests passed"
            else
                print_warning "Backend tests failed, but continuing deployment"
            fi
        fi
        cd ..
    fi
}

build_frontend() {
    print_step "Building frontend..."
    
    if [ -d "frontend" ]; then
        cd frontend
        
        # Set environment variables based on deployment environment
        case $ENVIRONMENT in
            "dev"|"development")
                export REACT_APP_ENV=development
                ;;
            "staging")
                export REACT_APP_ENV=staging
                ;;
            "production")
                export REACT_APP_ENV=production
                ;;
        esac
        
        # Build the application
        if npm run build; then
            print_success "Frontend build completed successfully"
        else
            print_error "Frontend build failed"
            exit 1
        fi
        
        cd ..
    else
        print_warning "Frontend directory not found, skipping frontend build"
    fi
}

check_env_files() {
    print_step "Checking environment files..."
    
    # Check frontend environment
    if [ -d "frontend" ]; then
        if [ ! -f "frontend/.env.local" ]; then
            print_warning "Frontend .env.local not found. Please create it from .env.example"
            if [ -f "frontend/.env.example" ]; then
                echo "You can copy: cp frontend/.env.example frontend/.env.local"
            fi
        else
            print_success "Frontend environment file found"
        fi
    fi
    
    # Check backend environment
    if [ -d "backend" ]; then
        if [ ! -f "backend/.env" ]; then
            print_warning "Backend .env not found. Please create it from .env.example"
            if [ -f "backend/.env.example" ]; then
                echo "You can copy: cp backend/.env.example backend/.env"
            fi
        else
            print_success "Backend environment file found"
        fi
    fi
}

commit_and_push() {
    print_step "Committing and pushing to GitHub..."
    
    # Check if there are any changes
    if [[ -n $(git status --porcelain) ]]; then
        print_step "Adding all changes..."
        git add .
        
        # Get commit message from user or use default
        if [ -z "$2" ]; then
            COMMIT_MESSAGE="Deploy to $ENVIRONMENT - $(date '+%Y-%m-%d %H:%M:%S')"
        else
            COMMIT_MESSAGE="$2"
        fi
        
        print_step "Committing changes..."
        git commit -m "$COMMIT_MESSAGE"
        
        print_step "Pushing to GitHub..."
        git push origin main
        
        print_success "Code pushed to GitHub successfully"
    else
        print_warning "No changes to commit"
    fi
}

deploy_to_netlify() {
    print_step "Deploying to Netlify..."
    
    # Check if Netlify CLI is installed
    if ! command -v netlify &> /dev/null; then
        print_warning "Netlify CLI not found. Installing..."
        npm install -g netlify-cli
    fi
    
    # Login check
    if ! netlify status &> /dev/null; then
        print_warning "Not logged in to Netlify. Please login:"
        netlify login
    fi
    
    # Deploy based on environment
    cd frontend
    case $ENVIRONMENT in
        "dev"|"development")
            print_step "Deploying as draft..."
            netlify deploy --dir=build
            ;;
        "staging")
            print_step "Deploying to staging..."
            netlify deploy --dir=build
            ;;
        "production")
            print_step "Deploying to production..."
            netlify deploy --prod --dir=build
            ;;
    esac
    
    cd ..
    print_success "Netlify deployment completed"
}

generate_deployment_info() {
    print_step "Generating deployment information..."
    
    # Get Git information
    GIT_COMMIT=$(git rev-parse HEAD)
    GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
    DEPLOY_TIME=$(date '+%Y-%m-%d %H:%M:%S')
    
    # Create deployment info file
    cat > DEPLOYMENT_INFO.md << EOF
# 🚀 Deployment Information

**Environment:** $ENVIRONMENT
**Deploy Time:** $DEPLOY_TIME
**Git Branch:** $GIT_BRANCH
**Git Commit:** $GIT_COMMIT

## 🔗 URLs
- **Frontend:** [Update with your Netlify URL]
- **Backend:** [Update with your backend URL]
- **Admin Panel:** [Frontend URL]/admin

## 📋 Deployment Checklist
- [x] Dependencies installed
- [x] Tests run
- [x] Frontend built successfully
- [x] Code committed and pushed
- [x] Deployed to Netlify

## 🔍 Next Steps
1. Test the live application
2. Verify all features work correctly
3. Update DNS settings if needed
4. Monitor for errors

---
Generated on $DEPLOY_TIME
EOF

    print_success "Deployment information saved to DEPLOYMENT_INFO.md"
}

# ============ MAIN DEPLOYMENT FLOW ============

main() {
    echo -e "${GREEN}"
    echo "╔════════════════════════════════════════╗"
    echo "║          EduManage Deployment          ║"
    echo "║        GitHub + Netlify Deploy         ║"
    echo "╚════════════════════════════════════════╝"
    echo -e "${NC}"
    
    # Run deployment steps
    check_prerequisites
    check_env_files
    install_dependencies
    run_tests
    build_frontend
    commit_and_push "$ENVIRONMENT" "$2"
    deploy_to_netlify
    generate_deployment_info
    
    echo -e "\n${GREEN}🎉 Deployment completed successfully!${NC}"
    echo -e "${BLUE}📝 Check DEPLOYMENT_INFO.md for details${NC}"
    echo -e "${YELLOW}🔍 Don't forget to test your live application${NC}"
}

# ============ SCRIPT EXECUTION ============

# Check if help is requested
if [[ "$1" == "-h" || "$1" == "--help" ]]; then
    echo "EduManage Deployment Script"
    echo ""
    echo "Usage: ./deploy.sh [environment] [commit_message]"
    echo ""
    echo "Environments:"
    echo "  dev/development  - Deploy as draft"
    echo "  staging         - Deploy to staging"
    echo "  production      - Deploy to production (default)"
    echo ""
    echo "Example:"
    echo "  ./deploy.sh production \"Add new feature\""
    echo "  ./deploy.sh dev"
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