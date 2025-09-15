import React, { useState } from 'react'
import { Check, Star, Zap, Crown, Users } from 'lucide-react'

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly')

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for getting started',
      icon: Users,
      features: [
        'Real-time market data',
        'Basic charts and indicators',
        'Watchlist (up to 10 symbols)',
        'Community access',
        'Basic news feed',
        'Email support'
      ],
      limitations: [
        'Limited to 100 API calls/hour',
        'Basic technical indicators only',
        'No advanced screening tools'
      ],
      popular: false
    },
    {
      name: 'Pro',
      price: { monthly: 29, yearly: 290 },
      description: 'For serious traders',
      icon: Zap,
      features: [
        'Everything in Free',
        'Advanced charts and indicators',
        'Unlimited watchlists',
        'Stock and crypto screeners',
        'Market heatmaps',
        'Economic calendar',
        'Price alerts',
        'Advanced news sentiment',
        'Priority support',
        '1,000 API calls/hour'
      ],
      limitations: [],
      popular: true
    },
    {
      name: 'Enterprise',
      price: { monthly: 99, yearly: 990 },
      description: 'For institutions and teams',
      icon: Crown,
      features: [
        'Everything in Pro',
        'Custom indicators',
        'White-label solutions',
        'Advanced analytics',
        'Team collaboration tools',
        'Custom integrations',
        'Dedicated account manager',
        'Unlimited API calls',
        '24/7 phone support'
      ],
      limitations: [],
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">Pricing Plans</h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Choose the plan that fits your trading needs. All plans include our core features with no hidden fees.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg border border-secondary-200 p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-primary-600 text-white'
                  : 'text-secondary-600 hover:text-secondary-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-primary-600 text-white'
                  : 'text-secondary-600 hover:text-secondary-900'
              }`}
            >
              Yearly
              <span className="ml-1 text-xs bg-success-100 text-success-800 px-1 rounded">Save 17%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            const price = plan.price[billingCycle]
            const yearlyPrice = billingCycle === 'yearly' ? price : Math.round(price * 12 * 0.83)
            
            return (
              <div
                key={index}
                className={`relative bg-white rounded-xl shadow-sm border-2 p-8 ${
                  plan.popular
                    ? 'border-primary-500 ring-2 ring-primary-200'
                    : 'border-secondary-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>Most Popular</span>
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="text-primary-600 mb-4">
                    <Icon className="w-12 h-12 mx-auto" />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary-900 mb-2">{plan.name}</h3>
                  <p className="text-secondary-600 mb-4">{plan.description}</p>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-secondary-900">
                      ${billingCycle === 'yearly' ? Math.round(price / 12) : price}
                    </span>
                    <span className="text-secondary-600">/{billingCycle === 'yearly' ? 'month' : 'month'}</span>
                  </div>
                  {billingCycle === 'yearly' && (
                    <p className="text-sm text-secondary-500">
                      Billed annually (${price}/year)
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                      <span className="text-secondary-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-secondary-200 text-secondary-800 hover:bg-secondary-300'
                  }`}
                >
                  {plan.name === 'Free' ? 'Get Started' : 'Start Free Trial'}
                </button>
              </div>
            )
          })}
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-secondary-900 mb-2">Can I change plans anytime?</h3>
              <p className="text-secondary-600 text-sm">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-secondary-900 mb-2">Is there a free trial?</h3>
              <p className="text-secondary-600 text-sm">
                Pro and Enterprise plans come with a 14-day free trial. No credit card required.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-secondary-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-secondary-600 text-sm">
                We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-secondary-900 mb-2">Can I cancel anytime?</h3>
              <p className="text-secondary-600 text-sm">
                Yes, you can cancel your subscription at any time. You'll retain access until the end of your billing period.
              </p>
            </div>
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-8 text-center">
          <Crown className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary-900 mb-4">Need a Custom Solution?</h2>
          <p className="text-primary-700 mb-6 max-w-2xl mx-auto">
            For large teams or custom requirements, we offer tailored solutions with dedicated support 
            and custom integrations.
          </p>
          <button className="inline-flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  )
}

export default PricingPage

