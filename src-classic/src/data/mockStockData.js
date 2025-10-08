// Mock Stock Data - Single Source of Truth
export const mockStockData = {
  'AAPL': {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    exchange: 'NASDAQ',
    currency: 'USD',
    currentPrice: 256.48,
    afterHoursPrice: 256.45,
    change: -0.21,
    afterHoursChange: -0.03,
    changePercent: -0.08,
    open: 256.82,
    high: 257.40,
    low: 255.43,
    volume: '31.43M',
    pe: 38.86,
    marketCap: '3.806T',
    week52High: 260.10,
    week52Low: 169.21,
    avgVolume: '54.94M',
    yield: '0.41%',
    beta: 1.09,
    eps: 6.60,
    sector: 'Technology',
    industry: 'Consumer Electronics',
    
    // Chart Data (last 30 days)
    chartData: {
      '1D': [
        { time: '09:30', price: 256.82, volume: 1200000 },
        { time: '10:00', price: 257.15, volume: 980000 },
        { time: '10:30', price: 256.95, volume: 1100000 },
        { time: '11:00', price: 257.40, volume: 1050000 },
        { time: '11:30', price: 256.78, volume: 950000 },
        { time: '12:00', price: 256.45, volume: 880000 },
        { time: '12:30', price: 256.20, volume: 920000 },
        { time: '13:00', price: 255.90, volume: 1000000 },
        { time: '13:30', price: 255.43, volume: 1150000 },
        { time: '14:00', price: 255.80, volume: 1080000 },
        { time: '14:30', price: 256.10, volume: 1020000 },
        { time: '15:00', price: 256.35, volume: 980000 },
        { time: '15:30', price: 256.48, volume: 1200000 },
        { time: '16:00', price: 256.45, volume: 1500000 }
      ],
      '1W': [
        { date: '2024-01-15', open: 252.10, high: 254.80, low: 251.20, close: 253.45, volume: 45000000 },
        { date: '2024-01-16', open: 253.50, high: 255.20, low: 252.80, close: 254.90, volume: 42000000 },
        { date: '2024-01-17', open: 255.00, high: 256.50, low: 254.10, close: 255.80, volume: 48000000 },
        { date: '2024-01-18', open: 255.90, high: 257.40, low: 255.20, close: 256.75, volume: 52000000 },
        { date: '2024-01-19', open: 256.80, high: 257.40, low: 255.43, close: 256.48, volume: 31430000 }
      ],
      '1M': [
        { date: '2024-01-01', price: 248.50, volume: 55000000 },
        { date: '2024-01-02', price: 250.20, volume: 48000000 },
        { date: '2024-01-03', price: 252.80, volume: 52000000 },
        { date: '2024-01-04', price: 251.40, volume: 46000000 },
        { date: '2024-01-05', price: 253.90, volume: 51000000 },
        { date: '2024-01-08', price: 255.20, volume: 49000000 },
        { date: '2024-01-09', price: 254.60, volume: 47000000 },
        { date: '2024-01-10', price: 256.10, volume: 53000000 },
        { date: '2024-01-11', price: 255.80, volume: 48000000 },
        { date: '2024-01-12', price: 257.20, volume: 50000000 },
        { date: '2024-01-15', price: 253.45, volume: 45000000 },
        { date: '2024-01-16', price: 254.90, volume: 42000000 },
        { date: '2024-01-17', price: 255.80, volume: 48000000 },
        { date: '2024-01-18', price: 256.75, volume: 52000000 },
        { date: '2024-01-19', price: 256.48, volume: 31430000 }
      ]
    },
    
    // Technical Indicators
    technicalIndicators: {
      sma20: 254.20,
      sma50: 250.80,
      sma200: 245.60,
      ema12: 255.40,
      ema26: 253.80,
      rsi: 58.5,
      macd: { macd: 1.2, signal: 0.8, histogram: 0.4 },
      bollinger: { upper: 258.50, middle: 254.20, lower: 249.90 },
      support: 252.00,
      resistance: 258.00,
      atr: 2.8
    },
    
    // Forecasts
    forecasts: {
      analystTarget: 275.00,
      analystRating: 'Buy',
      priceTargets: [
        { firm: 'Goldman Sachs', target: 280.00, rating: 'Buy' },
        { firm: 'Morgan Stanley', target: 270.00, rating: 'Overweight' },
        { firm: 'JP Morgan', target: 265.00, rating: 'Neutral' },
        { firm: 'Bank of America', target: 285.00, rating: 'Buy' }
      ],
      aiForecast: {
        nextWeek: { price: 258.50, confidence: 0.72 },
        nextMonth: { price: 262.80, confidence: 0.68 },
        nextQuarter: { price: 268.90, confidence: 0.61 },
        nextYear: { price: 285.40, confidence: 0.55 }
      },
      sentiment: {
        bullish: 0.65,
        bearish: 0.25,
        neutral: 0.10
      }
    },
    
    // Options Data
    options: {
      impliedVolatility: 0.28,
      putCallRatio: 0.85,
      openInterest: {
        calls: 1250000,
        puts: 1060000
      }
    }
  },
  'NVDA': {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    exchange: 'NASDAQ',
    currency: 'USD',
    currentPrice: 875.28,
    afterHoursPrice: 875.50,
    change: 45.20,
    afterHoursChange: 0.22,
    changePercent: 5.45,
    open: 830.00,
    high: 880.00,
    low: 825.00,
    volume: '45.2M',
    pe: 65.2,
    marketCap: '2.16T',
    week52High: 974.00,
    week52Low: 200.00,
    avgVolume: '52.1M',
    yield: '0.03%',
    beta: 1.68,
    eps: 13.42,
    sector: 'Technology',
    industry: 'Semiconductors',
    
    // Chart Data
    chartData: {
      '1D': [
        { time: '09:30', price: 830.00, volume: 2500000 },
        { time: '10:00', price: 845.50, volume: 2200000 },
        { time: '10:30', price: 852.30, volume: 2400000 },
        { time: '11:00', price: 860.75, volume: 2300000 },
        { time: '11:30', price: 865.20, volume: 2100000 },
        { time: '12:00', price: 870.40, volume: 2000000 },
        { time: '12:30', price: 875.60, volume: 1900000 },
        { time: '13:00', price: 878.90, volume: 2200000 },
        { time: '13:30', price: 880.00, volume: 2500000 },
        { time: '14:00', price: 876.50, volume: 2300000 },
        { time: '14:30', price: 874.20, volume: 2100000 },
        { time: '15:00', price: 875.80, volume: 2400000 },
        { time: '15:30', price: 875.28, volume: 2800000 },
        { time: '16:00', price: 875.50, volume: 3200000 }
      ],
      '1W': [
        { date: '2024-01-15', open: 820.50, high: 835.20, low: 815.30, close: 830.00, volume: 52000000 },
        { date: '2024-01-16', open: 832.00, high: 845.80, low: 828.50, close: 840.20, volume: 48000000 },
        { date: '2024-01-17', open: 842.50, high: 855.60, low: 840.10, close: 850.80, volume: 55000000 },
        { date: '2024-01-18', open: 852.00, high: 865.40, low: 848.20, close: 860.50, volume: 58000000 },
        { date: '2024-01-19', open: 862.00, high: 880.00, low: 825.00, close: 875.28, volume: 45200000 }
      ],
      '1M': [
        { date: '2024-01-01', price: 780.50, volume: 45000000 },
        { date: '2024-01-02', price: 795.20, volume: 42000000 },
        { date: '2024-01-03', price: 810.80, volume: 48000000 },
        { date: '2024-01-04', price: 805.40, volume: 41000000 },
        { date: '2024-01-05', price: 820.90, volume: 46000000 },
        { date: '2024-01-08', price: 835.20, volume: 44000000 },
        { date: '2024-01-09', price: 825.60, volume: 43000000 },
        { date: '2024-01-10', price: 845.10, volume: 49000000 },
        { date: '2024-01-11', price: 840.80, volume: 45000000 },
        { date: '2024-01-12', price: 855.20, volume: 47000000 },
        { date: '2024-01-15', price: 830.00, volume: 52000000 },
        { date: '2024-01-16', price: 840.20, volume: 48000000 },
        { date: '2024-01-17', price: 850.80, volume: 55000000 },
        { date: '2024-01-18', price: 860.50, volume: 58000000 },
        { date: '2024-01-19', price: 875.28, volume: 45200000 }
      ]
    },
    
    // Technical Indicators
    technicalIndicators: {
      sma20: 845.60,
      sma50: 820.40,
      sma200: 750.20,
      ema12: 860.80,
      ema26: 835.40,
      rsi: 72.3,
      macd: { macd: 8.5, signal: 5.2, histogram: 3.3 },
      bollinger: { upper: 890.50, middle: 845.60, lower: 800.70 },
      support: 820.00,
      resistance: 890.00,
      atr: 15.8
    },
    
    // Forecasts
    forecasts: {
      analystTarget: 950.00,
      analystRating: 'Strong Buy',
      priceTargets: [
        { firm: 'Goldman Sachs', target: 1000.00, rating: 'Buy' },
        { firm: 'Morgan Stanley', target: 950.00, rating: 'Overweight' },
        { firm: 'JP Morgan', target: 920.00, rating: 'Overweight' },
        { firm: 'Bank of America', target: 980.00, rating: 'Buy' }
      ],
      aiForecast: {
        nextWeek: { price: 890.50, confidence: 0.78 },
        nextMonth: { price: 925.80, confidence: 0.72 },
        nextQuarter: { price: 965.90, confidence: 0.68 },
        nextYear: { price: 1050.40, confidence: 0.62 }
      },
      sentiment: {
        bullish: 0.82,
        bearish: 0.12,
        neutral: 0.06
      }
    },
    
    // Options Data
    options: {
      impliedVolatility: 0.45,
      putCallRatio: 0.65,
      openInterest: {
        calls: 2100000,
        puts: 1365000
      }
    }
  },
  'TSLA': {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    exchange: 'NASDAQ',
    currency: 'USD',
    currentPrice: 248.50,
    afterHoursPrice: 248.75,
    change: 12.30,
    afterHoursChange: 0.25,
    changePercent: 5.20,
    open: 236.00,
    high: 250.00,
    low: 235.00,
    volume: '78.5M',
    pe: 65.4,
    marketCap: '789.2B',
    week52High: 299.29,
    week52Low: 138.80,
    avgVolume: '85.2M',
    yield: '0.00%',
    beta: 2.31,
    eps: 3.80,
    sector: 'Consumer Discretionary',
    industry: 'Auto Manufacturers',
    
    // Chart Data
    chartData: {
      '1D': [
        { time: '09:30', price: 236.00, volume: 3500000 },
        { time: '10:00', price: 240.50, volume: 3200000 },
        { time: '10:30', price: 243.20, volume: 3400000 },
        { time: '11:00', price: 245.80, volume: 3300000 },
        { time: '11:30', price: 247.50, volume: 3100000 },
        { time: '12:00', price: 248.90, volume: 3000000 },
        { time: '12:30', price: 249.50, volume: 2900000 },
        { time: '13:00', price: 250.00, volume: 3200000 },
        { time: '13:30', price: 248.20, volume: 3500000 },
        { time: '14:00', price: 247.80, volume: 3300000 },
        { time: '14:30', price: 248.10, volume: 3100000 },
        { time: '15:00', price: 248.60, volume: 3400000 },
        { time: '15:30', price: 248.50, volume: 3800000 },
        { time: '16:00', price: 248.75, volume: 4200000 }
      ],
      '1W': [
        { date: '2024-01-15', open: 220.50, high: 225.80, low: 218.30, close: 223.00, volume: 85000000 },
        { date: '2024-01-16', open: 224.00, high: 230.20, low: 222.50, close: 228.80, volume: 78000000 },
        { date: '2024-01-17', open: 230.50, high: 235.60, low: 228.10, close: 232.40, volume: 82000000 },
        { date: '2024-01-18', open: 233.00, high: 240.40, low: 231.20, close: 236.20, volume: 88000000 },
        { date: '2024-01-19', open: 236.00, high: 250.00, low: 235.00, close: 248.50, volume: 78500000 }
      ],
      '1M': [
        { date: '2024-01-01', price: 210.50, volume: 75000000 },
        { date: '2024-01-02', price: 215.20, volume: 72000000 },
        { date: '2024-01-03', price: 220.80, volume: 78000000 },
        { date: '2024-01-04', price: 218.40, volume: 71000000 },
        { date: '2024-01-05', price: 225.90, volume: 76000000 },
        { date: '2024-01-08', price: 230.20, volume: 74000000 },
        { date: '2024-01-09', price: 228.60, volume: 73000000 },
        { date: '2024-01-10', price: 235.10, volume: 79000000 },
        { date: '2024-01-11', price: 232.80, volume: 75000000 },
        { date: '2024-01-12', price: 238.20, volume: 77000000 },
        { date: '2024-01-15', price: 223.00, volume: 85000000 },
        { date: '2024-01-16', price: 228.80, volume: 78000000 },
        { date: '2024-01-17', price: 232.40, volume: 82000000 },
        { date: '2024-01-18', price: 236.20, volume: 88000000 },
        { date: '2024-01-19', price: 248.50, volume: 78500000 }
      ]
    },
    
    // Technical Indicators
    technicalIndicators: {
      sma20: 235.60,
      sma50: 225.40,
      sma200: 210.20,
      ema12: 242.80,
      ema26: 230.40,
      rsi: 68.5,
      macd: { macd: 4.2, signal: 2.8, histogram: 1.4 },
      bollinger: { upper: 255.50, middle: 235.60, lower: 215.70 },
      support: 220.00,
      resistance: 255.00,
      atr: 8.5
    },
    
    // Forecasts
    forecasts: {
      analystTarget: 280.00,
      analystRating: 'Hold',
      priceTargets: [
        { firm: 'Goldman Sachs', target: 300.00, rating: 'Neutral' },
        { firm: 'Morgan Stanley', target: 275.00, rating: 'Equal Weight' },
        { firm: 'JP Morgan', target: 250.00, rating: 'Underweight' },
        { firm: 'Bank of America', target: 290.00, rating: 'Neutral' }
      ],
      aiForecast: {
        nextWeek: { price: 255.50, confidence: 0.65 },
        nextMonth: { price: 265.80, confidence: 0.58 },
        nextQuarter: { price: 275.90, confidence: 0.52 },
        nextYear: { price: 295.40, confidence: 0.48 }
      },
      sentiment: {
        bullish: 0.45,
        bearish: 0.35,
        neutral: 0.20
      }
    },
    
    // Options Data
    options: {
      impliedVolatility: 0.65,
      putCallRatio: 1.15,
      openInterest: {
        calls: 1800000,
        puts: 2070000
      }
    }
  },
  'MSFT': {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    exchange: 'NASDAQ',
    currency: 'USD',
    currentPrice: 415.26,
    afterHoursPrice: 415.30,
    change: 8.45,
    afterHoursChange: 0.04,
    changePercent: 2.08,
    open: 407.00,
    high: 416.00,
    low: 405.50,
    volume: '28.3M',
    pe: 32.1,
    marketCap: '3.08T',
    week52High: 420.82,
    week52Low: 309.45,
    avgVolume: '35.2M',
    yield: '0.70%',
    beta: 0.91,
    eps: 12.93,
    sector: 'Technology',
    industry: 'Software',
    
    // Chart Data
    chartData: {
      '1D': [
        { time: '09:30', price: 407.00, volume: 1500000 },
        { time: '10:00', price: 409.50, volume: 1300000 },
        { time: '10:30', price: 411.20, volume: 1400000 },
        { time: '11:00', price: 412.80, volume: 1350000 },
        { time: '11:30', price: 414.20, volume: 1250000 },
        { time: '12:00', price: 415.50, volume: 1200000 },
        { time: '12:30', price: 416.00, volume: 1150000 },
        { time: '13:00', price: 415.80, volume: 1300000 },
        { time: '13:30', price: 415.40, volume: 1400000 },
        { time: '14:00', price: 415.60, volume: 1350000 },
        { time: '14:30', price: 415.20, volume: 1250000 },
        { time: '15:00', price: 415.30, volume: 1400000 },
        { time: '15:30', price: 415.26, volume: 1600000 },
        { time: '16:00', price: 415.30, volume: 1800000 }
      ],
      '1W': [
        { date: '2024-01-15', open: 400.50, high: 405.20, low: 398.30, close: 403.00, volume: 35000000 },
        { date: '2024-01-16', open: 404.00, high: 408.20, low: 402.50, close: 406.80, volume: 32000000 },
        { date: '2024-01-17', open: 407.50, high: 410.60, low: 406.10, close: 409.40, volume: 34000000 },
        { date: '2024-01-18', open: 410.00, high: 412.40, low: 408.20, close: 411.20, volume: 36000000 },
        { date: '2024-01-19', open: 407.00, high: 416.00, low: 405.50, close: 415.26, volume: 28300000 }
      ],
      '1M': [
        { date: '2024-01-01', price: 390.50, volume: 30000000 },
        { date: '2024-01-02', price: 395.20, volume: 28000000 },
        { date: '2024-01-03', price: 400.80, volume: 32000000 },
        { date: '2024-01-04', price: 398.40, volume: 27000000 },
        { date: '2024-01-05', price: 405.90, volume: 31000000 },
        { date: '2024-01-08', price: 408.20, volume: 29000000 },
        { date: '2024-01-09', price: 406.60, volume: 28500000 },
        { date: '2024-01-10', price: 410.10, volume: 33000000 },
        { date: '2024-01-11', price: 408.80, volume: 30000000 },
        { date: '2024-01-12', price: 412.20, volume: 31000000 },
        { date: '2024-01-15', price: 403.00, volume: 35000000 },
        { date: '2024-01-16', price: 406.80, volume: 32000000 },
        { date: '2024-01-17', price: 409.40, volume: 34000000 },
        { date: '2024-01-18', price: 411.20, volume: 36000000 },
        { date: '2024-01-19', price: 415.26, volume: 28300000 }
      ]
    },
    
    // Technical Indicators
    technicalIndicators: {
      sma20: 408.60,
      sma50: 400.40,
      sma200: 385.20,
      ema12: 412.80,
      ema26: 405.40,
      rsi: 62.5,
      macd: { macd: 2.8, signal: 1.5, histogram: 1.3 },
      bollinger: { upper: 420.50, middle: 408.60, lower: 396.70 },
      support: 400.00,
      resistance: 420.00,
      atr: 4.2
    },
    
    // Forecasts
    forecasts: {
      analystTarget: 450.00,
      analystRating: 'Buy',
      priceTargets: [
        { firm: 'Goldman Sachs', target: 460.00, rating: 'Buy' },
        { firm: 'Morgan Stanley', target: 445.00, rating: 'Overweight' },
        { firm: 'JP Morgan', target: 440.00, rating: 'Overweight' },
        { firm: 'Bank of America', target: 455.00, rating: 'Buy' }
      ],
      aiForecast: {
        nextWeek: { price: 420.50, confidence: 0.75 },
        nextMonth: { price: 430.80, confidence: 0.70 },
        nextQuarter: { price: 445.90, confidence: 0.65 },
        nextYear: { price: 470.40, confidence: 0.60 }
      },
      sentiment: {
        bullish: 0.70,
        bearish: 0.20,
        neutral: 0.10
      }
    },
    
    // Options Data
    options: {
      impliedVolatility: 0.25,
      putCallRatio: 0.75,
      openInterest: {
        calls: 1800000,
        puts: 1350000
      }
    }
  },
  'GOOGL': {
    symbol: 'GOOGL',
    name: 'Alphabet Inc. Class A',
    exchange: 'NASDAQ',
    currency: 'USD',
    currentPrice: 142.56,
    afterHoursPrice: 142.60,
    change: 3.21,
    afterHoursChange: 0.04,
    changePercent: 2.30,
    open: 139.50,
    high: 143.00,
    low: 138.75,
    volume: '22.1M',
    pe: 25.8,
    marketCap: '1.78T',
    week52High: 151.55,
    week52Low: 102.21,
    avgVolume: '28.5M',
    yield: '0.00%',
    beta: 1.05,
    eps: 5.52,
    sector: 'Technology',
    industry: 'Internet Content & Information',
    
    // Chart Data
    chartData: {
      '1D': [
        { time: '09:30', price: 139.50, volume: 800000 },
        { time: '10:00', price: 140.20, volume: 750000 },
        { time: '10:30', price: 140.80, volume: 820000 },
        { time: '11:00', price: 141.40, volume: 780000 },
        { time: '11:30', price: 141.90, volume: 720000 },
        { time: '12:00', price: 142.30, volume: 680000 },
        { time: '12:30', price: 142.60, volume: 650000 },
        { time: '13:00', price: 143.00, volume: 750000 },
        { time: '13:30', price: 142.80, volume: 820000 },
        { time: '14:00', price: 142.50, volume: 780000 },
        { time: '14:30', price: 142.40, volume: 720000 },
        { time: '15:00', price: 142.50, volume: 800000 },
        { time: '15:30', price: 142.56, volume: 900000 },
        { time: '16:00', price: 142.60, volume: 1000000 }
      ],
      '1W': [
        { date: '2024-01-15', open: 135.50, high: 138.20, low: 134.30, close: 137.00, volume: 25000000 },
        { date: '2024-01-16', open: 137.50, high: 139.20, low: 136.50, close: 138.80, volume: 22000000 },
        { date: '2024-01-17', open: 139.00, high: 140.60, low: 138.10, close: 139.40, volume: 24000000 },
        { date: '2024-01-18', open: 139.50, high: 141.40, low: 138.20, close: 140.20, volume: 26000000 },
        { date: '2024-01-19', open: 139.50, high: 143.00, low: 138.75, close: 142.56, volume: 22100000 }
      ],
      '1M': [
        { date: '2024-01-01', price: 130.50, volume: 25000000 },
        { date: '2024-01-02', price: 132.20, volume: 23000000 },
        { date: '2024-01-03', price: 134.80, volume: 27000000 },
        { date: '2024-01-04', price: 133.40, volume: 22000000 },
        { date: '2024-01-05', price: 135.90, volume: 26000000 },
        { date: '2024-01-08', price: 137.20, volume: 24000000 },
        { date: '2024-01-09', price: 136.60, volume: 23500000 },
        { date: '2024-01-10', price: 138.10, volume: 28000000 },
        { date: '2024-01-11', price: 137.80, volume: 25000000 },
        { date: '2024-01-12', price: 139.20, volume: 25500000 },
        { date: '2024-01-15', price: 137.00, volume: 25000000 },
        { date: '2024-01-16', price: 138.80, volume: 22000000 },
        { date: '2024-01-17', price: 139.40, volume: 24000000 },
        { date: '2024-01-18', price: 140.20, volume: 26000000 },
        { date: '2024-01-19', price: 142.56, volume: 22100000 }
      ]
    },
    
    // Technical Indicators
    technicalIndicators: {
      sma20: 138.60,
      sma50: 135.40,
      sma200: 128.20,
      ema12: 140.80,
      ema26: 137.40,
      rsi: 55.5,
      macd: { macd: 1.2, signal: 0.8, histogram: 0.4 },
      bollinger: { upper: 145.50, middle: 138.60, lower: 131.70 },
      support: 135.00,
      resistance: 145.00,
      atr: 2.1
    },
    
    // Forecasts
    forecasts: {
      analystTarget: 160.00,
      analystRating: 'Buy',
      priceTargets: [
        { firm: 'Goldman Sachs', target: 165.00, rating: 'Buy' },
        { firm: 'Morgan Stanley', target: 155.00, rating: 'Overweight' },
        { firm: 'JP Morgan', target: 150.00, rating: 'Neutral' },
        { firm: 'Bank of America', target: 170.00, rating: 'Buy' }
      ],
      aiForecast: {
        nextWeek: { price: 145.50, confidence: 0.68 },
        nextMonth: { price: 150.80, confidence: 0.65 },
        nextQuarter: { price: 158.90, confidence: 0.60 },
        nextYear: { price: 175.40, confidence: 0.55 }
      },
      sentiment: {
        bullish: 0.60,
        bearish: 0.25,
        neutral: 0.15
      }
    },
    
    // Options Data
    options: {
      impliedVolatility: 0.30,
      putCallRatio: 0.80,
      openInterest: {
        calls: 1500000,
        puts: 1200000
      }
    }
  },
  'AMZN': {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    exchange: 'NASDAQ',
    currency: 'USD',
    currentPrice: 155.88,
    afterHoursPrice: 155.90,
    change: 2.45,
    afterHoursChange: 0.02,
    changePercent: 1.59,
    open: 153.50,
    high: 156.25,
    low: 152.80,
    volume: '35.7M',
    pe: 52.3,
    marketCap: '1.62T',
    week52High: 170.83,
    week52Low: 101.15,
    avgVolume: '42.1M',
    yield: '0.00%',
    beta: 1.29,
    eps: 2.98,
    sector: 'Consumer Discretionary',
    industry: 'Internet Retail',
    
    // Chart Data
    chartData: {
      '1D': [
        { time: '09:30', price: 153.50, volume: 1800000 },
        { time: '10:00', price: 154.20, volume: 1650000 },
        { time: '10:30', price: 154.80, volume: 1720000 },
        { time: '11:00', price: 155.40, volume: 1680000 },
        { time: '11:30', price: 155.90, volume: 1620000 },
        { time: '12:00', price: 156.25, volume: 1580000 },
        { time: '12:30', price: 156.00, volume: 1550000 },
        { time: '13:00', price: 155.80, volume: 1680000 },
        { time: '13:30', price: 155.60, volume: 1720000 },
        { time: '14:00', price: 155.70, volume: 1680000 },
        { time: '14:30', price: 155.80, volume: 1620000 },
        { time: '15:00', price: 155.85, volume: 1750000 },
        { time: '15:30', price: 155.88, volume: 1900000 },
        { time: '16:00', price: 155.90, volume: 2100000 }
      ],
      '1W': [
        { date: '2024-01-15', open: 150.50, high: 153.20, low: 149.30, close: 152.00, volume: 40000000 },
        { date: '2024-01-16', open: 152.50, high: 154.20, low: 151.50, close: 153.80, volume: 38000000 },
        { date: '2024-01-17', open: 154.00, high: 155.60, low: 153.10, close: 154.40, volume: 42000000 },
        { date: '2024-01-18', open: 154.50, high: 156.40, low: 153.20, close: 155.20, volume: 45000000 },
        { date: '2024-01-19', open: 153.50, high: 156.25, low: 152.80, close: 155.88, volume: 35700000 }
      ],
      '1M': [
        { date: '2024-01-01', price: 145.50, volume: 45000000 },
        { date: '2024-01-02', price: 147.20, volume: 42000000 },
        { date: '2024-01-03', price: 149.80, volume: 48000000 },
        { date: '2024-01-04', price: 148.40, volume: 41000000 },
        { date: '2024-01-05', price: 150.90, volume: 46000000 },
        { date: '2024-01-08', price: 152.20, volume: 44000000 },
        { date: '2024-01-09', price: 151.60, volume: 43000000 },
        { date: '2024-01-10', price: 153.10, volume: 49000000 },
        { date: '2024-01-11', price: 152.80, volume: 45000000 },
        { date: '2024-01-12', price: 154.20, volume: 46000000 },
        { date: '2024-01-15', price: 152.00, volume: 40000000 },
        { date: '2024-01-16', price: 153.80, volume: 38000000 },
        { date: '2024-01-17', price: 154.40, volume: 42000000 },
        { date: '2024-01-18', price: 155.20, volume: 45000000 },
        { date: '2024-01-19', price: 155.88, volume: 35700000 }
      ]
    },
    
    // Technical Indicators
    technicalIndicators: {
      sma20: 152.60,
      sma50: 148.40,
      sma200: 140.20,
      ema12: 154.80,
      ema26: 150.40,
      rsi: 58.5,
      macd: { macd: 1.8, signal: 1.2, histogram: 0.6 },
      bollinger: { upper: 158.50, middle: 152.60, lower: 146.70 },
      support: 150.00,
      resistance: 160.00,
      atr: 3.2
    },
    
    // Forecasts
    forecasts: {
      analystTarget: 175.00,
      analystRating: 'Buy',
      priceTargets: [
        { firm: 'Goldman Sachs', target: 180.00, rating: 'Buy' },
        { firm: 'Morgan Stanley', target: 170.00, rating: 'Overweight' },
        { firm: 'JP Morgan', target: 165.00, rating: 'Neutral' },
        { firm: 'Bank of America', target: 185.00, rating: 'Buy' }
      ],
      aiForecast: {
        nextWeek: { price: 158.50, confidence: 0.70 },
        nextMonth: { price: 165.80, confidence: 0.67 },
        nextQuarter: { price: 172.90, confidence: 0.62 },
        nextYear: { price: 190.40, confidence: 0.58 }
      },
      sentiment: {
        bullish: 0.65,
        bearish: 0.20,
        neutral: 0.15
      }
    },
    
    // Options Data
    options: {
      impliedVolatility: 0.35,
      putCallRatio: 0.85,
      openInterest: {
        calls: 2000000,
        puts: 1700000
      }
    }
  },
  'META': {
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    exchange: 'NASDAQ',
    currency: 'USD',
    currentPrice: 485.20,
    afterHoursPrice: 485.25,
    change: 18.75,
    afterHoursChange: 0.05,
    changePercent: 4.02,
    open: 467.00,
    high: 486.50,
    low: 465.25,
    volume: '18.9M',
    pe: 24.6,
    marketCap: '1.23T',
    week52High: 531.49,
    week52Low: 198.01,
    avgVolume: '22.3M',
    yield: '0.00%',
    beta: 1.22,
    eps: 19.72,
    sector: 'Technology',
    industry: 'Social Media',
    
    // Chart Data
    chartData: {
      '1D': [
        { time: '09:30', price: 467.00, volume: 1200000 },
        { time: '10:00', price: 472.50, volume: 1100000 },
        { time: '10:30', price: 478.20, volume: 1150000 },
        { time: '11:00', price: 482.80, volume: 1080000 },
        { time: '11:30', price: 485.20, volume: 1050000 },
        { time: '12:00', price: 486.50, volume: 1020000 },
        { time: '12:30', price: 485.80, volume: 980000 },
        { time: '13:00', price: 485.50, volume: 1100000 },
        { time: '13:30', price: 485.30, volume: 1150000 },
        { time: '14:00', price: 485.40, volume: 1080000 },
        { time: '14:30', price: 485.20, volume: 1050000 },
        { time: '15:00', price: 485.25, volume: 1200000 },
        { time: '15:30', price: 485.20, volume: 1300000 },
        { time: '16:00', price: 485.25, volume: 1400000 }
      ],
      '1W': [
        { date: '2024-01-15', open: 450.50, high: 455.20, low: 448.30, close: 452.00, volume: 22000000 },
        { date: '2024-01-16', open: 453.50, high: 458.20, low: 451.50, close: 456.80, volume: 20000000 },
        { date: '2024-01-17', open: 458.00, high: 462.60, low: 456.10, close: 460.40, volume: 21000000 },
        { date: '2024-01-18', open: 461.50, high: 468.40, low: 459.20, close: 466.20, volume: 23000000 },
        { date: '2024-01-19', open: 467.00, high: 486.50, low: 465.25, close: 485.20, volume: 18900000 }
      ],
      '1M': [
        { date: '2024-01-01', price: 420.50, volume: 25000000 },
        { date: '2024-01-02', price: 425.20, volume: 23000000 },
        { date: '2024-01-03', price: 430.80, volume: 27000000 },
        { date: '2024-01-04', price: 428.40, volume: 22000000 },
        { date: '2024-01-05', price: 435.90, volume: 26000000 },
        { date: '2024-01-08', price: 440.20, volume: 24000000 },
        { date: '2024-01-09', price: 438.60, volume: 23500000 },
        { date: '2024-01-10', price: 443.10, volume: 28000000 },
        { date: '2024-01-11', price: 441.80, volume: 25000000 },
        { date: '2024-01-12', price: 445.20, volume: 25500000 },
        { date: '2024-01-15', price: 452.00, volume: 22000000 },
        { date: '2024-01-16', price: 456.80, volume: 20000000 },
        { date: '2024-01-17', price: 460.40, volume: 21000000 },
        { date: '2024-01-18', price: 466.20, volume: 23000000 },
        { date: '2024-01-19', price: 485.20, volume: 18900000 }
      ]
    },
    
    // Technical Indicators
    technicalIndicators: {
      sma20: 460.60,
      sma50: 440.40,
      sma200: 380.20,
      ema12: 475.80,
      ema26: 450.40,
      rsi: 75.5,
      macd: { macd: 8.2, signal: 4.8, histogram: 3.4 },
      bollinger: { upper: 495.50, middle: 460.60, lower: 425.70 },
      support: 450.00,
      resistance: 500.00,
      atr: 12.8
    },
    
    // Forecasts
    forecasts: {
      analystTarget: 520.00,
      analystRating: 'Strong Buy',
      priceTargets: [
        { firm: 'Goldman Sachs', target: 530.00, rating: 'Buy' },
        { firm: 'Morgan Stanley', target: 515.00, rating: 'Overweight' },
        { firm: 'JP Morgan', target: 510.00, rating: 'Overweight' },
        { firm: 'Bank of America', target: 540.00, rating: 'Buy' }
      ],
      aiForecast: {
        nextWeek: { price: 495.50, confidence: 0.80 },
        nextMonth: { price: 510.80, confidence: 0.75 },
        nextQuarter: { price: 525.90, confidence: 0.70 },
        nextYear: { price: 560.40, confidence: 0.65 }
      },
      sentiment: {
        bullish: 0.80,
        bearish: 0.10,
        neutral: 0.10
      }
    },
    
    // Options Data
    options: {
      impliedVolatility: 0.40,
      putCallRatio: 0.60,
      openInterest: {
        calls: 1800000,
        puts: 1080000
      }
    }
  },
  'AMD': {
    symbol: 'AMD',
    name: 'Advanced Micro Devices Inc.',
    exchange: 'NASDAQ',
    currency: 'USD',
    currentPrice: 203.71,
    afterHoursPrice: 203.80,
    change: 23.71,
    afterHoursChange: 0.09,
    changePercent: 13.18,
    open: 180.00,
    high: 205.00,
    low: 178.50,
    volume: '67.2M',
    pe: 45.8,
    marketCap: '328.5B',
    week52High: 227.30,
    week52Low: 73.25,
    avgVolume: '58.7M',
    yield: '0.00%',
    beta: 1.89,
    eps: 4.45,
    sector: 'Technology',
    industry: 'Semiconductors',
    
    // Chart Data
    chartData: {
      '1D': [
        { time: '09:30', price: 180.00, volume: 3500000 },
        { time: '10:00', price: 185.50, volume: 3200000 },
        { time: '10:30', price: 190.20, volume: 3400000 },
        { time: '11:00', price: 195.80, volume: 3300000 },
        { time: '11:30', price: 198.20, volume: 3100000 },
        { time: '12:00', price: 200.50, volume: 3000000 },
        { time: '12:30', price: 202.80, volume: 2900000 },
        { time: '13:00', price: 204.50, volume: 3200000 },
        { time: '13:30', price: 205.00, volume: 3500000 },
        { time: '14:00', price: 204.20, volume: 3300000 },
        { time: '14:30', price: 203.80, volume: 3100000 },
        { time: '15:00', price: 203.60, volume: 3400000 },
        { time: '15:30', price: 203.71, volume: 3800000 },
        { time: '16:00', price: 203.80, volume: 4200000 }
      ],
      '1W': [
        { date: '2024-01-15', open: 170.50, high: 175.20, low: 168.30, close: 172.00, volume: 70000000 },
        { date: '2024-01-16', open: 173.50, high: 178.20, low: 171.50, close: 176.80, volume: 65000000 },
        { date: '2024-01-17', open: 178.00, high: 182.60, low: 176.10, close: 180.40, volume: 68000000 },
        { date: '2024-01-18', open: 181.50, high: 185.40, low: 179.20, close: 183.20, volume: 72000000 },
        { date: '2024-01-19', open: 180.00, high: 205.00, low: 178.50, close: 203.71, volume: 67200000 }
      ],
      '1M': [
        { date: '2024-01-01', price: 160.50, volume: 60000000 },
        { date: '2024-01-02', price: 165.20, volume: 58000000 },
        { date: '2024-01-03', price: 170.80, volume: 62000000 },
        { date: '2024-01-04', price: 168.40, volume: 55000000 },
        { date: '2024-01-05', price: 175.90, volume: 61000000 },
        { date: '2024-01-08', price: 178.20, volume: 59000000 },
        { date: '2024-01-09', price: 176.60, volume: 57000000 },
        { date: '2024-01-10', price: 180.10, volume: 63000000 },
        { date: '2024-01-11', price: 179.80, volume: 60000000 },
        { date: '2024-01-12', price: 182.20, volume: 61000000 },
        { date: '2024-01-15', price: 172.00, volume: 70000000 },
        { date: '2024-01-16', price: 176.80, volume: 65000000 },
        { date: '2024-01-17', price: 180.40, volume: 68000000 },
        { date: '2024-01-18', price: 183.20, volume: 72000000 },
        { date: '2024-01-19', price: 203.71, volume: 67200000 }
      ]
    },
    
    // Technical Indicators
    technicalIndicators: {
      sma20: 180.60,
      sma50: 165.40,
      sma200: 140.20,
      ema12: 195.80,
      ema26: 170.40,
      rsi: 78.5,
      macd: { macd: 12.2, signal: 6.8, histogram: 5.4 },
      bollinger: { upper: 210.50, middle: 180.60, lower: 150.70 },
      support: 175.00,
      resistance: 210.00,
      atr: 8.5
    },
    
    // Forecasts
    forecasts: {
      analystTarget: 230.00,
      analystRating: 'Strong Buy',
      priceTargets: [
        { firm: 'Goldman Sachs', target: 240.00, rating: 'Buy' },
        { firm: 'Morgan Stanley', target: 225.00, rating: 'Overweight' },
        { firm: 'JP Morgan', target: 220.00, rating: 'Overweight' },
        { firm: 'Bank of America', target: 245.00, rating: 'Buy' }
      ],
      aiForecast: {
        nextWeek: { price: 210.50, confidence: 0.85 },
        nextMonth: { price: 220.80, confidence: 0.80 },
        nextQuarter: { price: 235.90, confidence: 0.75 },
        nextYear: { price: 260.40, confidence: 0.70 }
      },
      sentiment: {
        bullish: 0.85,
        bearish: 0.08,
        neutral: 0.07
      }
    },
    
    // Options Data
    options: {
      impliedVolatility: 0.55,
      putCallRatio: 0.50,
      openInterest: {
        calls: 2500000,
        puts: 1250000
      }
    }
  },
  'INTC': {
    symbol: 'INTC',
    name: 'Intel Corporation',
    exchange: 'NASDAQ',
    currency: 'USD',
    currentPrice: 44.82,
    afterHoursPrice: 44.85,
    change: 1.25,
    afterHoursChange: 0.03,
    changePercent: 2.87,
    open: 43.60,
    high: 45.00,
    low: 43.25,
    volume: '42.8M',
    pe: 112.1,
    marketCap: '186.2B',
    week52High: 51.28,
    week52Low: 24.73,
    avgVolume: '38.9M',
    yield: '1.34%',
    beta: 0.68,
    eps: 0.40,
    sector: 'Technology',
    industry: 'Semiconductors',
    
    // Chart Data
    chartData: {
      '1D': [
        { time: '09:30', price: 43.60, volume: 2200000 },
        { time: '10:00', price: 44.20, volume: 2000000 },
        { time: '10:30', price: 44.50, volume: 2100000 },
        { time: '11:00', price: 44.80, volume: 2050000 },
        { time: '11:30', price: 44.90, volume: 1950000 },
        { time: '12:00', price: 45.00, volume: 1900000 },
        { time: '12:30', price: 44.85, volume: 1850000 },
        { time: '13:00', price: 44.80, volume: 2000000 },
        { time: '13:30', price: 44.75, volume: 2100000 },
        { time: '14:00', price: 44.80, volume: 2050000 },
        { time: '14:30', price: 44.82, volume: 1950000 },
        { time: '15:00', price: 44.85, volume: 2200000 },
        { time: '15:30', price: 44.82, volume: 2400000 },
        { time: '16:00', price: 44.85, volume: 2600000 }
      ],
      '1W': [
        { date: '2024-01-15', open: 42.50, high: 43.20, low: 41.30, close: 42.00, volume: 45000000 },
        { date: '2024-01-16', open: 42.50, high: 43.20, low: 41.50, close: 42.80, volume: 42000000 },
        { date: '2024-01-17', open: 43.00, high: 43.60, low: 42.10, close: 43.40, volume: 44000000 },
        { date: '2024-01-18', open: 43.50, high: 44.40, low: 42.20, close: 43.20, volume: 46000000 },
        { date: '2024-01-19', open: 43.60, high: 45.00, low: 43.25, close: 44.82, volume: 42800000 }
      ],
      '1M': [
        { date: '2024-01-01', price: 40.50, volume: 40000000 },
        { date: '2024-01-02', price: 41.20, volume: 38000000 },
        { date: '2024-01-03', price: 42.80, volume: 42000000 },
        { date: '2024-01-04', price: 41.40, volume: 37000000 },
        { date: '2024-01-05', price: 42.90, volume: 41000000 },
        { date: '2024-01-08', price: 43.20, volume: 39000000 },
        { date: '2024-01-09', price: 42.60, volume: 38500000 },
        { date: '2024-01-10', price: 43.10, volume: 43000000 },
        { date: '2024-01-11', price: 42.80, volume: 40000000 },
        { date: '2024-01-12', price: 43.20, volume: 40500000 },
        { date: '2024-01-15', price: 42.00, volume: 45000000 },
        { date: '2024-01-16', price: 42.80, volume: 42000000 },
        { date: '2024-01-17', price: 43.40, volume: 44000000 },
        { date: '2024-01-18', price: 43.20, volume: 46000000 },
        { date: '2024-01-19', price: 44.82, volume: 42800000 }
      ]
    },
    
    // Technical Indicators
    technicalIndicators: {
      sma20: 42.60,
      sma50: 40.40,
      sma200: 35.20,
      ema12: 44.80,
      ema26: 41.40,
      rsi: 65.5,
      macd: { macd: 1.8, signal: 1.2, histogram: 0.6 },
      bollinger: { upper: 46.50, middle: 42.60, lower: 38.70 },
      support: 40.00,
      resistance: 46.00,
      atr: 1.8
    },
    
    // Forecasts
    forecasts: {
      analystTarget: 50.00,
      analystRating: 'Hold',
      priceTargets: [
        { firm: 'Goldman Sachs', target: 52.00, rating: 'Neutral' },
        { firm: 'Morgan Stanley', target: 48.00, rating: 'Equal Weight' },
        { firm: 'JP Morgan', target: 45.00, rating: 'Underweight' },
        { firm: 'Bank of America', target: 55.00, rating: 'Neutral' }
      ],
      aiForecast: {
        nextWeek: { price: 46.50, confidence: 0.60 },
        nextMonth: { price: 48.80, confidence: 0.55 },
        nextQuarter: { price: 51.90, confidence: 0.50 },
        nextYear: { price: 58.40, confidence: 0.45 }
      },
      sentiment: {
        bullish: 0.40,
        bearish: 0.35,
        neutral: 0.25
      }
    },
    
    // Options Data
    options: {
      impliedVolatility: 0.45,
      putCallRatio: 1.20,
      openInterest: {
        calls: 1200000,
        puts: 1440000
      }
    }
  },
  'SPY': {
    symbol: 'SPY',
    name: 'SPDR S&P 500 ETF Trust',
    exchange: 'NYSE ARCA',
    currency: 'USD',
    currentPrice: 567.89,
    afterHoursPrice: 567.90,
    change: 2.45,
    afterHoursChange: 0.01,
    changePercent: 0.43,
    open: 565.50,
    high: 568.25,
    low: 564.80,
    volume: '89.2M',
    pe: 22.4,
    marketCap: '528.7B',
    week52High: 591.44,
    week52Low: 410.76,
    avgVolume: '95.3M',
    yield: '1.41%',
    beta: 1.00,
    eps: 25.35,
    sector: 'Financial Services',
    industry: 'Asset Management',
    
    // Chart Data
    chartData: {
      '1D': [
        { time: '09:30', price: 565.50, volume: 4500000 },
        { time: '10:00', price: 566.20, volume: 4200000 },
        { time: '10:30', price: 566.80, volume: 4400000 },
        { time: '11:00', price: 567.40, volume: 4300000 },
        { time: '11:30', price: 567.80, volume: 4100000 },
        { time: '12:00', price: 568.25, volume: 4000000 },
        { time: '12:30', price: 568.00, volume: 3900000 },
        { time: '13:00', price: 567.80, volume: 4200000 },
        { time: '13:30', price: 567.60, volume: 4400000 },
        { time: '14:00', price: 567.70, volume: 4300000 },
        { time: '14:30', price: 567.80, volume: 4100000 },
        { time: '15:00', price: 567.85, volume: 4500000 },
        { time: '15:30', price: 567.89, volume: 4800000 },
        { time: '16:00', price: 567.90, volume: 5200000 }
      ],
      '1W': [
        { date: '2024-01-15', open: 560.50, high: 563.20, low: 558.30, close: 561.00, volume: 95000000 },
        { date: '2024-01-16', open: 562.50, high: 564.20, low: 560.50, close: 563.80, volume: 92000000 },
        { date: '2024-01-17', open: 564.00, high: 565.60, low: 562.10, close: 564.40, volume: 94000000 },
        { date: '2024-01-18', open: 564.50, high: 566.40, low: 562.20, close: 565.20, volume: 96000000 },
        { date: '2024-01-19', open: 565.50, high: 568.25, low: 564.80, close: 567.89, volume: 89200000 }
      ],
      '1M': [
        { date: '2024-01-01', price: 550.50, volume: 90000000 },
        { date: '2024-01-02', price: 552.20, volume: 88000000 },
        { date: '2024-01-03', price: 554.80, volume: 92000000 },
        { date: '2024-01-04', price: 553.40, volume: 87000000 },
        { date: '2024-01-05', price: 555.90, volume: 91000000 },
        { date: '2024-01-08', price: 557.20, volume: 89000000 },
        { date: '2024-01-09', price: 556.60, volume: 88500000 },
        { date: '2024-01-10', price: 558.10, volume: 93000000 },
        { date: '2024-01-11', price: 557.80, volume: 90000000 },
        { date: '2024-01-12', price: 559.20, volume: 90500000 },
        { date: '2024-01-15', price: 561.00, volume: 95000000 },
        { date: '2024-01-16', price: 563.80, volume: 92000000 },
        { date: '2024-01-17', price: 564.40, volume: 94000000 },
        { date: '2024-01-18', price: 565.20, volume: 96000000 },
        { date: '2024-01-19', price: 567.89, volume: 89200000 }
      ]
    },
    
    // Technical Indicators
    technicalIndicators: {
      sma20: 562.60,
      sma50: 555.40,
      sma200: 520.20,
      ema12: 566.80,
      ema26: 560.40,
      rsi: 58.5,
      macd: { macd: 2.2, signal: 1.5, histogram: 0.7 },
      bollinger: { upper: 570.50, middle: 562.60, lower: 554.70 },
      support: 560.00,
      resistance: 570.00,
      atr: 3.5
    },
    
    // Forecasts
    forecasts: {
      analystTarget: 580.00,
      analystRating: 'Buy',
      priceTargets: [
        { firm: 'Goldman Sachs', target: 585.00, rating: 'Buy' },
        { firm: 'Morgan Stanley', target: 575.00, rating: 'Overweight' },
        { firm: 'JP Morgan', target: 570.00, rating: 'Neutral' },
        { firm: 'Bank of America', target: 590.00, rating: 'Buy' }
      ],
      aiForecast: {
        nextWeek: { price: 570.50, confidence: 0.70 },
        nextMonth: { price: 575.80, confidence: 0.65 },
        nextQuarter: { price: 582.90, confidence: 0.60 },
        nextYear: { price: 600.40, confidence: 0.55 }
      },
      sentiment: {
        bullish: 0.65,
        bearish: 0.20,
        neutral: 0.15
      }
    },
    
    // Options Data
    options: {
      impliedVolatility: 0.20,
      putCallRatio: 0.90,
      openInterest: {
        calls: 3000000,
        puts: 2700000
      }
    }
  }
};

