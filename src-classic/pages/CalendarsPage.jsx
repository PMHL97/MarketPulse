import React, { useState, useEffect } from 'react'
import { 
  Calendar,
  Clock,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Star,
  Filter,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Download,
  Settings,
  Eye,
  Bell
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import AuthModal from '../components/AuthModal'

const CalendarsPage = () => {
  const [activeCalendar, setActiveCalendar] = useState('economic')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showFilters, setShowFilters] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [calendarEvents, setCalendarEvents] = useState([])
  const [filters, setFilters] = useState({
    importance: 'all',
    country: 'all',
    category: 'all',
    timeframe: 'today'
  })
  
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()

  // Mock calendar data
  const mockCalendarData = {
    economic: [
      {
        id: 1,
        time: '08:30',
        country: 'US',
        event: 'Non-Farm Payrolls',
        importance: 'high',
        actual: '150K',
        forecast: '180K',
        previous: '175K',
        impact: 'bullish',
        category: 'Employment'
      },
      {
        id: 2,
        time: '10:00',
        country: 'US',
        event: 'ISM Manufacturing PMI',
        importance: 'medium',
        actual: '52.3',
        forecast: '51.8',
        previous: '50.2',
        impact: 'bullish',
        category: 'Manufacturing'
      },
      {
        id: 3,
        time: '14:00',
        country: 'US',
        event: 'Federal Reserve Chair Speech',
        importance: 'high',
        actual: null,
        forecast: null,
        previous: null,
        impact: 'neutral',
        category: 'Central Bank'
      },
      {
        id: 4,
        time: '16:30',
        country: 'US',
        event: 'Crude Oil Inventories',
        importance: 'low',
        actual: '-2.1M',
        forecast: '-1.5M',
        previous: '-3.2M',
        impact: 'bearish',
        category: 'Energy'
      }
    ],
    earnings: [
      {
        id: 5,
        time: '09:00',
        country: 'US',
        event: 'Apple Inc. (AAPL) Earnings',
        importance: 'high',
        actual: null,
        forecast: '$1.85 EPS',
        previous: '$1.52 EPS',
        impact: 'bullish',
        category: 'Technology'
      },
      {
        id: 6,
        time: '16:00',
        country: 'US',
        event: 'Tesla Inc. (TSLA) Earnings',
        importance: 'high',
        actual: null,
        forecast: '$0.75 EPS',
        previous: '$0.85 EPS',
        impact: 'bearish',
        category: 'Automotive'
      },
      {
        id: 7,
        time: '16:30',
        country: 'US',
        event: 'Microsoft Corp. (MSFT) Earnings',
        importance: 'medium',
        actual: null,
        forecast: '$2.65 EPS',
        previous: '$2.45 EPS',
        impact: 'bullish',
        category: 'Technology'
      }
    ],
    dividends: [
      {
        id: 8,
        time: '09:30',
        country: 'US',
        event: 'Johnson & Johnson (JNJ) Dividend',
        importance: 'low',
        actual: '$1.13',
        forecast: '$1.13',
        previous: '$1.13',
        impact: 'neutral',
        category: 'Healthcare'
      },
      {
        id: 9,
        time: '09:30',
        country: 'US',
        event: 'Procter & Gamble (PG) Dividend',
        importance: 'low',
        actual: '$0.94',
        forecast: '$0.94',
        previous: '$0.94',
        impact: 'neutral',
        category: 'Consumer'
      }
    ]
  }

  // Load calendar data
  const loadCalendarData = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      const data = mockCalendarData[activeCalendar] || []
      setCalendarEvents(data)
    } catch (error) {
      console.error('Error loading calendar data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Load data when calendar type changes
  useEffect(() => {
    loadCalendarData()
  }, [activeCalendar])

  // Handle alert toggle
  const handleAlertToggle = (eventId) => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }
    // TODO: Implement alert functionality
    console.log('Toggle alert for event:', eventId)
  }

  const calendars = [
    { id: 'economic', name: 'Economic Calendar', icon: TrendingUp, description: 'Economic indicators and events' },
    { id: 'earnings', name: 'Earnings Calendar', icon: Star, description: 'Corporate earnings announcements' },
    { id: 'dividends', name: 'Dividend Calendar', icon: TrendingDown, description: 'Dividend payments and announcements' },
    { id: 'ipo', name: 'IPO Calendar', icon: Calendar, description: 'Initial public offerings' }
  ]

  const importanceLevels = [
    { value: 'all', label: 'All Importance', color: 'secondary' },
    { value: 'high', label: 'High Impact', color: 'danger' },
    { value: 'medium', label: 'Medium Impact', color: 'warning' },
    { value: 'low', label: 'Low Impact', color: 'success' }
  ]

  const countries = ['US', 'EU', 'UK', 'JP', 'CN', 'CA', 'AU', 'CH']
  const categories = ['Employment', 'Manufacturing', 'Central Bank', 'Energy', 'Technology', 'Automotive', 'Healthcare', 'Consumer']

  const getImportanceColor = (importance) => {
    switch (importance) {
      case 'high': return 'text-danger bg-danger/10 border-danger/20'
      case 'medium': return 'text-warning bg-warning/10 border-warning/20'
      case 'low': return 'text-success bg-success/10 border-success/20'
      default: return 'text-secondary-600 bg-secondary-100 border-secondary-200'
    }
  }

  const getImpactIcon = (impact) => {
    switch (impact) {
      case 'bullish': return <TrendingUp className="w-4 h-4 text-success" />
      case 'bearish': return <TrendingDown className="w-4 h-4 text-danger" />
      default: return <AlertTriangle className="w-4 h-4 text-secondary-500" />
    }
  }

  const CalendarEvent = ({ event }) => (
    <div className="bg-white border border-secondary-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="text-center">
            <div className="text-lg font-bold text-secondary-900">{event.time}</div>
            <div className="text-xs text-secondary-500">{event.country}</div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-secondary-900 mb-1">{event.event}</h3>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getImportanceColor(event.importance)}`}>
                {event.importance.toUpperCase()}
              </span>
              <span className="text-xs text-secondary-500">{event.category}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => handleAlertToggle(event.id)}
            className="p-2 text-secondary-400 hover:text-warning transition-colors"
            title="Set alert"
          >
            <Bell className="w-4 h-4" />
          </button>
          <button 
            onClick={() => navigate(`/charts?symbol=${event.event.split(' ')[0]}`)}
            className="p-2 text-secondary-400 hover:text-primary-600 transition-colors"
            title="View chart"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {event.actual !== null && (
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-secondary-500 text-xs">Actual</div>
            <div className="font-semibold text-secondary-900">{event.actual}</div>
          </div>
          <div>
            <div className="text-secondary-500 text-xs">Forecast</div>
            <div className="font-medium text-secondary-700">{event.forecast || 'N/A'}</div>
          </div>
          <div>
            <div className="text-secondary-500 text-xs">Previous</div>
            <div className="font-medium text-secondary-700">{event.previous || 'N/A'}</div>
          </div>
        </div>
      )}
      
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {getImpactIcon(event.impact)}
          <span className="text-sm text-secondary-600 capitalize">{event.impact} impact</span>
        </div>
        {event.actual === null && (
          <div className="text-sm text-secondary-500">
            Expected: {event.forecast || 'TBD'}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Economic Calendar</h1>
          <p className="text-secondary-600">Track economic events, earnings, and market-moving announcements</p>
        </div>

        {/* Calendar Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-2 mb-8">
          <div className="flex space-x-1">
            {calendars.map((calendar) => {
              const Icon = calendar.icon
              return (
                <button
                  key={calendar.id}
                  onClick={() => setActiveCalendar(calendar.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCalendar === calendar.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{calendar.name}</span>
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
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={selectedDate.toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    className="px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Timeframe</label>
                  <select
                    value={filters.timeframe}
                    onChange={(e) => setFilters({...filters, timeframe: e.target.value})}
                    className="px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="btn-secondary flex items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              <button 
                onClick={loadCalendarData}
                disabled={isLoading}
                className="btn-primary flex items-center space-x-2"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-secondary-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Importance</label>
                  <select
                    value={filters.importance}
                    onChange={(e) => setFilters({...filters, importance: e.target.value})}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {importanceLevels.map(level => (
                      <option key={level.value} value={level.value}>{level.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Country</label>
                  <select
                    value={filters.country}
                    onChange={(e) => setFilters({...filters, country: e.target.value})}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">All Countries</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Calendar Events */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-secondary-900">
              {calendars.find(c => c.id === activeCalendar)?.name} - {selectedDate.toLocaleDateString()}
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-secondary-600">
                {calendarEvents.length} events
              </span>
              <button className="p-2 text-secondary-400 hover:text-secondary-600">
                <Download className="w-4 h-4" />
              </button>
              <button className="p-2 text-secondary-400 hover:text-secondary-600">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
                <p className="text-secondary-600">Loading calendar events...</p>
              </div>
            </div>
          ) : calendarEvents.length > 0 ? (
            <div className="space-y-4">
              {calendarEvents.map((event) => (
                <CalendarEvent key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-secondary-400 mb-4">
                <Calendar className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-secondary-900 mb-2">No events found</h3>
              <p className="text-secondary-600">Try adjusting your date range or filters</p>
            </div>
          )}

          {/* Legend */}
          <div className="mt-8 pt-6 border-t border-secondary-200">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Legend</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-secondary-900 mb-2">Importance Levels</h4>
                <div className="space-y-2">
                  {importanceLevels.slice(1).map(level => (
                    <div key={level.value} className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getImportanceColor(level.value)}`}>
                        {level.value.toUpperCase()}
                      </span>
                      <span className="text-sm text-secondary-600">{level.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-secondary-900 mb-2">Impact Indicators</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-success" />
                    <span className="text-sm text-secondary-600">Bullish Impact</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingDown className="w-4 h-4 text-danger" />
                    <span className="text-sm text-secondary-600">Bearish Impact</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-secondary-500" />
                    <span className="text-sm text-secondary-600">Neutral Impact</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

export default CalendarsPage

