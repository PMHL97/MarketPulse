#!/usr/bin/env node

// Test data consistency between different endpoints
const axios = require('axios');

async function testDataConsistency() {
  console.log('🧪 Testing Data Consistency...\n');
  
  try {
    const symbol = 'AAPL';
    
    // Test 1: Individual stock endpoint
    console.log('📊 Testing Individual Stock Endpoint:');
    const individualResponse = await axios.get(`http://localhost:5003/api/stock/${symbol}`);
    const individualData = individualResponse.data.data;
    console.log(`${symbol}: $${individualData.price} (${individualData.dataSource})`);
    
    // Test 2: Batch endpoint
    console.log('\n📊 Testing Batch Endpoint:');
    const batchResponse = await axios.post('http://localhost:5003/api/stocks', {
      symbols: [symbol]
    });
    const batchData = batchResponse.data.data[symbol];
    console.log(`${symbol}: $${batchData.price} (${batchData.dataSource})`);
    
    // Test 3: Multiple individual calls
    console.log('\n📊 Testing Multiple Individual Calls:');
    const results = [];
    for (let i = 0; i < 3; i++) {
      const response = await axios.get(`http://localhost:5003/api/stock/${symbol}`);
      results.push(response.data.data.price);
      console.log(`Call ${i + 1}: $${response.data.data.price}`);
    }
    
    // Test 4: Check if prices are consistent
    console.log('\n🔍 Consistency Check:');
    const allPrices = [individualData.price, batchData.price, ...results];
    const uniquePrices = [...new Set(allPrices.map(p => p.toFixed(2)))];
    
    if (uniquePrices.length === 1) {
      console.log('✅ All prices are consistent:', uniquePrices[0]);
    } else {
      console.log('❌ Prices are inconsistent:', uniquePrices);
    }
    
    // Test 5: Market indices
    console.log('\n📊 Testing Market Indices:');
    const indicesResponse = await axios.get('http://localhost:5003/api/indices');
    const indicesData = indicesResponse.data.data.US;
    
    indicesData.forEach(index => {
      console.log(`${index.name}: ${index.value} (${index.change}) ${index.percent}`);
    });
    
    console.log('\n🎯 Summary:');
    console.log(`- Individual endpoint: $${individualData.price}`);
    console.log(`- Batch endpoint: $${batchData.price}`);
    console.log(`- Multiple calls: ${results.map(p => `$${p}`).join(', ')}`);
    console.log(`- Data source: ${individualData.dataSource}`);
    console.log(`- Is real time: ${individualData.isRealTime}`);
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testDataConsistency();
