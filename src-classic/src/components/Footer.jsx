import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Twitter, 
  Facebook, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone,
  MapPin,
  Brain
} from 'lucide-react'
import TraceIcon from './TraceIcon'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    products: [
      { name: 'Supercharts', href: '/charts' },
      { name: 'Screeners', href: '/screeners' },
      { name: 'Heatmaps', href: '/heatmaps' },
      { name: 'Calendars', href: '/calendars' },
      { name: 'Alerts', href: '/alerts' },
      { name: 'Pine Script', href: '/pine-script' },
    ],
    brokers: [
      { name: 'Supported Brokers', href: '/brokers' },
      { name: 'Broker Integration', href: '/broker-integration' },
      { name: 'Trading Features', href: '/trading-features' },
      { name: 'Paper Trading', href: '/paper-trading' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Education', href: '/education' },
      { name: 'API Documentation', href: '/api' },
      { name: 'Community', href: '/community' },
    ],
    legal: [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Cookie Policy', href: '/cookies' },
    ]
  }

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'Instagram', href: '#', icon: Instagram },
  ]

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <TraceIcon className="w-8 h-8 text-white" />
              <span className="text-2xl font-extrabold">Market Pulse</span>
              <div className="flex items-center space-x-1 ml-2">
                <Brain className="w-4 h-4 text-primary-400" />
                <span className="text-xs font-medium text-primary-400 bg-primary-900 px-2 py-1 rounded-full">AI</span>
              </div>
            </div>
            <p className="text-secondary-300 mb-6 max-w-md">
              The future of trading is here. Experience AI-powered market analysis, 
              intelligent portfolio management, and personalized trading insights.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-secondary-300">
                <Mail className="w-4 h-4" />
                <span>support@marketpulse.ai</span>
              </div>
              <div className="flex items-center space-x-2 text-secondary-300">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-secondary-300">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-secondary-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brokers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Brokers</h3>
            <ul className="space-y-2">
              {footerLinks.brokers.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-secondary-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-secondary-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 mb-6">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-secondary-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-secondary-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-secondary-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-secondary-300 text-sm mb-4 md:mb-0">
              © {currentYear} Market Pulse. All rights reserved.
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-secondary-300 hover:text-white transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

