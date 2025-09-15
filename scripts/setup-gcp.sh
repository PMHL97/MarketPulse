#!/bin/bash

# MarketPulse GCP Setup Script
# This script sets up the entire GCP infrastructure for MarketPulse

set -e

# Configuration
PROJECT_ID=${1:-"marketpulse-app"}  # Pass as first argument or use default
REGION="us-central1"
ZONE="us-central1-a"
CLUSTER_NAME="marketpulse-cluster"

echo "🚀 Setting up MarketPulse on GCP..."
echo "Project ID: $PROJECT_ID"
echo "Region: $REGION"

# Set the project
gcloud config set project $PROJECT_ID

# Enable required APIs
echo "📋 Enabling required GCP APIs..."
gcloud services enable container.googleapis.com
gcloud services enable sqladmin.googleapis.com
gcloud services enable redis.googleapis.com
gcloud services enable secretmanager.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable artifactregistry.googleapis.com

# Create Artifact Registry repository
echo "📦 Creating Artifact Registry repository..."
gcloud artifacts repositories create marketpulse-repo \
  --repository-format=docker \
  --location=$REGION \
  --description="MarketPulse container images" || true

# Create GKE cluster
echo "🎯 Creating GKE cluster..."
gcloud container clusters create $CLUSTER_NAME \
  --region=$REGION \
  --num-nodes=1 \
  --machine-type=e2-standard-2 \
  --disk-size=20GB \
  --enable-autoscaling \
  --min-nodes=1 \
  --max-nodes=5 \
  --enable-autorepair \
  --enable-autoupgrade \
  --addons=HttpLoadBalancing,HorizontalPodAutoscaling

# Get cluster credentials
echo "🔐 Getting cluster credentials..."
gcloud container clusters get-credentials $CLUSTER_NAME --region=$REGION

# Create Cloud SQL instances
echo "🗄️ Creating Cloud SQL instances..."

# Users database
gcloud sql instances create marketpulse-users-db \
  --database-version=POSTGRES_14 \
  --tier=db-f1-micro \
  --region=$REGION \
  --storage-type=SSD \
  --storage-size=10GB \
  --storage-auto-increase \
  --backup-start-time=03:00 \
  --enable-bin-log \
  --maintenance-window-day=SUN \
  --maintenance-window-hour=04 \
  --maintenance-release-channel=production || true

# Articles database  
gcloud sql instances create marketpulse-articles-db \
  --database-version=POSTGRES_14 \
  --tier=db-f1-micro \
  --region=$REGION \
  --storage-type=SSD \
  --storage-size=10GB \
  --storage-auto-increase \
  --backup-start-time=04:00 \
  --enable-bin-log \
  --maintenance-window-day=SUN \
  --maintenance-window-hour=05 \
  --maintenance-release-channel=production || true

# Create databases
echo "🏗️ Creating databases..."
gcloud sql databases create marketpulse_users --instance=marketpulse-users-db || true
gcloud sql databases create marketpulse_articles --instance=marketpulse-articles-db || true

# Create database users
echo "👤 Creating database users..."
gcloud sql users create marketpulse_user \
  --instance=marketpulse-users-db \
  --password=marketpulse_secure_password || true

gcloud sql users create marketpulse_user \
  --instance=marketpulse-articles-db \
  --password=marketpulse_secure_password || true

# Create Redis instance
echo "🔴 Creating Redis instance..."
gcloud redis instances create marketpulse-redis \
  --size=1 \
  --region=$REGION \
  --redis-version=redis_7_0 \
  --tier=basic || true

# Reserve static IP
echo "🌐 Reserving static IP..."
gcloud compute addresses create marketpulse-ip --global || true

# Get IP address
STATIC_IP=$(gcloud compute addresses describe marketpulse-ip --global --format="value(address)")
echo "📍 Static IP: $STATIC_IP"

# Get database connection info
USERS_DB_IP=$(gcloud sql instances describe marketpulse-users-db --format="value(ipAddresses[0].ipAddress)")
ARTICLES_DB_IP=$(gcloud sql instances describe marketpulse-articles-db --format="value(ipAddresses[0].ipAddress)")
REDIS_IP=$(gcloud redis instances describe marketpulse-redis --region=$REGION --format="value(host)")

echo "📋 Database Connection Info:"
echo "Users DB IP: $USERS_DB_IP"
echo "Articles DB IP: $ARTICLES_DB_IP" 
echo "Redis IP: $REDIS_IP"

# Create kubernetes namespace
echo "🎯 Creating Kubernetes namespace..."
kubectl create namespace marketpulse || true

echo "✅ GCP infrastructure setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Update the Kubernetes manifests with the database IPs:"
echo "   - Users DB: $USERS_DB_IP"
echo "   - Articles DB: $ARTICLES_DB_IP"
echo "   - Redis: $REDIS_IP"
echo "2. Update secrets with your actual values"
echo "3. Build and push container images"
echo "4. Deploy the application"
echo ""
echo "🌍 Your static IP is: $STATIC_IP"
echo "Point your domain to this IP address."
