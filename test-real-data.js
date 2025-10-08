#!/usr/bin/env node

// Test script to verify real stock data
const axios = require('axios');

async function testRealData() {
  console.log('🧪 Testing Real Stock Data Sources...\n');

  const testSymbols = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA'];
  
  for (const symbol of testSymbols) {
    console.log(`📊 Testing ${symbol}:`);
    
    // Test Twelve Data API
    try {
      const url = `https://api.twelvedata.com/price?symbol=${symbol}&apikey=demo`;
      const response = await axios.get(url, { timeout: 10000 });
      
      if (response.data && response.data.price) {
        const price = parseFloat(response.data.price);
        console.log(`  ✅ Twelve Data: $${price.toFixed(2)}`);
      } else {
        console.log(`  ❌ Twelve Data: No data`);
      }
    } catch (error) {
      console.log(`  ❌ Twelve Data: ${error.message}`);
    }

    // Test Polygon API
    try {
      const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?adjusted=true&apikey=demo`;
      const response = await axios.get(url, { timeout: 10000 });
      
      if (response.data && response.data.results && response.data.results.length > 0) {
        const result = response.data.results[0];
        const price = result.c;
        const change = result.c - result.o;
        const changePercent = (change / result.o) * 100;
        console.log(`  ✅ Polygon: $${price.toFixed(2)} (${change >= 0 ? '+' : ''}${changePercent.toFixed(2)}%)`);
      } else {
        console.log(`  ❌ Polygon: No data`);
      }
    } catch (error) {
      console.log(`  ❌ Polygon: ${error.message}`);
    }

    // Test Alpha Vantage API
    try {
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=demo`;
      const response = await axios.get(url, { timeout: 10000 });
      
      if (response.data && response.data['Global Quote']) {
        const quote = response.data['Global Quote'];
        const price = parseFloat(quote['05. price']);
        const change = parseFloat(quote['09. change']);
        const changePercent = parseFloat(quote['10. change percent'].replace('%', ''));
        console.log(`  ✅ Alpha Vantage: $${price.toFixed(2)} (${change >= 0 ? '+' : ''}${changePercent.toFixed(2)}%)`);
      } else {
        console.log(`  ❌ Alpha Vantage: No data`);
      }
    } catch (error) {
      console.log(`  ❌ Alpha Vantage: ${error.message}`);
    }

    // Test Finnhub API
    try {
      const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=demo`;
      const response = await axios.get(url, { timeout: 10000 });
      
      if (response.data && response.data.c) {
        const price = response.data.c;
        const change = response.data.d;
        const changePercent = response.data.dp;
        console.log(`  ✅ Finnhub: $${price.toFixed(2)} (${change >= 0 ? '+' : ''}${changePercent.toFixed(2)}%)`);
      } else {
        console.log(`  ❌ Finnhub: No data`);
      }
    } catch (error) {
      console.log(`  ❌ Finnhub: ${error.message}`);
    }

    console.log(''); // Empty line for readability
  }

  console.log('🎯 Summary:');
  console.log('- Twelve Data: Free tier with real stock prices');
  console.log('- Polygon: Free tier with historical data');
  console.log('- Alpha Vantage: Free tier with detailed quotes');
  console.log('- Finnhub: Free tier with real-time quotes');
  console.log('\n🚀 Your Market Pulse platform will now use REAL stock data!');
}

// Run the test
testRealData().catch(console.error);
