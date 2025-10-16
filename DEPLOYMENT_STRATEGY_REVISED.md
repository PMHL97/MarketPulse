# Market Pulse - Revised AWS Deployment Strategy

## 🎯 **Current Production Setup**
- **EC2 Instance**: `3.144.189.176`
- **Security Group**: `launch-wizard-1` (sg-03141136bf89fbc1c)
- **Current Production**: `http://3.144.189.176:3000` (Serving users)
- **Backend Services**: 8080, 8081, 5001
- **Architecture**: Single EC2 with multiple services

## 🚀 **Revised Deployment Strategy**

### **Option 1: Port Migration (Recommended)**

#### **Phase 1: Deploy New Services (No Downtime)**
```bash
# Deploy new services on NEW ports (don't touch port 3000 yet)
# Main Frontend: Port 3001
# AI Frontend: Port 3002  
# Classic Frontend: Port 3003
# Stock Data Service: Port 5003
```

#### **Phase 2: Test New Services**
```bash
# Test all new services thoroughly
curl http://3.144.189.176:3001  # Main frontend
curl http://3.144.189.176:3002  # AI frontend
curl http://3.144.189.176:3003  # Classic frontend
curl http://3.144.189.176:5003/api/health  # Stock data service
```

#### **Phase 3: Switch Traffic (Minimal Downtime)**
```bash
# Option A: Update load balancer/proxy to route port 3000 → port 3001
# Option B: Stop old service, start new service on port 3000
# Option C: Keep both running, gradually migrate users
```

### **Option 2: Gradual Migration (Safest)**

#### **Step 1: Deploy Alongside (No Downtime)**
```bash
# Keep port 3000 running (current users)
# Deploy new services on ports 3001, 3002, 3003
# Test thoroughly
```

#### **Step 2: Gradual User Migration**
```bash
# Route 10% of traffic to new services
# Monitor performance and user feedback
# Gradually increase to 50%, then 100%
```

#### **Step 3: Complete Migration**
```bash
# Once confident, route all traffic to new services
# Keep old service as backup
```

## 🔧 **Recommended Implementation**

### **Phase 1: Deploy New Services (30 minutes)**

```bash
# 1. Deploy new services on NEW ports
docker run -d --name marketpulse-main -p 3001:3000 marketpulse-frontend:latest
docker run -d --name marketpulse-ai -p 3002:3000 marketpulse-ai:latest  
docker run -d --name marketpulse-classic -p 3003:3000 marketpulse-classic:latest
docker run -d --name marketpulse-stock-data -p 5003:5003 marketpulse-stock-data:latest

# 2. Update security groups for new ports
aws ec2 authorize-security-group-ingress --group-id sg-03141136bf89fbc1c --protocol tcp --port 3001 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-id sg-03141136bf89fbc1c --protocol tcp --port 3002 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-id sg-03141136bf89fbc1c --protocol tcp --port 3003 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-id sg-03141136bf89fbc1c --protocol tcp --port 5003 --cidr 0.0.0.0/0
```

### **Phase 2: Test New Services (15 minutes)**

```bash
# Test all new services
curl http://3.144.189.176:3001  # Main frontend
curl http://3.144.189.176:3002  # AI frontend  
curl http://3.144.189.176:3003  # Classic frontend
curl http://3.144.189.176:5003/api/health  # Stock data service

# Test user authentication
# Test stock data retrieval
# Test AI features
```

### **Phase 3: Traffic Migration (5 minutes)**

#### **Option A: Load Balancer/Proxy Update**
```bash
# Update nginx/load balancer configuration
# Route port 3000 traffic to port 3001 (main frontend)
# Keep old service as backup
```

#### **Option B: Direct Port Switch**
```bash
# Stop old service on port 3000
docker stop old-frontend-service

# Start new service on port 3000
docker run -d --name marketpulse-production -p 3000:3000 marketpulse-frontend:latest
```

## 🌐 **New Access Points**

### **During Migration:**
- **Current Users**: `http://3.144.189.176:3000` (unchanged)
- **New Main**: `http://3.144.189.176:3001`
- **New AI**: `http://3.144.189.176:3002`
- **New Classic**: `http://3.144.189.176:3003`
- **Stock Data API**: `http://3.144.189.176:5003`

### **After Migration:**
- **Main Frontend**: `http://3.144.189.176:3000` (or 3001)
- **AI Frontend**: `http://3.144.189.176:3002`
- **Classic Frontend**: `http://3.144.189.176:3003`
- **Stock Data API**: `http://3.144.189.176:5003`

## 🔄 **Rollback Plan**

### **Quick Rollback (2 minutes)**
```bash
# Stop new services
docker stop marketpulse-main marketpulse-ai marketpulse-classic marketpulse-stock-data

# Restart old service on port 3000
docker-compose up -d
```

### **Full Rollback (10 minutes)**
```bash
# Restore from AMI backup
aws ec2 create-instance --image-id ami-your-backup-id
# Update DNS/load balancer to point to restored instance
```

## 📊 **Migration Strategy Options**

### **Option 1: Keep Port 3000 (Recommended)**
- **Pros**: No DNS changes, users continue using same URL
- **Cons**: Need to stop old service briefly
- **Downtime**: 2-3 minutes

### **Option 2: Use New Ports**
- **Pros**: No downtime, can test thoroughly
- **Cons**: Need to update DNS/load balancer
- **Downtime**: 0 minutes

### **Option 3: Gradual Migration**
- **Pros**: Safest, can monitor user feedback
- **Cons**: More complex, longer timeline
- **Downtime**: 0 minutes

## 🎯 **Recommended Approach**

**For your situation, I recommend Option 1 (Keep Port 3000)** because:

1. **Minimal user impact** - Same URL continues to work
2. **Fast deployment** - 30 minutes total
3. **Easy rollback** - Can quickly restore old service
4. **Clean migration** - No orphaned services

## 📋 **Deployment Checklist**

### **Pre-Deployment:**
- [ ] Create AMI backup of current instance
- [ ] Test new services locally
- [ ] Prepare rollback commands
- [ ] Notify users of brief maintenance window

### **Deployment:**
- [ ] Deploy new services on ports 3001, 3002, 3003, 5003
- [ ] Test all new services thoroughly
- [ ] Update security groups
- [ ] Switch port 3000 to new service
- [ ] Verify all functionality

### **Post-Deployment:**
- [ ] Monitor performance metrics
- [ ] Check user feedback
- [ ] Verify all features working
- [ ] Keep old service as backup for 24 hours

## 🚀 **Final Result**

After deployment, users will access:
- **Main Frontend**: `http://3.144.189.176:3000` (updated version)
- **AI Frontend**: `http://3.144.189.176:3002` (new)
- **Classic Frontend**: `http://3.144.189.176:3003` (new)
- **Stock Data API**: `http://3.144.189.176:5003` (new)

**Total downtime: 2-3 minutes** for the port switch.


