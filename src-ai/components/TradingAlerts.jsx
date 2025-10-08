import React, { useState, useEffect } from 'react'
import { Bell, Plus, Trash2, TrendingUp, TrendingDown, DollarSign, AlertCircle } from 'lucide-react'
import useMarketDataStore from '../store/marketDataStore'

const TradingAlerts = ({ isOpen, onClose }) => {
  const { stockPrices, fetchStockPrice } = useMarketDataStore()
  const [alerts, setAlerts] = useState([])
  const [showAddAlert, setShowAddAlert] = useState(false)
  const [newAlert, setNewAlert] = useState({
    symbol: '',
    type: 'price_above',
    value: '',
    enabled: true
  })

  // Mock alerts data (in real app, this would come from backend)
  const mockAlerts = [
    {
      id: 1,
      symbol: 'AAPL',
      type: 'price_above',
      value: 180.00,
      currentPrice: 0, // Will be updated with real data
      enabled: true,
      createdAt: new Date(Date.now() - 86400000)
    },
    {
      id: 2,
      symbol: 'TSLA',
      type: 'price_below',
      value: 200.00,
      currentPrice: 0, // Will be updated with real data
      enabled: true,
      createdAt: new Date(Date.now() - 172800000)
    },
    {
      id: 3,
      symbol: 'MSFT',
      type: 'price_above',
      value: 400.00,
      currentPrice: 0, // Will be updated with real data
      enabled: false,
      createdAt: new Date(Date.now() - 259200000)
    }
  ]

  useEffect(() => {
    if (isOpen) {
      // Load alerts with real data
      const loadAlertsWithRealData = async () => {
        try {
          const alertsWithRealData = await Promise.all(
            mockAlerts.map(async (alert) => {
              try {
                const realData = await fetchStockPrice(alert.symbol)
                return {
                  ...alert,
                  currentPrice: realData.price || alert.currentPrice
                }
              } catch (error) {
                console.error(`Failed to fetch real data for ${alert.symbol}:`, error)
                return alert
              }
            })
          )
          setAlerts(alertsWithRealData)
        } catch (error) {
          console.error('Failed to load alerts with real data:', error)
          setAlerts(mockAlerts)
        }
      }
      
      loadAlertsWithRealData()
    }
  }, [isOpen, fetchStockPrice])

  const handleAddAlert = (e) => {
    e.preventDefault()
    const alert = {
      id: Date.now(),
      ...newAlert,
      value: parseFloat(newAlert.value),
      currentPrice: stockPrices[newAlert.symbol]?.price || 0,
      createdAt: new Date()
    }
    setAlerts(prev => [alert, ...prev])
    setNewAlert({ symbol: '', type: 'price_above', value: '', enabled: true })
    setShowAddAlert(false)
  }

  const handleDeleteAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id))
  }

  const handleToggleAlert = (id) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, enabled: !alert.enabled } : alert
    ))
  }

  const getAlertStatus = (alert) => {
    if (!alert.enabled) return 'disabled'
    if (alert.type === 'price_above' && alert.currentPrice >= alert.value) return 'triggered'
    if (alert.type === 'price_below' && alert.currentPrice <= alert.value) return 'triggered'
    return 'active'
  }

  const getAlertIcon = (alert) => {
    const status = getAlertStatus(alert)
    if (status === 'triggered') return <AlertCircle className="w-5 h-5 text-red-500" />
    if (status === 'disabled') return <Bell className="w-5 h-5 text-gray-400" />
    return <Bell className="w-5 h-5 text-blue-500" />
  }

  const getAlertColor = (alert) => {
    const status = getAlertStatus(alert)
    if (status === 'triggered') return 'bg-red-50 border-red-200'
    if (status === 'disabled') return 'bg-gray-50 border-gray-200'
    return 'bg-blue-50 border-blue-200'
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Trading Alerts</h2>
            <p className="text-sm text-gray-600 mt-1">Set up price alerts and notifications</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowAddAlert(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Alert</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Add Alert Form */}
        {showAddAlert && (
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Alert</h3>
            <form onSubmit={handleAddAlert} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Symbol</label>
                <input
                  type="text"
                  value={newAlert.symbol}
                  onChange={(e) => setNewAlert(prev => ({ ...prev, symbol: e.target.value.toUpperCase() }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., AAPL"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={newAlert.type}
                  onChange={(e) => setNewAlert(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="price_above">Price Above</option>
                  <option value="price_below">Price Below</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={newAlert.value}
                  onChange={(e) => setNewAlert(prev => ({ ...prev, value: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="flex items-end space-x-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddAlert(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Alerts List */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Alerts</h3>
          <div className="space-y-3">
            {alerts.map((alert) => {
              const status = getAlertStatus(alert)
              const isTriggered = status === 'triggered'
              
              return (
                <div key={alert.id} className={`p-4 rounded-lg border ${getAlertColor(alert)}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getAlertIcon(alert)}
                      <div>
                        <div className="font-semibold text-gray-900">{alert.symbol}</div>
                        <div className="text-sm text-gray-600">
                          {alert.type === 'price_above' ? 'Price above' : 'Price below'} ${alert.value.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">${alert.currentPrice.toFixed(2)}</div>
                        <div className={`text-sm ${isTriggered ? 'text-red-600' : 'text-gray-600'}`}>
                          {isTriggered ? 'Triggered' : 'Active'}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleToggleAlert(alert.id)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            alert.enabled 
                              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {alert.enabled ? 'Enabled' : 'Disabled'}
                        </button>
                        
                        <button
                          onClick={() => handleDeleteAlert(alert.id)}
                          className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {isTriggered && (
                    <div className="mt-3 p-3 bg-red-100 border border-red-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-medium text-red-800">
                          Alert triggered! {alert.symbol} is now ${alert.currentPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TradingAlerts
