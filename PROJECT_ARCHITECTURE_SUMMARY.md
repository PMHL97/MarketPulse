# Market Pulse - Project Architecture Summary

## 🏗️ System Overview

Market Pulse is a comprehensive trading platform with real-time market sentiment analysis, featuring multiple frontend versions and a microservices backend architecture. The project supports both traditional trading interfaces and AI-powered features.

## 📊 Project Structure Analysis

### Frontend Versions

The project has **3 distinct frontend versions**:

#### 1. **Main Frontend** (`/src/`)
- **Port**: 3001
- **Config**: `vite.config.js`
- **Purpose**: Full-featured trading platform
- **Features**: Complete trading interface with all pages and components
- **Pages**: 30+ pages including Markets, Charts, Community, Screeners, etc.
- **Components**: 8 core components (Header, Footer, MarketSummary, etc.)

#### 2. **AI Frontend** (`/src-ai/`)
- **Port**: 3002  
- **Config**: `vite.config.ai.js`
- **Purpose**: AI-powered trading interface
- **Features**: AI chat, advanced analytics, portfolio dashboard
- **Pages**: 1 main page (HomePage) with embedded AI features
- **Components**: 14 AI-specific components (AIChatPanel, StockDetailView, etc.)

#### 3. **Classic Frontend** (`/src-classic/`)
- **Port**: 3001 (same as main)
- **Config**: `vite.config.classic.js`
- **Purpose**: Simplified classic interface
- **Features**: Basic trading interface without AI features
- **Components**: Same as main frontend (8 components)

### Backend Services

#### 1. **User Service** (Spring Boot + Java 17)
- **Port**: 8082 (external) / 8080 (internal)
- **Database**: PostgreSQL (marketpulse_users)
- **Purpose**: User authentication and watchlist management
- **Endpoints**:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `GET /api/watchlist`
  - `POST /api/watchlist`
  - `DELETE /api/watchlist/{ticker}`
- **Features**: JWT authentication, user profiles, watchlist CRUD

#### 2. **Article Storage Service** (Spring Boot + Java 17)
- **Port**: 8083 (external) / 8080 (internal)
- **Database**: PostgreSQL (marketpulse_articles)
- **Cache**: Redis
- **Purpose**: News article storage and sentiment data
- **Endpoints**:
  - `GET /api/articles`
  - `POST /api/articles`
- **Features**: Article storage, sentiment trends, real-time updates

#### 3. **Analysis Service** (Python Flask + NLTK)
- **Port**: 5002 (external) / 5001 (internal)
- **Message Broker**: Redis
- **Purpose**: Sentiment analysis and news processing
- **Endpoints**:
  - `POST /trigger-analysis`
  - `GET /sentiment-data`
  - `GET /health`
- **Features**: VADER sentiment analysis, real-time processing, Redis pub/sub

### Infrastructure

#### Databases
- **PostgreSQL Users**: Port 5434, Database: marketpulse_users
- **PostgreSQL Articles**: Port 5435, Database: marketpulse_articles
- **Redis**: Port 6380, Message broker and caching

#### Containerization
- **Docker Compose**: Orchestrates all services
- **Individual Dockerfiles**: Each service has its own Dockerfile
- **Kubernetes**: Production deployment manifests in `/k8s/`

## 🔄 Service Relationships

### Shared Services
All frontend versions share:
- **User Service**: Authentication and user management
- **Article Service**: News and sentiment data
- **Analysis Service**: Sentiment analysis
- **Redis**: Real-time updates and caching
- **PostgreSQL**: Data persistence

### Frontend-Specific Features

#### Main Frontend (`/src/`)
- **Unique**: Complete trading platform with 30+ pages
- **Components**: MarketSummary, FeaturedIdeas, CommunityTrends
- **Pages**: Markets, Charts, Community, Screeners, Heatmaps, etc.
- **API Integration**: Full market data service with Alpha Vantage integration

#### AI Frontend (`/src-ai/`)
- **Unique**: AI-powered features and chat interface
- **Components**: AIChatPanel, StockDetailView, NewsDetailView, AIPortfolioDashboard
- **Features**: AI chat, advanced analytics, portfolio tracking
- **Context**: ChatContext for AI conversation management

#### Classic Frontend (`/src-classic/`)
- **Unique**: Simplified interface without AI features
- **Components**: Same as main frontend but without AI components
- **Purpose**: Lightweight version for users who prefer traditional interface

## 🚀 Deployment Architecture

### Development Environment
```bash
# Main frontend
npm run dev          # Port 3001

# AI frontend  
npm run dev:ai       # Port 3002

# Backend services
npm run backend:up   # All services via Docker Compose
```

### Production Environment
- **Load Balancer**: Nginx/HAProxy
- **Frontend**: Multiple Vite instances
- **Backend**: Microservices with auto-scaling
- **Database**: Read replicas and connection pooling
- **Cache**: Redis cluster

## 📈 Component Analysis

