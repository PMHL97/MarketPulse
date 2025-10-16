#!/bin/bash

# Market Pulse - Remote Deployment Script
# Downloads and deploys the updated Market Pulse with AI as main experience

set -e  # Exit on any error

echo "🚀 Market Pulse - Remote Deployment Script"
echo "=========================================="

# Configuration
S3_BUCKET="marketpulse-deployment-20251009004942"
EC2_IP="3.144.189.176"
SECURITY_GROUP="sg-03141136bf89fbc1c"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Download deployment package
download_package() {
    print_status "Downloading deployment package from S3..."
    
    # Download the package
    aws s3 cp s3://$S3_BUCKET/marketpulse-deployment.tar.gz /tmp/marketpulse-deployment.tar.gz
    
    print_success "Deployment package downloaded"
}

# Extract and prepare
extract_package() {
    print_status "Extracting deployment package..."
    
    # Create deployment directory
    mkdir -p /home/ec2-user/marketpulse-new
    
    # Extract package
    tar -xzf /tmp/marketpulse-deployment.tar.gz -C /home/ec2-user/marketpulse-new
    
    # Navigate to project directory
    cd /home/ec2-user/marketpulse-new
    
    print_success "Package extracted successfully"
}

# Build Docker images
build_images() {
    print_status "Building Docker images..."
    
    # Build AI frontend (will become main)
    print_status "Building AI frontend..."
    docker build -t marketpulse-ai:latest -f vite.config.ai.js .
    
    # Build classic frontend
    print_status "Building classic frontend..."
    docker build -t marketpulse-classic:latest -f vite.config.classic.js .
    
    # Build main frontend (backup)
    print_status "Building main frontend..."
    docker build -t marketpulse-frontend:latest .
    
    # Build stock data service
    print_status "Building stock data service..."
    docker build -f backend/stock-data-service/Dockerfile.aws -t marketpulse-stock-data:latest backend/stock-data-service/
    
    print_success "All Docker images built successfully"
}

# Deploy services
deploy_services() {
    print_status "Deploying services..."
    
    # Start backend services (don't stop existing frontend yet)
    print_status "Starting backend services..."
    docker-compose up -d
    
    # Start new frontend variants on NEW ports (keep port 3000 running)
    print_status "Starting AI frontend on port 3002 (will become main)..."
    docker run -d --name marketpulse-ai -p 3002:3000 --restart unless-stopped marketpulse-ai:latest
    
    print_status "Starting classic frontend on port 3001..."
    docker run -d --name marketpulse-classic -p 3001:3000 --restart unless-stopped marketpulse-classic:latest
    
    print_status "Starting main frontend on port 3003 (backup)..."
    docker run -d --name marketpulse-main -p 3003:3000 --restart unless-stopped marketpulse-frontend:latest
    
    print_status "Starting stock data service on port 5003..."
    docker run -d --name marketpulse-stock-data -p 5003:5003 --restart unless-stopped marketpulse-stock-data:latest
    
    print_success "All new services deployed"
    print_warning "Port 3000 (current production) is still running"
    print_status "Test new services before switching traffic"
}

# Update security groups
update_security_groups() {
    print_status "Updating security groups..."
    
    # Add new ports to security group
    print_status "Adding ports 3001, 3002, 3003, 5003 to security group..."
    
    # Port 3001 - Classic frontend
    aws ec2 authorize-security-group-ingress \
        --group-id "$SECURITY_GROUP" \
        --protocol tcp \
        --port 3001 \
        --cidr 0.0.0.0/0 || print_warning "Port 3001 may already be open"
    
    # Port 3002 - AI frontend (will become main)
    aws ec2 authorize-security-group-ingress \
        --group-id "$SECURITY_GROUP" \
        --protocol tcp \
        --port 3002 \
        --cidr 0.0.0.0/0 || print_warning "Port 3002 may already be open"
    
    # Port 3003 - Main frontend (backup)
    aws ec2 authorize-security-group-ingress \
        --group-id "$SECURITY_GROUP" \
        --protocol tcp \
        --port 3003 \
        --cidr 0.0.0.0/0 || print_warning "Port 3003 may already be open"
    
    # Port 5003 - Stock data service
    aws ec2 authorize-security-group-ingress \
        --group-id "$SECURITY_GROUP" \
        --protocol tcp \
        --port 5003 \
        --cidr 0.0.0.0/0 || print_warning "Port 5003 may already be open"
    
    print_success "Security groups updated"
}

