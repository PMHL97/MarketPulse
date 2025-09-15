#!/bin/bash

# MarketPulse Deployment Script
# Deploys all services to GKE

set -e

PROJECT_ID=${1:-"marketpulse-app"}
REGION="us-central1"

echo "🚀 Deploying MarketPulse to GKE..."

# Ensure we're connected to the right cluster
gcloud container clusters get-credentials marketpulse-cluster --region=$REGION --project=$PROJECT_ID

# Apply all Kubernetes manifests in order
echo "📋 Applying Kubernetes manifests..."

# Create namespace first
kubectl apply -f k8s/namespace.yaml

# Apply secrets and config
kubectl apply -f k8s/secrets.yaml

# Deploy services
kubectl apply -f k8s/user-service.yaml
kubectl apply -f k8s/article-service.yaml
kubectl apply -f k8s/analysis-service.yaml
kubectl apply -f k8s/frontend.yaml

# Apply ingress last
kubectl apply -f k8s/ingress.yaml

echo "⏳ Waiting for deployments to be ready..."

# Wait for deployments to be ready
kubectl wait --for=condition=available --timeout=300s deployment/user-service -n marketpulse
kubectl wait --for=condition=available --timeout=300s deployment/article-service -n marketpulse
kubectl wait --for=condition=available --timeout=300s deployment/analysis-service -n marketpulse
kubectl wait --for=condition=available --timeout=300s deployment/frontend -n marketpulse

echo "✅ Deployment complete!"
echo ""
echo "📊 Checking deployment status..."
kubectl get pods -n marketpulse
echo ""
kubectl get services -n marketpulse
echo ""
kubectl get ingress -n marketpulse

# Get the external IP
EXTERNAL_IP=$(kubectl get ingress marketpulse-ingress -n marketpulse -o jsonpath='{.status.loadBalancer.ingress[0].ip}' 2>/dev/null || echo "Pending...")

echo ""
echo "🌍 Application Status:"
echo "- External IP: $EXTERNAL_IP"
echo "- If IP shows 'Pending', wait a few minutes for the load balancer to be provisioned"
echo ""
echo "📝 Next steps:"
echo "1. Point your domain to the external IP: $EXTERNAL_IP"
echo "2. Wait for SSL certificate to be provisioned (can take 10-15 minutes)"
echo "3. Access your app at: https://your-domain.com"
echo ""
echo "🔧 Useful commands:"
echo "- Check pods: kubectl get pods -n marketpulse"
echo "- View logs: kubectl logs -f deployment/SERVICE_NAME -n marketpulse"
echo "- Check ingress: kubectl describe ingress marketpulse-ingress -n marketpulse"
