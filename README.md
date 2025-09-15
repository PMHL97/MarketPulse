# Market Pulse

A modern trading platform with integrated real-time market sentiment analysis, user authentication, and advanced charting capabilities.

## Features

- **Real-time Market Data** - Live stock prices and market overview
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

# Start development server
npm run dev
```

The app will be available at `http://localhost:3001`

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