# Health checks
run_health_checks() {
    print_status "Running health checks..."
    
    # Wait for services to start
    print_status "Waiting for services to start..."
    sleep 30
    
    # Check AI frontend (will become main)
    if curl -f -s "http://localhost:3002" > /dev/null; then
        print_success "AI frontend (port 3002) is healthy"
    else
        print_error "AI frontend (port 3002) is not responding"
    fi
    
    # Check classic frontend
    if curl -f -s "http://localhost:3001" > /dev/null; then
        print_success "Classic frontend (port 3001) is healthy"
    else
        print_error "Classic frontend (port 3001) is not responding"
    fi
    
    # Check main frontend (backup)
    if curl -f -s "http://localhost:3003" > /dev/null; then
        print_success "Main frontend (port 3003) is healthy"
    else
        print_error "Main frontend (port 3003) is not responding"
    fi
    
    # Check stock data service
    if curl -f -s "http://localhost:5003/api/health" > /dev/null; then
        print_success "Stock data service (port 5003) is healthy"
    else
        print_error "Stock data service (port 5003) is not responding"
    fi
}

# Switch port 3000 to AI frontend
switch_port_3000() {
    print_status "Switching port 3000 to AI frontend (main experience)..."
    
    # Stop old service on port 3000
    print_status "Stopping old service on port 3000..."
    docker stop $(docker ps -q --filter "publish=3000") || true
    
    # Start AI frontend on port 3000 (main experience)
    print_status "Starting AI frontend on port 3000 (main experience)..."
    docker run -d --name marketpulse-production -p 3000:3000 --restart unless-stopped marketpulse-ai:latest
    
    print_success "Port 3000 switched to AI frontend (main experience)"
    print_warning "Brief downtime during switch (2-3 minutes)"
}

# Display access information
show_access_info() {
    print_success "Deployment completed successfully!"
    echo ""
    echo "🌐 Access your updated Market Pulse platform:"
    echo "=============================================="
    echo "AI Frontend (Main): http://$EC2_IP:3000 (main experience)"
    echo "Classic Frontend:   http://$EC2_IP:3001"
    echo "Main Frontend:     http://$EC2_IP:3003 (backup)"
    echo "Stock Data API:    http://$EC2_IP:5003/api/health"
    echo ""
    echo "📊 Health Check URLs:"
    echo "AI Frontend (Main): http://$EC2_IP:3000/health"
    echo "Classic Frontend:   http://$EC2_IP:3001/health"
    echo "Main Frontend:      http://$EC2_IP:3003/health"
    echo "Stock Data API:     http://$EC2_IP:5003/api/health"
    echo ""
    echo "🔄 Rollback command (if needed):"
    echo "docker stop marketpulse-production marketpulse-ai marketpulse-classic marketpulse-stock-data"
    echo "docker-compose up -d"
}

# Main deployment function
main() {
    echo "Starting Market Pulse deployment..."
    echo "Target: $EC2_IP"
    echo "S3 Bucket: $S3_BUCKET"
    echo ""
    
    # Run deployment steps
    download_package
    extract_package
    build_images
    deploy_services
    update_security_groups
    run_health_checks
    
    # Ask if user wants to switch port 3000 to AI frontend
    echo ""
    print_warning "New services are running on ports 3001, 3002, 3003, 5003"
    print_warning "Port 3000 (current production) is still running"
    print_status "AI frontend will become the main experience on port 3000"
    print_status "Classic frontend will be available on port 3001"
    echo ""
    read -p "Switch port 3000 to AI frontend (main experience)? This will cause 2-3 minutes downtime (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        switch_port_3000
    else
        print_status "Port 3000 switch skipped. You can switch later manually."
    fi
    
    show_access_info
    print_success "Market Pulse deployment completed successfully! 🚀"
}

# Run main function
main "$@"


