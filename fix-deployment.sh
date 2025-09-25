#!/bin/bash

echo "🔧 Fixing MarketPulse Deployment Issues"
echo "======================================"

EC2_IP="3.144.189.176"
KEY_FILE="marketpulse-key.pem"

echo "📋 Issues identified:"
echo "1. ❌ Frontend container failed due to missing Express dependency"
echo "2. ❌ Security groups blocking external access to ports"
echo ""

echo "🔧 Step 1: Fixing frontend container..."
echo "Uploading fixed configuration..."

# Upload the fixed files
scp -i $KEY_FILE Dockerfile.frontend ec2-user@$EC2_IP:~/
scp -i $KEY_FILE src/services/api.js ec2-user@$EC2_IP:~/

echo "🔧 Step 2: Rebuilding frontend container on EC2..."

ssh -i $KEY_FILE ec2-user@$EC2_IP << 'REMOTE_EOF'
# Stop and remove the failed frontend container
docker-compose -f docker-compose.prod.yml stop frontend
docker-compose -f docker-compose.prod.yml rm -f frontend

# Copy the fixed files to the right location
cp Dockerfile.frontend ./
cp api.js src/services/

# Rebuild and start the frontend
docker-compose -f docker-compose.prod.yml up -d --build frontend

# Check the status
echo "📊 Container status:"
docker-compose -f docker-compose.prod.yml ps

# Check frontend logs
echo "📋 Frontend logs:"
docker-compose -f docker-compose.prod.yml logs frontend
REMOTE_EOF

echo ""
echo "🔧 Step 3: Security Group Configuration"
echo "======================================"
echo "⚠️  IMPORTANT: You need to configure your EC2 security group to allow inbound traffic on these ports:"
echo ""
echo "Port 3000 (Frontend):"
echo "  - Type: Custom TCP"
echo "  - Port: 3000"
echo "  - Source: 0.0.0.0/0 (or your IP for security)"
echo ""
echo "Port 8080 (User Service):"
echo "  - Type: Custom TCP" 
echo "  - Port: 8080"
echo "  - Source: 0.0.0.0/0"
echo ""
echo "Port 8081 (Article Service):"
echo "  - Type: Custom TCP"
echo "  - Port: 8081" 
echo "  - Source: 0.0.0.0/0"
echo ""
echo "Port 5001 (Analysis Service):"
echo "  - Type: Custom TCP"
echo "  - Port: 5001"
echo "  - Source: 0.0.0.0/0"
echo ""
echo "🌐 After configuring security groups, your app will be available at:"
echo "   http://$EC2_IP:3000"
echo ""
echo "✅ Run this script again after updating security groups to verify the fix!"
