#!/usr/bin/env python3
"""
Stock Data Service - AWS Production Version
Optimized for AWS deployment with production configurations
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import json
import time
import os
import logging
from datetime import datetime, timedelta
from concurrent.futures import ThreadPoolExecutor, as_completed
import redis
from prometheus_client import Counter, Histogram, generate_latest, CONTENT_TYPE_LATEST
import threading

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# CORS configuration for production
CORS(app, 
     origins=[
         'https://marketpulse.ai',
         'https://app.marketpulse.ai', 
         'https://ai.marketpulse.ai',
         'https://classic.marketpulse.ai',
        'http://localhost:3000',
        'http://localhost:3001', 
        'http://localhost:3002',
        'http://localhost:3005'
     ],
     methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
     allow_headers=['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'])

# Redis configuration for production
try:
    redis_client = redis.Redis(
        host=os.getenv('REDIS_HOST', 'redis'),
        port=int(os.getenv('REDIS_PORT', 6379)),
        password=os.getenv('REDIS_PASSWORD'),
        decode_responses=True,
        socket_connect_timeout=5,
        socket_timeout=5,
        retry_on_timeout=True
    )
    redis_client.ping()
    logger.info("✅ Redis connection established")
except Exception as e:
    logger.warning(f"⚠️ Redis connection failed: {e}")
    redis_client = None

# Prometheus metrics
REQUEST_COUNT = Counter('stock_data_requests_total', 'Total requests', ['method', 'endpoint', 'status'])
REQUEST_DURATION = Histogram('stock_data_request_duration_seconds', 'Request duration')
API_CALLS = Counter('stock_data_api_calls_total', 'API calls', ['provider', 'status'])
CACHE_HITS = Counter('stock_data_cache_hits_total', 'Cache hits', ['type'])

# Configuration
CACHE_DURATION = int(os.getenv('CACHE_DURATION', 30))
MAX_WORKERS = int(os.getenv('MAX_WORKERS', 5))
TIMEOUT = int(os.getenv('TIMEOUT', 10))

class StockDataService:
    def __init__(self):
        self.apis = {
            'twelve_data': {
                'base_url': 'https://api.twelvedata.com',
                'endpoints': {
                    'price': '/price',
                    'quote': '/quote'
                },
                'apikey': os.getenv('TWELVE_DATA_API_KEY', 'demo')
            },
            'alpha_vantage': {
                'base_url': 'https://www.alphavantage.co/query',
                'params': {
                    'function': 'GLOBAL_QUOTE',
                    'apikey': os.getenv('ALPHA_VANTAGE_API_KEY', 'demo')
                }
            },
            'finnhub': {
                'base_url': 'https://finnhub.io/api/v1',
                'endpoints': {
                    'quote': '/quote'
                },
                'token': os.getenv('FINNHUB_API_KEY', 'demo')
            },
            'polygon': {
                'base_url': 'https://api.polygon.io/v2',
                'endpoints': {
                    'prev': '/aggs/ticker/{symbol}/prev'
                },
                'apikey': os.getenv('POLYGON_API_KEY', 'demo')
            }
        }

    def get_stock_price(self, symbol):
        """Get real stock price with caching and metrics"""
        start_time = time.time()
        
        try:
            # Check Redis cache first
            cache_key = f"stock:{symbol}"
            if redis_client:
                try:
                    cached_data = redis_client.get(cache_key)
                    if cached_data:
                        CACHE_HITS.labels(type='redis').inc()
                        logger.info(f"📦 Cache hit for {symbol}")
                        return json.loads(cached_data)
                except Exception as e:
                    logger.warning(f"Redis cache error: {e}")

            # Try multiple APIs with parallel execution
            apis_to_try = [
                self.get_from_twelve_data,
                self.get_from_alpha_vantage,
                self.get_from_finnhub,
                self.get_from_polygon
            ]

            for api_func in apis_to_try:
                try:
                    data = api_func(symbol)
                    if data and data.get('price', 0) > 0:
                        # Cache in Redis
                        if redis_client:
                            try:
                                redis_client.setex(cache_key, CACHE_DURATION, json.dumps(data))
                            except Exception as e:
                                logger.warning(f"Redis cache set error: {e}")
                        
                        API_CALLS.labels(provider=data.get('dataSource', 'unknown'), status='success').inc()
                        logger.info(f"✅ Real data for {symbol}: ${data['price']} ({data['dataSource']})")
                        return data
                except Exception as e:
                    API_CALLS.labels(provider=api_func.__name__, status='error').inc()
                    logger.warning(f"❌ API failed for {symbol}: {str(e)}")
                    continue

            # Fallback to enhanced mock data
            logger.warning(f"⚠️ All APIs failed for {symbol}, using enhanced mock data")
            return self.get_enhanced_mock_data(symbol)

        except Exception as e:
            logger.error(f"❌ Error getting stock data for {symbol}: {str(e)}")
            return self.get_enhanced_mock_data(symbol)
        finally:
            REQUEST_DURATION.observe(time.time() - start_time)

    def get_multiple_stock_prices(self, symbols):
        """Get multiple stock prices efficiently with batch processing"""
        start_time = time.time()
        
        try:
            logger.info(f"📊 Fetching data for {len(symbols)} stocks: {', '.join(symbols)}")
            
            # Try batch APIs first (more efficient)
            batch_apis = [
                lambda syms: self.get_from_twelve_data_batch(syms),
                lambda syms: self.get_from_alpha_vantage_batch(syms),
                lambda syms: self.get_from_finnhub_batch(syms)
            ]
            
            for batch_api in batch_apis:
                try:
                    results = batch_api(symbols)
                    if results and len(results) > 0:
                        logger.info(f"✅ Batch API success: {len(results)} stocks")
                        
                        # Cache results in Redis
                        if redis_client:
                            for symbol, data in results.items():
                                cache_key = f"stock:{symbol}"
                                try:
                                    redis_client.setex(cache_key, CACHE_DURATION, json.dumps(data))
                                except Exception as e:
                                    logger.warning(f"Redis cache set error: {e}")
                        
                        return results
                except Exception as e:
                    logger.warning(f"❌ Batch API failed: {str(e)}")
                    continue
            
            # Fallback to individual calls if batch APIs fail
            logger.warning("⚠️ Batch APIs failed, trying individual calls")
            results = {}
            with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
                future_to_symbol = {
                    executor.submit(self.get_stock_price, symbol): symbol 
                    for symbol in symbols
                }
                
                for future in as_completed(future_to_symbol):
                    symbol = future_to_symbol[future]
                    try:
                        data = future.result()
                        results[symbol] = data
                    except Exception as e:
                        logger.error(f"❌ Individual call failed for {symbol}: {str(e)}")
                        results[symbol] = self.get_enhanced_mock_data(symbol)
            
            return results
            
        except Exception as e:
            logger.error(f"❌ Error getting multiple stock data: {str(e)}")
            return {symbol: self.get_enhanced_mock_data(symbol) for symbol in symbols}
        finally:
            REQUEST_DURATION.observe(time.time() - start_time)

    def get_from_twelve_data(self, symbol):
        """Get data from Twelve Data API"""
        try:
            url = f"{self.apis['twelve_data']['base_url']}{self.apis['twelve_data']['endpoints']['price']}"
            params = {
                'symbol': symbol, 
                'apikey': self.apis['twelve_data']['apikey']
            }
            
            response = requests.get(url, params=params, timeout=TIMEOUT)
            response.raise_for_status()
            
            data = response.json()
            if data.get('price'):
                price = float(data['price'])
                return {
                    'symbol': symbol,
                    'price': price,
                    'change': 0,
                    'changePercent': 0,
                    'volume': 0,
                    'high': price,
                    'low': price,
                    'open': price,
                    'previousClose': price,
                    'timestamp': datetime.now().isoformat(),
                    'dataSource': 'twelve-data',
                    'isRealTime': True
                }
            raise Exception('No price data from Twelve Data')
        except Exception as e:
            raise Exception(f'Twelve Data API error: {str(e)}')

    def get_from_twelve_data_batch(self, symbols):
        """Get multiple stocks from Twelve Data API in batch"""
        try:
            results = {}
            with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
                future_to_symbol = {
                    executor.submit(self.get_from_twelve_data, symbol): symbol 
                    for symbol in symbols
                }
                
                for future in as_completed(future_to_symbol):
                    symbol = future_to_symbol[future]
                    try:
                        data = future.result()
                        if data and data.get('price', 0) > 0:
                            results[symbol] = data
                    except Exception as e:
                        logger.warning(f"❌ Twelve Data batch failed for {symbol}: {str(e)}")
                        continue
            
            return results
        except Exception as e:
            raise Exception(f'Twelve Data batch API error: {str(e)}')

    def get_from_alpha_vantage(self, symbol):
        """Get data from Alpha Vantage API"""
        try:
            url = self.apis['alpha_vantage']['base_url']
            params = {
                **self.apis['alpha_vantage']['params'],
                'symbol': symbol
            }
            
            response = requests.get(url, params=params, timeout=TIMEOUT)
            response.raise_for_status()
            
            data = response.json()
            if data.get('Global Quote'):
                quote = data['Global Quote']
                price = float(quote['05. price'])
                change = float(quote['09. change'])
                change_percent = float(quote['10. change percent'].replace('%', ''))
                
                return {
                    'symbol': symbol,
                    'price': price,
                    'change': change,
                    'changePercent': change_percent,
                    'volume': int(quote['06. volume']),
                    'high': float(quote['03. high']),
                    'low': float(quote['04. low']),
                    'open': float(quote['02. open']),
                    'previousClose': float(quote['08. previous close']),
                    'timestamp': datetime.now().isoformat(),
                    'dataSource': 'alpha-vantage',
                    'isRealTime': True
                }
            raise Exception('No data from Alpha Vantage')
        except Exception as e:
            raise Exception(f'Alpha Vantage API error: {str(e)}')

    def get_from_alpha_vantage_batch(self, symbols):
        """Get multiple stocks from Alpha Vantage API in batch"""
        try:
            results = {}
            with ThreadPoolExecutor(max_workers=3) as executor:  # Rate limit friendly
                future_to_symbol = {
                    executor.submit(self.get_from_alpha_vantage, symbol): symbol 
                    for symbol in symbols
                }
                
                for future in as_completed(future_to_symbol):
                    symbol = future_to_symbol[future]
                    try:
                        data = future.result()
                        if data and data.get('price', 0) > 0:
                            results[symbol] = data
                    except Exception as e:
                        logger.warning(f"❌ Alpha Vantage batch failed for {symbol}: {str(e)}")
                        continue
            
            return results
        except Exception as e:
            raise Exception(f'Alpha Vantage batch API error: {str(e)}')

    def get_from_finnhub(self, symbol):
        """Get data from Finnhub API"""
        try:
            url = f"{self.apis['finnhub']['base_url']}{self.apis['finnhub']['endpoints']['quote']}"
            params = {
                'symbol': symbol,
                'token': self.apis['finnhub']['token']
            }
            
            response = requests.get(url, params=params, timeout=TIMEOUT)
            response.raise_for_status()
            
            data = response.json()
            if data.get('c'):
                return {
                    'symbol': symbol,
                    'price': data['c'],
                    'change': data['d'],
                    'changePercent': data['dp'],
                    'volume': 0,
                    'high': data['h'],
                    'low': data['l'],
                    'open': data['o'],
                    'previousClose': data['pc'],
                    'timestamp': datetime.now().isoformat(),
                    'dataSource': 'finnhub',
                    'isRealTime': True
                }
            raise Exception('No data from Finnhub')
        except Exception as e:
            raise Exception(f'Finnhub API error: {str(e)}')

    def get_from_finnhub_batch(self, symbols):
        """Get multiple stocks from Finnhub API in batch"""
        try:
            results = {}
            with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
                future_to_symbol = {
                    executor.submit(self.get_from_finnhub, symbol): symbol 
                    for symbol in symbols
                }
                
                for future in as_completed(future_to_symbol):
                    symbol = future_to_symbol[future]
                    try:
                        data = future.result()
                        if data and data.get('price', 0) > 0:
                            results[symbol] = data
                    except Exception as e:
                        logger.warning(f"❌ Finnhub batch failed for {symbol}: {str(e)}")
                        continue
            
            return results
        except Exception as e:
            raise Exception(f'Finnhub batch API error: {str(e)}')

    def get_from_polygon(self, symbol):
        """Get data from Polygon API"""
        try:
            url = f"{self.apis['polygon']['base_url']}{self.apis['polygon']['endpoints']['prev'].format(symbol=symbol)}"
            params = {
                'adjusted': 'true',
                'apikey': self.apis['polygon']['apikey']
            }
            
            response = requests.get(url, params=params, timeout=TIMEOUT)
            response.raise_for_status()
            
            data = response.json()
            if data.get('results') and len(data['results']) > 0:
                result = data['results'][0]
                price = result['c']
                open_price = result['o']
                change = price - open_price
                change_percent = (change / open_price) * 100
                
                return {
                    'symbol': symbol,
                    'price': price,
                    'change': change,
                    'changePercent': change_percent,
                    'volume': result['v'],
                    'high': result['h'],
                    'low': result['l'],
                    'open': open_price,
                    'previousClose': open_price,
                    'timestamp': datetime.now().isoformat(),
                    'dataSource': 'polygon',
                    'isRealTime': True
                }
            raise Exception('No data from Polygon')
        except Exception as e:
            raise Exception(f'Polygon API error: {str(e)}')

    def get_enhanced_mock_data(self, symbol):
        """Generate enhanced mock data with realistic fluctuations"""
        base_prices = {
            'AAPL': 178.23, 'MSFT': 378.45, 'GOOGL': 145.67, 'TSLA': 234.56, 'NVDA': 168.45,
            'AMZN': 145.32, 'META': 320.15, 'NFLX': 425.67, 'AMD': 98.45, 'INTC': 45.67,
            'SPY': 415.23, 'QQQ': 365.45, 'DIA': 340.12, 'BTC-USD': 45000.00, 'ETH-USD': 3200.00
        }
        
        volatilities = {
            'AAPL': 2.5, 'MSFT': 2.0, 'GOOGL': 2.8, 'TSLA': 8.0, 'NVDA': 5.0,
            'AMZN': 3.5, 'META': 4.0, 'NFLX': 3.0, 'AMD': 4.5, 'INTC': 2.5,
            'SPY': 15.0, 'QQQ': 25.0, 'DIA': 50.0, 'BTC-USD': 500.0, 'ETH-USD': 50.0
        }
        
        base_price = base_prices.get(symbol, 100 + hash(symbol) % 200)
        volatility = volatilities.get(symbol, 2.0)
        
        current_hour = datetime.now().hour
        market_open = 9 <= current_hour <= 16
        
        adjusted_volatility = volatility * (1.5 if market_open else 0.3)
        trend_factor = hash(symbol + str(datetime.now().strftime('%Y%m%d'))) % 100 / 100 - 0.5
        change = (hash(symbol + str(int(time.time() / 60))) % 100 / 100 - 0.5 + trend_factor) * adjusted_volatility
        new_price = max(0.01, base_price + change)
        change_percent = (change / base_price) * 100
        
        return {
            'symbol': symbol,
            'price': round(new_price, 2),
            'change': round(change, 2),
            'changePercent': round(change_percent, 2),
            'volume': int(base_price * 1000 * (1 + hash(symbol) % 50 / 100)),
            'high': round(new_price + abs(change) * 0.5, 2),
            'low': round(new_price - abs(change) * 0.5, 2),
            'open': round(base_price, 2),
            'previousClose': round(base_price, 2),
            'timestamp': datetime.now().isoformat(),
            'dataSource': 'enhanced-mock',
            'isRealTime': False
        }

# Initialize the service
stock_service = StockDataService()

@app.route('/api/stock/<symbol>', methods=['GET'])
def get_stock_price(symbol):
    """Get stock price for a specific symbol"""
    try:
        REQUEST_COUNT.labels(method='GET', endpoint='/api/stock', status='success').inc()
        data = stock_service.get_stock_price(symbol.upper())
        return jsonify({
            'success': True,
            'data': data
        })
    except Exception as e:
        REQUEST_COUNT.labels(method='GET', endpoint='/api/stock', status='error').inc()
        logger.error(f"Error getting stock price for {symbol}: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e),
            'data': stock_service.get_enhanced_mock_data(symbol.upper())
        }), 500

@app.route('/api/stocks', methods=['POST'])
def get_multiple_stocks():
    """Get stock prices for multiple symbols using batch API calls"""
    try:
        REQUEST_COUNT.labels(method='POST', endpoint='/api/stocks', status='success').inc()
        symbols = request.json.get('symbols', [])
        logger.info(f"📊 Received request for {len(symbols)} stocks: {', '.join(symbols)}")
        
        results = stock_service.get_multiple_stock_prices([symbol.upper() for symbol in symbols])
        
        return jsonify({
            'success': True,
            'data': results
        })
    except Exception as e:
        REQUEST_COUNT.labels(method='POST', endpoint='/api/stocks', status='error').inc()
        logger.error(f"❌ Error in batch API: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint with detailed status"""
    try:
        # Check Redis connection
        redis_status = "connected" if redis_client and redis_client.ping() else "disconnected"
        
        # Get cache info
        cache_info = {}
        if redis_client:
            try:
                cache_info = redis_client.info('memory')
            except:
                cache_info = {"error": "Unable to get cache info"}
        
        return jsonify({
            'status': 'healthy',
            'timestamp': datetime.now().isoformat(),
            'redis': redis_status,
            'cache_info': cache_info,
            'version': '1.0.0',
            'environment': os.getenv('FLASK_ENV', 'development')
        })
    except Exception as e:
        logger.error(f"Health check error: {str(e)}")
        return jsonify({
            'status': 'unhealthy',
            'error': str(e),
            'timestamp': datetime.now().isoformat()
        }), 500

@app.route('/metrics', methods=['GET'])
def metrics():
    """Prometheus metrics endpoint"""
    return generate_latest(), 200, {'Content-Type': CONTENT_TYPE_LATEST}

@app.route('/api/status', methods=['GET'])
def status():
    """Detailed status endpoint for monitoring"""
    try:
        return jsonify({
            'service': 'stock-data-service',
            'version': '1.0.0',
            'status': 'running',
            'timestamp': datetime.now().isoformat(),
            'environment': os.getenv('FLASK_ENV', 'development'),
            'redis_connected': redis_client and redis_client.ping(),
            'cache_duration': CACHE_DURATION,
            'max_workers': MAX_WORKERS,
            'timeout': TIMEOUT
        })
    except Exception as e:
        logger.error(f"Status check error: {str(e)}")
        return jsonify({
            'service': 'stock-data-service',
            'status': 'error',
            'error': str(e),
            'timestamp': datetime.now().isoformat()
        }), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5003))
    debug = os.getenv('FLASK_DEBUG', 'false').lower() == 'true'
    
    logger.info("🚀 Starting Stock Data Service (AWS Production)...")
    logger.info(f"📊 Environment: {os.getenv('FLASK_ENV', 'development')}")
    logger.info(f"🌐 Port: {port}")
    logger.info(f"🔧 Debug: {debug}")
    logger.info(f"📦 Cache Duration: {CACHE_DURATION}s")
    logger.info(f"👥 Max Workers: {MAX_WORKERS}")
    logger.info(f"⏱️ Timeout: {TIMEOUT}s")
    
    app.run(host='0.0.0.0', port=port, debug=debug)
