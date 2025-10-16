# Market Pulse - Deployment Guide

## 🚀 Production Deployment

### Architecture Overview
- **Frontend**: 3 variants (Main, AI, Classic) - React + Vite
- **Backend**: Microservices (Java Spring Boot + Python Flask)
- **Database**: PostgreSQL + Redis
- **Deployment**: Docker + Kubernetes

### Frontend Variants
1. **Main Frontend** (`/src/`) - Port 3001 - Full trading platform
2. **AI Frontend** (`/src-ai/`) - Port 3002 - AI-powered interface  
3. **Classic Frontend** (`/src-classic/`) - Port 3001 - Simplified interface

### Backend Services
- **User Service** (Java) - Port 8082 - Authentication & watchlists
- **Article Service** (Java) - Port 8083 - News & articles
- **Analysis Service** (Python) - Port 5002 - Sentiment analysis
- **Stock Data Service** (Python) - Port 5003 - Real-time data

### AWS Deployment
```bash
# Build and deploy
npm run build
npm run build:ai
docker-compose up -d

# Kubernetes deployment
kubectl apply -f k8s/
```

### Environment Variables
- Database credentials
- API keys (Twelve Data, Alpha Vantage, etc.)
- Redis configuration
- JWT secrets

### Production Checklist
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] SSL certificates installed
- [ ] Load balancer configured
- [ ] Monitoring setup
- [ ] Backup strategy implemented


