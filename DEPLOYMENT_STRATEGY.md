# Market Pulse - AWS Deployment Strategy

## 🎯 **Current Infrastructure**
- **EC2 Instance**: `3.144.189.176`
- **Security Group**: `launch-wizard-1` (sg-03141136bf89fbc1c)
- **Current Ports**: 3000 (Frontend), 8080 (User Service), 8081 (Article Service), 5001 (Analysis Service)
- **Architecture**: Single EC2 with multiple services
- **Current Frontend**: `http://3.144.189.176:3000` (Production - serving users)

## 🚀 **Deployment Strategy Options**

### **Option 1: Blue-Green Deployment (Recommended)**

#### **Phase 1: Prepare New Environment**
```bash
# 1. Create new EC2 instance (Green)
# 2. Deploy new version to Green environment
# 3. Test thoroughly
# 4. Switch traffic from Blue to Green
# 5. Keep Blue as rollback option
```

#### **Phase 2: Gradual Migration**
```bash
# 1. Deploy new frontend variants to different ports
# 2. Update load balancer to route traffic
# 3. Monitor performance and user feedback
# 4. Complete migration once stable
```

### **Option 2: Rolling Update (Faster)**

#### **Step 1: Backup Current State**
```bash
# Create AMI of current EC2 instance
aws ec2 create-image --instance-id i-your-instance-id --name "marketpulse-backup-$(date +%Y%m%d)"
```

#### **Step 2: Update Services One by One**
```bash
# 1. Update backend services first
# 2. Update frontend last
# 3. Monitor each service during update
```

### **Option 3: Canary Deployment (Safest)**

#### **Step 1: Deploy to Subset of Users**
```bash
# 1. Deploy new version to 10% of traffic
# 2. Monitor metrics and user feedback
# 3. Gradually increase to 50%, then 100%
```

## 🔧 **Implementation Plan**

### **Phase 1: Preparation (30 minutes)**

#### **1.1 Backup Current Deployment**
```bash
# Create AMI backup
aws ec2 create-image \
  --instance-id i-your-instance-id \
  --name "marketpulse-backup-$(date +%Y%m%d-%H%M)" \
  --description "Backup before major update"

# Tag the backup
aws ec2 create-tags \
  --resources ami-your-backup-id \
  --tags Key=Purpose,Value=Rollback Key=Date,Value=$(date +%Y%m%d)
```

#### **1.2 Prepare New Code**
```bash
# Build all frontend variants
npm run build          # Main frontend
npm run build:ai       # AI frontend
npm run build:classic  # Classic frontend

# Build Docker images
docker build -t marketpulse-frontend:latest .
docker build -t marketpulse-ai:latest -f Dockerfile.ai .
docker build -t marketpulse-classic:latest -f Dockerfile.classic .
```

### **Phase 2: Service Update (45 minutes)**

#### **2.1 Update Backend Services**
```bash
# Update stock-data-service first (new service)
cd backend/stock-data-service
docker build -f Dockerfile.aws -t marketpulse-stock-data:latest .
docker run -d --name stock-data-service -p 5003:5003 marketpulse-stock-data:latest

# Update existing services
docker-compose down
docker-compose up -d
```

#### **2.2 Update Frontend Services**
```bash
# Deploy new frontend variants
# Main frontend (Port 3001)
docker run -d --name marketpulse-main -p 3001:3000 marketpulse-frontend:latest

# AI frontend (Port 3002)  
docker run -d --name marketpulse-ai -p 3002:3000 marketpulse-ai:latest

# Classic frontend (Port 3003)
docker run -d --name marketpulse-classic -p 3003:3000 marketpulse-classic:latest
```

### **Phase 3: Configuration (15 minutes)**

#### **3.1 Update Security Groups**
```bash
# Add new ports to security group
# Port 3001: Main frontend
# Port 3002: AI frontend  
# Port 3003: Classic frontend
# Port 5003: Stock data service
```

#### **3.2 Update Load Balancer/Proxy**
```bash
# Configure nginx or load balancer
# Route traffic to appropriate frontend variants
# Set up health checks
```

### **Phase 4: Testing & Validation (30 minutes)**

#### **4.1 Health Checks**
```bash
# Test all services
curl http://3.144.189.176:3001/health  # Main frontend
curl http://3.144.189.176:3002/health  # AI frontend
curl http://3.144.189.176:3003/health  # Classic frontend
curl http://3.144.189.176:5003/api/health  # Stock data service
```

#### **4.2 Functional Testing**
```bash
# Test user authentication
# Test stock data retrieval
# Test AI features
# Test all frontend variants
```

## 🔄 **Rollback Plan**

### **Quick Rollback (5 minutes)**
```bash
# Stop new services
docker stop marketpulse-main marketpulse-ai marketpulse-classic stock-data-service

# Restart old services
docker-compose up -d

# Update security groups back to original ports
```

### **Full Rollback (15 minutes)**
```bash
# Restore from AMI backup
aws ec2 stop-instances --instance-ids i-your-instance-id
aws ec2 create-instance --image-id ami-your-backup-id
# Update DNS/load balancer to point to restored instance
```

## 📊 **Monitoring & Validation**

### **Key Metrics to Monitor**
- **Response Times**: < 2 seconds for all endpoints
- **Error Rates**: < 1% for all services
- **CPU Usage**: < 80% on EC2 instance
- **Memory Usage**: < 80% on EC2 instance
- **User Feedback**: Monitor for any issues

### **Health Check Endpoints**
- Main Frontend: `http://3.144.189.176:3001/health`
- AI Frontend: `http://3.144.189.176:3002/health`
- Classic Frontend: `http://3.144.189.176:3003/health`
- Stock Data Service: `http://3.144.189.176:5003/api/health`

## 🎯 **Recommended Approach**

**For your situation, I recommend Option 2 (Rolling Update)** because:

1. **Faster deployment** (1-2 hours total)
2. **Lower risk** with backup strategy
3. **Easier rollback** if issues occur
4. **Minimal downtime** (5-10 minutes max)

## 📋 **Pre-Deployment Checklist**

- [ ] Create AMI backup of current instance
- [ ] Test new code locally
- [ ] Prepare rollback plan
- [ ] Notify users of maintenance window
- [ ] Prepare monitoring dashboards
- [ ] Have rollback commands ready

## 🚀 **Post-Deployment Checklist**

- [ ] All services responding to health checks
- [ ] Frontend variants accessible
- [ ] User authentication working
- [ ] Stock data service functional
- [ ] AI features operational
- [ ] Performance metrics within acceptable ranges
- [ ] User feedback positive
