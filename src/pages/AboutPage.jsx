import React from 'react'

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">About Market Pulse</h1>
          <p className="text-secondary-600 text-lg">
            Real-time market sentiment analysis and trading tools for modern investors.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-secondary-900 mb-2">Our Mission</h2>
            <p className="text-secondary-700">
              We help traders and investors make better decisions by combining data-driven
              insights, intuitive tools, and a community-driven approach.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary-900 mb-2">What We Offer</h2>
            <ul className="list-disc list-inside text-secondary-700 space-y-2">
              <li>Market summaries, screeners, heatmaps, and advanced charts</li>
              <li>Community trends and educational resources</li>
              <li>Broker integrations and paper trading</li>
              <li>Powerful APIs for developers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary-900 mb-2">Contact</h2>
            <p className="text-secondary-700">
              Questions or feedback? Reach us at <span className="font-medium">support@marketpulse.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default AboutPage


