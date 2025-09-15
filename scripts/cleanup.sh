#!/bin/bash

# MarketPulse Cleanup Script
# Removes all GCP resources created for MarketPulse

set -e

PROJECT_ID=${1:-"marketpulse-app"}
REGION="us-central1"

echo "🗑️ Cleaning up MarketPulse GCP resources..."
echo "⚠️  WARNING: This will delete ALL MarketPulse resources!"
echo "Project ID: $PROJECT_ID"
echo ""

read -p "Are you sure you want to continue? (yes/no): " -r
if [[ ! $REPLY =~ ^yes$ ]]; then
    echo "Cleanup cancelled."
    exit 1
fi

# Delete Kubernetes resources
echo "🎯 Deleting Kubernetes resources..."
kubectl delete namespace marketpulse --ignore-not-found=true || true

# Delete GKE cluster
echo "🎯 Deleting GKE cluster..."
gcloud container clusters delete marketpulse-cluster --region=$REGION --quiet || true

# Delete Cloud SQL instances
echo "🗄️ Deleting Cloud SQL instances..."
gcloud sql instances delete marketpulse-users-db --quiet || true
gcloud sql instances delete marketpulse-articles-db --quiet || true

# Delete Redis instance
echo "🔴 Deleting Redis instance..."
gcloud redis instances delete marketpulse-redis --region=$REGION --quiet || true

# Delete static IP
echo "🌐 Deleting static IP..."
gcloud compute addresses delete marketpulse-ip --global --quiet || true

# Delete Artifact Registry repository
echo "📦 Deleting Artifact Registry repository..."
gcloud artifacts repositories delete marketpulse-repo --location=$REGION --quiet || true

echo "✅ Cleanup complete!"
echo ""
echo "📋 All MarketPulse resources have been removed:"
echo "- GKE cluster: marketpulse-cluster"
echo "- Cloud SQL instances: marketpulse-users-db, marketpulse-articles-db"
echo "- Redis instance: marketpulse-redis"
echo "- Static IP: marketpulse-ip"
echo "- Artifact Registry: marketpulse-repo"
