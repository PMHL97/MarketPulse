# Market Pulse

A comprehensive trading platform with **3 frontend variants** and microservices backend, featuring real-time market data, AI-powered analysis, and advanced trading tools.

## 🚀 Frontend Variants

### 1. **Main Frontend** (`/src/`) - Port 3001
- **Full-featured trading platform** with complete functionality
- 30+ pages including Markets, Charts, Community, Screeners
- Advanced charting with Lightweight Charts
- Complete user authentication and watchlist management

### 2. **AI Frontend** (`/src-ai/`) - Port 3002  
- **AI-powered trading interface** with intelligent features
- AI Chat Panel for natural language queries
- AI Market Brief with sentiment analysis
- AI Portfolio Dashboard with goal tracking
- Smart notifications and recommendations

### 3. **Classic Frontend** (`/src-classic/`) - Port 3001
- **Simplified interface** for traditional users
- Clean, minimal design without AI features
- Focus on core trading functionality
- Lightweight and fast loading

## ✨ Key Features

- **Real-time Market Data** - Live stock prices and market overview
- **AI-Powered Analysis** - Intelligent market insights and recommendations  
- **Advanced Charting** - Professional trading charts with multiple timeframes
- **Sentiment Analysis** - AI-powered news sentiment analysis for stocks
- **User Authentication** - Secure JWT-based login/registration
- **Watchlist Management** - Personal stock watchlists
- **News Integration** - Real-time financial news with sentiment scores
- **Responsive Design** - Modern UI built with Tailwind CSS and Framer Motion

## Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS for styling
- Framer Motion for animations
- Zustand for state management
- Lightweight Charts for advanced charting
- React Router for navigation

### Backend Services
- **User Service** - Spring Boot with JWT authentication
- **Article Service** - Spring Boot for news and sentiment storage
- **Analysis Service** - Python Flask for sentiment analysis
- **PostgreSQL** - User and article databases
- **Redis** - Message broker and caching

## Quick Start

### Prerequisites
- Node.js 18+
- Docker and Docker Compose
- Java 17+ (for Spring Boot services)
- Python 3.8+ (for analysis service)

### 1. Start Backend Services
```bash
# Start all backend services (PostgreSQL, Redis, Spring Boot, Flask)
npm run backend:up

# Or use docker-compose directly
docker-compose up -d
```

### 2. Start Frontend
```bash
# Install dependencies
npm install

# Start Main Frontend (Port 3001)
npm run dev

# Start AI Frontend (Port 3002) 
npm run dev:ai

# Start Classic Frontend (Port 3001)
npm run dev:classic
```

**Access Points:**
- Main Frontend: `http://localhost:3001`
- AI Frontend: `http://localhost:3002`  
- Classic Frontend: `http://localhost:3001` (different build)

### 3. Access Backend Services
- User Service: `http://localhost:8080`
- Article Service: `http://localhost:8081`
- Analysis Service: `http://localhost:5001`
- PostgreSQL Users: `localhost:5432`
- PostgreSQL Articles: `localhost:5433`
- Redis: `localhost:6379`

## Development

### Available Scripts
- `npm run dev` - Start frontend development server
- `npm run build` - Build for production
- `npm run backend:up` - Start backend services
- `npm run backend:down` - Stop backend services
- `npm run backend:logs` - View backend service logs

### Project Structure
```
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── services/      # API service layer
│   ├── store/         # Zustand state management
│   └── App.jsx        # Main app component
├── backend/            # Backend microservices
│   ├── user-service/  # Spring Boot user management
│   ├── article-storage-service/ # News storage
│   └── analysis-service/       # Python sentiment analysis
└── docker-compose.yml # Service orchestration
```

### Adding New Features
1. **Frontend**: Add components in `src/components/` and pages in `src/pages/`
2. **State**: Create new stores in `src/store/` using Zustand
3. **API**: Extend services in `src/services/api.js`
4. **Backend**: Add new endpoints to existing services or create new microservices

## API Endpoints

### User Service (`/api`)
- `POST /auth/register` - User registration
- `POST /auth/login` - User authentication
- `GET /watchlist` - Get user watchlist
- `POST /watchlist` - Add stock to watchlist
- `DELETE /watchlist/{ticker}` - Remove stock from watchlist

### Article Service (`/api`)
- `GET /articles` - Get news articles with sentiment
- `GET /articles/symbol/{symbol}` - Get articles for specific stock
- `GET /articles/sentiment/{symbol}` - Get sentiment trends

### Analysis Service
- `POST /trigger-analysis` - Trigger sentiment analysis
- `GET /health` - Service health check

## Environment Variables

Create a `.env` file in the root directory:

```env
# Database
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# API Keys (for real market data)
ALPHA_VANTAGE_API_KEY=your_key_here
NEWS_API_KEY=your_key_here
```

## Troubleshooting

### Common Issues
1. **Port conflicts**: Ensure ports 3001, 8080, 8081, 5001, 5432, 5433, 6379 are available
2. **Database connection**: Check if PostgreSQL containers are running
3. **Service startup**: Use `npm run backend:logs` to debug service issues

### Reset Everything
```bash
# Stop and remove all containers
npm run backend:down

# Remove volumes (WARNING: This will delete all data)
docker-compose down -v

# Rebuild and start
npm run backend:up
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
