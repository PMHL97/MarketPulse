import React from 'react'
import { Link } from 'react-router-dom'
import { 
  TrendingUp, 
  TrendingDown, 
  Play, 
  ArrowRight,
  BarChart3,
  Users,
  Globe,
  Zap
} from 'lucide-react'
import MarketSummary from '../components/MarketSummary'
import FeaturedIdeas from '../components/FeaturedIdeas'
import CommunityTrends from '../components/CommunityTrends'

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              The best trades require research, then commitment.
            </h1>
            <p className="text-xl md:text-2xl text-secondary-200 mb-8">
              Join 100 million traders and investors taking the future into their own hands.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/charts" className="btn-primary text-lg px-8 py-4 flex items-center space-x-2">
                <span>Get started for free</span>
                <span className="text-sm opacity-75">$0 forever, no credit card needed</span>
              </Link>
              <button className="btn-secondary text-lg px-8 py-4 flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch explainer</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Where the world does markets
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Advanced charting, real-time data, and a global community of traders
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Supercharts</h3>
              <p className="text-secondary-600">Professional-grade charting with 100+ indicators</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Global Markets</h3>
              <p className="text-secondary-600">Access to stocks, forex, crypto, and commodities</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Community</h3>
              <p className="text-secondary-600">Connect with millions of traders worldwide</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Real-time Data</h3>
              <p className="text-secondary-600">Live market data and instant notifications</p>
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to start your trading journey?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join millions of traders who trust Market Pulse for their market analysis
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/charts" className="bg-white text-primary-600 hover:bg-secondary-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Start Trading
            </Link>
            <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
