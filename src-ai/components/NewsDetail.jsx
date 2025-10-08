import React from 'react'
import { X, ExternalLink, Calendar, User, Tag } from 'lucide-react'

const NewsDetail = ({ article, isOpen, onClose }) => {
  if (!isOpen || !article) return null

  const handleExternalLink = () => {
    if (article.url && article.url !== '#') {
      window.open(article.url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Tag className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">News Article</h2>
              <p className="text-sm text-gray-600">{article.source}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Article Image */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img 
            src={article.image || '/placeholder-news.jpg'} 
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = '/placeholder-news.jpg'
            }}
          />
          {article.sentiment && (
            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
              article.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
              article.sentiment === 'negative' ? 'bg-red-100 text-red-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {article.sentiment}
            </div>
          )}
        </div>

        {/* Article Content */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(article.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
            {article.author && (
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
            )}
          </div>

          {article.description && (
            <div className="prose max-w-none mb-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                {article.description}
              </p>
            </div>
          )}

          {/* Article Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Tag className="w-4 h-4" />
                <span>Financial News</span>
              </div>
              {article.sentiment && (
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  article.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
                  article.sentiment === 'negative' ? 'bg-red-100 text-red-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {article.sentiment} sentiment
                </div>
              )}
            </div>
            
            {article.url && article.url !== '#' && (
              <button
                onClick={handleExternalLink}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Read Full Article</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsDetail
