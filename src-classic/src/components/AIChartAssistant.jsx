import React, { useState } from 'react'
import { 
  X, 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Target,
  BarChart3,
  Lightbulb,
  RefreshCw,
  Send,
  MessageCircle
} from 'lucide-react'

const AIChartAssistant = ({ symbol, onClose, insights }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: `I've analyzed ${symbol}'s chart. Here's what I found:`,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  // Mock AI responses for chart analysis
  const getAIResponse = (query) => {
    const lowerQuery = query.toLowerCase()
    
    if (lowerQuery.includes('pattern') || lowerQuery.includes('formation')) {
      return {
        content: `**Chart Pattern Analysis for ${symbol}**\n\n**Current Pattern**: ${insights?.analysis.pattern || 'Ascending Triangle'}\n\n**What this means**:\n• Price is consolidating between support and resistance\n• Each low is higher than the previous (bullish)\n• Volume is increasing on up moves\n• Breakout above resistance could target $190-200\n\n**Key Levels**:\n• Support: ${insights?.analysis.support || '$170-172'}\n• Resistance: ${insights?.analysis.resistance || '$185-190'}\n\n**Trading Strategy**:\n• Wait for breakout above resistance with volume\n• Set stop loss below support\n• Target 1: $190, Target 2: $200`,
        suggestions: ["What's the risk level?", "Show me similar patterns", "Set up alerts"]
      }
    }
    
    if (lowerQuery.includes('rsi') || lowerQuery.includes('momentum')) {
      return {
        content: `**RSI Analysis for ${symbol}**\n\n**Current RSI**: ${insights?.analysis.rsi || '58'}\n\n**Interpretation**:\n• RSI at 58 indicates healthy momentum\n• Not overbought (above 70) or oversold (below 30)\n• Suggests room for further upside\n• Bullish divergence possible if price makes new highs\n\n**RSI Levels**:\n• 0-30: Oversold (potential buy)\n• 30-70: Neutral (trend following)\n• 70-100: Overbought (potential sell)\n\n**Current Status**: Neutral with bullish bias`,
        suggestions: ["What about MACD?", "Show me other indicators", "Explain divergence"]
      }
    }
    
    if (lowerQuery.includes('support') || lowerQuery.includes('resistance')) {
      return {
        content: `**Support & Resistance Analysis for ${symbol}**\n\n**Key Support Levels**:\n• ${insights?.analysis.support || '$170-172'} - Strong support, tested multiple times\n• $165 - Previous resistance turned support\n• $160 - Major psychological level\n\n**Key Resistance Levels**:\n• ${insights?.analysis.resistance || '$185-190'} - Current resistance zone\n• $195 - Previous high\n• $200 - Round number resistance\n\n**Trading Strategy**:\n• Buy near support with tight stop loss\n• Sell near resistance or wait for breakout\n• Use volume confirmation for breakouts\n\n**Risk Management**:\n• Stop loss: 2-3% below support\n• Position size: 1-2% of portfolio`,
        suggestions: ["What's the breakout probability?", "Show me volume analysis", "Set up alerts"]
      }
    }
    
    if (lowerQuery.includes('volume') || lowerQuery.includes('volume analysis')) {
      return {
        content: `**Volume Analysis for ${symbol}**\n\n**Current Volume**: ${insights?.analysis.volume || 'Above average'}\n\n**Volume Patterns**:\n• Increasing volume on up moves (bullish)\n• Decreasing volume on down moves (bullish)\n• Volume spike on recent breakout attempt\n\n**Volume Indicators**:\n• On-Balance Volume (OBV): Rising\n• Volume Rate of Change: Positive\n• Accumulation/Distribution: Bullish\n\n**What this means**:\n• Institutional buying pressure\n• Smart money accumulating\n• Strong conviction in upward move\n\n**Trading Implication**:\n• High volume breakouts are more reliable\n• Low volume pullbacks are buying opportunities`,
        suggestions: ["What about volume profile?", "Show me institutional flow", "Explain OBV"]
      }
    }
    
    if (lowerQuery.includes('target') || lowerQuery.includes('price target')) {
      return {
        content: `**Price Targets for ${symbol}**\n\n**Technical Targets**:\n• Short-term: $185-190 (resistance breakout)\n• Medium-term: $200-210 (measured move)\n• Long-term: $230-250 (trend extension)\n\n**Target Calculation Methods**:\n• Pattern projection: $190-200\n• Fibonacci extension: $195-205\n• Moving average targets: $185, $200\n• Support/resistance levels: $190, $200, $210\n\n**Probability Assessment**:\n• $185-190: 75% probability\n• $200-210: 60% probability\n• $230+: 40% probability\n\n**Risk/Reward**:\n• Entry: $175\n• Stop: $168\n• Target: $190\n• R/R Ratio: 1:2.1 (Good)`,
        suggestions: ["What's the time frame?", "Show me risk analysis", "Set up alerts"]
      }
    }
    
    if (lowerQuery.includes('risk') || lowerQuery.includes('risk analysis')) {
      return {
        content: `**Risk Analysis for ${symbol}**\n\n**Current Risk Level**: Medium\n\n**Key Risk Factors**:\n• Market volatility (VIX at 18.5)\n• Earnings uncertainty\n• Sector rotation risk\n• Geopolitical concerns\n\n**Technical Risk**:\n• Support break could lead to $160-165\n• Volume divergence warning\n• Overbought conditions possible\n\n**Risk Management**:\n• Position size: 1-2% of portfolio\n• Stop loss: $168 (4% below current)\n• Diversification: Don't over-concentrate\n• Time horizon: 3-6 months\n\n**Risk/Reward Assessment**:\n• Upside: 15-20%\n• Downside: 8-10%\n• Risk/Reward: 1:1.5 to 1:2 (Acceptable)`,
        suggestions: ["What about portfolio risk?", "Show me hedging strategies", "Explain position sizing"]
      }
    }
    
    // Default response
    return {
      content: `I can help you analyze ${symbol}'s chart. Here are some things I can explain:\n\n• **Chart Patterns** - Identify formations and what they mean\n• **Technical Indicators** - RSI, MACD, Moving Averages\n• **Support & Resistance** - Key price levels to watch\n• **Volume Analysis** - What volume tells us about price moves\n• **Price Targets** - Where the stock might go next\n• **Risk Analysis** - Potential downsides and how to manage them\n\nTry asking:\n• "What pattern is this?"\n• "Explain the RSI"\n• "Show me support levels"\n• "What's the price target?"\n• "Analyze the risk"`,
      suggestions: ["Chart patterns", "Technical indicators", "Support levels", "Price targets"]
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = getAIResponse(inputValue)
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse.content,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions
      }
      
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-secondary-200 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <Brain className="w-6 h-6" />
            <div>
              <h2 className="text-xl font-bold">AI Chart Assistant</h2>
              <p className="text-sm opacity-90">Analyzing {symbol} - Ask me anything about this chart</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Chart Analysis Panel */}
          <div className="w-1/2 p-6 border-r border-secondary-200 overflow-y-auto">
            <h3 className="font-semibold text-secondary-900 mb-4">Chart Analysis</h3>
            
            {insights && (
              <div className="space-y-4">
                {/* Trend Analysis */}
                <div className="p-4 bg-success-50 rounded-lg border border-success-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-success-600" />
                    <h4 className="font-medium text-success-700">Trend Analysis</h4>
                  </div>
                  <div className="text-sm text-success-600">
                    <div>Trend: {insights.analysis.trend}</div>
                    <div>Strength: {insights.analysis.strength}%</div>
                    <div>Pattern: {insights.analysis.pattern}</div>
                  </div>
                </div>

                {/* Key Levels */}
                <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <BarChart3 className="w-5 h-5 text-primary-600" />
                    <h4 className="font-medium text-primary-700">Key Levels</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <div className="text-primary-600">Support</div>
                      <div className="font-medium">{insights.analysis.support}</div>
                    </div>
                    <div>
                      <div className="text-primary-600">Resistance</div>
                      <div className="font-medium">{insights.analysis.resistance}</div>
                    </div>
                  </div>
                </div>

                {/* Technical Indicators */}
                <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-5 h-5 text-warning-600" />
                    <h4 className="font-medium text-warning-700">Technical Indicators</h4>
                  </div>
                  <div className="text-sm text-warning-600 space-y-1">
                    <div>RSI: {insights.analysis.rsi}</div>
                    <div>MACD: {insights.analysis.macd}</div>
                    <div>Volume: {insights.analysis.volume}</div>
                  </div>
                </div>

                {/* AI Insights */}
                <div>
                  <h4 className="font-medium text-secondary-900 mb-3">AI Insights</h4>
                  <div className="space-y-2">
                    {insights.insights.map((insight, index) => (
                      <div key={index} className={`p-3 rounded-lg text-sm ${
                        insight.type === 'success' ? 'bg-success-50 text-success-700 border border-success-200' :
                        insight.type === 'warning' ? 'bg-warning-50 text-warning-700 border border-warning-200' :
                        'bg-primary-50 text-primary-700 border border-primary-200'
                      }`}>
                        <div className="font-medium">{insight.title}</div>
                        <div className="mt-1">{insight.message}</div>
                        <div className="text-xs mt-1 opacity-75">{insight.confidence}% confidence</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                {insights.recommendations && insights.recommendations.length > 0 && (
                  <div>
                    <h4 className="font-medium text-secondary-900 mb-3">Recommendations</h4>
                    <div className="space-y-2">
                      {insights.recommendations.map((rec, index) => (
                        <div key={index} className={`p-3 rounded-lg border-l-4 ${
                          rec.action === 'Buy' ? 'bg-success-50 border-success-500' :
                          rec.action === 'Sell' ? 'bg-danger-50 border-danger-500' :
                          'bg-warning-50 border-warning-500'
                        }`}>
                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              rec.action === 'Buy' ? 'bg-success-100 text-success-700' :
                              rec.action === 'Sell' ? 'bg-danger-100 text-danger-700' :
                              'bg-warning-100 text-warning-700'
                            }`}>
                              {rec.action}
                            </span>
                            <span className="text-xs text-secondary-500">{rec.confidence}% confidence</span>
                          </div>
                          <div className="text-sm mt-1">{rec.reason}</div>
                          <div className="text-xs text-secondary-600 mt-1">
                            Target: {rec.target} | Stop: {rec.stopLoss}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Chat Panel */}
          <div className="w-1/2 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user' 
                      ? 'bg-primary-100 text-primary-900' 
                      : 'bg-secondary-50 text-secondary-900'
                  }`}>
                    <div className="text-sm whitespace-pre-line">{message.content}</div>
                    <div className="text-xs opacity-60 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    
                    {/* Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-3 space-y-1">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="block w-full text-left text-xs bg-white hover:bg-primary-50 border border-secondary-200 rounded px-2 py-1 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-secondary-50 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-secondary-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about patterns, indicators, targets..."
                  className="flex-1 px-3 py-2 border border-secondary-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIChartAssistant

