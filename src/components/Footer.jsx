import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  BarChart3, 
  Globe, 
  Smartphone, 
  Monitor, 
  Users, 
  TrendingUp,
  FileText,
  Code,
  Palette,
  Zap
} from 'lucide-react'
import TraceIcon from './TraceIcon'

const Footer = () => {
  const navigate = useNavigate()

  // Handle external links
  const handleExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  // Handle internal navigation
  const handleInternalLink = (path) => {
    navigate(path)
  }

  const footerSections = [
    {
      title: 'Products',
      links: [
        { name: 'Charts', href: '/charts', icon: BarChart3, type: 'internal' },
        { name: 'Screeners', href: '/screeners', icon: TrendingUp, type: 'internal' },
        { name: 'Heatmaps', href: '/heatmaps', icon: Palette, type: 'internal' },
        { name: 'Calendars', href: '/calendars', icon: FileText, type: 'internal' },
        { name: 'Alerts', href: '/alerts', icon: Zap, type: 'internal' },
      ]
    },
    {
      title: 'Community',
      links: [
        { name: 'Trading Ideas', href: '/community', icon: Users, type: 'internal' },
        { name: 'Education', href: '/education', icon: FileText, type: 'internal' },
        { name: 'Blog', href: '/blog', icon: FileText, type: 'internal' },
        { name: 'Help Center', href: '/help', icon: FileText, type: 'internal' },
      ]
    },
    {
      title: 'Trading',
      links: [
        { name: 'Markets', href: '/markets', icon: TrendingUp, type: 'internal' },
        { name: 'Brokers', href: '/brokers', icon: Globe, type: 'internal' },
        { name: 'Pricing', href: '/pricing', icon: TrendingUp, type: 'internal' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about', icon: Users, type: 'internal' },
        { name: 'Careers', href: '/careers', icon: Users, type: 'internal' },
        { name: 'Contact', href: '/contact', icon: FileText, type: 'internal' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Use', href: '/terms', icon: FileText, type: 'internal' },
        { name: 'Privacy Policy', href: '/privacy', icon: FileText, type: 'internal' },
        { name: 'Disclaimer', href: '/disclaimer', icon: FileText, type: 'internal' },
      ]
    },
    {
      title: 'Business',
      links: [
        { name: 'API', href: '/api', icon: Code, type: 'internal' },
        { name: 'Partnership', href: '/business/partners', icon: Users, type: 'internal' },
        { name: 'Advertising', href: '/business/advertising', icon: TrendingUp, type: 'internal' },
      ]
    }
  ]

  return (
    <footer className="bg-white text-secondary-900 border-t border-secondary-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-sm font-semibold text-secondary-700 uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.type === 'external' ? (
                      <button
                        onClick={() => handleExternalLink(link.href)}
                        className="text-sm text-secondary-700 hover:text-secondary-900 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <link.icon className="w-3 h-3" />
                        <span>{link.name}</span>
                      </button>
                    ) : (
                      <Link 
                        to={link.href}
                        className="text-sm text-secondary-700 hover:text-secondary-900 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <link.icon className="w-3 h-3" />
                        <span>{link.name}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Logo and Copyright */}
            <div className="flex items-center space-x-4">
              <TraceIcon className="w-5 h-5" />
              <div className="text-sm text-secondary-700">
                © 2025 Market Pulse, Inc.
              </div>
            </div>

            {/* Additional Info */}
            <div className="text-sm text-secondary-700 text-center md:text-right">
              <p>Select market data provided by ICE Data services.</p>
              <p>Select reference data provided by FactSet.</p>
              <p>Copyright © 2025 FactSet Research Systems Inc.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
