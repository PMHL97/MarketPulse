#!/usr/bin/env node

// Test script to verify frontend is getting real data
const axios = require('axios');

async function testFrontendData() {
  console.log('🧪 Testing frontend data fetching...');
  
  try {
    // Test individual stock
    console.log('\n📊 Testing AAPL...');
    const aaplResponse = await axios.get('http://localhost:5003/api/stock/AAPL');
    console.log('AAPL Data:', {
      price: aaplResponse.data.data.price,
      dataSource: aaplResponse.data.data.dataSource,
      isRealTime: aaplResponse.data.data.isRealTime
    });
    
    // Test batch request
    console.log('\n📊 Testing batch request...');
    const batchResponse = await axios.post('http://localhost:5003/api/stocks', {
      symbols: ['AAPL', 'MSFT', 'TSLA', 'NVDA']
    });
    
    console.log('Batch Data:');
    Object.entries(batchResponse.data.data).forEach(([symbol, data]) => {
      console.log(`${symbol}: $${data.price} (${data.dataSource})`);
    });
    
    // Test multiple individual requests
    console.log('\n📊 Testing multiple individual requests...');
    const symbols = ['AAPL', 'MSFT', 'TSLA', 'NVDA', 'GOOGL'];
    
    for (const symbol of symbols) {
      try {
        const response = await axios.get(`http://localhost:5003/api/stock/${symbol}`);
        const data = response.data.data;
        console.log(`${symbol}: $${data.price} (${data.dataSource}) - ${data.isRealTime ? 'Real' : 'Mock'}`);
      } catch (error) {
        console.error(`❌ Failed to fetch ${symbol}:`, error.message);
      }
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testFrontendData();
