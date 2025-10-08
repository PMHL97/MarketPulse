import React from 'react'
import { X, ExternalLink, Calendar, User, Tag, ArrowLeft } from 'lucide-react'

const NewsDetailView = ({ article, onClose }) => {
  if (!article) return null

  const handleExternalLink = () => {
    if (article.url && article.url !== '#') {
      window.open(article.url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="h-full bg-white border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-3">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">News Article</h2>
            <p className="text-sm text-gray-600">{article.source}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Article Image */}
      <div className="relative h-64 overflow-hidden">
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
      <div className="flex-1 overflow-y-auto p-6">
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
            <p className="text-gray-700 leading-relaxed text-base">
              {article.description}
            </p>
          </div>
        )}

        {/* Full Article Content */}
        {article.content && (
          <div className="prose max-w-none mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Full Article</h3>
            <div 
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: article.content.replace(/\[.*?\]/g, '').replace(/<[^>]*>/g, '') 
              }}
            />
          </div>
        )}

        {/* Fallback content if no full content available */}
        {!article.content && (
          <div className="prose max-w-none mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Article Summary</h3>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p className="text-lg">
                {article.description || article.title}
              </p>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <p className="text-blue-800">
                  <strong>Note:</strong> This is a summary of the article. For the complete story, please click "Read Full Article" below to visit the original source.
                </p>
              </div>
              
              <div className="space-y-4">
                <p>
                  This article covers important developments in the financial markets that are relevant to investors and market participants. The information provided here is based on the latest available data and market analysis.
                </p>
                
                <p>
                  Market conditions continue to evolve, and it's important for investors to stay informed about the latest developments. This story highlights key trends and potential implications for various market sectors.
                </p>
                
                <p>
                  For comprehensive coverage and detailed analysis, readers are encouraged to access the full article through the original source link provided below.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Article Tags */}
        <div className="flex items-center space-x-4 mb-6">
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
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        {article.url && article.url !== '#' && (
          <button
            onClick={handleExternalLink}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Read Full Article</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default NewsDetailView
