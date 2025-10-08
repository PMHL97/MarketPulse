#!/usr/bin/env node

// Test script to verify real-time data sources
const axios = require('axios');

async function testDataSources() {
  console.log('🧪 Testing Real-time Data Sources...\n');

  const testSymbols = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA'];
  
  for (const symbol of testSymbols) {
    console.log(`📊 Testing ${symbol}:`);
    
    // Test Yahoo Finance API
    try {
      const proxyUrl = 'https://api.allorigins.win/raw?url=';
      const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`;
      const response = await axios.get(proxyUrl + encodeURIComponent(yahooUrl));
      
      if (response.data && response.data.chart && response.data.chart.result) {
        const result = response.data.chart.result[0];
        const meta = result.meta;
        const currentPrice = meta.regularMarketPrice;
        const previousClose = meta.previousClose;
        const change = currentPrice - previousClose;
        const changePercent = (change / previousClose) * 100;
        
        console.log(`  ✅ Yahoo Finance: $${currentPrice.toFixed(2)} (${change >= 0 ? '+' : ''}${changePercent.toFixed(2)}%)`);
      } else {
        console.log(`  ❌ Yahoo Finance: No data`);
      }
    } catch (error) {
      console.log(`  ❌ Yahoo Finance: ${error.message}`);
    }

    // Test Alpha Vantage API (demo key)
    try {
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=demo`;
      const response = await axios.get(url);
      
      if (response.data['Global Quote']) {
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

    // Test Finnhub API (demo key)
    try {
      const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=demo`;
      const response = await axios.get(url);
      
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
  console.log('- Yahoo Finance: Best for real-time data (no API key required)');
  console.log('- Alpha Vantage: Requires API key for production');
  console.log('- Finnhub: Requires API key for production');
  console.log('- Fallback: Enhanced mock data with realistic fluctuations');
  console.log('\n🚀 Your Market Pulse platform will use the best available data source!');
}

// Run the test
testDataSources().catch(console.error);
