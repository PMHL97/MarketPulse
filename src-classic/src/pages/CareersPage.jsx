import React, { useState } from 'react'
import { Users, MapPin, Clock, ArrowRight, Star, Heart, Zap, Globe } from 'lucide-react'

const CareersPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all')

  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'engineering', name: 'Engineering' },
    { id: 'product', name: 'Product' },
    { id: 'design', name: 'Design' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'sales', name: 'Sales' },
    { id: 'operations', name: 'Operations' }
  ]

  const jobOpenings = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'engineering',
      location: 'New York, NY',
      type: 'Full-time',
      experience: '3-5 years',
      description: 'Build amazing user experiences with React and modern web technologies.',
      requirements: ['React/TypeScript', 'GraphQL', 'Testing', 'CI/CD'],
      posted: '2 days ago'
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'product',
      location: 'San Francisco, CA',
      type: 'Full-time',
      experience: '4-6 years',
      description: 'Lead product strategy and drive innovation in financial technology.',
      requirements: ['Product Strategy', 'Analytics', 'User Research', 'Agile'],
      posted: '1 week ago'
    },
    {
      id: 3,
      title: 'UX Designer',
      department: 'design',
      location: 'Remote',
      type: 'Full-time',
      experience: '2-4 years',
      description: 'Design intuitive and beautiful interfaces for our trading platform.',
      requirements: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
      posted: '3 days ago'
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      department: 'engineering',
      location: 'New York, NY',
      type: 'Full-time',
      experience: '3-5 years',
      description: 'Build and maintain our cloud infrastructure and deployment pipelines.',
      requirements: ['AWS/GCP', 'Kubernetes', 'Terraform', 'Monitoring'],
      posted: '5 days ago'
    },
    {
      id: 5,
      title: 'Growth Marketing Manager',
      department: 'marketing',
      location: 'San Francisco, CA',
      type: 'Full-time',
      experience: '3-5 years',
      description: 'Drive user acquisition and growth through data-driven marketing strategies.',
      requirements: ['Growth Hacking', 'Analytics', 'A/B Testing', 'SEO/SEM'],
      posted: '1 week ago'
    },
    {
      id: 6,
      title: 'Customer Success Manager',
      department: 'operations',
      location: 'Remote',
      type: 'Full-time',
      experience: '2-4 years',
      description: 'Help our customers succeed and grow their trading strategies.',
      requirements: ['Customer Support', 'Analytics', 'Communication', 'Financial Markets'],
      posted: '4 days ago'
    }
  ]

  const benefits = [
    {
      title: 'Competitive Compensation',
      description: 'Market-leading salaries and equity packages',
      icon: Star
    },
    {
      title: 'Health & Wellness',
      description: 'Comprehensive health, dental, and vision coverage',
      icon: Heart
    },
    {
      title: 'Flexible Work',
      description: 'Remote-friendly with flexible hours',
      icon: Globe
    },
    {
      title: 'Learning & Development',
      description: 'Annual learning budget and conference attendance',
      icon: Zap
    }
  ]

  const culture = [
    {
      title: 'Innovation First',
      description: 'We encourage experimentation and creative problem-solving'
    },
    {
      title: 'Collaborative Environment',
      description: 'Work with talented people who share your passion for excellence'
    },
    {
      title: 'Impact-Driven',
      description: 'Build products that democratize access to financial markets'
    },
    {
      title: 'Growth Mindset',
      description: 'Continuous learning and personal development opportunities'
    }
  ]

  const filteredJobs = selectedDepartment === 'all' 
    ? jobOpenings 
    : jobOpenings.filter(job => job.department === selectedDepartment)

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">Join Our Team</h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Help us build the future of financial technology. We're looking for passionate people to join our mission.
          </p>
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 text-center">
            <div className="text-primary-600 mb-2">
              <Users className="w-8 h-8 mx-auto" />
            </div>
            <div className="text-2xl font-bold text-secondary-900">50+</div>
            <div className="text-sm text-secondary-600">Team Members</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 text-center">
            <div className="text-primary-600 mb-2">
              <MapPin className="w-8 h-8 mx-auto" />
            </div>
            <div className="text-2xl font-bold text-secondary-900">3</div>
            <div className="text-sm text-secondary-600">Offices</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 text-center">
            <div className="text-primary-600 mb-2">
              <Globe className="w-8 h-8 mx-auto" />
            </div>
            <div className="text-2xl font-bold text-secondary-900">15+</div>
            <div className="text-sm text-secondary-600">Countries</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 text-center">
            <div className="text-primary-600 mb-2">
              <Star className="w-8 h-8 mx-auto" />
            </div>
            <div className="text-2xl font-bold text-secondary-900">4.8</div>
            <div className="text-sm text-secondary-600">Glassdoor Rating</div>
          </div>
        </div>

        {/* Culture & Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Culture */}
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">Our Culture</h2>
            <div className="space-y-4">
              {culture.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-1">{item.title}</h3>
                    <p className="text-secondary-600 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">Benefits & Perks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="text-primary-600 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900 text-sm mb-1">{benefit.title}</h3>
                      <p className="text-secondary-600 text-xs">{benefit.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Job Openings */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-2xl font-bold text-secondary-900 mb-4 md:mb-0">Open Positions</h2>
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDepartment(dept.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedDepartment === dept.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-secondary-600 hover:bg-secondary-100 border border-secondary-200'
                  }`}
                >
                  {dept.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-secondary-900">{job.title}</h3>
                      <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                        {job.department}
                      </span>
                    </div>
                    <p className="text-secondary-600 text-sm mb-3">{job.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-secondary-500">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{job.type}</span>
                      </div>
                      <span>{job.experience}</span>
                      <span>Posted {job.posted}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {job.requirements.map((req, index) => (
                        <span key={index} className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 lg:mt-0 lg:ml-6">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                      <span>Apply Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-secondary-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-secondary-900 mb-2">No positions found</h3>
              <p className="text-secondary-600">Try selecting a different department or check back later for new openings.</p>
            </div>
          )}
        </div>

        {/* Application Process */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">Application Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">1</span>
              </div>
              <h3 className="font-semibold text-secondary-900 mb-2">Apply</h3>
              <p className="text-sm text-secondary-600">Submit your application with resume and cover letter</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">2</span>
              </div>
              <h3 className="font-semibold text-secondary-900 mb-2">Initial Review</h3>
              <p className="text-sm text-secondary-600">Our team reviews your application within 1 week</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">3</span>
              </div>
              <h3 className="font-semibold text-secondary-900 mb-2">Interviews</h3>
              <p className="text-sm text-secondary-600">Video calls with team members and technical assessments</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">4</span>
              </div>
              <h3 className="font-semibold text-secondary-900 mb-2">Decision</h3>
              <p className="text-sm text-secondary-600">Final decision and offer within 2 weeks</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-8 text-center">
          <Users className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary-900 mb-4">Don't See Your Role?</h2>
          <p className="text-primary-700 mb-6 max-w-2xl mx-auto">
            We're always looking for talented people to join our team. Send us your resume and let us know how you'd like to contribute.
          </p>
          <button className="inline-flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Send Resume
          </button>
        </div>
      </div>
    </div>
  )
}

export default CareersPage

