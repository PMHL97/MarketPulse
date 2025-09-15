import React from 'react'
import { FileText, Calendar, Users } from 'lucide-react'

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">Terms of Use</h1>
          <p className="text-xl text-secondary-600">
            Last updated: January 15, 2024
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8">
          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-secondary-600 mb-4">
                By accessing and using Market Pulse ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">2. Description of Service</h2>
              <p className="text-secondary-600 mb-4">
                Market Pulse provides financial market data, analysis tools, and trading-related services. Our platform includes but is not limited to:
              </p>
              <ul className="list-disc list-inside text-secondary-600 space-y-2 mb-4">
                <li>Real-time and historical market data</li>
                <li>Charting and technical analysis tools</li>
                <li>Portfolio tracking and management</li>
                <li>News and sentiment analysis</li>
                <li>Educational content and resources</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">3. User Accounts</h2>
              <p className="text-secondary-600 mb-4">
                To access certain features of the Service, you must register for an account. You agree to:
              </p>
              <ul className="list-disc list-inside text-secondary-600 space-y-2 mb-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your account information</li>
                <li>Keep your password secure and confidential</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">4. Acceptable Use</h2>
              <p className="text-secondary-600 mb-4">
                You agree not to use the Service for any unlawful purpose or any purpose prohibited under this clause. You may not use the Service in any manner that could damage, disable, overburden, or impair any server, or the network(s) connected to any server.
              </p>
              <p className="text-secondary-600 mb-4">
                Prohibited activities include but are not limited to:
              </p>
              <ul className="list-disc list-inside text-secondary-600 space-y-2 mb-4">
                <li>Attempting to gain unauthorized access to any part of the Service</li>
                <li>Using automated systems to access the Service</li>
                <li>Interfering with or disrupting the Service</li>
                <li>Violating any applicable laws or regulations</li>
                <li>Infringing on intellectual property rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">5. Financial Information and Investment Advice</h2>
              <p className="text-secondary-600 mb-4">
                <strong>Important:</strong> The information provided by Market Pulse is for informational purposes only and should not be construed as investment advice, financial advice, trading advice, or any other sort of advice.
              </p>
              <p className="text-secondary-600 mb-4">
                You should not make any investment decisions based solely on the information provided on our platform. Always consult with a qualified financial advisor before making investment decisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">6. Data and Privacy</h2>
              <p className="text-secondary-600 mb-4">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
              </p>
              <p className="text-secondary-600 mb-4">
                We may collect, use, and share your information as described in our Privacy Policy. By using the Service, you consent to such collection and use.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">7. Intellectual Property</h2>
              <p className="text-secondary-600 mb-4">
                The Service and its original content, features, and functionality are and will remain the exclusive property of Market Pulse and its licensors. The Service is protected by copyright, trademark, and other laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-secondary-600 mb-4">
                In no event shall Market Pulse, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">9. Termination</h2>
              <p className="text-secondary-600 mb-4">
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">10. Changes to Terms</h2>
              <p className="text-secondary-600 mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">11. Contact Information</h2>
              <p className="text-secondary-600 mb-4">
                If you have any questions about these Terms of Use, please contact us at:
              </p>
              <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
                <p className="text-secondary-700">
                  <strong>Email:</strong> legal@marketpulse.com<br />
                  <strong>Address:</strong> Market Pulse Inc., 123 Financial District, New York, NY 10004<br />
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-secondary-500 text-sm">
            By using Market Pulse, you acknowledge that you have read and understood these Terms of Use.
          </p>
        </div>
      </div>
    </div>
  )
}

export default TermsPage

