// Gemini API Service for AI-powered financial analysis
import axios from 'axios';

const GEMINI_API_KEY = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

class GeminiService {
  constructor() {
    this.apiKey = GEMINI_API_KEY;
    this.baseURL = GEMINI_API_URL;
  }

  // Send a message to Gemini and get AI response
  async sendMessage(message, context = {}) {
    try {
      if (!this.apiKey) {
        throw new Error('Gemini API key not configured');
      }

      const prompt = this.buildPrompt(message, context);
      
      const response = await axios.post(
        `${this.baseURL}?key=${this.apiKey}`,
        {
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000
        }
      );

      if (response.data && response.data.candidates && response.data.candidates[0]) {
        return {
          success: true,
          content: response.data.candidates[0].content.parts[0].text,
          usage: response.data.usageMetadata
        };
      } else {
        throw new Error('Invalid response from Gemini API');
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      return {
        success: false,
        content: this.getFallbackResponse(message),
        error: error.message
      };
    }
  }

  // Build a comprehensive prompt for financial analysis
  buildPrompt(message, context = {}) {
    const { user, watchlist, marketData } = context;
    
    let prompt = `You are an expert financial advisor and market analyst. Provide helpful, accurate, and responsible financial advice. 

User Query: ${message}

Context:
- User: ${user ? user.username : 'Guest'}
- Watchlist: ${watchlist ? watchlist.join(', ') : 'None'}
- Current Market: ${marketData ? JSON.stringify(marketData) : 'No data'}

Guidelines:
1. Provide specific, actionable financial advice
2. Always mention risks and disclaimers
3. Use current market data when available
4. Be conversational but professional
5. If asked about specific stocks, provide analysis
6. Suggest related topics or follow-up questions
7. Keep responses concise but informative

Response format:
- Start with a direct answer
- Provide supporting analysis
- Mention relevant risks
- Suggest next steps or related topics

Please respond to the user's query:`;

    return prompt;
  }

  // Get fallback response when API fails
  getFallbackResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('stock') || lowerMessage.includes('invest')) {
      return "I'm currently experiencing technical difficulties with my AI analysis. For now, I recommend checking our market summary and using our technical analysis tools. Please try again in a moment.";
    }
    
    if (lowerMessage.includes('market') || lowerMessage.includes('analysis')) {
      return "I'm having trouble accessing my market analysis capabilities right now. You can check our real-time market data and charts for current information.";
    }
    
    return "I'm experiencing some technical difficulties. Please try again in a moment, or use our other analysis tools while I get back online.";
  }

  // Analyze market sentiment
  async analyzeMarketSentiment(symbol, newsData = []) {
    const prompt = `Analyze the market sentiment for ${symbol} based on this news data:

${newsData.map(article => `- ${article.title}: ${article.description}`).join('\n')}

Provide:
1. Overall sentiment score (0-100)
2. Key factors driving sentiment
3. Risk assessment
4. Trading recommendations
5. Time horizon for the analysis

Format as JSON with fields: sentiment, factors, risks, recommendations, timeframe`;

    try {
      const response = await this.sendMessage(prompt);
      if (response.success) {
        return this.parseSentimentResponse(response.content);
      }
    } catch (error) {
      console.error('Sentiment analysis error:', error);
    }
    
    return {
      sentiment: 50,
      factors: ['Unable to analyze at this time'],
      risks: ['Technical difficulties'],
      recommendations: ['Check back later for analysis'],
      timeframe: 'Unknown'
    };
  }

  // Parse sentiment analysis response
  parseSentimentResponse(content) {
    try {
      // Try to extract JSON from response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error('Failed to parse sentiment response:', error);
    }
    
    // Fallback parsing
    return {
      sentiment: 50,
      factors: [content],
      risks: ['Analysis incomplete'],
      recommendations: ['Manual review recommended'],
      timeframe: 'Unknown'
    };
  }

  // Get trading recommendations
  async getTradingRecommendations(symbol, timeframe = 'short-term') {
    const prompt = `Provide trading recommendations for ${symbol} with a ${timeframe} timeframe. Include:
1. Technical analysis
2. Fundamental factors
3. Risk levels
4. Entry/exit points
5. Stop-loss levels
6. Target prices

Be specific and actionable.`;

    return await this.sendMessage(prompt);
  }

  // Analyze portfolio
  async analyzePortfolio(holdings = []) {
    const prompt = `Analyze this investment portfolio:
${holdings.map(h => `${h.symbol}: ${h.shares} shares @ $${h.price}`).join('\n')}

Provide:
1. Portfolio diversification analysis
2. Risk assessment
3. Performance outlook
4. Rebalancing suggestions
5. Sector allocation review`;

    return await this.sendMessage(prompt);
  }

  // Get market insights
  async getMarketInsights() {
    const prompt = `Provide current market insights including:
1. Key market drivers
2. Sector performance
3. Economic indicators
4. Risk factors
5. Investment opportunities
6. Market outlook

Keep it concise and actionable.`;

    return await this.sendMessage(prompt);
  }
}

// Create singleton instance
const geminiService = new GeminiService();

export default geminiService;
