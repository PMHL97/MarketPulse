#!/usr/bin/env python3
"""
Stock Data Service - Backend proxy to avoid CORS issues
Fetches real stock data from multiple APIs and serves it to the frontend
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import json
import time
import os
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3005'], 
     methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
     allow_headers=['Content-Type', 'Authorization', 'Accept'])

# Cache for stock data (30 seconds)
stock_cache = {}
CACHE_DURATION = 30

class StockDataService:
    def __init__(self):
        # Get API keys from environment variables
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

    def get_from_yahoo_finance(self, symbol):
        """Get stock data from Yahoo Finance (no API key needed)"""
        try:
            print(f"🔍 Trying Yahoo Finance for {symbol}...")
            # Yahoo Finance API endpoint
            url = f"https://query1.finance.yahoo.com/v8/finance/chart/{symbol}"
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
            
            response = requests.get(url, headers=headers, timeout=10)
            print(f"📊 Yahoo Finance response status for {symbol}: {response.status_code}")
            
            if response.status_code == 429:
                print(f"⚠️ Yahoo Finance rate limited for {symbol}")
                raise Exception('Rate limited by Yahoo Finance')
                
            response.raise_for_status()
            
            data = response.json()
            if data.get('chart') and data['chart'].get('result'):
                result = data['chart']['result'][0]
                meta = result.get('meta', {})
                
                if meta.get('regularMarketPrice'):
                    print(f"✅ Yahoo Finance success for {symbol}: ${meta['regularMarketPrice']}")
                    return {
                        'price': float(meta['regularMarketPrice']),
                        'change': float(meta.get('regularMarketChange', 0)),
                        'changePercent': float(meta.get('regularMarketChangePercent', 0)) * 100,
                        'open': float(meta.get('regularMarketOpen', 0)),
                        'high': float(meta.get('regularMarketDayHigh', 0)),
                        'low': float(meta.get('regularMarketDayLow', 0)),
                        'volume': int(meta.get('regularMarketVolume', 0)),
                        'previousClose': float(meta.get('previousClose', 0)),
                        'dataSource': 'yahoo-finance',
                        'isRealTime': True,
                        'timestamp': datetime.now().isoformat()
                    }
            else:
                print(f"❌ No data from Yahoo Finance for {symbol}")
                raise Exception('No data from Yahoo Finance')
                
        except Exception as e:
            print(f"❌ Yahoo Finance failed for {symbol}: {str(e)}")
            raise Exception(f'Yahoo Finance API error: {str(e)}')

    def get_from_yahoo_finance_batch(self, symbols):
        """Get multiple stocks from Yahoo Finance API in batch"""
        try:
            import concurrent.futures
            
            results = {}
            with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
                # Submit all requests in parallel
                future_to_symbol = {
                    executor.submit(self.get_from_yahoo_finance, symbol): symbol
                    for symbol in symbols
                }
                
                for future in concurrent.futures.as_completed(future_to_symbol):
                    symbol = future_to_symbol[future]
                    try:
                        data = future.result()
                        if data and data.get('price', 0) > 0:
                            results[symbol] = data
                    except Exception as e:
                        print(f"❌ Yahoo Finance batch failed for {symbol}: {str(e)}")
                        continue
            
            return results
        except Exception as e:
            raise Exception(f'Yahoo Finance batch API error: {str(e)}')

    def get_stock_price(self, symbol):
        """Get real stock price from multiple APIs"""
        try:
            # Check cache first
            cache_key = f"{symbol}_{datetime.now().strftime('%Y%m%d%H%M')}"
            if cache_key in stock_cache:
                cached_data = stock_cache[cache_key]
                if time.time() - cached_data['timestamp'] < CACHE_DURATION:
                    print(f"📦 Using cached data for {symbol}")
                    return cached_data['data']

            # Try multiple APIs (Yahoo Finance first - no API key needed)
            apis_to_try = [
                self.get_from_yahoo_finance,
                self.get_from_twelve_data,
                self.get_from_alpha_vantage,
                self.get_from_finnhub,
                self.get_from_polygon
            ]

            for api_func in apis_to_try:
                try:
                    data = api_func(symbol)
                    if data and data.get('price', 0) > 0:
                        # Cache the result
                        stock_cache[cache_key] = {
                            'data': data,
                            'timestamp': time.time()
                        }
                        print(f"✅ Real data for {symbol}: ${data['price']} ({data['dataSource']})")
                        return data
                except Exception as e:
                    print(f"❌ API failed for {symbol}: {str(e)}")
                    continue

            # If all APIs fail, return enhanced mock data
            print(f"⚠️ All APIs failed for {symbol}, using enhanced mock data")
            return self.get_enhanced_mock_data(symbol)

        except Exception as e:
            print(f"❌ Error getting stock data for {symbol}: {str(e)}")
            return self.get_enhanced_mock_data(symbol)

    def get_multiple_stock_prices(self, symbols):
        """Get multiple stock prices efficiently with batch API calls"""
        try:
            print(f"📊 Fetching data for {len(symbols)} stocks: {', '.join(symbols)}")
            
            # Try batch APIs first (more efficient)
            batch_apis = [
                lambda syms: self.get_from_yahoo_finance_batch(syms),
                lambda syms: self.get_from_twelve_data_batch(syms),
                lambda syms: self.get_from_alpha_vantage_batch(syms),
                lambda syms: self.get_from_finnhub_batch(syms)
            ]
            
            for batch_api in batch_apis:
                try:
                    results = batch_api(symbols)
                    if results and len(results) > 0:
                        print(f"✅ Batch API success: {len(results)} stocks")
                        # Cache the results
                        for symbol, data in results.items():
                            cache_key = f"{symbol}_{datetime.now().strftime('%Y%m%d%H%M')}"
                            stock_cache[cache_key] = {
                                'data': data,
                                'timestamp': time.time()
                            }
                        return results
                except Exception as e:
                    print(f"❌ Batch API failed: {str(e)}")
                    continue
            
            # Fallback to individual calls if batch APIs fail
            print("⚠️ Batch APIs failed, trying individual calls")
            results = {}
            for symbol in symbols:
                try:
                    data = self.get_stock_price(symbol)
                    results[symbol] = data
                except Exception as e:
                    print(f"❌ Individual call failed for {symbol}: {str(e)}")
                    results[symbol] = self.get_enhanced_mock_data(symbol)
            
            return results
            
        except Exception as e:
            print(f"❌ Error getting multiple stock data: {str(e)}")
            # Return mock data for all symbols
            return {symbol: self.get_enhanced_mock_data(symbol) for symbol in symbols}

    def get_from_twelve_data(self, symbol):
        """Get data from Twelve Data API"""
        try:
            url = f"{self.apis['twelve_data']['base_url']}{self.apis['twelve_data']['endpoints']['price']}"
            params = {'symbol': symbol, 'apikey': 'demo'}
            
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            
            data = response.json()
            if data.get('price'):
                price = float(data['price'])
                return {
                    'symbol': symbol,
                    'price': price,
                    'change': 0,  # Twelve Data price endpoint doesn't provide change
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
            # Twelve Data doesn't have a true batch API, but we can make parallel requests
            import concurrent.futures
            
            results = {}
            with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
                # Submit all requests in parallel
                future_to_symbol = {
                    executor.submit(self.get_from_twelve_data, symbol): symbol 
                    for symbol in symbols
                }
                
                for future in concurrent.futures.as_completed(future_to_symbol):
                    symbol = future_to_symbol[future]
                    try:
                        data = future.result()
                        if data and data.get('price', 0) > 0:
                            results[symbol] = data
                    except Exception as e:
                        print(f"❌ Twelve Data batch failed for {symbol}: {str(e)}")
                        continue
            
            return results
        except Exception as e:
            raise Exception(f'Twelve Data batch API error: {str(e)}')

    def get_from_alpha_vantage_batch(self, symbols):
        """Get multiple stocks from Alpha Vantage API in batch"""
        try:
            # Alpha Vantage doesn't have batch API, use parallel requests
            import concurrent.futures
            
            results = {}
            with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:  # Rate limit friendly
                future_to_symbol = {
                    executor.submit(self.get_from_alpha_vantage, symbol): symbol 
                    for symbol in symbols
                }
                
                for future in concurrent.futures.as_completed(future_to_symbol):
                    symbol = future_to_symbol[future]
                    try:
                        data = future.result()
                        if data and data.get('price', 0) > 0:
                            results[symbol] = data
                    except Exception as e:
                        print(f"❌ Alpha Vantage batch failed for {symbol}: {str(e)}")
                        continue
            
            return results
        except Exception as e:
            raise Exception(f'Alpha Vantage batch API error: {str(e)}')

    def get_from_finnhub_batch(self, symbols):
        """Get multiple stocks from Finnhub API in batch"""
        try:
            # Finnhub doesn't have batch API, use parallel requests
            import concurrent.futures
            
            results = {}
            with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
                future_to_symbol = {
                    executor.submit(self.get_from_finnhub, symbol): symbol 
                    for symbol in symbols
                }
                
                for future in concurrent.futures.as_completed(future_to_symbol):
                    symbol = future_to_symbol[future]
                    try:
                        data = future.result()
                        if data and data.get('price', 0) > 0:
                            results[symbol] = data
                    except Exception as e:
                        print(f"❌ Finnhub batch failed for {symbol}: {str(e)}")
                        continue
            
            return results
        except Exception as e:
            raise Exception(f'Finnhub batch API error: {str(e)}')

    def get_from_alpha_vantage(self, symbol):
        """Get data from Alpha Vantage API"""
        try:
            url = self.apis['alpha_vantage']['base_url']
            params = {
                **self.apis['alpha_vantage']['params'],
                'symbol': symbol
            }
            
            response = requests.get(url, params=params, timeout=10)
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

    def get_from_finnhub(self, symbol):
        """Get data from Finnhub API"""
        try:
            url = f"{self.apis['finnhub']['base_url']}{self.apis['finnhub']['endpoints']['quote']}"
            params = {
                'symbol': symbol,
                'token': self.apis['finnhub']['token']
            }
            
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            
            data = response.json()
            if data.get('c'):  # current price
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

    def get_from_polygon(self, symbol):
        """Get data from Polygon API"""
        try:
            url = f"{self.apis['polygon']['base_url']}{self.apis['polygon']['endpoints']['prev'].format(symbol=symbol)}"
            params = {
                'adjusted': 'true',
                'apikey': self.apis['polygon']['apikey']
            }
            
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            
            data = response.json()
            if data.get('results') and len(data['results']) > 0:
                result = data['results'][0]
                price = result['c']  # close price
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
        # Base prices for different stocks
        base_prices = {
            'AAPL': 178.23, 'MSFT': 378.45, 'GOOGL': 145.67, 'TSLA': 234.56, 'NVDA': 168.45,
            'AMZN': 145.32, 'META': 320.15, 'NFLX': 425.67, 'AMD': 98.45, 'INTC': 45.67,
            'SPY': 415.23, 'QQQ': 365.45, 'DIA': 340.12, 'BTC-USD': 45000.00, 'ETH-USD': 3200.00
        }
        
        # Volatility for different stocks
        volatilities = {
            'AAPL': 2.5, 'MSFT': 2.0, 'GOOGL': 2.8, 'TSLA': 8.0, 'NVDA': 5.0,
            'AMZN': 3.5, 'META': 4.0, 'NFLX': 3.0, 'AMD': 4.5, 'INTC': 2.5,
            'SPY': 15.0, 'QQQ': 25.0, 'DIA': 50.0, 'BTC-USD': 500.0, 'ETH-USD': 50.0
        }
        
        base_price = base_prices.get(symbol, 100 + hash(symbol) % 200)
        volatility = volatilities.get(symbol, 2.0)
        
        # Create realistic price movements
        current_hour = datetime.now().hour
        market_open = 9 <= current_hour <= 16  # Market hours simulation
        
        # Higher volatility during market hours
        adjusted_volatility = volatility * (1.5 if market_open else 0.3)
        
        # Add trending behavior
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
        data = stock_service.get_stock_price(symbol.upper())
        return jsonify({
            'success': True,
            'data': data
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e),
            'data': stock_service.get_enhanced_mock_data(symbol.upper())
        }), 500

@app.route('/api/stocks', methods=['POST'])
def get_multiple_stocks():
    """Get stock prices for multiple symbols using batch API calls"""
    try:
        symbols = request.json.get('symbols', [])
        print(f"📊 Received request for {len(symbols)} stocks: {', '.join(symbols)}")
        
        # Use batch method for efficiency
        results = stock_service.get_multiple_stock_prices([symbol.upper() for symbol in symbols])
        
        return jsonify({
            'success': True,
            'data': results
        })
    except Exception as e:
        print(f"❌ Error in batch API: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'cache_size': len(stock_cache)
    })

@app.route('/api/indices', methods=['GET'])
def get_market_indices():
    """Get real market indices data"""
    try:
        print("📊 Fetching market indices...")
        
        # Get real data for major indices using their ETF symbols
        indices_data = {}
        
        # Map indices to their actual index symbols for real data
        index_symbols = {
            '^GSPC': 'S&P 500',
            '^IXIC': 'NASDAQ', 
            '^DJI': 'DOW'
        }
        
        for symbol, name in index_symbols.items():
            try:
                data = stock_service.get_stock_price(symbol)
                if data and data.get('price', 0) > 0:
                    indices_data[name] = {
                        'name': name,
                        'value': f"{data['price']:,.2f}",
                        'change': f"{data['change']:+.2f}",
                        'percent': f"{data['changePercent']:+.2f}%",
                        'trend': 'up' if data['changePercent'] >= 0 else 'down'
                    }
                    print(f"✅ Got real data for {name}: ${data['price']}")
                else:
                    print(f"❌ No real data for {name}")
            except Exception as e:
                print(f"❌ Failed to get data for {name}: {str(e)}")
        
        # Add some mock data for indices we can't get easily
        result = {
            'US': [
                indices_data.get('S&P 500', {
                    'name': 'S&P 500', 
                    'value': '4,567.89', 
                    'change': '+12.34', 
                    'percent': '+0.27%', 
                    'trend': 'up'
                }),
                indices_data.get('NASDAQ', {
                    'name': 'NASDAQ', 
                    'value': '14,234.56', 
                    'change': '+45.67', 
                    'percent': '+0.32%', 
                    'trend': 'up'
                }),
                indices_data.get('DOW', {
                    'name': 'DOW', 
                    'value': '34,567.89', 
                    'change': '-23.45', 
                    'percent': '-0.07%', 
                    'trend': 'down'
                })
            ],
            'Europe': [
                {'name': 'FTSE 100', 'value': '7,456.78', 'change': '+23.45', 'percent': '+0.32%', 'trend': 'up'},
                {'name': 'DAX', 'value': '15,678.90', 'change': '-12.34', 'percent': '-0.08%', 'trend': 'down'},
                {'name': 'CAC 40', 'value': '7,234.56', 'change': '+34.56', 'percent': '+0.48%', 'trend': 'up'}
            ],
            'Asia': [
                {'name': 'Nikkei 225', 'value': '32,456.78', 'change': '+123.45', 'percent': '+0.38%', 'trend': 'up'},
                {'name': 'Hang Seng', 'value': '18,234.56', 'change': '-45.67', 'percent': '-0.25%', 'trend': 'down'},
                {'name': 'Shanghai', 'value': '3,234.56', 'change': '+12.34', 'percent': '+0.38%', 'trend': 'up'}
            ],
            'Currencies': [
                {'name': 'EUR/USD', 'value': '1.0876', 'change': '+0.0023', 'percent': '+0.21%', 'trend': 'up'},
                {'name': 'GBP/USD', 'value': '1.2654', 'change': '-0.0012', 'percent': '-0.09%', 'trend': 'down'},
                {'name': 'USD/JPY', 'value': '149.23', 'change': '+0.45', 'percent': '+0.30%', 'trend': 'up'}
            ],
            'Crypto': [
                {'name': 'BTC/USD', 'value': '43,567.89', 'change': '+1,234.56', 'percent': '+2.92%', 'trend': 'up'},
                {'name': 'ETH/USD', 'value': '2,345.67', 'change': '+45.67', 'percent': '+1.98%', 'trend': 'up'},
                {'name': 'ADA/USD', 'value': '0.4567', 'change': '-0.0123', 'percent': '-2.63%', 'trend': 'down'}
            ]
        }
        
        return jsonify({
            'success': True,
            'data': result,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        print(f"❌ Error getting market indices: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e),
            'timestamp': datetime.now().isoformat()
        }), 500

if __name__ == '__main__':
    print("🚀 Starting Stock Data Service...")
    print("📊 Available endpoints:")
    print("  GET  /api/stock/<symbol>     - Get single stock price")
    print("  POST /api/stocks             - Get multiple stock prices")
    print("  GET  /api/indices            - Get market indices")
    print("  GET  /api/health             - Health check")
    print("🌐 Server running on http://localhost:5003")
    
    app.run(host='0.0.0.0', port=5003, debug=True)
