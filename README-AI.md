# Market Pulse AI - A/B Testing Prototype

This is the AI-enhanced version of Market Pulse, designed for A/B testing against the original version.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Docker (for backend services)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start backend services:**
   ```bash
   npm run backend:up
   ```

3. **Run AI version in development:**
   ```bash
   npm run dev:ai
   ```
   Opens at: http://localhost:3002

4. **Run original version for comparison:**
   ```bash
   npm run dev
   ```
   Opens at: http://localhost:3001

## 🧪 A/B Testing

### Using the A/B Test Manager

```bash
# List all versions
node ab-test.js list

# Check build status
node ab-test.js status

# Switch between versions
node ab-test.js switch ai
node ab-test.js switch original

# Generate test report
node ab-test.js report
```

### Building Both Versions

```bash
# Build original version
npm run build

# Build AI version
npm run build:ai

# Preview both versions
npm run preview      # Original at :4173
npm run preview:ai   # AI version at :4173
```

## 🤖 AI Features

### 1. AI Chat Panel
- **Location**: Right-side floating chat panel
- **Features**: 
  - Natural language queries about stocks, markets, strategies
  - Precoded responses for common trading questions
  - Contextual suggestions and follow-up questions

### 2. AI Market Brief
- **Location**: Homepage main section
- **Features**:
  - Daily AI-generated market analysis
  - Sentiment scoring and confidence levels
  - Key events and sector analysis
  - AI recommendations with reasoning

### 3. AI Portfolio Dashboard
- **Location**: Homepage portfolio section
- **Features**:
  - Goal-based portfolio tracking ($1000 → $4000)
  - AI performance insights and recommendations
  - Risk assessment and next actions
  - Market comparison with AI analysis

### 4. AI Chart Assistant
- **Location**: Charts page modal
- **Features**:
  - Chart pattern recognition and explanation
  - Technical indicator analysis
  - Support/resistance level identification
  - Trading recommendations with confidence scores

### 5. Smart Notifications
- **Location**: Header notification bell
- **Features**:
  - AI-generated market alerts
  - Portfolio performance updates
  - Trading recommendations
  - Contextual explanations for price movements

## 📁 Project Structure

```
src-ai/
├── components/
│   ├── AIChatPanel.jsx          # Right-side AI chat
│   ├── AIMarketBrief.jsx       # AI market analysis
│   ├── AIPortfolioDashboard.jsx # AI portfolio tracking
│   ├── AIChartAssistant.jsx    # Chart analysis modal
│   ├── Header.jsx              # Enhanced header with AI features
│   ├── Footer.jsx              # AI-themed footer
│   └── ...                     # Other shared components
├── pages/
│   ├── HomePage.jsx            # AI-enhanced homepage
│   ├── ChartsPage.jsx          # AI chart features
│   └── ...                     # Other pages
├── store/
│   ├── authStore.js            # Authentication state
│   └── watchlistStore.js       # Watchlist management
├── services/
│   └── api.js                  # API service layer
├── App.jsx                     # Main app component
├── main.jsx                    # Entry point
└── App.css                     # AI-specific styles
```

## 🎯 Key Differences from Original

### Visual Enhancements
- **AI Branding**: Brain icons, "AI" badges, gradient backgrounds
- **Color Scheme**: Enhanced primary colors with AI-themed accents
- **Typography**: Updated fonts and spacing for modern feel
- **Animations**: Smooth transitions and loading states

### Functional Additions
- **AI Chat**: Real-time conversational interface
- **Smart Analysis**: AI-powered market insights
- **Goal Tracking**: Portfolio progression visualization
- **Intelligent Alerts**: Context-aware notifications

### User Experience
- **Persona A (Traditional)**: Enhanced existing workflows
- **Persona B (Newbie)**: Guided experience with AI assistance
- **Progressive Disclosure**: Information revealed based on user needs
- **Contextual Help**: AI explanations throughout the interface

## 🔧 Development

### Adding New AI Features

1. **Create component in `src-ai/components/`**
2. **Add to appropriate page in `src-ai/pages/`**
3. **Update routing in `App.jsx`**
4. **Test with `npm run dev:ai`**

### Modifying AI Responses

Edit the precoded responses in:
- `AIChatPanel.jsx` - Chat responses
- `AIMarketBrief.jsx` - Market analysis
- `AIChartAssistant.jsx` - Chart explanations

### Styling

- **Global styles**: `src-ai/App.css`
- **Component styles**: Tailwind classes
- **AI-specific classes**: `.ai-glow`, `.ai-pulse`

## 📊 Testing Strategy

### A/B Test Metrics
- **Engagement**: Time on site, page views, feature usage
- **Conversion**: Sign-ups, feature adoption, retention
- **User Satisfaction**: Feedback, ratings, support tickets
- **Performance**: Load times, error rates, responsiveness

### Test Scenarios
1. **New Users**: First-time visitor experience
2. **Returning Users**: Feature discovery and adoption
3. **Power Users**: Advanced feature usage
4. **Mobile Users**: Responsive design testing

## 🚀 Deployment

### Production Build
```bash
# Build both versions
npm run build
npm run build:ai

# Deploy to your hosting platform
# Original: dist/
# AI: dist-ai/
```

### Environment Variables
```bash
# Add to .env
VITE_ALPHA_VANTAGE_API_KEY=your_key
VITE_NEWS_API_KEY=your_key
```

## 📝 Notes

- **Precoded Responses**: All AI features use mock data for prototyping
- **No Real AI**: Responses are hardcoded for demonstration
- **A/B Testing**: Compare user behavior between versions
- **Future Integration**: Ready for real AI service integration

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/ai-enhancement`
3. Make changes in `src-ai/` directory
4. Test with `npm run dev:ai`
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details

