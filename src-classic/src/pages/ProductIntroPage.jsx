import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Bot, 
  BarChart3, 
  TrendingUp, 
  Target,
  Sparkles,
  ArrowRight,
  Brain,
  Zap,
  CheckCircle,
  Star,
  Users,
  Shield,
  Clock
} from 'lucide-react'

const ProductIntroPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-200 mb-6">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">AI-Powered Trading Intelligence</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Trade Smarter with
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Insights
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Let AI analyze markets, explain charts, and guide your investment decisions. 
              No complex tools needed - just ask and get intelligent answers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/" 
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <BarChart3 className="w-5 h-5" />
                <span>Start Trading with AI</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <button className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-slate-700 font-medium rounded-lg border border-slate-300 hover:bg-slate-50 transition-all duration-200 shadow-sm">
                <Brain className="w-5 h-5" />
                <span>See AI in Action</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need, Powered by AI
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              No more overwhelming charts or complex analysis. Our AI does the heavy lifting.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Market Analysis */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">AI Market Analysis</h3>
              </div>
              <p className="text-slate-600 mb-6">
                Get daily market insights, sentiment analysis, and key events explained in plain English.
              </p>
              <div className="bg-blue-100 rounded-lg p-3">
                <div className="text-sm text-blue-700 font-medium">Try: "What's moving tech stocks today?"</div>
              </div>
            </div>

            {/* Smart Chart Analysis */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">Smart Chart Analysis</h3>
              </div>
              <p className="text-slate-600 mb-6">
                Upload any chart or ask about patterns. AI explains what's happening and what to watch for.
              </p>
              <div className="bg-purple-100 rounded-lg p-3">
                <div className="text-sm text-purple-700 font-medium">Try: "Explain this AAPL chart"</div>
              </div>
            </div>

            {/* Goal-Based Investing */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">Goal-Based Investing</h3>
              </div>
              <p className="text-slate-600 mb-6">
                Tell AI your goal (e.g., "$1000 to $4000") and get a personalized investment plan.
              </p>
              <div className="bg-green-100 rounded-lg p-3">
                <div className="text-sm text-green-700 font-medium">Try: "Help me grow $1000 to $4000"</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600">
              Simple, intelligent, and designed for everyone
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Ask AI Anything</h3>
              <p className="text-slate-600">
                Simply ask questions about markets, stocks, or your portfolio. No technical knowledge required.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Get Smart Insights</h3>
              <p className="text-slate-600">
                AI analyzes data, patterns, and market conditions to give you actionable insights.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Make Better Decisions</h3>
              <p className="text-slate-600">
                Use AI recommendations to make informed trading decisions and reach your goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose MarketPulse AI?
            </h2>
            <p className="text-lg text-slate-600">
              Built for traders who want intelligence, not complexity
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">AI-Powered</h3>
              <p className="text-slate-600 text-sm">Advanced AI analyzes markets 24/7</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Beginner-Friendly</h3>
              <p className="text-slate-600 text-sm">No complex charts or technical jargon</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Real-Time</h3>
              <p className="text-slate-600 text-sm">Instant insights and updates</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Goal-Oriented</h3>
              <p className="text-slate-600 text-sm">Helps you reach your investment goals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-slate-600">
              Join thousands of traders who trust MarketPulse AI
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-slate-600 mb-4">
                "Finally, a trading platform that speaks my language. The AI explains everything in simple terms."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-bold text-blue-600">S</span>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Sarah M.</div>
                  <div className="text-sm text-slate-500">New Trader</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-slate-600 mb-4">
                "The AI portfolio dashboard helped me track my progress from $1000 to $4000 in just 6 months!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-bold text-green-600">M</span>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Mike R.</div>
                  <div className="text-sm text-slate-500">Goal Achiever</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-slate-600 mb-4">
                "The chart analysis feature is incredible. It explains patterns I never understood before."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-bold text-purple-600">A</span>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Alex K.</div>
                  <div className="text-sm text-slate-500">Chart Enthusiast</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Trade with AI?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of traders who are already using AI to make smarter decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/" 
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-lg"
              >
                <Zap className="w-5 h-5" />
                <span>Start Free Trial</span>
              </Link>
              <button className="inline-flex items-center space-x-2 px-8 py-4 bg-blue-500/20 text-white font-medium rounded-lg border border-blue-400 hover:bg-blue-500/30 transition-all duration-200">
                <Bot className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductIntroPage

