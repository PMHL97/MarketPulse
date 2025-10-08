import React from 'react'
import { BookOpen, Play, Users, Award, TrendingUp, BarChart3 } from 'lucide-react'

const EducationPage = () => {
  const courses = [
    {
      title: 'Trading Fundamentals',
      description: 'Learn the basics of trading and market analysis',
      level: 'Beginner',
      duration: '2 hours',
      lessons: 12,
      icon: BookOpen
    },
    {
      title: 'Technical Analysis',
      description: 'Master chart patterns and technical indicators',
      level: 'Intermediate',
      duration: '4 hours',
      lessons: 24,
      icon: BarChart3
    },
    {
      title: 'Risk Management',
      description: 'Protect your capital with proper risk management',
      level: 'All Levels',
      duration: '1.5 hours',
      lessons: 8,
      icon: TrendingUp
    }
  ]

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">Trading Education</h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Master the art of trading with our comprehensive educational resources and courses
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 text-center">
            <div className="text-primary-600 mb-2">
              <BookOpen className="w-8 h-8 mx-auto" />
            </div>
            <div className="text-2xl font-bold text-secondary-900">50+</div>
            <div className="text-sm text-secondary-600">Courses</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 text-center">
            <div className="text-primary-600 mb-2">
              <Play className="w-8 h-8 mx-auto" />
            </div>
            <div className="text-2xl font-bold text-secondary-900">200+</div>
            <div className="text-sm text-secondary-600">Video Lessons</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 text-center">
            <div className="text-primary-600 mb-2">
              <Users className="w-8 h-8 mx-auto" />
            </div>
            <div className="text-2xl font-bold text-secondary-900">10K+</div>
            <div className="text-sm text-secondary-600">Students</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 text-center">
            <div className="text-primary-600 mb-2">
              <Award className="w-8 h-8 mx-auto" />
            </div>
            <div className="text-2xl font-bold text-secondary-900">95%</div>
            <div className="text-sm text-secondary-600">Success Rate</div>
          </div>
        </div>

        {/* Featured Courses */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((course, index) => {
              const Icon = course.icon
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="text-primary-600 mr-3">
                      <Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900">{course.title}</h3>
                      <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                        {course.level}
                      </span>
                    </div>
                  </div>
                  <p className="text-secondary-600 mb-4">{course.description}</p>
                  <div className="flex items-center justify-between text-sm text-secondary-500 mb-4">
                    <span>{course.duration}</span>
                    <span>{course.lessons} lessons</span>
                  </div>
                  <button className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                    Start Course
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Learning Paths */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6">Learning Paths</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-secondary-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-3">Beginner Path</h3>
              <p className="text-secondary-600 mb-4">
                Start your trading journey with fundamental concepts and basic strategies.
              </p>
              <ul className="text-sm text-secondary-600 space-y-1 mb-4">
                <li>• Market basics and terminology</li>
                <li>• Understanding charts and price action</li>
                <li>• Basic risk management</li>
                <li>• Paper trading practice</li>
              </ul>
              <button className="text-primary-600 hover:text-primary-700 font-medium">
                Start Beginner Path →
              </button>
            </div>
            
            <div className="border border-secondary-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-3">Advanced Path</h3>
              <p className="text-secondary-600 mb-4">
                Master advanced strategies and sophisticated trading techniques.
              </p>
              <ul className="text-sm text-secondary-600 space-y-1 mb-4">
                <li>• Advanced technical analysis</li>
                <li>• Options and derivatives trading</li>
                <li>• Algorithmic trading strategies</li>
                <li>• Portfolio optimization</li>
              </ul>
              <button className="text-primary-600 hover:text-primary-700 font-medium">
                Start Advanced Path →
              </button>
            </div>
          </div>
        </div>

        {/* Coming Soon Notice */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 text-center">
          <BookOpen className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-primary-900 mb-2">Education Platform Coming Soon</h3>
          <p className="text-primary-700 mb-4">
            We're building a comprehensive trading education platform with video courses, 
            interactive lessons, and certification programs.
          </p>
          <button className="inline-flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Get Notified
          </button>
        </div>
      </div>
    </div>
  )
}

export default EducationPage

