import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, BarChart3, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react'

const SectorAnalysisPage = () => {
  const sectors = [
    {
      name: "Technology",
      change: "+2.8%",
      trend: "up",
      marketCap: "$12.5T",
      topStocks: ["NVDA", "AAPL", "MSFT"],
      description: "AI stocks leading with strong fundamentals and earnings growth",
      performance: [
        { period: "1D", change: "+2.8%" },
        { period: "1W", change: "+5.2%" },
        { period: "1M", change: "+12.4%" },
        { period: "3M", change: "+18.7%" }
      ]
    },
    {
      name: "Healthcare",
      change: "+1.2%",
      trend: "up",
      marketCap: "$4.2T",
      topStocks: ["JNJ", "PFE", "UNH"],
      description: "Biotech showing recovery signs with FDA approvals increasing",
      performance: [
        { period: "1D", change: "+1.2%" },
        { period: "1W", change: "+2.1%" },
        { period: "1M", change: "+3.8%" },
        { period: "3M", change: "+7.2%" }
      ]
    },
    {
      name: "Financials",
      change: "-0.5%",
      trend: "down",
      marketCap: "$8.1T",
      topStocks: ["JPM", "BAC", "WFC"],
      description: "Rate uncertainty weighing on banks and financial institutions",
      performance: [
        { period: "1D", change: "-0.5%" },
        { period: "1W", change: "-1.2%" },
        { period: "1M", change: "-2.8%" },
        { period: "3M", change: "+1.4%" }
      ]
    },
    {
      name: "Energy",
      change: "+0.8%",
      trend: "up",
      marketCap: "$3.8T",
      topStocks: ["XOM", "CVX", "COP"],
      description: "Oil stabilization supporting sector with OPEC+ production cuts",
      performance: [
        { period: "1D", change: "+0.8%" },
        { period: "1W", change: "+1.5%" },
        { period: "1M", change: "-1.2%" },
        { period: "3M", change: "+4.6%" }
      ]
    },
    {
      name: "Consumer Discretionary",
      change: "+1.5%",
      trend: "up",
      marketCap: "$6.3T",
      topStocks: ["AMZN", "TSLA", "HD"],
      description: "Retail sales strong with holiday season performance exceeding expectations",
      performance: [
        { period: "1D", change: "+1.5%" },
        { period: "1W", change: "+2.8%" },
        { period: "1M", change: "+5.1%" },
        { period: "3M", change: "+9.3%" }
      ]
    },
    {
      name: "Industrials",
      change: "+0.3%",
      trend: "up",
      marketCap: "$4.7T",
      topStocks: ["BA", "CAT", "GE"],
      description: "Infrastructure spending supporting industrial growth",
      performance: [
        { period: "1D", change: "+0.3%" },
        { period: "1W", change: "+0.8%" },
        { period: "1M", change: "+2.1%" },
        { period: "3M", change: "+6.7%" }
      ]
    }
  ]

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 
      <TrendingUp className="w-5 h-5 text-green-600" /> : 
      <TrendingDown className="w-5 h-5 text-red-600" />
  }

  const getChangeColor = (change) => {
    return change.startsWith('+') ? 'text-green-600' : 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link 
            to="/" 
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Sector Analysis</h1>
              <p className="text-slate-600">Performance breakdown by market sectors</p>
            </div>
          </div>
        </div>

        {/* Sectors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-slate-900">{sector.name}</h3>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(sector.trend)}
                  <span className={`text-lg font-bold ${getChangeColor(sector.change)}`}>
                    {sector.change}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="text-sm text-slate-600">{sector.description}</div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Market Cap:</span>
                  <span className="font-medium text-slate-900">{sector.marketCap}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Top Stocks:</span>
                  <span className="font-medium text-slate-900">{sector.topStocks.join(", ")}</span>
                </div>
              </div>

              {/* Performance Chart */}
              <div className="space-y-2 mb-4">
                <div className="text-sm font-medium text-slate-700">Performance</div>
                <div className="grid grid-cols-4 gap-2">
                  {sector.performance.map((perf, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-xs text-slate-500">{perf.period}</div>
                      <div className={`text-sm font-semibold ${getChangeColor(perf.change)}`}>
                        {perf.change}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-sm text-slate-500">Sector Details</span>
                <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                  <span>View</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm p-6 border border-slate-200">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">Market Summary</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">+1.8%</div>
              <div className="text-sm text-slate-600">Average Sector Gain</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">4</div>
              <div className="text-sm text-slate-600">Sectors Up</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">1</div>
              <div className="text-sm text-slate-600">Sectors Down</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-600">$39.6T</div>
              <div className="text-sm text-slate-600">Total Market Cap</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectorAnalysisPage

