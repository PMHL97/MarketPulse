import React from 'react'
import { Link } from 'react-router-dom'
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowRight,
  BarChart3,
  Users,
  Globe,
  Zap
} from 'lucide-react'
import MarketSummary from '../components/MarketSummary'
import FeaturedIdeas from '../components/FeaturedIdeas'
import CommunityTrends from '../components/CommunityTrends'
import RealtimeDashboard from '../components/RealtimeDashboard'

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#f0f4e8] text-secondary-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Text Content */}
            <div className="flex-1 text-center">
              <div className="text-sm font-semibold tracking-wider uppercase text-secondary-700 mb-2">BRINGING IDEAS TO LIFE</div>
              <div className="w-16 h-0.5 bg-secondary-300 mb-6"></div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6 leading-tight">
                The best trades require research, then commitment.
              </h1>
              <p className="text-lg text-secondary-600 mb-8">
                Join 100 million traders and investors taking the future into their own hands.
              </p>
              <div className="flex justify-center">
                <Link to="/charts" className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 text-base">
                  Get started for free
                </Link>
              </div>
              <div className="mt-2 text-xs text-secondary-500 text-center">
                $0 forever, no credit card needed
              </div>
            </div>
            
            {/* Hero Journey Illustration */}
            <div className="flex-1 flex justify-center">
              <img 
                src="/hero-journey__a399cc7ef240acbb66eef71f67caac19d2c9fa9f4b760ae4667e546d314060a8.svg" 
                alt="Trading journey illustration" 
                className="w-full max-w-lg h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Market Dashboard */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RealtimeDashboard />
        </div>
      </section>

      {/* Removed Key Metrics section per request */}

      {/* What we do */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
              WHAT WE DO
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Curious about trading? Learn the ins and outs from the pros before making your move.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Supercharts Card */}
            <div className="bg-[#f2ecdf] rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-secondary-900 mb-4">Supercharts</h3>
              <p className="text-secondary-600 mb-6">
                Professional-grade charting with 100+ indicators
              </p>
              <div className="flex justify-center">
                <BarChart3 className="w-12 h-12 text-secondary-700" />
              </div>
            </div>
            
            {/* Global Markets Card */}
            <div className="bg-[#f7e7b8] rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-secondary-900 mb-4">Global Markets</h3>
              <p className="text-secondary-600 mb-6">
                Access to stocks, forex, crypto, and commodities
              </p>
              <div className="flex justify-center">
                <Globe className="w-12 h-12 text-secondary-700" />
              </div>
            </div>
            
            {/* Community Card */}
            <div className="bg-[#e8f6e8] rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-secondary-900 mb-4">Community</h3>
              <p className="text-secondary-600 mb-6">
                Connect with millions of traders worldwide
              </p>
              <div className="flex justify-center">
                <Users className="w-12 h-12 text-secondary-700" />
              </div>
            </div>
            
            {/* Real-time Data Card */}
            <div className="bg-[#e6f7fd] rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-secondary-900 mb-4">Real-time Data</h3>
              <p className="text-secondary-600 mb-6">
                Live market data and instant notifications
              </p>
              <div className="flex justify-center">
                <Zap className="w-12 h-12 text-secondary-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Summary Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Market Summary
            </h2>
            <p className="text-xl text-secondary-600">
              Track major indices, currencies, and commodities
            </p>
          </div>
          <MarketSummary />
        </div>
      </section>

      {/* Featured Ideas Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                Community Ideas
              </h2>
              <p className="text-xl text-secondary-600">
                Discover trading opportunities from our community
              </p>
            </div>
            <Link to="/community" className="btn-secondary flex items-center space-x-2">
              <span>View all</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <FeaturedIdeas />
        </div>
      </section>

      {/* Community Trends Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Community Trends
            </h2>
            <p className="text-xl text-secondary-600">
              See what's trending in the trading community
            </p>
          </div>
          <CommunityTrends />
        </div>
      </section>

      {/* CTA Section - clean card style */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[24px] bg-[#e9ecdf] border border-secondary-200 p-10 text-center">
            <h2 className="section-headline text-[#0a3b4a] mb-4">Ready to start your trading journey?</h2>
            <p className="text-lg md:text-xl text-secondary-800 mb-8 max-w-2xl mx-auto">Join millions of traders who trust Market Pulse for their market analysis.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/charts" className="btn-primary px-8 py-3">Start Trading</Link>
              <button className="btn-secondary px-8 py-3">Learn More</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
