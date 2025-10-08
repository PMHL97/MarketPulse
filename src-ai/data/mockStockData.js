// Mock stock data for AI frontend
export const getMarketIndices = () => ({
  US: [
    { name: 'S&P 500', value: '4,567.89', change: '+12.34', percent: '+0.27%', trend: 'up' },
    { name: 'NASDAQ', value: '14,234.56', change: '+45.67', percent: '+0.32%', trend: 'up' },
    { name: 'DOW', value: '34,567.89', change: '-23.45', percent: '-0.07%', trend: 'down' }
  ],
  Europe: [
    { name: 'FTSE 100', value: '7,456.78', change: '+23.45', percent: '+0.32%', trend: 'up' },
    { name: 'DAX', value: '15,678.90', change: '-12.34', percent: '-0.08%', trend: 'down' },
    { name: 'CAC 40', value: '7,234.56', change: '+34.56', percent: '+0.48%', trend: 'up' }
  ],
  Asia: [
    { name: 'Nikkei 225', value: '32,456.78', change: '+123.45', percent: '+0.38%', trend: 'up' },
    { name: 'Hang Seng', value: '18,234.56', change: '-45.67', percent: '-0.25%', trend: 'down' },
    { name: 'Shanghai', value: '3,234.56', change: '+12.34', percent: '+0.38%', trend: 'up' }
  ],
  Currencies: [
    { name: 'EUR/USD', value: '1.0876', change: '+0.0023', percent: '+0.21%', trend: 'up' },
    { name: 'GBP/USD', value: '1.2654', change: '-0.0012', percent: '-0.09%', trend: 'down' },
    { name: 'USD/JPY', value: '149.23', change: '+0.45', percent: '+0.30%', trend: 'up' }
  ],
  Crypto: [
    { name: 'BTC/USD', value: '43,567.89', change: '+1,234.56', percent: '+2.92%', trend: 'up' },
    { name: 'ETH/USD', value: '2,345.67', change: '+45.67', percent: '+1.98%', trend: 'up' },
    { name: 'ADA/USD', value: '0.4567', change: '-0.0123', percent: '-2.63%', trend: 'down' }
  ]
})

export const getMarketMovers = () => ({
  mostActive: [
    { symbol: 'AAPL', name: 'Apple Inc.', price: '$178.23', change: '+1.67%', trend: 'up' },
    { symbol: 'TSLA', name: 'Tesla, Inc.', price: '$234.56', change: '+3.12%', trend: 'up' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: '$168.45', change: '+2.34%', trend: 'up' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: '$378.45', change: '+2.34%', trend: 'up' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '$145.67', change: '-0.45%', trend: 'down' }
  ],
  dailyGainers: [
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: '$168.45', change: '+2.34%', trend: 'up' },
    { symbol: 'TSLA', name: 'Tesla, Inc.', price: '$234.56', change: '+3.12%', trend: 'up' },
    { symbol: 'AMD', name: 'Advanced Micro Devices', price: '$89.23', change: '+1.89%', trend: 'up' },
    { symbol: 'META', name: 'Meta Platforms', price: '$345.67', change: '+1.56%', trend: 'up' },
    { symbol: 'NFLX', name: 'Netflix, Inc.', price: '$456.78', change: '+1.23%', trend: 'up' }
  ],
  dailyLosers: [
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '$145.67', change: '-0.45%', trend: 'down' },
    { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: '$156.78', change: '-0.89%', trend: 'down' },
    { symbol: 'NFLX', name: 'Netflix, Inc.', price: '$456.78', change: '-0.67%', trend: 'down' },
    { symbol: 'ADBE', name: 'Adobe Inc.', price: '$567.89', change: '-0.34%', trend: 'down' },
    { symbol: 'CRM', name: 'Salesforce, Inc.', price: '$234.56', change: '-0.23%', trend: 'down' }
  ]
})

export const getAllStockSymbols = () => [
  'AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA', 'AMZN', 'META', 'NFLX', 'AMD', 'INTC',
  'ADBE', 'CRM', 'ORCL', 'CSCO', 'IBM', 'QCOM', 'TXN', 'AVGO', 'ACN', 'NOW'
]

export const getStockData = (symbol) => ({
  symbol,
  name: `${symbol} Inc.`,
  price: '$123.45',
  change: '+1.23%',
  trend: 'up',
  volume: '1.2M',
  marketCap: '$2.1T',
  pe: '25.4',
  dividend: '0.5%'
})