### Shared Components
- **Header.jsx**: Navigation and authentication
- **AuthModal.jsx**: Login/register functionality
- **Footer.jsx**: Site footer
- **TraceIcon.jsx**: Brand icon component

### Frontend-Specific Components

#### Main Frontend Components
- **MarketSummary.jsx**: Market overview
- **FeaturedIdeas.jsx**: Trading ideas
- **CommunityTrends.jsx**: Community insights

#### AI Frontend Components
- **AIChatPanel.jsx**: AI conversation interface
- **StockDetailView.jsx**: Detailed stock information
- **NewsDetailView.jsx**: News article details
- **AIPortfolioDashboard.jsx**: AI-powered portfolio tracking
- **Recommendations.jsx**: AI-generated recommendations
- **AdvancedAnalytics.jsx**: Advanced market analytics
- **TradingAlerts.jsx**: AI-powered trading alerts
- **UserProfile.jsx**: Enhanced user profile
- **PortfolioTracker.jsx**: Portfolio tracking
- **MarketBrief.jsx**: AI market briefings

## 🔧 API Service Layer

### Shared API Services
All frontends use the same API service layer (`/src/services/api.js` and `/src-ai/services/api.js`):

#### User Service APIs
- Authentication (register, login)
- Profile management
- Watchlist operations

#### Article Service APIs
- News article retrieval
- Sentiment analysis data
- Real-time updates

#### Analysis Service APIs
- Sentiment analysis triggering
- Health checks
- Real-time sentiment data

#### Market Data Service APIs
- Stock price data (Alpha Vantage integration)
- Market overview
- Historical data
- Symbol search
- News integration

### AI-Specific API Services
The AI frontend includes additional services:
- **NewsService**: Enhanced news API integration
- **ChatContext**: AI conversation management
- **Real-time Updates**: WebSocket-like functionality via polling

## 🎯 State Management

### Shared State (Zustand)
- **authStore.js**: User authentication state
- **watchlistStore.js**: Stock watchlist management

### AI-Specific State
- **ChatContext.jsx**: AI conversation state management
- **Real-time Updates**: Market data and sentiment updates

## 🔄 Data Flow

### Authentication Flow
1. User login → User Service → JWT token → Frontend state
2. API requests → JWT validation → Service access

### Real-time Data Flow
1. News input → Analysis Service → Sentiment analysis → Redis
2. Redis pub/sub → Article Service → Database storage
3. Frontend polling → Article Service → UI updates

### AI Chat Flow
1. User message → AI Frontend → ChatContext
2. AI processing → Response generation → UI update
3. Stock selection → StockDetailView → Real-time data

## 🚀 Development Commands

### Frontend Development
```bash
# Main frontend
npm run dev

# AI frontend
npm run dev:ai

# Classic frontend (same as main)
npm run dev
```

### Backend Development
```bash
# Start all services
npm run backend:up

# Stop services
npm run backend:down

# View logs
npm run backend:logs
```

### Production Build
```bash
# Main frontend
npm run build

# AI frontend
npm run build:ai
```

## 📊 Key Differences Between Versions

### Main Frontend
- **Complete trading platform**
- **30+ pages and routes**
- **Full market data integration**
- **Community features**
- **Advanced charting**

### AI Frontend
- **AI-powered interface**
- **Chat-based interaction**
- **Advanced analytics**
- **Portfolio dashboard**
- **Real-time AI insights**

### Classic Frontend
- **Simplified interface**
- **Traditional trading features**
- **No AI components**
- **Lightweight design**

## 🔧 Configuration Files

### Vite Configurations
- **`vite.config.js`**: Main frontend (port 3001)
- **`vite.config.ai.js`**: AI frontend (port 3002)
- **`vite.config.classic.js`**: Classic frontend (port 3001)

### Docker Configuration
- **`docker-compose.yml`**: All backend services
- **Individual Dockerfiles**: Each service
- **Kubernetes manifests**: Production deployment

## 🌟 Recommendations

### For Development
1. **Use AI frontend** for AI-powered features
2. **Use main frontend** for complete trading platform
3. **Use classic frontend** for simplified interface

### For Production
1. **Deploy all versions** for different user preferences
2. **Use load balancer** to route users to appropriate version
3. **Implement feature flags** for gradual rollout

### For Scaling
1. **Microservices architecture** allows independent scaling
2. **Redis pub/sub** enables real-time updates
3. **Database separation** improves performance
4. **Container orchestration** supports auto-scaling

## 📝 Summary

Market Pulse is a sophisticated trading platform with:
- **3 frontend versions** (Main, AI, Classic)
- **3 backend microservices** (User, Article, Analysis)
- **2 databases** (Users, Articles)
- **1 cache/message broker** (Redis)
- **Full containerization** with Docker and Kubernetes
- **Real-time capabilities** with sentiment analysis
- **AI-powered features** in the AI frontend
- **Complete trading platform** in the main frontend
- **Simplified interface** in the classic frontend

The architecture supports independent development, deployment, and scaling of each component while maintaining shared services and data consistency across all frontend versions.
