import React from 'react'
import { AlertTriangle, Shield, FileText, Users } from 'lucide-react'

const DisclaimerPage = () => {
  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">Investment Disclaimer</h1>
          <p className="text-xl text-secondary-600">
            Important information about using Market Pulse
          </p>
        </div>

        {/* Warning Banner */}
        <div className="bg-warning-50 border border-warning-200 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-warning-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-warning-900 mb-2">Important Notice</h3>
              <p className="text-warning-800">
                The information provided by Market Pulse is for educational and informational purposes only. 
                It is not intended as investment advice, financial advice, or trading advice.
              </p>
            </div>
          </div>
        </div>

        {/* Key Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 text-center">
            <div className="text-danger-600 mb-4">
              <Shield className="w-8 h-8 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">Not Financial Advice</h3>
            <p className="text-secondary-600 text-sm">Our platform provides tools and data, not investment recommendations</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 text-center">
            <div className="text-danger-600 mb-4">
              <FileText className="w-8 h-8 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">Do Your Research</h3>
            <p className="text-secondary-600 text-sm">Always conduct your own research before making investment decisions</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 text-center">
            <div className="text-danger-600 mb-4">
              <Users className="w-8 h-8 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">Consult Professionals</h3>
            <p className="text-secondary-600 text-sm">Seek advice from qualified financial professionals</p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8">
          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">1. General Disclaimer</h2>
              <p className="text-secondary-600 mb-4">
                Market Pulse is a financial technology platform that provides market data, analysis tools, and educational resources. We are not a registered investment advisor, broker-dealer, or financial advisor. The information provided on our platform is for informational and educational purposes only.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">2. No Investment Advice</h2>
              <p className="text-secondary-600 mb-4">
                <strong>Important:</strong> Nothing on our platform constitutes investment advice, financial advice, trading advice, or any other sort of advice. You should not treat any of our content as such. We do not recommend or endorse any specific investments, securities, or trading strategies.
              </p>
              <p className="text-secondary-600 mb-4">
                Any analysis, commentary, or research provided is for informational purposes only and should not be construed as a recommendation to buy, sell, or hold any security or investment.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">3. Investment Risks</h2>
              <p className="text-secondary-600 mb-4">
                All investments carry risk, including the potential loss of principal. Past performance is not indicative of future results. The value of investments can go down as well as up, and you may not get back the amount you invested.
              </p>
              <p className="text-secondary-600 mb-4">
                Different types of investments involve varying degrees of risk, and there can be no assurance that any specific investment will be profitable or suitable for your particular situation.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">4. Market Data Accuracy</h2>
              <p className="text-secondary-600 mb-4">
                While we strive to provide accurate and up-to-date market data, we cannot guarantee the accuracy, completeness, or timeliness of any information on our platform. Market data may be delayed, and prices may not reflect real-time market conditions.
              </p>
              <p className="text-secondary-600 mb-4">
                You should verify any information before making investment decisions and consult multiple sources for market data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">5. Third-Party Content</h2>
              <p className="text-secondary-600 mb-4">
                Our platform may include content from third parties, including news articles, analyst reports, and user-generated content. We do not endorse or verify the accuracy of third-party content, and we are not responsible for any errors or omissions in such content.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">6. User Responsibility</h2>
              <p className="text-secondary-600 mb-4">
                You are solely responsible for your investment decisions and the consequences thereof. You should:
              </p>
              <ul className="list-disc list-inside text-secondary-600 space-y-2 mb-4">
                <li>Conduct your own research and due diligence</li>
                <li>Consider your financial situation and risk tolerance</li>
                <li>Consult with qualified financial professionals</li>
                <li>Understand the risks associated with your investments</li>
                <li>Never invest more than you can afford to lose</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">7. Cryptocurrency Risks</h2>
              <p className="text-secondary-600 mb-4">
                Cryptocurrency investments are highly speculative and involve significant risk. Cryptocurrency markets are volatile and can experience rapid price fluctuations. Regulatory changes, technological developments, and market sentiment can all impact cryptocurrency values.
              </p>
              <p className="text-secondary-600 mb-4">
                Cryptocurrency investments may not be suitable for all investors, and you should carefully consider your risk tolerance before investing.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-secondary-600 mb-4">
                To the maximum extent permitted by law, Market Pulse and its affiliates shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of our platform or any investment decisions you make based on information from our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">9. Regulatory Compliance</h2>
              <p className="text-secondary-600 mb-4">
                You are responsible for ensuring that your use of our platform complies with all applicable laws and regulations in your jurisdiction. Different countries and regions have different regulations regarding financial services and investments.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">10. Professional Advice</h2>
              <p className="text-secondary-600 mb-4">
                Before making any investment decisions, you should consult with qualified professionals, including:
              </p>
              <ul className="list-disc list-inside text-secondary-600 space-y-2 mb-4">
                <li>Licensed financial advisors</li>
                <li>Certified public accountants</li>
                <li>Tax professionals</li>
                <li>Legal counsel</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">11. Contact Information</h2>
              <p className="text-secondary-600 mb-4">
                If you have any questions about this disclaimer, please contact us:
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

        {/* Final Warning */}
        <div className="mt-8 bg-danger-50 border border-danger-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-danger-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-danger-900 mb-2">Final Reminder</h3>
              <p className="text-danger-800">
                By using Market Pulse, you acknowledge that you have read, understood, and agree to this disclaimer. 
                You understand that all investment decisions are your sole responsibility and that Market Pulse is not liable for any losses you may incur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DisclaimerPage

