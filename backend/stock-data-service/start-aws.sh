#!/bin/bash
# AWS Production Startup Script for Stock Data Service

echo "🚀 Starting Market Pulse Stock Data Service (AWS Production)..."

# Set production environment variables
export FLASK_ENV=production
export FLASK_DEBUG=false
export CACHE_DURATION=${CACHE_DURATION:-30}
export MAX_WORKERS=${MAX_WORKERS:-5}
export TIMEOUT=${TIMEOUT:-10}

# Log configuration
echo "📊 Environment: $FLASK_ENV"
echo "🌐 Port: ${PORT:-5003}"
echo "📦 Cache Duration: $CACHE_DURATION seconds"
echo "👥 Max Workers: $MAX_WORKERS"
echo "⏱️ Timeout: $TIMEOUT seconds"

# Check Redis connection
if [ -n "$REDIS_HOST" ]; then
    echo "🔗 Redis Host: $REDIS_HOST"
    echo "🔗 Redis Port: ${REDIS_PORT:-6379}"
fi

# Check API keys
if [ -n "$TWELVE_DATA_API_KEY" ] && [ "$TWELVE_DATA_API_KEY" != "demo" ]; then
    echo "✅ Twelve Data API key configured"
else
    echo "⚠️ Twelve Data API key not configured (using demo)"
fi

if [ -n "$ALPHA_VANTAGE_API_KEY" ] && [ "$ALPHA_VANTAGE_API_KEY" != "demo" ]; then
    echo "✅ Alpha Vantage API key configured"
else
    echo "⚠️ Alpha Vantage API key not configured (using demo)"
fi

if [ -n "$FINNHUB_API_KEY" ] && [ "$FINNHUB_API_KEY" != "demo" ]; then
    echo "✅ Finnhub API key configured"
else
    echo "⚠️ Finnhub API key not configured (using demo)"
fi

if [ -n "$POLYGON_API_KEY" ] && [ "$POLYGON_API_KEY" != "demo" ]; then
    echo "✅ Polygon API key configured"
else
    echo "⚠️ Polygon API key not configured (using demo)"
fi

# Start the application
echo "🌐 Starting Stock Data Service..."
exec gunicorn \
    --bind 0.0.0.0:${PORT:-5003} \
    --workers ${MAX_WORKERS:-5} \
    --worker-class sync \
    --timeout ${TIMEOUT:-30} \
    --keep-alive 2 \
    --max-requests 1000 \
    --max-requests-jitter 100 \
    --access-logfile - \
    --error-logfile - \
    --log-level info \
    app:app
