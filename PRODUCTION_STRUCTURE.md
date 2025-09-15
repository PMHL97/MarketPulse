# Market Pulse - Production Structure

## 🏗️ System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PRODUCTION SYSTEM                                │
│                              Market Pulse                                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 📊 Complete System Architecture Tree

```
MARKET PULSE
├── 🌐 FRONTEND LAYER (React + Vite)
│   ├── 📱 User Interface Components
│   │   ├── Header.jsx
│   │   │   ├── Navigation Menu
│   │   │   ├── Search Functionality
│   │   │   ├── Authentication Controls
│   │   │   │   ├── Sign In Button
│   │   │   │   ├── Sign Up Button
│   │   │   │   └── User Profile Display
│   │   │   └── Mobile Responsive Menu
│   │   ├── AuthModal.jsx
│   │   │   ├── Login Form
│   │   │   │   ├── Email Input
│   │   │   │   ├── Password Input
│   │   │   │   └── Form Validation
│   │   │   ├── Registration Form
│   │   │   │   ├── Username Input
│   │   │   │   ├── Email Input
│   │   │   │   ├── Password Input
│   │   │   │   ├── Confirm Password
│   │   │   │   └── Form Validation
│   │   │   └── Mode Switching (Login/Register)
│   │   ├── Footer.jsx
│   │   ├── MarketSummary.jsx
│   │   ├── FeaturedIdeas.jsx
│   │   └── CommunityTrends.jsx
│   │
│   ├── 📄 Page Components
│   │   ├── HomePage.jsx
│   │   │   ├── Hero Section
│   │   │   ├── Market Overview
│   │   │   ├── Featured Trading Ideas
│   │   │   └── Community Trends
│   │   ├── MarketsPage.jsx
│   │   │   ├── Market Data Display
│   │   │   ├── Asset Class Filtering
│   │   │   ├── Real-time Price Updates
│   │   │   └── Market Sentiment Indicators
│   │   ├── ChartsPage.jsx
│   │   │   ├── Chart Canvas
│   │   │   ├── Technical Indicators
│   │   │   ├── Drawing Tools
│   │   │   ├── Timeframe Selection
│   │   │   └── Chart Customization
│   │   └── CommunityPage.jsx
│   │       ├── User Profiles
│   │       ├── Trading Ideas
│   │       ├── Social Interactions
│   │       └── Community Analytics
│   │
│   ├── 🎯 State Management (Zustand)
│   │   ├── authStore.js
│   │   │   ├── User Authentication State
│   │   │   ├── JWT Token Management
│   │   │   ├── Login/Register Actions
│   │   │   ├── User Profile Data
│   │   │   └── Persistent Storage
│   │   └── watchlistStore.js
│   │       ├── Stock Watchlist State
│   │       ├── Add/Remove Stocks
│   │       ├── Watchlist Persistence
│   │       └── Real-time Updates
│   │
│   ├── 🔌 API Service Layer
│   │   └── api.js
│   │       ├── userService
│   │       │   ├── Authentication APIs
│   │       │   ├── User Profile APIs
│   │       │   └── Watchlist Management APIs
│   │       ├── articleService
│   │       │   ├── News Article APIs
│   │       │   ├── Sentiment Analysis APIs
│   │       │   └── Real-time Updates
│   │       ├── analysisService
│   │       │   ├── Sentiment Analysis APIs
│   │       │   └── Market Analysis APIs
│   │       └── marketDataService
│   │           ├── Stock Price APIs
│   │           ├── Market Overview APIs
│   │           └── Real-time Data
│   │
│   └── 🎨 Styling & UI
│       ├── Tailwind CSS Configuration
│       ├── Custom Design System
│       ├── Responsive Breakpoints
│       └── Animation System (Framer Motion)
│
├── 🔧 BACKEND LAYER (Microservices Architecture)
│   ├── 👤 User Service (Spring Boot + Java 17)
│   │   ├── Port: 8082 (External) / 8080 (Internal)
│   │   ├── Database: PostgreSQL (Users)
│   │   ├── Core Functions:
│   │   │   ├── User Registration
│   │   │   ├── User Authentication (JWT)
│   │   │   ├── Password Management
│   │   │   ├── User Profile CRUD
│   │   │   ├── Watchlist Management
│   │   │   └── Session Management
│   │   ├── Security:
│   │   │   ├── Spring Security
│   │   │   ├── JWT Token Generation
│   │   │   ├── Password Encryption
│   │   │   └── CORS Configuration
│   │   ├── API Endpoints:
│   │   │   ├── POST /api/auth/register
│   │   │   ├── POST /api/auth/login
│   │   │   ├── GET /api/profile
│   │   │   ├── PUT /api/profile
│   │   │   ├── GET /api/watchlist
│   │   │   ├── POST /api/watchlist
│   │   │   └── DELETE /api/watchlist/{ticker}
│   │   └── Data Models:
│   │       ├── User Entity
│   │       ├── StockWatchlist Entity
│   │       └── Authentication DTOs
│   │
│   ├── 📰 Article Storage Service (Spring Boot + Java 17)
│   │   ├── Port: 8083 (External) / 8080 (Internal)
│   │   ├── Database: PostgreSQL (Articles)
│   │   ├── Cache: Redis
│   │   ├── Core Functions:
│   │   │   ├── News Article Storage
│   │   │   ├── Sentiment Data Storage
│   │   │   ├── Article Retrieval
│   │   │   ├── Sentiment Trend Analysis
│   │   │   ├── Real-time Updates
│   │   │   └── Data Aggregation
│   │   ├── API Endpoints:
│   │   │   ├── GET /api/articles
│   │   │   ├── GET /api/articles/symbol/{symbol}
│   │   │   ├── GET /api/articles/sentiment/{symbol}
│   │   │   └── POST /api/articles
│   │   ├── Data Models:
│   │   │   ├── Article Entity
│   │   │   ├── Sentiment Entity
│   │   │   └── Market Data Entity
│   │   └── Features:
│   │       ├── Full-text Search
│   │       ├── Sentiment Scoring
│   │       ├── Time-based Filtering
│   │       └── Symbol-based Categorization
│   │
│   ├── 🧠 Analysis Service (Python Flask + NLTK)
│   │   ├── Port: 5002 (External) / 5001 (Internal)
│   │   ├── Message Broker: Redis
│   │   ├── Core Functions:
│   │   │   ├── Natural Language Processing
│   │   │   ├── Sentiment Analysis (VADER)
│   │   │   ├── News Article Analysis
│   │   │   ├── Market Sentiment Scoring
│   │   │   ├── Real-time Processing
│   │   │   └── Data Synthesis
│   │   ├── API Endpoints:
│   │   │   ├── POST /trigger-analysis
│   │   │   ├── GET /sentiment-data
│   │   │   └── GET /health
│   │   ├── Processing Pipeline:
│   │   │   ├── Text Input Processing
│   │   │   ├── Sentiment Analysis Engine
│   │   │   ├── Score Calculation
│   │   │   ├── Result Classification
│   │   │   └── Data Publishing
│   │   └── Features:
│   │       ├── VADER Sentiment Analysis
│   │       ├── Real-time Processing
│   │       ├── Batch Processing
│   │       ├── Redis Message Publishing
│   │       └── Health Monitoring
│   │
│   └── 🗄️ Data Layer
│       ├── PostgreSQL Users Database
│       │   ├── Port: 5434 (External) / 5432 (Internal)
│       │   ├── Database: marketpulse_users
│       │   ├── Tables:
│       │   │   ├── users
│       │   │   ├── stock_watchlists
│       │   │   ├── user_profiles
│       │   │   └── authentication_tokens
│       │   └── Features:
│       │       ├── ACID Compliance
│       │       ├── Connection Pooling
│       │       ├── Indexing
│       │       └── Backup & Recovery
│       │
│       ├── PostgreSQL Articles Database
│       │   ├── Port: 5435 (External) / 5432 (Internal)
│       │   ├── Database: marketpulse_articles
│       │   ├── Tables:
│       │   │   ├── articles
│       │   │   ├── sentiments
│       │   │   ├── market_data
│       │   │   └── analysis_results
│       │   └── Features:
│       │       ├── Full-text Search
│       │       ├── JSON Support
│       │       ├── Partitioning
│       │       └── Replication
│       │
│       └── Redis Cache & Message Broker
│           ├── Port: 6380 (External) / 6379 (Internal)
│           ├── Functions:
│           │   ├── Session Storage
│           │   ├── Cache Layer
│           │   ├── Message Queuing
│           │   ├── Real-time Updates
│           │   └── Data Persistence
│           └── Features:
│               ├── In-Memory Storage
│               ├── Pub/Sub Messaging
│               ├── Data Expiration
│               ├── Clustering
│               └── Persistence
│
├── 🐳 INFRASTRUCTURE LAYER
│   ├── Docker Containerization
│   │   ├── Container Orchestration
│   │   ├── Service Discovery
│   │   ├── Load Balancing
│   │   └── Health Monitoring
│   │
│   ├── Network Configuration
│   │   ├── Port Mapping
│   │   ├── Service Communication
│   │   ├── CORS Configuration
│   │   └── Security Policies
│   │
│   └── Environment Management
│       ├── Environment Variables
│       ├── Configuration Files
│       ├── Secrets Management
│       └── Deployment Scripts
│
└── 🔄 DATA FLOW & INTEGRATION
    ├── Real-time Data Pipeline
    │   ├── News Input → Analysis Service → Sentiment Scoring → Article Storage → Frontend Display
    │   ├── User Actions → User Service → Database → State Update → UI Refresh
    │   └── Market Data → Analysis → Sentiment Trends → Chart Updates
    │
    ├── Authentication Flow
    │   ├── User Login → JWT Generation → Token Storage → API Authorization
    │   ├── Request → Token Validation → Service Access → Response
    │   └── Logout → Token Invalidation → State Clear → UI Update
    │
    └── Watchlist Management
        ├── Add Stock → API Call → Database Update → State Sync → UI Update
        ├── Remove Stock → API Call → Database Update → State Sync → UI Update
        └── Real-time Updates → WebSocket/Polling → State Update → UI Refresh
```

