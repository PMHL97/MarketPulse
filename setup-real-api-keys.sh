#!/bin/bash

# Setup Real API Keys for Market Pulse Stock Data Service
echo "🔑 Setting up real API keys for better stock data coverage..."

# Create .env file for backend service
cat > backend/stock-data-service/.env << EOF
# Real API Keys for Stock Data Service
# Get these keys from the respective services for better data coverage

# Twelve Data API (Free tier: 800 requests/day)
# Get your key at: https://twelvedata.com/pricing
TWELVE_DATA_API_KEY=demo

# Alpha Vantage API (Free tier: 5 requests/minute)
# Get your key at: https://www.alphavantage.co/support/#api-key
ALPHA_VANTAGE_API_KEY=demo

# Finnhub API (Free tier: 60 requests/minute)
# Get your key at: https://finnhub.io/register
FINNHUB_API_KEY=demo

# Polygon API (Free tier: 5 requests/minute)
# Get your key at: https://polygon.io/pricing
POLYGON_API_KEY=demo

# Yahoo Finance (No API key needed - using free endpoints)
# This is our primary data source for real-time data
EOF

echo "✅ Created backend/stock-data-service/.env with API key placeholders"
echo ""
echo "🚀 To get real data for all stocks:"
echo "1. Get API keys from the services above"
echo "2. Update the .env file with your real keys"
echo "3. Restart the backend service"
echo ""
echo "📊 Current status:"
echo "- AAPL: Real data (Twelve Data working)"
echo "- Other stocks: Mock data (need API keys for real data)"
echo ""
echo "💡 For immediate real data, you can:"
echo "- Use Yahoo Finance (no API key needed)"
echo "- Get free API keys from the services above"
echo "- The system will automatically use real data when available"
