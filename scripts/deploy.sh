#!/bin/bash

# MarketPulse Deployment Script
# Deploys all services to local Kubernetes cluster

set -e

echo "🚀 Deploying MarketPulse to local Kubernetes..."

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

echo ""
echo "🌍 Application Status:"
echo "- Services are running in the marketpulse namespace"
echo "- Use port-forwarding to access services locally"
echo ""
echo "🔧 Useful commands:"
echo "- Check pods: kubectl get pods -n marketpulse"
echo "- View logs: kubectl logs -f deployment/SERVICE_NAME -n marketpulse"
echo "- Port forward: kubectl port-forward service/SERVICE_NAME PORT:PORT -n marketpulse"
echo "- Access frontend: kubectl port-forward service/frontend 3000:80 -n marketpulse"

