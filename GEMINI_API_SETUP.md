# Google Gemini API Integration Setup

## 🔑 API Key Configuration

Your Google Gemini API key has been configured for the Market Pulse project:

**API Key**: `AIzaSyCfglkfqHrNB_goQkqZOyWOWLQViO_TuBc`

## 📁 Environment Setup

### 1. Create your `.env` file

Create a `.env` file in the root directory with the following content:

```bash
# Database Configuration
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
POSTGRES_DB_USERS=marketpulse_users
POSTGRES_DB_ARTICLES=marketpulse_articles

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6380

# Service Ports
USER_SERVICE_PORT=8082
ARTICLE_SERVICE_PORT=8083
ANALYSIS_SERVICE_PORT=5002

# API Keys (for real market data integration)
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key_here
NEWS_API_KEY=your_news_api_key_here
FINNHUB_API_KEY=your_finnhub_key_here

# AI/ML API Keys
GOOGLE_GEMINI_API_KEY=AIzaSyCfglkfqHrNB_goQkqZOyWOWLQViO_TuBc

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRATION=86400000

# Frontend Configuration
VITE_API_BASE_URL=http://localhost:8082
VITE_ARTICLE_API_URL=http://localhost:8083
VITE_ANALYSIS_API_URL=http://localhost:5002
VITE_GOOGLE_GEMINI_API_KEY=AIzaSyCfglkfqHrNB_goQkqZOyWOWLQViO_TuBc
```

### 2. Security Notes

⚠️ **Important Security Considerations:**

1. **Never commit the `.env` file** - It's already in `.gitignore`
2. **Keep your API key secure** - Don't share it publicly
3. **Use environment variables** in production
4. **Rotate keys regularly** for security

## 🤖 Gemini API Integration

### Frontend Integration (AI Frontend)

The Gemini API key is now available in your AI frontend via:

```javascript
// Access the API key in your components
const geminiApiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;

// Example usage in AIChatPanel.jsx
const sendMessageToGemini = async (message) => {
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + geminiApiKey, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: message
        }]
      }]
    })
  });
  
  const data = await response.json();
  return data;
};
```

### Backend Integration (Analysis Service)

You can also use the Gemini API in your Python analysis service:

```python
# In backend/analysis-service/app.py
import os
import requests

GEMINI_API_KEY = os.environ.get('GOOGLE_GEMINI_API_KEY')

def analyze_with_gemini(text):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={GEMINI_API_KEY}"
    
    payload = {
        "contents": [{
            "parts": [{
                "text": f"Analyze the sentiment of this financial news: {text}"
            }]
        }]
    }
    
    response = requests.post(url, json=payload)
    return response.json()
```

## 🚀 Usage Examples

### 1. AI Chat Integration

```javascript
// In src-ai/components/AIChatPanel.jsx
const handleSendMessage = async (message) => {
  const geminiApiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
  
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `As a financial advisor, analyze this market question: ${message}`
          }]
        }]
      })
    });
    
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Gemini API error:', error);
    return 'Sorry, I encountered an error processing your request.';
  }
};
```

### 2. Market Analysis Integration

```javascript
// In src-ai/components/AdvancedAnalytics.jsx
const analyzeMarketTrends = async (symbol) => {
  const geminiApiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
  
  const prompt = `Analyze the market trends for ${symbol} and provide insights on:
  1. Technical analysis
  2. Market sentiment
  3. Risk assessment
  4. Trading recommendations`;
  
  // Send to Gemini API...
};
```

## 🔧 Development Commands

### Start with Gemini API

```bash
# Start the AI frontend with Gemini integration
npm run dev:ai

# Start backend services
npm run backend:up
```

### Test Gemini Integration

```bash
# Test the API key is loaded
console.log('Gemini API Key:', import.meta.env.VITE_GOOGLE_GEMINI_API_KEY);
```

## 📊 Integration Points

### 1. AI Chat Panel
- **File**: `src-ai/components/AIChatPanel.jsx`
- **Purpose**: Real-time AI conversations
- **Gemini Usage**: Financial advice, market analysis

### 2. Advanced Analytics
- **File**: `src-ai/components/AdvancedAnalytics.jsx`
- **Purpose**: Market trend analysis
- **Gemini Usage**: Technical analysis, sentiment analysis

### 3. Portfolio Dashboard
- **File**: `src-ai/components/AIPortfolioDashboard.jsx`
- **Purpose**: AI-powered portfolio insights
- **Gemini Usage**: Investment recommendations

### 4. Trading Alerts
- **File**: `src-ai/components/TradingAlerts.jsx`
- **Purpose**: AI-generated trading signals
- **Gemini Usage**: Alert generation, risk assessment

## 🛡️ Security Best Practices

1. **Environment Variables**: Always use environment variables
2. **API Key Rotation**: Rotate keys regularly
3. **Rate Limiting**: Implement rate limiting for API calls
4. **Error Handling**: Handle API errors gracefully
5. **Logging**: Log API usage for monitoring

## 🚀 Next Steps

1. **Create your `.env` file** with the provided template
2. **Test the integration** in your AI frontend
3. **Implement error handling** for API failures
4. **Add rate limiting** to prevent abuse
5. **Monitor API usage** and costs

Your Gemini API key is now ready to power AI features in your Market Pulse platform! 🎉
