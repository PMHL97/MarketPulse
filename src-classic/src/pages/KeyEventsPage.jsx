import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Calendar, TrendingUp, TrendingDown, AlertTriangle, Clock } from 'lucide-react'

const KeyEventsPage = () => {
  const events = [
    {
      id: 1,
      title: "NVIDIA Earnings Beat Expectations",
      impact: "Positive",
      description: "Strong AI chip demand drives 15% after-hours gain. Revenue up 22% YoY with data center sales leading growth.",
      time: "2 hours ago",
      category: "Earnings",
      symbol: "NVDA",
      price: "$485.20",
      change: "+15.2%"
    },
    {
      id: 2,
      title: "Fed Rate Decision - Rates Held Steady",
      impact: "Neutral",
      description: "Federal Reserve maintains current interest rates, hints at potential cuts in Q2 2024. Market reacts positively to dovish tone.",
      time: "1 day ago",
      category: "Monetary Policy",
      symbol: "FED",
      price: "5.25-5.50%",
      change: "0.0%"
    },
    {
      id: 3,
      title: "Oil Price Stabilization",
      impact: "Positive",
      description: "Crude oil finds support at $75 per barrel, easing inflation concerns. OPEC+ production cuts showing effect.",
      time: "3 hours ago",
      category: "Commodities",
      symbol: "WTI",
      price: "$75.20",
      change: "+2.1%"
    },
    {
      id: 4,
      title: "Apple iPhone Sales Disappoint",
      impact: "Negative",
      description: "Q4 iPhone sales miss estimates by 5%. China market weakness cited as primary concern.",
      time: "4 hours ago",
      category: "Earnings",
      symbol: "AAPL",
      price: "$182.50",
      change: "-3.2%"
    },
    {
      id: 5,
      title: "Tesla Delivery Numbers Beat",
      impact: "Positive",
      description: "Q4 deliveries exceed expectations with 484,507 vehicles delivered. Model Y continues strong performance.",
      time: "6 hours ago",
      category: "Earnings",
      symbol: "TSLA",
      price: "$245.80",
      change: "+8.5%"
    },
    {
      id: 6,
      title: "Inflation Data Shows Cooling",
      impact: "Positive",
      description: "CPI rises 3.2% YoY, below expectations. Core inflation at 4.0% suggests Fed policy working.",
      time: "1 day ago",
      category: "Economic Data",
      symbol: "CPI",
      price: "3.2%",
      change: "-0.1%"
    }
  ]

  const getImpactColor = (impact) => {
    switch (impact.toLowerCase()) {
      case 'positive': return 'text-green-600 bg-green-100'
      case 'negative': return 'text-red-600 bg-red-100'
      case 'neutral': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getImpactIcon = (impact) => {
    switch (impact.toLowerCase()) {
      case 'positive': return <TrendingUp className="w-4 h-4" />
      case 'negative': return <TrendingDown className="w-4 h-4" />
      case 'neutral': return <AlertTriangle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link 
            to="/" 
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Key Events</h1>
              <p className="text-slate-600">Market-moving events and their impact</p>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-slate-900">{event.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(event.impact)}`}>
                      {event.impact}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-3">{event.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-slate-500">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </span>
                    <span className="px-2 py-1 bg-slate-100 rounded text-xs">{event.category}</span>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <div className="text-sm text-slate-500 mb-1">{event.symbol}</div>
                  <div className="text-lg font-bold text-slate-900 mb-1">{event.price}</div>
                  <div className={`text-sm font-semibold ${event.change.startsWith('+') ? 'text-green-600' : event.change.startsWith('-') ? 'text-red-600' : 'text-slate-600'}`}>
                    {event.change}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center space-x-2">
                  {getImpactIcon(event.impact)}
                  <span className="text-sm text-slate-600">Market Impact: {event.impact}</span>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-white text-slate-700 font-medium rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors">
            Load More Events
          </button>
        </div>
      </div>
    </div>
  )
}

export default KeyEventsPage

