#!/usr/bin/env node

// Test script to verify frontend-backend communication
const axios = require('axios');

async function testFrontendBackend() {
  console.log('🧪 Testing Frontend-Backend Communication...\n');
  
  const backendUrl = 'http://localhost:5003';
  
  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${backendUrl}/api/health`);
    console.log('✅ Health check:', healthResponse.data);
    
    // Test single stock endpoint
    console.log('\n2. Testing single stock endpoint...');
    const stockResponse = await axios.get(`${backendUrl}/api/stock/AAPL`);
    console.log('✅ AAPL data:', stockResponse.data);
    
    // Test batch endpoint
    console.log('\n3. Testing batch endpoint...');
    const batchResponse = await axios.post(`${backendUrl}/api/stocks`, {
      symbols: ['AAPL', 'MSFT', 'GOOGL']
    });
    console.log('✅ Batch data:', batchResponse.data);
    
    console.log('\n🎉 All tests passed! Backend is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('❌ Response data:', error.response.data);
    }
  }
}

testFrontendBackend();
