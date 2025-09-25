# MarketPulse Deployment Guide

This guide will help you deploy the MarketPulse application using Docker and Kubernetes.

## Prerequisites

Before starting, ensure you have:

1. **Docker** installed on your local machine

2. **kubectl** installed and configured

3. **A Kubernetes cluster** (local or cloud-based)

4. **A domain name** (optional, but recommended for production)

## Architecture Overview

The deployment includes:
- **Frontend**: React app served by Node.js/Express
- **Backend Services**: 
  - User Service (Spring Boot)
  - Article Storage Service (Spring Boot) 
  - Analysis Service (Python Flask)
- **Databases**: PostgreSQL (2 instances) + Redis
- **Infrastructure**: Kubernetes cluster with ingress controller

## Step 1: Initial Setup

1. **Clone and navigate to your project**:
   ```bash
   cd /path/to/MarketPulse
   ```

2. **Build container images**:
   ```bash
   ./scripts/build-images.sh
   ```

   This script will build all container images locally.

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

## Step 3: Update Kubernetes Manifests

1. **Update manifests with your domain**:
   ```bash
   ./scripts/update-manifests.sh your-domain.com
   ```

   If you don't have a domain yet, you can use localhost and update later.

## Step 4: Deploy to Kubernetes

1. **Deploy all services**:
   ```bash
   ./scripts/deploy.sh
   ```

   This will:
   - Create the Kubernetes namespace
   - Deploy all services
   - Set up ingress and load balancer

2. **Monitor the deployment**:
   ```bash
   # Check pod status
   kubectl get pods -n marketpulse

   # Check services
   kubectl get services -n marketpulse

   # Check ingress
   kubectl get ingress -n marketpulse
   ```

## Step 5: Configure Domain (Optional)

1. **Get your external IP**:
   ```bash
   kubectl get ingress marketpulse-ingress -n marketpulse
   ```

2. **Point your domain to the external IP**:
   - Create an A record in your DNS provider
   - Point your domain to the external IP address

## Step 6: Verify Deployment

1. **Check all services are running**:
   ```bash
   kubectl get pods -n marketpulse
   ```
   All pods should show `Running` status.

2. **Test the application**:
   - Frontend: `http://your-domain.com` or use port-forwarding
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
   ./scripts/build-images.sh
   ```

2. **Update deployments**:
   ```bash
   kubectl rollout restart deployment/user-service -n marketpulse
   kubectl rollout restart deployment/article-service -n marketpulse
   kubectl rollout restart deployment/analysis-service -n marketpulse
   kubectl rollout restart deployment/frontend -n marketpulse
   ```

### Database Management

1. **Connect to database**:
   ```bash
   kubectl port-forward service/postgres-users 5432:5432 -n marketpulse
   ```

2. **Create database backups**:
   ```bash
   # Use your preferred backup method for PostgreSQL
   pg_dump -h localhost -p 5432 -U your_user marketpulse_users > backup.sql
   ```

## Troubleshooting

### Common Issues

1. **Pods stuck in Pending**:
   - Check cluster resources: `kubectl describe nodes`
   - Check pod events: `kubectl describe pod POD_NAME -n marketpulse`

2. **Database connection issues**:
   - Verify database services are running
   - Check database configurations in manifests
   - Verify credentials in secrets

3. **Services not accessible**:
   - Check ingress configuration
   - Verify service selectors match pod labels
   - Use port-forwarding for local access

### Getting Help

- View comprehensive logs: `kubectl logs -f deployment/SERVICE_NAME -n marketpulse`
- Check service status: `kubectl get all -n marketpulse`
- Describe resources: `kubectl describe RESOURCE_TYPE RESOURCE_NAME -n marketpulse`

## Cleanup

To remove all resources:

```bash
kubectl delete namespace marketpulse
```

⚠️ **Warning**: This will delete all data and resources!

## Security Considerations

1. **Update default passwords** in secrets
2. **Enable network policies** for pod-to-pod communication
3. **Use least-privilege access controls**
4. **Enable audit logging**
5. **Regularly update container images**
6. **Use private nodes** for production

## Production Recommendations

1. **Multi-region deployment** for high availability
2. **Database read replicas** for better performance
3. **CDN integration** for static assets
4. **Monitoring and alerting** with your preferred solution
5. **Backup strategy** for databases
6. **CI/CD pipeline** for automated deployments

## Support

For issues with this deployment:
1. Check the troubleshooting section above
2. Review Kubernetes documentation
3. Check Kubernetes logs and events
4. Consult the project README.md

---

🎉 **Congratulations!** Your MarketPulse application is now running on Kubernetes!

