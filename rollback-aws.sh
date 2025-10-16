#!/bin/bash

# Market Pulse - AWS Rollback Script
# For rolling back to previous version

set -e  # Exit on any error

echo "🔄 Market Pulse - AWS Rollback Script"
echo "===================================="

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

# Quick rollback (stop new services, restart old)
quick_rollback() {
    print_status "Performing quick rollback..."
    
    # Stop new services
    print_status "Stopping new services..."
    docker stop marketpulse-main marketpulse-ai marketpulse-classic marketpulse-stock-data || true
    docker rm marketpulse-main marketpulse-ai marketpulse-classic marketpulse-stock-data || true
    
    # Restart original services
    print_status "Restarting original services..."
    docker-compose up -d
    
    print_success "Quick rollback completed"
    print_status "Original services should be running on ports 3000, 8080, 8081, 5001"
}

# Full rollback (restore from AMI)
full_rollback() {
    print_status "Performing full rollback from AMI backup..."
    
    if command -v aws >/dev/null 2>&1; then
        # List available AMI backups
        print_status "Available AMI backups:"
        aws ec2 describe-images \
            --owners self \
            --filters "Name=name,Values=marketpulse-backup-*" \
            --query 'Images[*].[ImageId,Name,CreationDate]' \
            --output table
        
        read -p "Enter AMI ID to restore from: " AMI_ID
        
        if [ -z "$AMI_ID" ]; then
            print_error "No AMI ID provided"
            exit 1
        fi
        
        print_warning "This will create a new instance from the backup AMI"
        print_warning "You'll need to update your DNS/load balancer to point to the new instance"
        read -p "Continue with full rollback? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_status "Full rollback cancelled"
            exit 0
        fi
        
        # Create new instance from backup
        print_status "Creating new instance from backup AMI: $AMI_ID"
        aws ec2 run-instances \
            --image-id "$AMI_ID" \
            --instance-type t3.medium \
            --key-name your-key-name \
            --security-group-ids sg-03141136bf89fbc1c \
            --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=marketpulse-rollback}]'
        
        print_success "New instance created from backup"
        print_warning "Please update your DNS/load balancer to point to the new instance IP"
        
    else
        print_error "AWS CLI not available. Cannot perform full rollback."
        print_status "Please manually restore from your AMI backup"
    fi
}

# Show current status
show_status() {
    print_status "Current service status:"
    echo ""
    
    # Check Docker containers
    print_status "Docker containers:"
    docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    echo ""
    
    # Check port availability
    print_status "Port status:"
    for port in 3000 3001 3002 3003 8080 8081 5001 5003; do
        if netstat -tuln | grep -q ":$port "; then
            print_success "Port $port is open"
        else
            print_warning "Port $port is not open"
        fi
    done
    echo ""
    
    # Check service health
    print_status "Service health checks:"
    for url in "http://localhost:3000" "http://localhost:3001" "http://localhost:3002" "http://localhost:3003"; do
        if curl -f -s "$url" > /dev/null; then
            print_success "$url is responding"
        else
            print_warning "$url is not responding"
        fi
    done
}

# Main function
main() {
    echo "Choose rollback option:"
    echo "1. Quick rollback (stop new services, restart old)"
    echo "2. Full rollback (restore from AMI backup)"
    echo "3. Show current status"
    echo "4. Exit"
    echo ""
    read -p "Enter your choice (1-4): " choice
    
    case $choice in
        1)
            quick_rollback
            ;;
        2)
            full_rollback
            ;;
        3)
            show_status
            ;;
        4)
            print_status "Exiting..."
            exit 0
            ;;
        *)
            print_error "Invalid choice"
            exit 1
            ;;
    esac
}

# Run main function
main "$@"


