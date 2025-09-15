#!/bin/bash

# MarketPulse Container Build Script
# Builds and pushes all container images to Google Artifact Registry

set -e

PROJECT_ID=${1:-"marketpulse-app"}
REGION="us-central1"
REPOSITORY="marketpulse-repo"

echo "🔨 Building MarketPulse container images..."
echo "Project ID: $PROJECT_ID"

# Configure Docker for Artifact Registry
echo "🔐 Configuring Docker authentication..."
gcloud auth configure-docker $REGION-docker.pkg.dev

# Build and push user service
echo "👤 Building user-service..."
cd backend/user-service
docker build -t $REGION-docker.pkg.dev/$PROJECT_ID/$REPOSITORY/user-service:latest .
docker push $REGION-docker.pkg.dev/$PROJECT_ID/$REPOSITORY/user-service:latest
cd ../..

# Build and push article service
echo "📰 Building article-service..."
cd backend/article-storage-service
docker build -t $REGION-docker.pkg.dev/$PROJECT_ID/$REPOSITORY/article-service:latest .
docker push $REGION-docker.pkg.dev/$PROJECT_ID/$REPOSITORY/article-service:latest
cd ../..

# Build and push analysis service
echo "🔍 Building analysis-service..."
cd backend/analysis-service
docker build -t $REGION-docker.pkg.dev/$PROJECT_ID/$REPOSITORY/analysis-service:latest .
docker push $REGION-docker.pkg.dev/$PROJECT_ID/$REPOSITORY/analysis-service:latest
cd ../..

# Build and push frontend
echo "🌐 Building frontend..."
docker build -f Dockerfile.frontend -t $REGION-docker.pkg.dev/$PROJECT_ID/$REPOSITORY/frontend:latest .
docker push $REGION-docker.pkg.dev/$PROJECT_ID/$REPOSITORY/frontend:latest

echo "✅ All images built and pushed successfully!"
echo ""
echo "📦 Images available at:"
echo "- $REGION-docker.pkg.dev/$PROJECT_ID/$REPOSITORY/user-service:latest"
echo "- $REGION-docker.pkg.dev/$PROJECT_ID/$REPOSITORY/article-service:latest"
echo "- $REGION-docker.pkg.dev/$PROJECT_ID/$REPOSITORY/analysis-service:latest"
echo "- $REGION-docker.pkg.dev/$PROJECT_ID/$REPOSITORY/frontend:latest"
