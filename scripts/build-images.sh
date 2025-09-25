#!/bin/bash

# MarketPulse Container Build Script
# Builds all container images locally

set -e

echo "🔨 Building MarketPulse container images..."

# Build user service
echo "👤 Building user-service..."
cd backend/user-service
docker build -t marketpulse/user-service:latest .
cd ../..

# Build article service
echo "📰 Building article-service..."
cd backend/article-storage-service
docker build -t marketpulse/article-service:latest .
cd ../..

# Build analysis service
echo "🔍 Building analysis-service..."
cd backend/analysis-service
docker build -t marketpulse/analysis-service:latest .
cd ../..

# Build frontend
echo "🌐 Building frontend..."
docker build -f Dockerfile.frontend -t marketpulse/frontend:latest .

echo "✅ All images built successfully!"
echo ""
echo "📦 Images available locally:"
echo "- marketpulse/user-service:latest"
echo "- marketpulse/article-service:latest"
echo "- marketpulse/analysis-service:latest"
echo "- marketpulse/frontend:latest"

