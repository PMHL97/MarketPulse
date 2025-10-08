import React from 'react'
// Removed navigation import - will use props instead

const Recommendations = ({ onStockClick }) => {
  const recommendations = [
    {
      type: "Buy",
      symbol: "NVDA",
      name: "NVIDIA Corp",
      reason: "AI leadership position with strong earnings momentum and growing demand for AI chips",
      confidence: 85,
      price: "$485.20",
      change: "+4.5%"
    },
    {
      type: "Watch",
      symbol: "AAPL",
      name: "Apple Inc",
      reason: "Approaching resistance at $185, wait for breakout confirmation",
      confidence: 72,
      price: "$182.50",
      change: "+2.1%"
    },
    {
      type: "Avoid",
      symbol: "Banks",
      name: "Banking Sector",
      reason: "Rate uncertainty creating headwinds for financial institutions",
      confidence: 68,
      price: "Various",
      change: "-0.5%"
    },
    {
      type: "Buy",
      symbol: "TSLA",
      name: "Tesla Inc",
      reason: "EV market recovery and strong delivery numbers supporting growth",
      confidence: 78,
      price: "$245.80",
      change: "+3.2%"
    }
  ]

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'buy': return 'bg-green-100 text-green-800 border-green-200'
      case 'watch': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'avoid': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-slate-900 mb-3">Trading Recommendations</h3>

      <div className="space-y-3">
        {recommendations.map((rec, index) => (
          <div 
            key={index} 
            className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm cursor-pointer hover:shadow-md transition-all"
            onClick={() => {
              // Only navigate if it's a specific stock symbol, not a sector
              if (rec.symbol !== 'Banks' && onStockClick) {
                onStockClick(rec.symbol);
              }
            }}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(rec.type)}`}>
                    {rec.type}
                  </span>
                  <span className="text-sm font-semibold text-slate-900">{rec.symbol}</span>
                  <span className="text-sm text-slate-600">{rec.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-slate-700">{rec.price}</span>
                  <span className={`text-sm font-semibold ${rec.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {rec.change}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500">Confidence</div>
                <div className="text-sm font-semibold text-slate-900">{rec.confidence}%</div>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{rec.reason}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Recommendations