// Helper function to get stock data by symbol
export const getStockData = (symbol) => {
  return mockStockData[symbol?.toUpperCase()] || mockStockData['AAPL'];
};

// Helper function to get all stock symbols
export const getAllStockSymbols = () => {
  return Object.keys(mockStockData);
};

// Helper function to get stocks by sector
export const getStocksBySector = (sector) => {
  return Object.values(mockStockData).filter(stock => stock.sector === sector);
};

// Helper function to get market movers data
export const getMarketMovers = () => {
  const stocks = Object.values(mockStockData);
  
  return {
    mostActive: [
      { symbol: 'PLUG', name: 'Plug Power Inc', price: '$4.13', change: '+8.68%', trend: 'up' },
      { symbol: 'OPEN', name: 'Opendoor Technologies Inc', price: '$9.29', change: '+14.51%', trend: 'up' },
      { symbol: 'AMD', name: 'Advanced Micro Devices Inc', price: '$203.71', change: '+23.71%', trend: 'up' }
    ],
    dailyGainers: [
      { symbol: 'ORBS', name: 'Eightco Holdings Inc', price: '$11.07', change: '+34.34%', trend: 'up' },
      { symbol: 'AMD', name: 'Advanced Micro Devices Inc', price: '$203.71', change: '+23.71%', trend: 'up' },
      { symbol: 'SANM', name: 'Sanmina Corp', price: '$140.00', change: '+22.72%', trend: 'up' }
    ],
    dailyLosers: [
      { symbol: 'APP', name: 'Applovin Corp', price: '$587.00', change: '-14.03%', trend: 'down' },
      { symbol: 'CVCO', name: 'Cavco Industries Inc', price: '$498.60', change: '-12.59%', trend: 'down' },
      { symbol: 'QUBT', name: 'Quantum Computing Inc', price: '$22.16', change: '-9.99%', trend: 'down' }
    ]
  };
};

