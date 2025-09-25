#!/bin/bash

# Update Kubernetes manifests with local values
# This script replaces placeholders in the K8s manifests with local values

set -e

DOMAIN_NAME=${1:-"localhost"}

echo "🔧 Updating Kubernetes manifests..."
echo "Domain: $DOMAIN_NAME"

# Update all manifests
echo "🔄 Updating manifest files..."

# Update image references to use local images
find k8s/ -name "*.yaml" -exec sed -i.bak "s|gcr.io/PROJECT_ID|marketpulse|g" {} \;

# Update domain name
find k8s/ -name "*.yaml" -exec sed -i.bak "s|DOMAIN_NAME|$DOMAIN_NAME|g" {} \;

# Clean up backup files
find k8s/ -name "*.bak" -delete

echo "✅ Manifests updated successfully!"
echo ""
echo "📝 Updated values:"
echo "- Domain: $DOMAIN_NAME"
echo "- Images: Using local marketpulse/* images"

