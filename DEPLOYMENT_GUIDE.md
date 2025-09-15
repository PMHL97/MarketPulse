# MarketPulse GCP Deployment Guide

This guide will help you deploy the MarketPulse application to Google Cloud Platform (GCP) using Google Kubernetes Engine (GKE).

## Prerequisites

Before starting, ensure you have:

1. **Google Cloud SDK** installed and configured
   ```bash
   # Install gcloud CLI
   curl https://sdk.cloud.google.com | bash
   exec -l $SHELL
   gcloud init
   ```

2. **Docker** installed on your local machine

3. **kubectl** installed (comes with gcloud)

4. **A GCP project** with billing enabled

5. **A domain name** (optional, but recommended for production)

## Architecture Overview

The deployment includes:
- **Frontend**: React app served by Node.js/Express
- **Backend Services**: 
  - User Service (Spring Boot)
  - Article Storage Service (Spring Boot) 
  - Analysis Service (Python Flask)
- **Databases**: Cloud SQL PostgreSQL (2 instances) + Cloud Memorystore Redis
- **Infrastructure**: GKE cluster with ingress controller and SSL

## Step 1: Initial Setup

1. **Clone and navigate to your project**:
   ```bash
   cd /path/to/MarketPullse
   ```

2. **Set your GCP project ID**:
   ```bash
   export PROJECT_ID="your-project-id"
   ```

3. **Run the GCP setup script**:
   ```bash
   ./scripts/setup-gcp.sh $PROJECT_ID
   ```

   This script will:
   - Enable required GCP APIs
   - Create GKE cluster
   - Set up Cloud SQL databases
   - Create Redis instance
   - Reserve static IP address
   - Configure basic infrastructure

## Step 2: Configure Secrets

1. **Update the secrets file** with your actual values:
   ```bash
   # Edit k8s/secrets.yaml
   # Replace the base64 encoded values with your own:
   ```

   To encode values in base64:
   ```bash
   echo -n "your_actual_password" | base64
   ```

   Update these values:
   - `postgres-user`: Your database username
   - `postgres-password`: Your database password  
   - `jwt-secret`: Your JWT signing secret
   - `news-api-key`: Your News API key
   - `alpha-vantage-key`: Your Alpha Vantage API key
   - `finnhub-api-key`: Your Finnhub API key

## Step 3: Build and Push Container Images

1. **Build all container images**:
   ```bash
   ./scripts/build-images.sh $PROJECT_ID
   ```

   This will build and push:
   - Frontend (React app)
   - User Service (Spring Boot)
   - Article Service (Spring Boot)
   - Analysis Service (Python Flask)

## Step 4: Update Kubernetes Manifests

1. **Update manifests with your domain and database IPs**:
   ```bash
   ./scripts/update-manifests.sh $PROJECT_ID your-domain.com
   ```

   If you don't have a domain yet, you can use a placeholder and update later.

## Step 5: Deploy to GKE

1. **Deploy all services**:
   ```bash
   ./scripts/deploy.sh $PROJECT_ID
   ```

   This will:
   - Create the Kubernetes namespace
   - Deploy all services
   - Set up ingress and load balancer
   - Configure SSL certificate (if domain is configured)

2. **Monitor the deployment**:
   ```bash
   # Check pod status
   kubectl get pods -n marketpulse

   # Check services
   kubectl get services -n marketpulse

   # Check ingress
   kubectl get ingress -n marketpulse
   ```

## Step 6: Configure Domain (Optional)

1. **Get your external IP**:
   ```bash
   kubectl get ingress marketpulse-ingress -n marketpulse
   ```

2. **Point your domain to the external IP**:
   - Create an A record in your DNS provider
   - Point your domain to the external IP address

3. **Wait for SSL certificate**:
   - Google-managed SSL certificates can take 10-15 minutes to provision
   - Check status: `kubectl describe managedcertificate marketpulse-ssl-cert -n marketpulse`

## Step 7: Verify Deployment

1. **Check all services are running**:
   ```bash
   kubectl get pods -n marketpulse
   ```
   All pods should show `Running` status.