## 🚀 Production Deployment Structure

```
PRODUCTION ENVIRONMENT
├── 🌍 Load Balancer (Nginx/HAProxy)
│   ├── SSL Termination
│   ├── Request Routing
│   ├── Health Checks
│   └── Rate Limiting
│
├── 🖥️ Application Servers
│   ├── Frontend Cluster (Vite Build)
│   ├── Backend Service Clusters
│   └── Auto-scaling Groups
│
├── 🗄️ Database Cluster
│   ├── Primary Database
│   ├── Read Replicas
│   ├── Backup Systems
│   └── Monitoring
│
├── 🔍 Monitoring & Observability
│   ├── Application Performance Monitoring
│   ├── Infrastructure Monitoring
│   ├── Log Aggregation
│   └── Alert Systems
│
└── 🔒 Security Layer
    ├── API Gateway
    ├── Authentication Service
    ├── Rate Limiting
    ├── DDoS Protection
    └── Data Encryption
```

## 📈 Scalability & Performance Features

### Horizontal Scaling
- **Frontend**: Multiple Vite instances behind load balancer
- **Backend Services**: Stateless microservices with auto-scaling
- **Databases**: Read replicas and connection pooling
- **Cache**: Redis cluster with sharding

### Performance Optimization
- **Frontend**: Code splitting, lazy loading, CDN
- **Backend**: Connection pooling, caching, async processing
- **Database**: Indexing, query optimization, connection management
- **Network**: HTTP/2, compression, caching headers

