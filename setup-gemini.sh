#!/bin/bash

# Market Pulse - Gemini API Setup Script
echo "🚀 Setting up Google Gemini API for Market Pulse..."

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp env.template .env
    echo "✅ .env file created"
else
    echo "⚠️  .env file already exists"
fi

# Check if Gemini API key is set
if grep -q "GOOGLE_GEMINI_API_KEY=AIzaSyCfglkfqHrNB_goQkqZOyWOWLQViO_TuBc" .env; then
    echo "✅ Gemini API key is already configured"
else
    echo "🔑 Adding Gemini API key to .env file..."
    # Add the API key to .env file
    echo "" >> .env
    echo "# AI/ML API Keys" >> .env
    echo "GOOGLE_GEMINI_API_KEY=AIzaSyCfglkfqHrNB_goQkqZOyWOWLQViO_TuBc" >> .env
    echo "VITE_GOOGLE_GEMINI_API_KEY=AIzaSyCfglkfqHrNB_goQkqZOyWOWLQViO_TuBc" >> .env
    echo "✅ Gemini API key added to .env file"
fi

echo ""
echo "🎉 Gemini API setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Start the AI frontend: npm run dev:ai"
echo "2. Start backend services: npm run backend:up"
echo "3. Open http://localhost:3002 to test the AI features"
echo ""
echo "🔧 Test the integration:"
echo "- Ask questions like 'Analyze the market today'"
echo "- Try 'What are the best tech stocks to buy?'"
echo "- Test 'Explain the risks of investing in NVDA'"
echo ""
echo "⚠️  Security reminder:"
echo "- Your .env file is gitignored and secure"
echo "- Never commit API keys to version control"
echo "- Rotate your API keys regularly"
echo ""
echo "🚀 Happy trading with AI! 🤖📈"
