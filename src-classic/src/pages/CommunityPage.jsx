import React, { useState, useEffect } from 'react'
import { 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  MessageCircle, 
  ThumbsUp, 
  Share2, 
  Bookmark,
  Clock,
  Eye,
  Star,
  Plus,
  BarChart3,
  Globe,
  Zap,
  Play,
  FileText,
  Award,
  Heart,
  X
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import AuthModal from '../components/AuthModal'

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('ideas')
  const [searchTerm, setSearchTerm] = useState('')
  const [showIdeaModal, setShowIdeaModal] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [likedIdeas, setLikedIdeas] = useState(new Set())
  const [bookmarkedIdeas, setBookmarkedIdeas] = useState(new Set())
  const [filteredIdeas, setFilteredIdeas] = useState([])
  const [ideaForm, setIdeaForm] = useState({
    title: '',
    symbol: '',
    direction: 'long',
    description: '',
    tags: ''
  })
  const [isSubmittingIdea, setIsSubmittingIdea] = useState(false)
  
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()

  // Filter ideas based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = tradingIdeas.filter(idea =>
        idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      setFilteredIdeas(filtered)
    } else {
      setFilteredIdeas(tradingIdeas)
    }
  }, [searchTerm])

  // Initialize filtered ideas
  useEffect(() => {
    setFilteredIdeas(tradingIdeas)
  }, [])

  // Handle like/unlike
  const handleLike = (ideaId) => {
    if (!isAuthenticated) {
      // Show login modal
      setShowAuthModal(true)
      return
    }
    
    setLikedIdeas(prev => {
      const newSet = new Set(prev)
      if (newSet.has(ideaId)) {
        newSet.delete(ideaId)
      } else {
        newSet.add(ideaId)
      }
      return newSet
    })
  }

  // Handle bookmark/unbookmark
  const handleBookmark = (ideaId) => {
    if (!isAuthenticated) {
      // Show login modal
      setShowAuthModal(true)
      return
    }
    
    setBookmarkedIdeas(prev => {
      const newSet = new Set(prev)
      if (newSet.has(ideaId)) {
        newSet.delete(ideaId)
        // TODO: Remove from user's bookmarked ideas via API
        console.log('Removed bookmark for idea:', ideaId)
      } else {
        newSet.add(ideaId)
        // TODO: Add to user's bookmarked ideas via API
        console.log('Added bookmark for idea:', ideaId)
      }
      return newSet
    })
  }

  // Handle share
  const handleShare = (idea) => {
    if (navigator.share) {
      navigator.share({
        title: idea.title,
        text: idea.excerpt,
        url: window.location.href
      })
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(`${idea.title} - ${window.location.href}`)
        .then(() => {
          // Show success message
          console.log('Idea shared to clipboard')
        })
        .catch(err => {
          console.error('Failed to copy to clipboard:', err)
        })
    }
  }

  // Handle idea submission
  const handleSubmitIdea = async (e) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }

    setIsSubmittingIdea(true)
    
    try {
      // TODO: Submit idea to backend API
      const ideaData = {
        ...ideaForm,
        tags: ideaForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        author: {
          name: user?.name || 'Anonymous',
          avatar: user?.name?.substring(0, 2).toUpperCase() || 'AN',
          verified: false,
          followers: '0'
        },
        timeAgo: 'Just now',
        views: '0',
        likes: 0,
        comments: 0
      }
      
      console.log('Submitting idea:', ideaData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Add to local state (in real app, this would come from API response)
      const newIdea = {
        id: Date.now(),
        ...ideaData
      }
      
      setFilteredIdeas(prev => [newIdea, ...prev])
      setShowIdeaModal(false)
      setIdeaForm({
        title: '',
        symbol: '',
        direction: 'long',
        description: '',
        tags: ''
      })
      
      // Show success message
      console.log('Idea submitted successfully!')
      
    } catch (error) {
      console.error('Error submitting idea:', error)
      // Show error message
    } finally {
      setIsSubmittingIdea(false)
    }
  }

  // Handle form input changes
  const handleFormChange = (field, value) => {
    setIdeaForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const tabs = [
    { id: 'ideas', name: 'Trading Ideas', icon: TrendingUp },
    { id: 'education', name: 'Education', icon: Bookmark },
    { id: 'editors', name: "Editors' Picks", icon: Star },
    { id: 'social', name: 'Social Feed', icon: Users },
  ]

  const tradingIdeas = [
    {
      id: 1,
      title: "Don't Be the Exit Liquidity: The Truth About IPOs",
      author: {
        name: "PineCoders",
        avatar: "PC",
        verified: true,
        followers: "12.5k"
      },
      symbol: "INDEX:BTCUSD",
      direction: "long",
      timeAgo: "2 hours ago",
      views: "1.2k",
      likes: 45,
      comments: 12,
      excerpt: "Picture this: a company wants to go public. They don't just toss shares on the market like a garage sale. No. The sequence is distinct. First, the company sits down with the sharpest pencils on Wall Street—the underwriters...",
      tags: ["IPO", "Education", "Bitcoin"]
    },
    {
      id: 2,
      title: "Bubble, No Bubble: Stocks Are So Back After Powell Cranks It Up",
      author: {
        name: "litwizard",
        avatar: "LW",
        verified: false,
        followers: "8.9k"
      },
      symbol: "NYSE:ARX",
      direction: "short",
      timeAgo: "4 hours ago",
      views: "856",
      likes: 32,
      comments: 8,
      excerpt: "Stretched valuations, talks of froth, and overall market fatigue. That's what investors were saying for stocks (especially those AI plays) up until Powell brought up the vibe that rekindled the animal spirits...",
      tags: ["Federal Reserve", "AI", "Market Analysis"]
    },
    {
      id: 3,
      title: "Amazon Chart Check - Weekly Analysis",
      author: {
        name: "Market Pulse",
        avatar: "TV",
        verified: true,
        followers: "2.1M"
      },
      symbol: "NASDAQ:AMZN",
      direction: "neutral",
      timeAgo: "6 hours ago",
      views: "2.1k",
      likes: 67,
      comments: 23,
      excerpt: "On the weekly chart, Amazon looks like it's starting to tire a bit. Price is struggling just under that January high near 24,252. Looking at the Ichimoku Cloud: In mid-2023, price broke strongly above the cloud...",
      tags: ["Technical Analysis", "Amazon", "Ichimoku"]
    }
  ]

  const topTraders = [
    { name: "PineCoders", followers: "12.5k", ideas: 156, verified: true, avatar: "PC" },
    { name: "litwizard", followers: "8.9k", ideas: 89, verified: false, avatar: "LW" },
    { name: "TraderTilki", followers: "15.2k", ideas: 234, verified: true, avatar: "TT" },
    { name: "FOREXcom", followers: "6.7k", ideas: 67, verified: true, avatar: "FC" },
    { name: "TradeStation", followers: "9.3k", ideas: 123, verified: true, avatar: "TS" },
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

  const IdeaCard = ({ idea }) => (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-primary-600">{idea.author.avatar}</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-secondary-900">{idea.author.name}</span>
              {idea.author.verified && (
                <span className="text-primary-600">
                  <Star className="w-4 h-4" />
                </span>
              )}
            </div>
            <div className="text-sm text-secondary-500">{idea.author.followers} followers</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getDirectionColor(idea.direction)}`}>
            {getDirectionIcon(idea.direction)}
            <span className="capitalize">{idea.direction}</span>
          </span>
          <div className="text-sm text-secondary-500">
            <Clock className="w-3 h-3 inline mr-1" />
            {idea.timeAgo}
          </div>
        </div>
      </div>

      {/* Symbol */}
      <div className="text-sm font-mono text-primary-600 mb-3">
        {idea.symbol}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-secondary-900 mb-3 hover:text-primary-600 transition-colors cursor-pointer">
        {idea.title}
      </h3>

      {/* Excerpt */}
      <p className="text-secondary-600 text-sm mb-4 leading-relaxed">
        {idea.excerpt}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {idea.tags.map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-secondary-100 text-secondary-600 text-xs rounded-full">
            {tag}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-secondary-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>{idea.views}</span>
          </div>
          <button 
            onClick={() => handleLike(idea.id)}
            className={`flex items-center space-x-1 transition-colors ${
              likedIdeas.has(idea.id) ? 'text-primary-600' : 'text-secondary-500 hover:text-primary-600'
            }`}
          >
            <Heart className={`w-4 h-4 ${likedIdeas.has(idea.id) ? 'fill-current' : ''}`} />
            <span>{idea.likes + (likedIdeas.has(idea.id) ? 1 : 0)}</span>
          </button>
          <div className="flex items-center space-x-1">
            <MessageCircle className="w-4 h-4" />
            <span>{idea.comments}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => handleBookmark(idea.id)}
            className={`p-1 transition-colors ${
              bookmarkedIdeas.has(idea.id) ? 'text-warning' : 'text-secondary-400 hover:text-warning'
            }`}
            title={bookmarkedIdeas.has(idea.id) ? 'Remove bookmark' : 'Bookmark'}
          >
            <Bookmark className={`w-4 h-4 ${bookmarkedIdeas.has(idea.id) ? 'fill-current' : ''}`} />
          </button>
          <button 
            onClick={() => handleShare(idea)}
            className="p-1 text-secondary-400 hover:text-secondary-600 transition-colors"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )

  const TopTradersCard = () => (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
      <h3 className="text-lg font-semibold text-secondary-900 mb-4">Top Traders</h3>
      <div className="space-y-3">
        {topTraders.map((trader, index) => (
          <div key={index} className="flex items-center justify-between p-3 hover:bg-secondary-50 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-primary-600">{trader.avatar}</span>
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <span className="font-medium text-secondary-900">{trader.name}</span>
                  {trader.verified && (
                    <Star className="w-3 h-3 text-primary-600" />
                  )}
                </div>
                <div className="text-xs text-secondary-500">{trader.followers} followers</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-secondary-900">{trader.ideas}</div>
              <div className="text-xs text-secondary-500">ideas</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Community</h1>
          <p className="text-secondary-600">Connect with traders, share ideas, and learn from the community</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search ideas, traders, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <button className="btn-secondary flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            <button 
              onClick={() => setShowIdeaModal(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Share Idea</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-2 mb-8">
          <nav className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {activeTab === 'ideas' && (
              <div className="space-y-6">
                {filteredIdeas.map((idea) => (
                  <IdeaCard key={idea.id} idea={idea} />
                ))}
                {filteredIdeas.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-secondary-400 mb-4">
                      <TrendingUp className="w-16 h-16 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-secondary-900 mb-2">No ideas found</h3>
                    <p className="text-secondary-600">Try adjusting your search or filters</p>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'education' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
                  <h2 className="text-xl font-semibold text-secondary-900 mb-4">Educational Content</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-secondary-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                          <Play className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-secondary-900">Trading Basics</h3>
                          <p className="text-sm text-secondary-500">Learn the fundamentals</p>
                        </div>
                      </div>
                      <p className="text-secondary-600 text-sm mb-3">
                        Master the essential concepts of trading, from market analysis to risk management.
                      </p>
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Start Learning →
                      </button>
                    </div>
                    
                    <div className="border border-secondary-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                          <BarChart3 className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-secondary-900">Technical Analysis</h3>
                          <p className="text-sm text-secondary-500">Chart patterns & indicators</p>
                        </div>
                      </div>
                      <p className="text-secondary-600 text-sm mb-3">
                        Understand chart patterns, technical indicators, and how to use them effectively.
                      </p>
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Start Learning →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'editors' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Award className="w-6 h-6 text-warning" />
                    <h2 className="text-xl font-semibold text-secondary-900">Editors' Picks</h2>
                  </div>
                  <div className="space-y-4">
                    {tradingIdeas.slice(0, 3).map((idea) => (
                      <div key={idea.id} className="border border-secondary-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-1 bg-warning/10 text-warning text-xs rounded-full">Editor's Pick</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getDirectionColor(idea.direction)}`}>
                              {getDirectionIcon(idea.direction)}
                              <span className="capitalize">{idea.direction}</span>
                            </span>
                          </div>
                          <div className="text-sm text-secondary-500">
                            <Clock className="w-3 h-3 inline mr-1" />
                            {idea.timeAgo}
                          </div>
                        </div>
                        <h3 className="font-semibold text-secondary-900 mb-2">{idea.title}</h3>
                        <p className="text-secondary-600 text-sm mb-3">{idea.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-secondary-500">
                            by <span className="font-medium text-secondary-700">{idea.author.name}</span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-secondary-500">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{idea.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <ThumbsUp className="w-4 h-4" />
                              <span>{idea.likes}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'social' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
                  <h2 className="text-xl font-semibold text-secondary-900 mb-4">Social Feed</h2>
                  <div className="space-y-4">
                    <div className="border border-secondary-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-primary-600">MP</span>
                        </div>
                        <div>
                          <div className="font-medium text-secondary-900">Market Pulse</div>
                          <div className="text-sm text-secondary-500">2 hours ago</div>
                        </div>
                      </div>
                      <p className="text-secondary-700 mb-3">
                        📈 Market update: Tech stocks showing strong momentum today. AAPL, MSFT, and NVDA leading the charge. 
                        What's your take on the current market sentiment?
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-secondary-500">
                        <button className="flex items-center space-x-1 hover:text-primary-600">
                          <Heart className="w-4 h-4" />
                          <span>24</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-primary-600">
                          <MessageCircle className="w-4 h-4" />
                          <span>8</span>
                        </button>
                        <button className="hover:text-primary-600">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="border border-secondary-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-primary-600">TT</span>
                        </div>
                        <div>
                          <div className="font-medium text-secondary-900">TraderTilki</div>
                          <div className="text-sm text-secondary-500">4 hours ago</div>
                        </div>
                      </div>
                      <p className="text-secondary-700 mb-3">
                        Just closed a profitable position on TSLA. The breakout above $240 was exactly what I was waiting for. 
                        Remember: patience is key in trading! 🚀
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-secondary-500">
                        <button className="flex items-center space-x-1 hover:text-primary-600">
                          <Heart className="w-4 h-4" />
                          <span>42</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-primary-600">
                          <MessageCircle className="w-4 h-4" />
                          <span>15</span>
                        </button>
                        <button className="hover:text-primary-600">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <TopTradersCard />
            
            <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full p-3 bg-primary-50 border border-primary-200 rounded-lg hover:bg-primary-100 transition-colors text-left">
                  <BarChart3 className="w-5 h-5 text-primary-600 mb-2" />
                  <div className="font-medium text-primary-900">Create Chart</div>
                  <div className="text-sm text-primary-600">Start analyzing</div>
                </button>
                <button className="w-full p-3 bg-secondary-50 border border-secondary-200 rounded-lg hover:bg-secondary-100 transition-colors text-left">
                  <Users className="w-5 h-5 text-secondary-600 mb-2" />
                  <div className="font-medium text-secondary-900">Find Traders</div>
                  <div className="text-sm text-secondary-600">Connect with experts</div>
                </button>
                <button className="w-full p-3 bg-secondary-50 border border-secondary-200 rounded-lg hover:bg-secondary-100 transition-colors text-left">
                  <Bookmark className="w-5 h-5 text-secondary-600 mb-2" />
                  <div className="font-medium text-secondary-900">Learn</div>
                  <div className="text-sm text-secondary-600">Educational resources</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Idea Creation Modal */}
      {showIdeaModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-secondary-200">
              <h2 className="text-xl font-semibold text-secondary-900">Share Your Trading Idea</h2>
              <button
                onClick={() => setShowIdeaModal(false)}
                className="text-secondary-400 hover:text-secondary-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleSubmitIdea} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Title</label>
                  <input
                    type="text"
                    placeholder="Enter your trading idea title..."
                    value={ideaForm.title}
                    onChange={(e) => handleFormChange('title', e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Symbol</label>
                  <input
                    type="text"
                    placeholder="e.g., AAPL, TSLA, BTCUSD"
                    value={ideaForm.symbol}
                    onChange={(e) => handleFormChange('symbol', e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Direction</label>
                  <select 
                    value={ideaForm.direction}
                    onChange={(e) => handleFormChange('direction', e.target.value)}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="long">Long (Bullish)</option>
                    <option value="short">Short (Bearish)</option>
                    <option value="neutral">Neutral</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Description</label>
                  <textarea
                    rows={6}
                    placeholder="Describe your trading idea, analysis, and reasoning..."
                    value={ideaForm.description}
                    onChange={(e) => handleFormChange('description', e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Tags</label>
                  <input
                    type="text"
                    placeholder="e.g., Technical Analysis, Breakout, Support"
                    value={ideaForm.tags}
                    onChange={(e) => handleFormChange('tags', e.target.value)}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowIdeaModal(false)}
                    disabled={isSubmittingIdea}
                    className="px-4 py-2 text-secondary-600 hover:text-secondary-800 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingIdea}
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 flex items-center space-x-2"
                  >
                    {isSubmittingIdea && (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    )}
                    <span>{isSubmittingIdea ? 'Sharing...' : 'Share Idea'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          mode="login"
        />
      )}
    </div>
  )
}

export default CommunityPage
