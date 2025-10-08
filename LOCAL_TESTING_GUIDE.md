# Market Pulse - Local Testing Guide

## 🚀 **How to Test Everything Locally**

I've fixed the syntax error and created a complete local testing guide for all the new features.

## 🔧 **Step 1: Start Backend Services**

### **Option A: Docker Compose (Recommended)**
```bash
# Start all services including stock-data-service
docker-compose up -d

# Check all services are running
docker-compose ps

# View logs
docker-compose logs -f stock-data-service
```

### **Option B: Manual Backend Service**
```bash
# Terminal 1: Start stock-data-service
cd backend/stock-data-service
source venv/bin/activate
python app.py

# Terminal 2: Start Redis (if not using Docker)
redis-server

# Terminal 3: Start other services (if needed)
# Your existing backend services
```

## 🎯 **Step 2: Test Backend Services**

### **Test Stock Data Service:**
```bash
# Health check
curl http://localhost:5003/api/health

# Single stock
curl http://localhost:5003/api/stock/AAPL

# Batch stocks
curl -X POST http://localhost:5003/api/stocks \
  -H "Content-Type: application/json" \
  -d '{"symbols": ["AAPL", "MSFT", "GOOGL", "TSLA", "NVDA"]}'
```

**Expected Results:**
```json
{
  "success": true,
  "data": {
    "AAPL": {
      "price": 258.41,
      "dataSource": "twelve-data",
      "isRealTime": true
    },
    "MSFT": {
      "price": 377.40,
      "dataSource": "enhanced-mock",
      "isRealTime": false
    }
  }
}
```

## 🎨 **Step 3: Start Frontend**

### **Start AI Frontend:**
```bash
# Terminal 4: Start AI frontend
npm run dev:ai
```

### **Start Main Frontend:**
```bash
# Terminal 5: Start main frontend
npm run dev
```

## 🔍 **Step 4: Test Frontend Features**

### **AI Frontend (http://localhost:3002):**
1. **Open browser** to http://localhost:3002
2. **Check console** for real data messages:
   - `✅ Real data for AAPL: $258.41 (twelve-data)`
   - `⚠️ Enhanced mock data for MSFT: $377.40 (enhanced-mock)`
3. **Look for Data Source Indicator** showing real vs mock data
4. **Test AI Chat** with stock questions

### **Main Frontend (http://localhost:3001):**
1. **Open browser** to http://localhost:3001
2. **Check real-time dashboard** for live data
3. **Test portfolio tracker** with real prices
4. **Verify market summary** shows real data

## 📊 **Step 5: Verify Real Data**

### **Check Browser Console:**
Look for these messages:
```
✅ Real data for AAPL: $258.41 (twelve-data)
✅ Real data for MSFT: $523.98 (alpha-vantage)
⚠️ Enhanced mock data for GOOGL: $145.67 (enhanced-mock)
```

### **Check Data Source Indicator:**
- 🟢 **Green checkmarks** = Real data from APIs
- 🟡 **Yellow warnings** = Enhanced mock data (fallback)
- 🔴 **Red errors** = Backend service not running

## 🐛 **Troubleshooting**

### **If Backend Service Won't Start:**
```bash
# Check if port 5003 is in use
lsof -i :5003

# Kill any existing processes
pkill -f "python.*app.py"

# Restart service
cd backend/stock-data-service
source venv/bin/activate
python app.py
```

### **If Frontend Shows CORS Errors:**
```bash
# Check backend is running
curl http://localhost:5003/api/health

# Check CORS configuration
curl -H "Origin: http://localhost:3002" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS http://localhost:5003/api/health
```

### **If No Real Data:**
```bash
# Test individual API
curl http://localhost:5003/api/stock/AAPL

# Check backend logs
docker-compose logs stock-data-service
# or
tail -f /path/to/backend/logs
```

## 🎯 **Expected Results**

### **Backend Console:**
```
🚀 Starting Stock Data Service...
🌐 Server running on http://localhost:5003
✅ Real data for AAPL: $258.41 (twelve-data)
⚠️ Enhanced mock data for MSFT: $377.40 (enhanced-mock)
```

### **Frontend Console:**
```
✅ Real data for AAPL: $258.41 (twelve-data)
✅ Real data for MSFT: $523.98 (alpha-vantage)
⚠️ Enhanced mock data for GOOGL: $145.67 (enhanced-mock)
```

### **No CORS Errors:**
- ❌ `XMLHttpRequest cannot load http://localhost:5003/api/stock/TSLA due to access control checks`
- ✅ `✅ Real data for AAPL: $258.41 (twelve-data)`

## 🚀 **Quick Start Commands**

### **Complete Local Setup:**
```bash
# 1. Start backend services
docker-compose up -d

# 2. Start AI frontend
npm run dev:ai

# 3. Open http://localhost:3002
# 4. Check console for real data messages
```

### **Manual Setup:**
```bash
# Terminal 1: Backend service
cd backend/stock-data-service
source venv/bin/activate
python app.py

# Terminal 2: AI frontend
npm run dev:ai

# Terminal 3: Main frontend (optional)
npm run dev
```

## 📊 **Testing Checklist**

### **Backend Testing:**
- [ ] Health check returns 200
- [ ] Single stock API returns real data
- [ ] Batch API returns multiple stocks
- [ ] No CORS errors in logs
- [ ] Redis caching working (if configured)

### **Frontend Testing:**
- [ ] AI frontend loads without errors
- [ ] Console shows real data messages
- [ ] Data Source Indicator shows correct status
- [ ] No CORS errors in browser console
- [ ] Real-time updates working

### **Integration Testing:**
- [ ] Frontend can fetch data from backend
- [ ] Real data displays correctly
- [ ] Mock data fallback works
- [ ] Error handling graceful

## 🎉 **Success Indicators**

### **✅ Working Correctly:**
- Backend service running on port 5003
- Frontend loads without syntax errors
- Console shows real data messages
- No CORS errors
- Data Source Indicator shows correct status

### **❌ Issues to Fix:**
- Backend service not running
- CORS errors in browser console
- No real data messages
- Frontend syntax errors
- API connection failures

**Your Market Pulse platform should now be running locally with real stock data!** 🚀📈