2. **Test the application**:
   - Frontend: `https://your-domain.com` or `http://EXTERNAL_IP`
   - API endpoints will be available at `/api/user`, `/api/article`, `/api/analysis`

3. **View logs if needed**:
   ```bash
   # View logs for a specific service
   kubectl logs -f deployment/user-service -n marketpulse
   kubectl logs -f deployment/article-service -n marketpulse
   kubectl logs -f deployment/analysis-service -n marketpulse
   kubectl logs -f deployment/frontend -n marketpulse
   ```

## Monitoring and Maintenance

### Useful Commands

```bash
# Scale a deployment
kubectl scale deployment user-service --replicas=3 -n marketpulse

# Update an image
kubectl set image deployment/user-service user-service=NEW_IMAGE -n marketpulse

# Get detailed pod information
kubectl describe pod POD_NAME -n marketpulse

# Execute commands in a pod
kubectl exec -it POD_NAME -n marketpulse -- /bin/bash

# Port forward for debugging
kubectl port-forward service/user-service 8080:8080 -n marketpulse
```

### Updating the Application

1. **Build new images**:
   ```bash
   ./scripts/build-images.sh $PROJECT_ID
   ```

2. **Update deployments**:
   ```bash
   kubectl rollout restart deployment/user-service -n marketpulse
   kubectl rollout restart deployment/article-service -n marketpulse
   kubectl rollout restart deployment/analysis-service -n marketpulse
   kubectl rollout restart deployment/frontend -n marketpulse
   ```

### Database Management

1. **Connect to Cloud SQL**:
   ```bash
   gcloud sql connect marketpulse-users-db --user=marketpulse_user
   ```

2. **Create database backups**:
   ```bash
   gcloud sql backups create --instance=marketpulse-users-db
   ```

### Cost Optimization

1. **Use preemptible nodes** (for non-production):
   ```bash
   # When creating cluster, add:
   --preemptible
   ```

2. **Enable cluster autoscaling** (already configured):
   - Automatically scales nodes based on demand
   - Reduces costs during low usage periods

3. **Monitor costs** in GCP Console:
   - Set up billing alerts
   - Use committed use discounts for predictable workloads

## Troubleshooting

### Common Issues

1. **Pods stuck in Pending**:
   - Check cluster resources: `kubectl describe nodes`
   - Check pod events: `kubectl describe pod POD_NAME -n marketpulse`

2. **Database connection issues**:
   - Verify Cloud SQL instances are running
   - Check database IPs in manifests
   - Verify credentials in secrets

3. **SSL certificate not provisioning**:
   - Ensure domain is pointing to the correct IP
   - Check ManagedCertificate status
   - Can take up to 15 minutes

4. **Services not accessible**:
   - Check ingress configuration
   - Verify service selectors match pod labels
   - Check firewall rules

### Getting Help

- View comprehensive logs: `kubectl logs -f deployment/SERVICE_NAME -n marketpulse`
- Check service status: `kubectl get all -n marketpulse`
- Describe resources: `kubectl describe RESOURCE_TYPE RESOURCE_NAME -n marketpulse`

## Cleanup

To remove all resources and avoid charges:

```bash
./scripts/cleanup.sh $PROJECT_ID
```

⚠️ **Warning**: This will delete all data and resources!

## Security Considerations

1. **Update default passwords** in secrets
2. **Enable network policies** for pod-to-pod communication
3. **Use least-privilege IAM roles**
4. **Enable audit logging**
5. **Regularly update container images**
6. **Use private GKE nodes** for production

## Production Recommendations

1. **Multi-region deployment** for high availability
2. **Database read replicas** for better performance
3. **CDN integration** for static assets
4. **Monitoring and alerting** with Cloud Operations
5. **Backup strategy** for databases
6. **CI/CD pipeline** for automated deployments

## Support

For issues with this deployment:
1. Check the troubleshooting section above
2. Review GCP documentation
3. Check Kubernetes logs and events
4. Consult the project README.md

---

🎉 **Congratulations!** Your MarketPulse application is now running on GCP!