// Helper function to get market indices data
export const getMarketIndices = () => {
  return {
    US: [
      { name: 'S&P 500', value: '5,678.90', change: '+2.45 (+0.04%)', trend: 'up' },
      { name: 'Dow Jones', value: '39,123.45', change: '+156.78 (+0.40%)', trend: 'up' },
      { name: 'NASDAQ', value: '18,234.56', change: '+89.12 (+0.49%)', trend: 'up' },
      { name: 'Russell 2000', value: '2,156.78', change: '+12.34 (+0.58%)', trend: 'up' },
      { name: 'VIX', value: '12.45', change: '-0.89 (-6.67%)', trend: 'down' }
    ],
    Europe: [
      { name: 'FTSE 100', value: '8,234.56', change: '+45.67 (+0.56%)', trend: 'up' },
      { name: 'DAX', value: '18,456.78', change: '+123.45 (+0.67%)', trend: 'up' },
      { name: 'CAC 40', value: '7,890.12', change: '+34.56 (+0.44%)', trend: 'up' }
    ],
    Asia: [
      { name: 'Nikkei 225', value: '39,123.45', change: '+234.56 (+0.60%)', trend: 'up' },
      { name: 'Hang Seng', value: '18,456.78', change: '+123.45 (+0.67%)', trend: 'up' },
      { name: 'Shanghai Composite', value: '3,123.45', change: '+12.34 (+0.40%)', trend: 'up' }
    ],
    Currencies: [
      { name: 'USD/EUR', value: '0.9234', change: '+0.0012 (+0.13%)', trend: 'up' },
      { name: 'USD/JPY', value: '149.23', change: '+0.45 (+0.30%)', trend: 'up' },
      { name: 'GBP/USD', value: '1.2734', change: '-0.0023 (-0.18%)', trend: 'down' }
    ],
    Crypto: [
      { name: 'Bitcoin', value: '$61,420', change: '+420 (+0.69%)', trend: 'up' },
      { name: 'Ethereum', value: '$2,430', change: '+18 (+0.75%)', trend: 'up' },
      { name: 'Solana', value: '$137.50', change: '-1.20 (-0.87%)', trend: 'down' },
      { name: 'XRP', value: '$0.52', change: '+0.01 (+1.35%)', trend: 'up' },
      { name: 'DOGE', value: '$0.125', change: '-0.001 (-0.80%)', trend: 'down' }
    ]
  };
};

