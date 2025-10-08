import React, { useState, useEffect } from 'react'
import { 
  Bell,
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Check,
  X,
  Settings,
  Filter,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Star,
  Clock,
  DollarSign,
  Percent
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import AuthModal from '../components/AuthModal'

const AlertsPage = () => {
  const [activeTab, setActiveTab] = useState('price')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [alerts, setAlerts] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    symbol: ''
  })
  
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()

  // Mock alerts data
  const mockAlerts = [
    {
      id: 1,
      type: 'price',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      condition: 'above',
      value: 180.00,
      currentPrice: 178.23,
      status: 'active',
      created: '2024-01-15T10:30:00Z',
      triggered: null,
      description: 'Price alert for AAPL above $180'
    },
    {
      id: 2,
      type: 'price',
      symbol: 'TSLA',
      name: 'Tesla, Inc.',
      condition: 'below',
      value: 200.00,
      currentPrice: 234.56,
      status: 'active',
      created: '2024-01-14T14:20:00Z',
      triggered: null,
      description: 'Price alert for TSLA below $200'
    },
    {
      id: 3,
      type: 'volume',
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      condition: 'above',
      value: 50000000,
      currentPrice: 168.45,
      status: 'triggered',
      created: '2024-01-13T09:15:00Z',
      triggered: '2024-01-15T11:45:00Z',
      description: 'Volume alert for NVDA above 50M'
    },
    {
      id: 4,
      type: 'news',
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      condition: 'contains',
      value: 'earnings',
      currentPrice: 378.45,
      status: 'active',
      created: '2024-01-12T16:00:00Z',
      triggered: null,
      description: 'News alert for MSFT containing "earnings"'
    },
    {
      id: 5,
      type: 'price',
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      condition: 'above',
      value: 150.00,
      currentPrice: 145.67,
      status: 'paused',
      created: '2024-01-11T12:30:00Z',
      triggered: null,
      description: 'Price alert for GOOGL above $150'
    }
  ]

  // Load alerts data
  const loadAlerts = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setAlerts(mockAlerts)
    } catch (error) {
      console.error('Error loading alerts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Load alerts on component mount
  useEffect(() => {
    loadAlerts()
  }, [])

  // Handle create alert
  const handleCreateAlert = (alertData) => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }
    
    const newAlert = {
      id: Date.now(),
      ...alertData,
      status: 'active',
      created: new Date().toISOString(),
      triggered: null
    }
    
    setAlerts(prev => [newAlert, ...prev])
    setShowCreateModal(false)
  }

  // Handle delete alert
  const handleDeleteAlert = (alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId))
  }

  // Handle toggle alert status
  const handleToggleAlert = (alertId) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: alert.status === 'active' ? 'paused' : 'active' }
        : alert
    ))
  }

  // Handle view chart
  const handleViewChart = (symbol) => {
    navigate(`/charts?symbol=${symbol}`)
  }

  const alertTypes = [
    { id: 'price', name: 'Price Alerts', icon: DollarSign, description: 'Price movement alerts' },
    { id: 'volume', name: 'Volume Alerts', icon: BarChart3, description: 'Volume spike alerts' },
    { id: 'news', name: 'News Alerts', icon: Bell, description: 'News and sentiment alerts' },
    { id: 'technical', name: 'Technical Alerts', icon: TrendingUp, description: 'Technical indicator alerts' }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10 border-success/20'
      case 'triggered': return 'text-warning bg-warning/10 border-warning/20'
      case 'paused': return 'text-secondary-600 bg-secondary-100 border-secondary-200'
      default: return 'text-secondary-600 bg-secondary-100 border-secondary-200'
    }
  }

  const getConditionIcon = (condition) => {
    switch (condition) {
      case 'above': return <TrendingUp className="w-4 h-4 text-success" />
      case 'below': return <TrendingDown className="w-4 h-4 text-danger" />
      case 'contains': return <AlertTriangle className="w-4 h-4 text-warning" />
      default: return <AlertTriangle className="w-4 h-4 text-secondary-500" />
    }
  }

  const AlertCard = ({ alert }) => (
    <div className="bg-white border border-secondary-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {getConditionIcon(alert.condition)}
            <div>
              <div className="font-mono font-semibold text-secondary-900">{alert.symbol}</div>
              <div className="text-sm text-secondary-600">{alert.name}</div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(alert.status)}`}>
            {alert.status.toUpperCase()}
          </span>
          <button 
            onClick={() => handleToggleAlert(alert.id)}
            className="p-1 text-secondary-400 hover:text-secondary-600 transition-colors"
            title={alert.status === 'active' ? 'Pause alert' : 'Activate alert'}
          >
            {alert.status === 'active' ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
          </button>
        </div>
      </div>
      
      <div className="mb-3">
        <p className="text-sm text-secondary-700">{alert.description}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
        <div>
          <span className="text-secondary-500">Current Price:</span>
          <div className="font-semibold text-secondary-900">
            ${typeof alert.currentPrice === 'number' ? alert.currentPrice.toFixed(2) : alert.currentPrice}
          </div>
        </div>
        <div>
          <span className="text-secondary-500">Alert Value:</span>
          <div className="font-semibold text-secondary-900">
            {alert.type === 'price' ? '$' : ''}{alert.value}
            {alert.type === 'volume' ? ' shares' : ''}
          </div>
        </div>
        <div>
          <span className="text-secondary-500">Created:</span>
          <div className="text-secondary-700">
            {new Date(alert.created).toLocaleDateString()}
          </div>
        </div>
        {alert.triggered && (
          <div>
            <span className="text-secondary-500">Triggered:</span>
            <div className="text-warning-600">
              {new Date(alert.triggered).toLocaleDateString()}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <button 
            onClick={() => handleViewChart(alert.symbol)}
            className="p-2 text-secondary-400 hover:text-primary-600 transition-colors"
            title="View chart"
          >
            <BarChart3 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleViewChart(alert.symbol)}
            className="p-2 text-secondary-400 hover:text-primary-600 transition-colors"
            title="View details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => {/* TODO: Edit alert */}}
            className="p-2 text-secondary-400 hover:text-primary-600 transition-colors"
            title="Edit alert"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleDeleteAlert(alert.id)}
            className="p-2 text-secondary-400 hover:text-danger transition-colors"
            title="Delete alert"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )

  const CreateAlertModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-secondary-200">
          <h2 className="text-xl font-semibold text-secondary-900">Create New Alert</h2>
          <button
            onClick={() => setShowCreateModal(false)}
            className="text-secondary-400 hover:text-secondary-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <form onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.target)
            handleCreateAlert({
              type: formData.get('type'),
              symbol: formData.get('symbol'),
              name: formData.get('name'),
              condition: formData.get('condition'),
              value: formData.get('value'),
              currentPrice: parseFloat(formData.get('currentPrice')),
              description: formData.get('description')
            })
          }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Alert Type</label>
              <select
                name="type"
                required
                className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="price">Price Alert</option>
                <option value="volume">Volume Alert</option>
                <option value="news">News Alert</option>
                <option value="technical">Technical Alert</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Symbol</label>
              <input
                type="text"
                name="symbol"
                placeholder="e.g., AAPL"
                required
                className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Company Name</label>
              <input
                type="text"
                name="name"
                placeholder="e.g., Apple Inc."
                required
                className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Condition</label>
              <select
                name="condition"
                required
                className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="above">Above</option>
                <option value="below">Below</option>
                <option value="contains">Contains</option>
                <option value="equals">Equals</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Value</label>
              <input
                type="text"
                name="value"
                placeholder="e.g., 180.00"
                required
                className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Current Price</label>
              <input
                type="number"
                name="currentPrice"
                step="0.01"
                placeholder="e.g., 178.23"
                required
                className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Description</label>
              <textarea
                name="description"
                rows={3}
                placeholder="Optional description..."
                className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-secondary-600 hover:text-secondary-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Create Alert
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Alerts</h1>
          <p className="text-secondary-600">Manage your price, volume, and news alerts</p>
        </div>

        {/* Alert Type Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-2 mb-8">
          <div className="flex space-x-1">
            {alertTypes.map((type) => {
              const Icon = type.icon
              return (
                <button
                  key={type.id}
                  onClick={() => setActiveTab(type.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === type.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{type.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="flex items-center space-x-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                    className="px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="triggered">Triggered</option>
                    <option value="paused">Paused</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Symbol</label>
                  <input
                    type="text"
                    placeholder="Filter by symbol..."
                    value={filters.symbol}
                    onChange={(e) => setFilters({...filters, symbol: e.target.value})}
                    className="px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="btn-secondary flex items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>More Filters</span>
                {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              <button 
                onClick={loadAlerts}
                disabled={isLoading}
                className="btn-primary flex items-center space-x-2"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create Alert</span>
              </button>
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-secondary-900">
              {alertTypes.find(t => t.id === activeTab)?.name}
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-secondary-600">
                {alerts.filter(alert => alert.type === activeTab).length} alerts
              </span>
              <button className="p-2 text-secondary-400 hover:text-secondary-600">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
                <p className="text-secondary-600">Loading alerts...</p>
              </div>
            </div>
          ) : alerts.filter(alert => alert.type === activeTab).length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {alerts
                .filter(alert => alert.type === activeTab)
                .map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-secondary-400 mb-4">
                <Bell className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-secondary-900 mb-2">No alerts found</h3>
              <p className="text-secondary-600 mb-4">Create your first alert to get started</p>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="btn-primary flex items-center space-x-2 mx-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Create Alert</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Create Alert Modal */}
      {showCreateModal && <CreateAlertModal />}

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

export default AlertsPage

