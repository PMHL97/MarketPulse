#!/bin/bash

# Market Pulse - AWS Deployment Script
# For existing AWS infrastructure at 3.144.189.176

set -e  # Exit on any error

echo "🚀 Market Pulse - AWS Deployment Script"
echo "======================================"

# Configuration
EC2_IP="3.144.189.176"
SECURITY_GROUP="sg-03141136bf89fbc1c"
BACKUP_NAME="marketpulse-backup-$(date +%Y%m%d-%H%M)"

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

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    if ! command_exists docker; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command_exists aws; then
        print_warning "AWS CLI not found. Some features may not work."
    fi
    
    print_success "Prerequisites check completed"
}

# Create backup
create_backup() {
    print_status "Creating backup of current deployment..."
    
    if command_exists aws; then
        # Get current instance ID (you'll need to provide this)
        read -p "Enter your EC2 instance ID: " INSTANCE_ID
        
        print_status "Creating AMI backup: $BACKUP_NAME"
        aws ec2 create-image \
            --instance-id "$INSTANCE_ID" \
            --name "$BACKUP_NAME" \
            --description "Backup before Market Pulse update" \
            --no-reboot
        
        print_success "Backup created: $BACKUP_NAME"
    else
        print_warning "AWS CLI not available. Please create manual backup."
    fi
}

# Build Docker images
build_images() {
    print_status "Building Docker images..."
    
    # Build main frontend
    print_status "Building main frontend..."
    docker build -t marketpulse-frontend:latest .
    
    # Build AI frontend
    print_status "Building AI frontend..."
    docker build -t marketpulse-ai:latest -f Dockerfile.ai .
    
    # Build classic frontend
    print_status "Building classic frontend..."
    docker build -t marketpulse-classic:latest -f Dockerfile.classic .
    
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
    
    if command_exists aws; then
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
    else
        print_warning "AWS CLI not available. Please manually update security groups:"
        print_warning "Add ports: 3001, 3002, 3003, 5003 to security group $SECURITY_GROUP"
    fi
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
    echo "Starting Market Pulse deployment to AWS..."
    echo "Target: $EC2_IP"
    echo "Security Group: $SECURITY_GROUP"
    echo ""
    
    # Check if running on the correct server
    if [[ "$(curl -s ifconfig.me)" != "$EC2_IP" ]]; then
        print_warning "This script should be run on the EC2 instance ($EC2_IP)"
        print_warning "Current IP: $(curl -s ifconfig.me)"
        read -p "Continue anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
    
    # Run deployment steps
    check_prerequisites
    create_backup
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