// Helper function to get chart data for a specific stock and timeframe
export const getChartData = (symbol, timeframe = '1D') => {
  const stock = getStockData(symbol);
  return stock?.chartData?.[timeframe] || [];
};

// Helper function to get technical indicators for a stock
export const getTechnicalIndicators = (symbol) => {
  const stock = getStockData(symbol);
  return stock?.technicalIndicators || null;
};

// Helper function to get forecasts for a stock
export const getForecasts = (symbol) => {
  const stock = getStockData(symbol);
  return stock?.forecasts || null;
};

// Helper function to get options data for a stock
export const getOptionsData = (symbol) => {
  const stock = getStockData(symbol);
  return stock?.options || null;
};

// Helper function to get AI forecast for a specific timeframe
export const getAIForecast = (symbol, timeframe = 'nextWeek') => {
  const forecasts = getForecasts(symbol);
  return forecasts?.aiForecast?.[timeframe] || null;
};

// Helper function to get analyst price targets
export const getAnalystTargets = (symbol) => {
  const forecasts = getForecasts(symbol);
  return forecasts?.priceTargets || [];
};

// Helper function to get market sentiment
export const getMarketSentiment = (symbol) => {
  const forecasts = getForecasts(symbol);
  return forecasts?.sentiment || { bullish: 0.5, bearish: 0.3, neutral: 0.2 };
};

// Helper function to validate stock data completeness
export const validateStockData = (symbol) => {
  const stock = getStockData(symbol);
  const hasChartData = stock?.chartData && Object.keys(stock.chartData).length > 0;
  const hasTechnicalIndicators = stock?.technicalIndicators && Object.keys(stock.technicalIndicators).length > 0;
  const hasForecasts = stock?.forecasts && Object.keys(stock.forecasts).length > 0;
  const hasOptions = stock?.options && Object.keys(stock.options).length > 0;
  
  return {
    symbol,
    hasChartData,
    hasTechnicalIndicators,
    hasForecasts,
    hasOptions,
    isComplete: hasChartData && hasTechnicalIndicators && hasForecasts && hasOptions
  };
};

// Helper function to get all stock validation status
export const getAllStockValidation = () => {
  return Object.keys(mockStockData).map(symbol => validateStockData(symbol));
};
