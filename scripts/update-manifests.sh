#!/bin/bash

# Update Kubernetes manifests with actual GCP resource values
# This script replaces placeholders in the K8s manifests with real values

set -e

PROJECT_ID=${1:-"marketpulse-app"}
DOMAIN_NAME=${2:-"your-domain.com"}
REGION="us-central1"

echo "🔧 Updating Kubernetes manifests..."
echo "Project ID: $PROJECT_ID"
echo "Domain: $DOMAIN_NAME"

# Get database and Redis IPs
echo "📋 Fetching database connection info..."
USERS_DB_IP=$(gcloud sql instances describe marketpulse-users-db --format="value(ipAddresses[0].ipAddress)" 2>/dev/null || echo "POSTGRES_USERS_HOST")
ARTICLES_DB_IP=$(gcloud sql instances describe marketpulse-articles-db --format="value(ipAddresses[0].ipAddress)" 2>/dev/null || echo "POSTGRES_ARTICLES_HOST")
REDIS_IP=$(gcloud redis instances describe marketpulse-redis --region=$REGION --format="value(host)" 2>/dev/null || echo "REDIS_HOST")

echo "Users DB IP: $USERS_DB_IP"
echo "Articles DB IP: $ARTICLES_DB_IP"
echo "Redis IP: $REDIS_IP"

# Update all manifests
echo "🔄 Updating manifest files..."

# Update image references
find k8s/ -name "*.yaml" -exec sed -i.bak "s|gcr.io/PROJECT_ID|$REGION-docker.pkg.dev/$PROJECT_ID/marketpulse-repo|g" {} \;

# Update database hosts
find k8s/ -name "*.yaml" -exec sed -i.bak "s|POSTGRES_USERS_HOST|$USERS_DB_IP|g" {} \;
find k8s/ -name "*.yaml" -exec sed -i.bak "s|POSTGRES_ARTICLES_HOST|$ARTICLES_DB_IP|g" {} \;
find k8s/ -name "*.yaml" -exec sed -i.bak "s|REDIS_HOST|$REDIS_IP|g" {} \;

# Update domain name
find k8s/ -name "*.yaml" -exec sed -i.bak "s|DOMAIN_NAME|$DOMAIN_NAME|g" {} \;

# Clean up backup files
find k8s/ -name "*.bak" -delete

echo "✅ Manifests updated successfully!"
echo ""
echo "📝 Updated values:"
echo "- Project ID: $PROJECT_ID"
echo "- Domain: $DOMAIN_NAME"
echo "- Users DB: $USERS_DB_IP"
echo "- Articles DB: $ARTICLES_DB_IP"
echo "- Redis: $REDIS_IP"
