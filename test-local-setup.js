#!/usr/bin/env node

// Local Testing Script for Market Pulse
const axios = require('axios');

async function testLocalSetup() {
  console.log('🧪 Testing Market Pulse Local Setup...\n');

  const baseUrl = 'http://localhost:5003';
  
  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing Health Check...');
    const healthResponse = await axios.get(`${baseUrl}/api/health`);
    console.log(`✅ Health Check: ${healthResponse.data.status}`);
    console.log(`   Cache Size: ${healthResponse.data.cache_size}`);
    console.log(`   Timestamp: ${healthResponse.data.timestamp}\n`);

    // Test 2: Single Stock
    console.log('2️⃣ Testing Single Stock (AAPL)...');
    const stockResponse = await axios.get(`${baseUrl}/api/stock/AAPL`);
    const stockData = stockResponse.data.data;
    console.log(`✅ AAPL Stock Data:`);
    console.log(`   Price: $${stockData.price}`);
    console.log(`   Data Source: ${stockData.dataSource}`);
    console.log(`   Real Time: ${stockData.isRealTime}`);
    console.log(`   Timestamp: ${stockData.timestamp}\n`);

    // Test 3: Batch Stocks
    console.log('3️⃣ Testing Batch Stocks...');
    const batchResponse = await axios.post(`${baseUrl}/api/stocks`, {
      symbols: ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA']
    });
    const batchData = batchResponse.data.data;
    console.log(`✅ Batch Stock Data (${Object.keys(batchData).length} stocks):`);
    
    Object.entries(batchData).forEach(([symbol, data]) => {
      const status = data.isRealTime ? '🟢 REAL' : '🟡 MOCK';
      console.log(`   ${symbol}: $${data.price} (${data.dataSource}) ${status}`);
    });

    console.log('\n🎉 All tests passed! Your Market Pulse backend is working correctly.');
    console.log('\n📋 Next Steps:');
    console.log('1. Start the AI frontend: npm run dev:ai');
    console.log('2. Open http://localhost:3002');
    console.log('3. Check browser console for real data messages');
    console.log('4. Look for Data Source Indicator showing real vs mock data');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n🔧 Troubleshooting:');
      console.log('1. Make sure the backend service is running:');
      console.log('   cd backend/stock-data-service');
      console.log('   source venv/bin/activate');
      console.log('   python app.py');
      console.log('\n2. Or use Docker Compose:');
      console.log('   docker-compose up -d');
    }
  }
}

// Run the test
testLocalSetup().catch(console.error);
