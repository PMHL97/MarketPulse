import React from 'react'
import { TrendingUp, TrendingDown, Clock, Eye, ThumbsUp, MessageCircle } from 'lucide-react'

const FeaturedIdeas = () => {
  const ideas = [
    {
      id: 1,
      title: "Don't Be the Exit Liquidity: The Truth About IPOs",
      author: "PineCoders",
      symbol: "INDEX:BTCUSD",
      direction: "long",
      timeAgo: "2 hours ago",
      views: "1.2k",
      likes: 45,
      comments: 12,
      excerpt: "Picture this: a company wants to go public. They don't just toss shares on the market like a garage sale. No. The sequence is distinct..."
    },
    {
      id: 2,
      title: "Bubble, No Bubble: Stocks Are So Back After Powell Cranks It Up",
      author: "litwizard",
      symbol: "NYSE:ARX",
      direction: "short",
      timeAgo: "4 hours ago",
      views: "856",
      likes: 32,
      comments: 8,
      excerpt: "Stretched valuations, talks of froth, and overall market fatigue. That's what investors were saying for stocks up until Powell brought up the vibe..."
    },
    {
      id: 3,
      title: "Amazon Chart Check",
      author: "Market Pulse",
      symbol: "NASDAQ:AMZN",
      direction: "neutral",
      timeAgo: "6 hours ago",
      views: "2.1k",
      likes: 67,
      comments: 23,
      excerpt: "On the weekly chart, Amazon looks like it's starting to tire a bit. Price is struggling just under that January high near 24,252..."
    },
    {
      id: 4,
      title: "Nvidia Shares Maintain Bearish Bias Near $170",
      author: "FOREXcom",
      symbol: "NASDAQ:NVDA",
      direction: "short",
      timeAgo: "8 hours ago",
      views: "1.5k",
      likes: 54,
      comments: 18,
      excerpt: "Over the past three trading sessions, Nvidia's shares have posted a sharp decline, accumulating losses of more than 3% in the short term..."
    },
    {
      id: 5,
      title: "Traders Go Quiet Ahead of Jackson Hole — What Will Powell Say?",
      author: "TradeStation",
      symbol: "SP:SPX",
      direction: "neutral",
      timeAgo: "10 hours ago",
      views: "987",
      likes: 28,
      comments: 15,
      excerpt: "Markets have been eerily quiet this week. Not because traders suddenly discovered meditation, but because everyone is waiting for one man in Wyoming..."
    },
    {
      id: 6,
      title: "Bitcoin Daily Analysis – The Trend Is Our Friend",
      author: "TraderTilki",
      symbol: "CAPITALCOM:BTCUSDLong",
      direction: "long",
      timeAgo: "12 hours ago",
      views: "1.8k",
      likes: 89,
      comments: 34,
      excerpt: "Good morning, Guys, I've prepared a fresh Bitcoin analysis for you. First off, I stand firmly behind my long-term targets of 127,000 – 137,000 – 146,000..."
    }
  ]

  const getDirectionColor = (direction) => {
    switch (direction) {
      case 'long':
        return 'text-success bg-success/10'
      case 'short':
        return 'text-danger bg-danger/10'
      default:
        return 'text-secondary-600 bg-secondary-100'
    }
  }

  const getDirectionIcon = (direction) => {
    switch (direction) {
      case 'long':
        return <TrendingUp className="w-4 h-4" />
      case 'short':
        return <TrendingDown className="w-4 h-4" />
      default:
        return <span className="w-4 h-4">—</span>
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ideas.map((idea) => (
        <div key={idea.id} className="rounded-[24px] bg-[#e9ecdf] border border-secondary-200 p-6 hover:shadow-soft transition-shadow duration-200">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getDirectionColor(idea.direction)}`}>
                {getDirectionIcon(idea.direction)}
                <span className="capitalize">{idea.direction}</span>
              </span>
            </div>
            <div className="flex items-center space-x-1 text-secondary-500 text-sm">
              <Clock className="w-3 h-3" />
              <span>{idea.timeAgo}</span>
            </div>
          </div>

          {/* Symbol */}
          <div className="text-sm font-mono text-[#0a3b4a] mb-3">
            {idea.symbol}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-[#0a3b4a] mb-3 line-clamp-2 hover:opacity-80 transition-colors cursor-pointer">
            {idea.title}
          </h3>

          {/* Excerpt */}
          <p className="text-secondary-700 text-sm mb-4 line-clamp-3">
            {idea.excerpt}
          </p>

          {/* Author */}
          <div className="text-sm text-secondary-700 mb-4">
            by <span className="font-medium text-[#0a3b4a]">{idea.author}</span>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-secondary-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{idea.views}</span>
              </div>
              <div className="flex items-center space-x-1">
                <ThumbsUp className="w-4 h-4" />
                <span>{idea.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span>{idea.comments}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FeaturedIdeas