### Real-time Capabilities
- **WebSocket Support**: For live market data
- **Server-Sent Events**: For news updates
- **Redis Pub/Sub**: For inter-service communication
- **Polling Fallback**: For compatibility

## 🔧 Development & Deployment Commands

```bash
# Development
npm run dev                    # Start frontend dev server
npm run backend:up            # Start all backend services
npm run backend:down          # Stop all backend services
npm run backend:logs          # View service logs

# Production Build
npm run build                 # Build frontend for production
docker-compose -f docker-compose.prod.yml up -d  # Production deployment

# Monitoring
docker-compose ps             # Check service status
docker-compose logs -f        # Follow all logs
docker stats                  # Resource usage
```

## 🌟 Key Benefits of This Architecture

1. **Modular Design**: Independent services that can be developed, deployed, and scaled separately
2. **Real-time Capabilities**: Live market data, sentiment analysis, and user interactions
3. **Scalability**: Horizontal scaling for all components
4. **Security**: JWT authentication, CORS protection, and secure communication
5. **Performance**: Caching, connection pooling, and optimized data flows
6. **Maintainability**: Clear separation of concerns and well-defined APIs
7. **Extensibility**: Easy to add new features and services
8. **Production Ready**: Docker containerization, health checks, and monitoring

This architecture provides a robust, scalable foundation for a professional trading platform with real-time market sentiment analysis capabilities.

