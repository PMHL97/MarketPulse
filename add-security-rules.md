# 🔧 Add Security Group Rules for MarketPulse

## Current Rules (Keep These):
- ✅ **SSH** (Port 22) - Keep this for server access
- ✅ **HTTP** (Port 80) - Keep this for general web traffic
- ✅ **HTTPS** (Port 443) - Keep this for secure web traffic

## Add These 4 New Rules:

### Rule 1: Frontend
- **Type**: Custom TCP
- **Port range**: 3000
- **Source**: 0.0.0.0/0
- **Description**: MarketPulse Frontend

### Rule 2: User Service
- **Type**: Custom TCP
- **Port range**: 8080
- **Source**: 0.0.0.0/0
- **Description**: MarketPulse User Service

### Rule 3: Article Service
- **Type**: Custom TCP
- **Port range**: 8081
- **Source**: 0.0.0.0/0
- **Description**: MarketPulse Article Service

### Rule 4: Analysis Service
- **Type**: Custom TCP
- **Port range**: 5001
- **Source**: 0.0.0.0/0
- **Description**: MarketPulse Analysis Service

## 📋 Step-by-Step Instructions:

1. **Click "Add rule"** (4 times to add all 4 rules)
2. **For each rule:**
   - Change **Type** from "All traffic" to **"Custom TCP"**
   - Enter the **Port range** (3000, 8080, 8081, 5001)
   - Keep **Source** as **"0.0.0.0/0"**
   - Add the **Description** as shown above
3. **Click "Save rules"**

## 🧪 After Saving:
Run this command to test:
```bash
./test-deployment.sh
```

## 🌐 Your App Will Be Available At:
- **Frontend**: http://3.144.189.176:3000
- **User Service**: http://3.144.189.176:8080
- **Article Service**: http://3.144.189.176:8081
- **Analysis Service**: http://3.144.189.176:5001
