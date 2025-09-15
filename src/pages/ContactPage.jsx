import React, { useState } from 'react'
import { Mail, Phone, MapPin, MessageCircle, Send, Clock, Users } from 'lucide-react'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      category: 'general'
    })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactMethods = [
    {
      title: 'Email Support',
      description: 'Get help via email',
      icon: Mail,
      contact: 'support@marketpulse.com',
      response: 'Response within 24 hours'
    },
    {
      title: 'Phone Support',
      description: 'Speak with our team',
      icon: Phone,
      contact: '+1 (555) 123-4567',
      response: 'Mon-Fri 9AM-6PM EST'
    },
    {
      title: 'Live Chat',
      description: 'Chat with support',
      icon: MessageCircle,
      contact: 'Available 24/7',
      response: 'Instant response'
    }
  ]

  const offices = [
    {
      city: 'New York',
      address: '123 Financial District, New York, NY 10004',
      phone: '+1 (555) 123-4567',
      email: 'ny@marketpulse.com'
    },
    {
      city: 'San Francisco',
      address: '456 Market Street, San Francisco, CA 94105',
      phone: '+1 (555) 234-5678',
      email: 'sf@marketpulse.com'
    },
    {
      city: 'London',
      address: '789 Canary Wharf, London E14 5AB, UK',
      phone: '+44 20 7123 4567',
      email: 'london@marketpulse.com'
    }
  ]

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">Contact Us</h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Get in touch with our team. We're here to help you succeed with Market Pulse.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => {
            const Icon = method.icon
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 text-center hover:shadow-md transition-shadow">
                <div className="text-primary-600 mb-4">
                  <Icon className="w-8 h-8 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">{method.title}</h3>
                <p className="text-secondary-600 text-sm mb-3">{method.description}</p>
                <p className="font-medium text-secondary-900 mb-2">{method.contact}</p>
                <p className="text-xs text-secondary-500">{method.response}</p>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="feature">Feature Request</option>
                  <option value="partnership">Partnership</option>
                  <option value="media">Media Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Office Locations */}
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">Our Offices</h2>
            <div className="space-y-6">
              {offices.map((office, index) => (
                <div key={index} className="border border-secondary-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-secondary-900 mb-2">{office.city}</h3>
                      <p className="text-secondary-600 text-sm mb-2">{office.address}</p>
                      <div className="space-y-1">
                        <p className="text-sm text-secondary-600">
                          <Phone className="w-4 h-4 inline mr-1" />
                          {office.phone}
                        </p>
                        <p className="text-sm text-secondary-600">
                          <Mail className="w-4 h-4 inline mr-1" />
                          {office.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Business Hours */}
            <div className="mt-8 pt-6 border-t border-secondary-200">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Business Hours</h3>
              <div className="space-y-2 text-sm text-secondary-600">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-secondary-200 p-8">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-secondary-900 mb-2">How quickly do you respond?</h3>
              <p className="text-secondary-600 text-sm">We typically respond to emails within 24 hours and live chat inquiries instantly.</p>
            </div>
            <div>
              <h3 className="font-semibold text-secondary-900 mb-2">Do you offer phone support?</h3>
              <p className="text-secondary-600 text-sm">Yes, phone support is available Monday through Friday, 9 AM to 6 PM EST.</p>
            </div>
            <div>
              <h3 className="font-semibold text-secondary-900 mb-2">Can I schedule a demo?</h3>
              <p className="text-secondary-600 text-sm">Absolutely! Contact us to schedule a personalized demo of our platform.</p>
            </div>
            <div>
              <h3 className="font-semibold text-secondary-900 mb-2">Do you have a developer API?</h3>
              <p className="text-secondary-600 text-sm">Yes, we offer a comprehensive API for developers. Check our API documentation for details.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage

