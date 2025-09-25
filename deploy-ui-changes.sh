#!/bin/bash

echo "🚀 Deploying Frontend UI Changes to EC2"
echo "======================================"

EC2_IP="3.144.189.176"
KEY_FILE="marketpulse-key.pem"

echo "📦 Creating deployment package with UI changes..."

# Create a deployment package with only the necessary files
tar -czf ui-changes.tar.gz \
    --exclude=node_modules \
    --exclude=.git \
    --exclude=target \
    --exclude=*.log \
    --exclude=.DS_Store \
    --exclude=backend \
    --exclude=k8s \
    --exclude=scripts \
    --exclude=*.tar.gz \
    .

echo "📤 Uploading UI changes to EC2..."

# Upload to EC2
scp -i $KEY_FILE ui-changes.tar.gz ec2-user@$EC2_IP:~/

echo "🔧 Deploying UI changes on EC2..."

# Connect and deploy
ssh -i $KEY_FILE ec2-user@$EC2_IP << 'REMOTE_EOF'
# Extract the updated files
tar -xzf ui-changes.tar.gz
rm ui-changes.tar.gz

# Rebuild and restart the frontend container
echo "🔄 Rebuilding frontend with UI changes..."
docker-compose -f docker-compose.prod.yml stop frontend
docker-compose -f docker-compose.prod.yml rm -f frontend
docker-compose -f docker-compose.prod.yml up -d --build frontend

# Check the status
echo "📊 Container status:"
docker-compose -f docker-compose.prod.yml ps

# Check frontend logs
echo "📋 Frontend logs:"
docker-compose -f docker-compose.prod.yml logs --tail=10 frontend

echo "✅ UI changes deployed successfully!"
REMOTE_EOF

# Clean up local files
rm ui-changes.tar.gz

echo ""
echo "🎉 Frontend UI changes deployed!"
echo "🌍 Your updated app is available at: http://$EC2_IP:3000"
echo ""
echo "💡 If you can't access it, make sure your EC2 security group allows inbound traffic on port 3000"
