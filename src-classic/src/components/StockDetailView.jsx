import React, { useState } from 'react';
import { getStockData, getChartData, getTechnicalIndicators, getForecasts, getAIForecast, getAnalystTargets, getMarketSentiment } from '../data/mockStockData';

const StockDetailView = ({ symbol, onClose }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const stockData = getStockData(symbol);
  const chartData = getChartData(symbol, selectedTimeframe);
  const technicalIndicators = getTechnicalIndicators(symbol);
  const forecasts = getForecasts(symbol);
  const aiForecast = getAIForecast(symbol, 'nextWeek');
  const analystTargets = getAnalystTargets(symbol);
  const sentiment = getMarketSentiment(symbol);
  
  const timeframes = ['1D', '1W', '1M', '3M', '6M', 'YTD', '1Y', '2Y', '5Y', '10Y', 'ALL'];

  const newsData = [
    {
      source: 'FORTUNE',
      headline: 'Meet John Ternus, the 50-year-old Apple executive and former swimming champ who\'s rumored to succeed Tim Cook as CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center',
      time: '4h ago',
      author: 'Dave Smith'
    },
    {
      source: 'Reuters',
      headline: 'French prosecutors probe Apple\'s Siri following complaint',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop&crop=center',
      time: '1d ago',
      author: 'Reuters'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm text-gray-500">Home</span>
                <span className="text-gray-300">/</span>
                <span className="text-sm font-medium text-gray-700">{stockData.symbol}:{stockData.exchange}</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{stockData.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="text-3xl font-bold text-gray-900">${stockData.currentPrice}</div>
                <div className="flex items-center space-x-1">
                  {stockData.change >= 0 ? (
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span className={`text-sm font-medium ${stockData.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stockData.changePercent >= 0 ? '+' : ''}{stockData.changePercent}% ({stockData.change >= 0 ? '+' : ''}{stockData.change}) Today
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Closed: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()} • {stockData.currency}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add to list</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-900">${stockData.afterHoursPrice}</div>
              <div className="flex items-center space-x-1">
                {stockData.afterHoursChange >= 0 ? (
                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                <span className={`text-sm ${stockData.afterHoursChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stockData.afterHoursChange >= 0 ? '+' : ''}{stockData.afterHoursChangePercent || stockData.afterHoursChange}% ({stockData.afterHoursChange >= 0 ? '+' : ''}{stockData.afterHoursChange})
                </span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
                <span>After hours {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        {/* Chart Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
              <option>Area</option>
              <option>Line</option>
              <option>Candlestick</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
              <option>Compare</option>
              <option>S&P 500</option>
              <option>NASDAQ</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
              <option>Technical Indicator</option>
              <option>RSI</option>
              <option>MACD</option>
              <option>Bollinger Bands</option>
            </select>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Zoom: 1</span>
          </div>
        </div>

        {/* Chart with Data */}
        <div className="h-96 bg-white rounded-lg border border-gray-200 p-4">
          {chartData.length > 0 ? (
            <div className="h-full flex flex-col">
              {/* Chart Area */}
              <div className="flex-1 relative">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-2">
                  {(() => {
                    const maxPrice = Math.max(...chartData.slice(-20).map(p => p.price || p.close));
                    const minPrice = Math.min(...chartData.slice(-20).map(p => p.price || p.close));
                    const range = maxPrice - minPrice;
                    return [maxPrice, minPrice + range * 0.75, minPrice + range * 0.5, minPrice + range * 0.25, minPrice].map((price, i) => (
                      <span key={i} className="text-right w-12">${price.toFixed(2)}</span>
                    ));
                  })()}
                </div>
                
                {/* Chart bars */}
                <div className="ml-16 h-full flex items-end justify-between space-x-1">
                  {chartData.slice(-20).map((point, index) => {
                    const maxPrice = Math.max(...chartData.slice(-20).map(p => p.price || p.close));
                    const minPrice = Math.min(...chartData.slice(-20).map(p => p.price || p.close));
                    const height = maxPrice !== minPrice ? ((point.price || point.close) - minPrice) / (maxPrice - minPrice) * 100 : 50;
                    
                    return (
                      <div key={index} className="flex flex-col items-center flex-1 h-full">
                        <div 
                          className="bg-blue-500 w-full rounded-t hover:bg-blue-600 transition-colors cursor-pointer"
                          style={{ height: `${Math.max(height, 5)}%` }}
                          title={`${point.time || point.date}: $${point.price || point.close}`}
                        />
                      </div>
                    );
                  })}
                </div>
                
                {/* Previous close line */}
                <div className="absolute top-0 left-16 right-0 h-full">
                  <div className="relative h-full">
                    <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-gray-300">
                      <span className="absolute left-2 -top-3 text-xs text-gray-500 bg-white px-1">
                        Prev. close ${stockData.open}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* X-axis labels */}
              <div className="ml-16 flex justify-between text-xs text-gray-500 mt-2">
                {chartData.slice(-20).filter((_, i) => i % 4 === 0).map((point, index) => (
                  <span key={index}>{point.time || point.date}</span>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-2xl mb-2">📊</div>
                <p>Chart data loading...</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Timeframe Selectors */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex space-x-1">
            {timeframes.map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                  selectedTimeframe === timeframe
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {timeframe}
              </button>
            ))}
          </div>
          <div className="text-sm text-gray-500">
            {chartData.length} data points • {selectedTimeframe} timeframe
          </div>
        </div>
      </div>

      {/* Financial Indicators */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200">
          <button className="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
            Overview
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
            Earnings
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
            Financials
          </button>
        </div>
        
        {/* Overview Tab Content */}
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Open</span>
              <span className="text-sm font-semibold text-gray-900">${stockData.open}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">High</span>
              <span className="text-sm font-semibold text-gray-900">${stockData.high}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Low</span>
              <span className="text-sm font-semibold text-gray-900">${stockData.low}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Volume</span>
              <span className="text-sm font-semibold text-gray-900">{stockData.volume}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Avg Volume</span>
              <span className="text-sm font-semibold text-gray-900">{stockData.avgVolume}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Market Cap</span>
              <span className="text-sm font-semibold text-gray-900">{stockData.marketCap}</span>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Dividend</span>
              <span className="text-sm font-semibold text-gray-900">{stockData.yield}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Quarterly dividend</span>
              <span className="text-sm font-semibold text-gray-900">$0.01</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Ex dividend date</span>
              <span className="text-sm font-semibold text-gray-900">Sep 11, 2025</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">EPS</span>
              <span className="text-sm font-semibold text-gray-900">${stockData.eps}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Beta</span>
              <span className="text-sm font-semibold text-gray-900">{stockData.beta}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Shares outstanding</span>
              <span className="text-sm font-semibold text-gray-900">24.30B</span>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Indicators */}
      {technicalIndicators && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Technical Indicators</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <div className="text-xs text-gray-500">RSI (14)</div>
              <div className={`text-sm font-semibold ${technicalIndicators.rsi > 70 ? 'text-red-600' : technicalIndicators.rsi < 30 ? 'text-green-600' : 'text-gray-900'}`}>
                {technicalIndicators.rsi || 'N/A'}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-gray-500">SMA (20)</div>
              <div className="text-sm font-semibold text-gray-900">{technicalIndicators.sma20}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-gray-500">SMA (50)</div>
              <div className="text-sm font-semibold text-gray-900">{technicalIndicators.sma50}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-gray-500">SMA (200)</div>
              <div className="text-sm font-semibold text-gray-900">{technicalIndicators.sma200}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-gray-500">Support</div>
              <div className="text-sm font-semibold text-green-600">{technicalIndicators.support}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-gray-500">Resistance</div>
              <div className="text-sm font-semibold text-red-600">{technicalIndicators.resistance}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-gray-500">ATR</div>
              <div className="text-sm font-semibold text-gray-900">{technicalIndicators.atr}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-gray-500">MACD</div>
              <div className="text-sm font-semibold text-gray-900">{technicalIndicators.macd?.macd?.toFixed(2) || 'N/A'}</div>
            </div>
          </div>
        </div>
      )}

      {/* AI Forecasts */}
      {forecasts && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Forecasts & Analysis</h2>
          
          {/* AI Forecast Timeline */}
          <div className="mb-6">
            <h3 className="text-md font-medium text-gray-800 mb-3">Price Predictions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-xs text-gray-500">Next Week</div>
                <div className="text-lg font-bold text-blue-600">${forecasts.aiForecast.nextWeek.price}</div>
                <div className="text-xs text-gray-600">{Math.round(forecasts.aiForecast.nextWeek.confidence * 100)}% confidence</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-xs text-gray-500">Next Month</div>
                <div className="text-lg font-bold text-green-600">${forecasts.aiForecast.nextMonth.price}</div>
                <div className="text-xs text-gray-600">{Math.round(forecasts.aiForecast.nextMonth.confidence * 100)}% confidence</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-xs text-gray-500">Next Quarter</div>
                <div className="text-lg font-bold text-purple-600">${forecasts.aiForecast.nextQuarter.price}</div>
                <div className="text-xs text-gray-600">{Math.round(forecasts.aiForecast.nextQuarter.confidence * 100)}% confidence</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-xs text-gray-500">Next Year</div>
                <div className="text-lg font-bold text-orange-600">${forecasts.aiForecast.nextYear.price}</div>
                <div className="text-xs text-gray-600">{Math.round(forecasts.aiForecast.nextYear.confidence * 100)}% confidence</div>
              </div>
            </div>
          </div>

          {/* Market Sentiment */}
          <div className="mb-6">
            <h3 className="text-md font-medium text-gray-800 mb-3">Market Sentiment</h3>
            <div className="flex space-x-4">
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-green-600">Bullish</span>
                  <span>{Math.round(sentiment.bullish * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${sentiment.bullish * 100}%` }}></div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-red-600">Bearish</span>
                  <span>{Math.round(sentiment.bearish * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: `${sentiment.bearish * 100}%` }}></div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Neutral</span>
                  <span>{Math.round(sentiment.neutral * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-500 h-2 rounded-full" style={{ width: `${sentiment.neutral * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Analyst Targets */}
          <div>
            <h3 className="text-md font-medium text-gray-800 mb-3">Analyst Price Targets</h3>
            <div className="space-y-2">
              {analystTargets.map((target, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <span className="font-medium text-gray-900">{target.firm}</span>
                    <span className={`ml-2 px-2 py-1 text-xs rounded ${
                      target.rating === 'Buy' ? 'bg-green-100 text-green-800' :
                      target.rating === 'Overweight' ? 'bg-blue-100 text-blue-800' :
                      target.rating === 'Neutral' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {target.rating}
                    </span>
                  </div>
                  <div className="font-semibold text-gray-900">${target.target}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Related News */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Related News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {newsData.map((article, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-start space-x-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-900">{article.source}</span>
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 leading-tight mb-2 line-clamp-3">
                    {article.headline}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {article.time} • {article.author}
                  </p>
                </div>
                <div className="w-20 h-20 flex-shrink-0">
                  <img
                    src={article.image}
                    alt={article.headline}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockDetailView;
