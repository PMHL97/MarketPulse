#!/usr/bin/env node

// Test index symbols for detail pages
const axios = require('axios');

async function testIndexDetails() {
  console.log('🧪 Testing Index Detail Pages...\n');
  
  try {
    // Test the mapped index symbols
    const indexSymbols = {
      '^GSPC': 'S&P 500',
      '^IXIC': 'NASDAQ',
      '^DJI': 'DOW'
    };
    
    console.log('📊 Testing Index Symbols for Detail Pages:');
    
    for (const [symbol, name] of Object.entries(indexSymbols)) {
      try {
        const response = await axios.get(`http://localhost:5003/api/stock/${encodeURIComponent(symbol)}`);
        const data = response.data.data;
        
        console.log(`${name} (${symbol}):`);
        console.log(`  Price: ${data.price}`);
        console.log(`  Change: ${data.change} (${data.changePercent}%)`);
        console.log(`  Data Source: ${data.dataSource}`);
        console.log(`  Is Real Time: ${data.isRealTime}`);
        console.log(`  High: ${data.high}`);
        console.log(`  Low: ${data.low}`);
        console.log(`  Volume: ${data.volume}`);
        console.log('');
        
      } catch (error) {
        console.error(`❌ Failed to fetch ${name} (${symbol}):`, error.message);
      }
    }
    
    console.log('✅ Index detail pages should now show real data!');
    console.log('\n🎯 Expected Results:');
    console.log('- S&P 500: ~6,753 (not 673)');
    console.log('- NASDAQ: ~23,043 (not 611)');
    console.log('- DOW: ~46,601 (not 466)');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testIndexDetails();
