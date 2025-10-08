import React from 'react'
import { Calendar, User, ArrowRight, TrendingUp, BarChart3, Globe } from 'lucide-react'

const BlogPage = () => {
  const blogPosts = [
    {
      title: 'Market Analysis: Tech Stocks Rally Continues',
      excerpt: 'A deep dive into the recent tech stock rally and what it means for investors.',
      author: 'Sarah Johnson',
      date: '2024-01-15',
      category: 'Market Analysis',
      readTime: '5 min read',
      image: '/api/placeholder/400/200'
    },
    {
      title: 'Understanding Cryptocurrency Volatility',
      excerpt: 'Exploring the factors that drive crypto market volatility and how to navigate it.',
      author: 'Mike Chen',
      date: '2024-01-12',
      category: 'Cryptocurrency',
      readTime: '7 min read',
      image: '/api/placeholder/400/200'
    },
    {
      title: 'Economic Calendar: Key Events This Week',
      excerpt: 'Important economic events and their potential impact on markets.',
      author: 'Emily Rodriguez',
      date: '2024-01-10',
      category: 'Economic News',
      readTime: '4 min read',
      image: '/api/placeholder/400/200'
    }
  ]

  const categories = [
    { name: 'Market Analysis', icon: TrendingUp, count: 24 },
    { name: 'Technical Analysis', icon: BarChart3, count: 18 },
    { name: 'Economic News', icon: Globe, count: 15 },
    { name: 'Cryptocurrency', icon: TrendingUp, count: 12 }
  ]

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">Market Pulse Blog</h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Stay informed with the latest market insights, analysis, and trading strategies
          </p>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6">Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <div key={index} className="bg-white rounded-lg border border-secondary-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="text-primary-600">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900">{category.name}</h3>
                      <p className="text-sm text-secondary-600">{category.count} articles</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Featured Posts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <article key={index} className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-secondary-200 flex items-center justify-center">
                  <div className="text-secondary-400">
                    <BarChart3 className="w-12 h-12 mx-auto" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-secondary-500">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-secondary-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-secondary-500">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-secondary-500">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">Stay Updated</h2>
          <p className="text-secondary-600 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest market insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-8 bg-primary-50 border border-primary-200 rounded-lg p-6 text-center">
          <BarChart3 className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-primary-900 mb-2">Blog Coming Soon</h3>
          <p className="text-primary-700 mb-4">
            We're working on creating valuable content for traders and investors. 
            Sign up to be notified when we publish our first articles.
          </p>
          <button className="inline-flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Get Notified
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlogPage

