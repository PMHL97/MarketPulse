import React from 'react'
import { TrendingUp, TrendingDown, Calendar, ArrowRight, BarChart3, AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'

const MarketBrief = () => {
  const brief = {
    date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    title: "Daily Market Pulse: Tech Surges, Energy Dips, Crypto Holds Steady",
    summary: [
      {
        type: 'insight',
        icon: <TrendingUp className="w-5 h-5 text-green-600" />,
        text: "Tech Sector Leads Rally: Strong Q2 earnings reports from major tech companies like NVIDIA and Apple fueled a significant surge in the technology sector. Innovation continues to be a key growth driver."
      },
      {
        type: 'insight',
        icon: <TrendingDown className="w-5 h-5 text-red-600" />,
        text: "Energy Stocks Under Pressure: Concerns over global oil supply surplus and a slight dip in demand projections led to a downturn in energy stocks. Investors are closely watching OPEC+ decisions."
      },
      {
        type: 'insight',
        icon: <AlertTriangle className="w-5 h-5 text-yellow-600" />,
        text: "Cryptocurrency Market Stabilizes: Bitcoin and Ethereum showed resilience, holding key support levels after a volatile week. Institutional interest remains high, but regulatory clarity is still a concern."
      }
    ],
    keyMovers: [
      { symbol: 'NVDA', name: 'NVIDIA Corp', change: '+4.5%', sentiment: 'Strong Buy' },
      { symbol: 'AAPL', name: 'Apple Inc', change: '+2.1%', sentiment: 'Buy' },
      { symbol: 'XOM', name: 'Exxon Mobil', change: '-1.8%', sentiment: 'Hold' },
      { symbol: 'BTCUSD', name: 'Bitcoin', change: '+1.2%', sentiment: 'Neutral' },
    ],
    sources: [
      { name: 'Bloomberg', url: '#' },
      { name: 'Reuters', url: '#' },
      { name: 'Financial Times', url: '#' },
    ]
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
          <Calendar className="w-6 h-6 text-blue-600" />
          <span>{brief.title}</span>
        </h2>
        <span className="text-sm text-slate-600">{brief.date}</span>
      </div>

      <div className="space-y-4 mb-6">
        {brief.summary.map((item, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              {item.icon}
            </div>
            <p className="text-slate-700 text-sm leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Key Events and Sector Analysis Grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* Key Events Card */}
        <Link to="/key-events" className="group">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 hover:shadow-md transition-all duration-200 group-hover:border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-slate-900">Key Events</h3>
              <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="space-y-2">
              <div className="text-sm text-slate-600">• Fed meeting minutes released</div>
              <div className="text-sm text-slate-600">• Apple earnings beat expectations</div>
              <div className="text-sm text-slate-600">• Oil inventory data shows surplus</div>
            </div>
            <div className="mt-3 text-xs text-blue-600 font-medium">Click for details →</div>
          </div>
        </Link>

        {/* Sector Analysis Card */}
        <Link to="/sector-analysis" className="group">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100 hover:shadow-md transition-all duration-200 group-hover:border-green-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-slate-900">Sector Analysis</h3>
              <ArrowRight className="w-4 h-4 text-green-600 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="space-y-2">
              <div className="text-sm text-slate-600">• Technology: +2.3%</div>
              <div className="text-sm text-slate-600">• Energy: -1.8%</div>
              <div className="text-sm text-slate-600">• Healthcare: +0.5%</div>
            </div>
            <div className="mt-3 text-xs text-green-600 font-medium">Click for details →</div>
          </div>
        </Link>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-3">Key Movers</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {brief.keyMovers.map((mover, index) => (
            <div key={index} className="bg-slate-50 rounded-lg p-3 text-center">
              <div className="font-bold text-slate-900">{mover.symbol}</div>
              <div className="text-xs text-slate-600 mb-1">{mover.name}</div>
              <div className={`text-sm font-semibold ${mover.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{mover.change}</div>
              <div className="text-xs text-slate-500 mt-1">{mover.sentiment}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-3">Sources</h3>
        <div className="flex flex-wrap gap-2">
          {brief.sources.map((source, index) => (
            <a
              key={index}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs hover:bg-slate-200 transition-colors"
            >
              {source.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MarketBrief

