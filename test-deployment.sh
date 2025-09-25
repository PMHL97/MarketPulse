#!/bin/bash

echo "🔍 Testing MarketPulse Deployment"
echo "================================="

EC2_IP="3.144.189.176"

echo "Testing service endpoints..."
echo ""

# Test Frontend
echo "🌐 Testing Frontend (Port 3000):"
if curl -s -o /dev/null -w "%{http_code}" "http://$EC2_IP:3000" | grep -q "200"; then
    echo "✅ Frontend is responding"
else
    echo "❌ Frontend is not responding"
fi

# Test User Service
echo "👤 Testing User Service (Port 8080):"
if curl -s -o /dev/null -w "%{http_code}" "http://$EC2_IP:8080/actuator/health" | grep -q "200"; then
    echo "✅ User Service is responding"
else
    echo "❌ User Service is not responding"
fi

# Test Article Service
echo "📰 Testing Article Service (Port 8081):"
if curl -s -o /dev/null -w "%{http_code}" "http://$EC2_IP:8081/actuator/health" | grep -q "200"; then
    echo "✅ Article Service is responding"
else
    echo "❌ Article Service is not responding"
fi

# Test Analysis Service
echo "📊 Testing Analysis Service (Port 5001):"
if curl -s -o /dev/null -w "%{http_code}" "http://$EC2_IP:5001/health" | grep -q "200"; then
    echo "✅ Analysis Service is responding"
else
    echo "❌ Analysis Service is not responding"
fi

echo ""
echo "🔧 If services are not responding, try:"
echo "1. Check if Docker containers are running on EC2"
echo "2. Verify security group allows inbound traffic on ports 3000, 8080, 8081, 5001"
echo "3. Rebuild and redeploy the application"
echo ""
echo "📱 Access your app at: http://$EC2_IP:3000"
