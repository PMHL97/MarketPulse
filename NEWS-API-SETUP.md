# Real News API Integration

## Overview
The AI version now includes real financial news integration using NewsAPI.org. This provides live financial news articles with sentiment analysis.

## Setup Instructions

### 1. Get NewsAPI Key
1. Visit [NewsAPI.org](https://newsapi.org/)
2. Sign up for a free account
3. Get your API key from the dashboard

### 2. Configure Environment Variables
Create a `.env` file in the project root:

```bash
# News API Configuration
REACT_APP_NEWS_API_KEY=your_actual_api_key_here
```

### 3. Features Implemented

#### Real News Service (`src-ai/services/api.js`)
- **`newsService.getFinancialNews(limit)`**: Fetches real financial news
- **`newsService.getNewsBySymbol(symbol, limit)`**: Gets news for specific stocks
- **Automatic fallback**: Falls back to mock data if API fails

#### HomePage Integration (`src-ai/pages/HomePage.jsx`)
- Real news articles in "Latest Updates" section
- Loading states and error handling
- Image fallback for missing images
- Sentiment indicators on news cards

#### AI Chat Integration (`src-ai/components/AIChatPanel.jsx`)
- Real news included in AI responses
- News cards displayed in chat messages
- Market analysis enhanced with live news
- Sentiment analysis integration

## API Endpoints Used

### NewsAPI.org
- **Free Tier**: 1,000 requests/day
- **Endpoint**: `https://newsapi.org/v2/everything`
- **Query**: `finance OR stock OR market OR trading`
- **Language**: English only
- **Sort**: By published date

## Fallback System

If NewsAPI fails or is unavailable:
1. Falls back to mock financial news data
2. Maintains application functionality
3. Logs errors for debugging
4. Graceful degradation

## News Data Structure

```javascript
{
  title: "Article Title",
  description: "Article description",
  url: "https://...",
  publishedAt: "2024-01-01T00:00:00Z",
  source: "Reuters",
  author: "Author Name",
  image: "https://...",
  sentiment: "positive|negative|neutral"
}
```

## Usage Examples

### In HomePage
```javascript
const fetchRealNews = async () => {
  const newsData = await newsService.getFinancialNews(6)
  setRealNews(newsData)
}
```

### In AI Chat
```javascript
// News is automatically included in market analysis responses
const response = getAIResponse("market analysis")
// response.news contains real news articles
```

## Troubleshooting

### Common Issues
1. **API Key Not Working**: Check if key is correctly set in `.env`
2. **CORS Errors**: NewsAPI handles CORS, but check browser console
3. **Rate Limiting**: Free tier has 1,000 requests/day limit
4. **No News**: Check if API key is valid and has remaining requests

### Debug Mode
Check browser console for:
- "Loaded real news data: X articles" - Success
- "NewsAPI failed, using fallback" - API failure
- "Using mock news data due to error" - Complete fallback

## Next Steps

To enhance the news integration:
1. Add sentiment analysis service
2. Implement news caching
3. Add news filtering by category
4. Integrate with stock price movements
5. Add news alerts and notifications
