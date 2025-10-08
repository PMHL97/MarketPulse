import React from 'react'
import { Shield, Eye, Lock, Database, Users, Globe } from 'lucide-react'

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-secondary-600">
            Last updated: January 15, 2024
          </p>
        </div>

        {/* Privacy Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 text-center">
            <div className="text-primary-600 mb-4">
              <Shield className="w-8 h-8 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">Your Privacy Matters</h3>
            <p className="text-secondary-600 text-sm">We protect your personal information with industry-standard security measures</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 text-center">
            <div className="text-primary-600 mb-4">
              <Eye className="w-8 h-8 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">Transparency</h3>
            <p className="text-secondary-600 text-sm">We clearly explain how we collect, use, and protect your data</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 text-center">
            <div className="text-primary-600 mb-4">
              <Lock className="w-8 h-8 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">Your Control</h3>
            <p className="text-secondary-600 text-sm">You have full control over your data and can manage your privacy settings</p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8">
          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">1. Information We Collect</h2>
              <p className="text-secondary-600 mb-4">
                We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.
              </p>
              
              <h3 className="text-lg font-semibold text-secondary-900 mb-3">Personal Information</h3>
              <ul className="list-disc list-inside text-secondary-600 space-y-2 mb-4">
                <li>Name and email address</li>
                <li>Account credentials and preferences</li>
                <li>Payment information (processed securely by third-party providers)</li>
                <li>Communication preferences</li>
              </ul>

              <h3 className="text-lg font-semibold text-secondary-900 mb-3">Usage Information</h3>
              <ul className="list-disc list-inside text-secondary-600 space-y-2 mb-4">
                <li>How you interact with our platform</li>
                <li>Features you use and pages you visit</li>
                <li>Device information and browser type</li>
                <li>IP address and location data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-secondary-600 mb-4">
                We use the information we collect to provide, maintain, and improve our services:
              </p>
              <ul className="list-disc list-inside text-secondary-600 space-y-2 mb-4">
                <li>Provide and maintain our trading platform</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Improve our services and develop new features</li>
                <li>Monitor and analyze usage patterns</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">3. Information Sharing</h2>
              <p className="text-secondary-600 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-secondary-600 space-y-2 mb-4">
                <li><strong>Service Providers:</strong> We may share information with trusted third parties who assist us in operating our platform</li>
                <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In the event of a merger or acquisition, user information may be transferred</li>
                <li><strong>Consent:</strong> We may share information with your explicit consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">4. Data Security</h2>
              <p className="text-secondary-600 mb-4">
                We implement appropriate security measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside text-secondary-600 space-y-2 mb-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and assessments</li>
                <li>Access controls and authentication measures</li>
                <li>Employee training on data protection</li>
                <li>Incident response procedures</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">5. Your Rights and Choices</h2>
              <p className="text-secondary-600 mb-4">
                You have certain rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-secondary-600 space-y-2 mb-4">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">6. Cookies and Tracking</h2>
              <p className="text-secondary-600 mb-4">
                We use cookies and similar technologies to enhance your experience:
              </p>
              <ul className="list-disc list-inside text-secondary-600 space-y-2 mb-4">
                <li><strong>Essential Cookies:</strong> Required for basic platform functionality</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how you use our platform</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">7. Data Retention</h2>
              <p className="text-secondary-600 mb-4">
                We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. When you delete your account, we will delete or anonymize your personal information, except where we are required to retain it for legal or regulatory purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">8. International Data Transfers</h2>
              <p className="text-secondary-600 mb-4">
                Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">9. Children's Privacy</h2>
              <p className="text-secondary-600 mb-4">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">10. Changes to This Policy</h2>
              <p className="text-secondary-600 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">11. Contact Us</h2>
              <p className="text-secondary-600 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
                <p className="text-secondary-700">
                  <strong>Email:</strong> privacy@marketpulse.com<br />
                  <strong>Address:</strong> Market Pulse Inc., 123 Financial District, New York, NY 10004<br />
                  <strong>Phone:</strong> +1 (555) 123-4567<br />
                  <strong>Data Protection Officer:</strong> dpo@marketpulse.com
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-secondary-500 text-sm">
            This Privacy Policy is effective as of the date listed above and will remain in effect except with respect to any changes in its provisions in the future.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPage

