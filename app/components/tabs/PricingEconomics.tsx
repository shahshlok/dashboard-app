"use client"

import { useState, useEffect } from "react"
import type { Location } from "../../data/locations"
import { formatPricingTiers, getDiscountFramework, getCompetitorComparison } from "../../utils/pricingData"
import { formatChartData, getKeyAssumptions } from "../../utils/financialData"
import { PricingTiersList } from "../pricing/PricingStrategyCard"
import {
  RevenueProjectionChart,
  EnrollmentGrowthChart,
  CashFlowChart,
  CompetitivePosChart,
  CostBreakdownChart,
  LTVCACGauge,
  MetricsCard
} from "../charts/FinancialCharts"

interface PricingEconomicsProps {
  location: Location
  selectedScenario?: 'conservative' | 'base' | 'aggressive'
}

export default function PricingEconomics({ location, selectedScenario = 'base' }: PricingEconomicsProps) {
  const enhancedLocation = location as any
  const [selectedPricingItem, setSelectedPricingItem] = useState<{type: 'membershipTier' | 'unitEconomic', index?: number, key?: string} | null>(null)
  const [pricingTiers, setPricingTiers] = useState<any[]>([])
  const [chartData, setChartData] = useState<any>(null)
  const [discounts, setDiscounts] = useState<any[]>([])
  const [competitors, setCompetitors] = useState<any[]>([])

  useEffect(() => {
    if ((enhancedLocation?.name || enhancedLocation?.locationName) === "Ashburn VA") {
      // Load pricing strategy data
      const tiers = formatPricingTiers()
      setPricingTiers(tiers.map(tier => ({
        ...tier,
        details: {
          description: `${tier.frequency || ''} ${tier.ages ? `for ages ${tier.ages}` : ''}`.trim(),
          marketPosition: tier.type === 'core' ? 'Mid-band pricing to attract broad customer base' :
                          tier.type === 'premium' ? 'Premium tier for high-engagement families' :
                          'Supplemental revenue stream',
          assumptions: tier.type === 'core' ? ['90% monthly retention rate', '10% sibling discount applies'] :
                       tier.type === 'premium' ? ['Targets 10-15% of members', 'Unlimited access to all programs'] :
                       ['No membership required', 'Walk-in or pre-registration']
        }
      })))

      // Load financial projections
      const data = formatChartData(selectedScenario)
      setChartData(data)

      // Load discounts
      const discountData = getDiscountFramework()
      setDiscounts(discountData)

      // Load competitor data for positioning chart
      const competitorData = [
        { name: 'DDGA Ashburn', price: 148, value: 8.5, note: 'Premium positioning with Olympic brand' },
        { name: 'Little Gym', price: 135, value: 7, note: 'Established franchise, good programs' },
        { name: 'G-Force', price: 150, value: 6.5, note: 'Smaller facility, limited programs' },
        { name: 'Hope Gymnastics', price: 140, value: 8, note: 'Strong competitive focus' },
        { name: 'FitWize', price: 99, value: 5, note: 'Budget option, less specialized' },
        { name: 'Always In Motion', price: 140, value: 7.5, note: 'Ninja focus, unlimited option' },
        { name: 'HyperKidz', price: 90, value: 4, note: 'Play-based, not instruction' }
      ]
      setCompetitors(competitorData)
    }
  }, [enhancedLocation, selectedScenario])

  const isAshburn = (enhancedLocation?.name || enhancedLocation?.locationName) === "Ashburn VA"

  if (!isAshburn) {
    // Fallback to original simple display for non-Ashburn locations
    return (
      <div className="space-y-8 text-2xl pb-8">
        <div>
          <h3 className="font-semibold mb-4 text-2xl">Pricing & Unit Economics</h3>
          
          {/* Original simple display for non-Ashburn locations */}
          {(enhancedLocation as any)?._detailedData?.pricing?.membershipTiers ? (
            <div className="mb-6">
              <h4 className="font-medium mb-4 text-gray-800 text-lg">Membership Tiers</h4>
              <div className="overflow-hidden rounded-lg border">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-base font-medium text-gray-900">Program</th>
                      <th className="px-4 py-3 text-left text-base font-medium text-gray-900">Price</th>
                      <th className="px-4 py-3 text-left text-base font-medium text-gray-900">Duration</th>
                      <th className="px-4 py-3 text-left text-base font-medium text-gray-900">Rationale</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {(enhancedLocation as any)._detailedData.pricing.membershipTiers.map((item: any, index: number) => (
                      <tr 
                        key={index}
                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => setSelectedPricingItem({type: 'membershipTier', index})}
                      >
                        <td className="px-4 py-3 text-base font-medium">{item.program}</td>
                        <td className="px-4 py-3 text-base font-semibold text-green-600">{item.price}</td>
                        <td className="px-4 py-3 text-base text-gray-600">{item.duration}</td>
                        <td className="px-4 py-3 text-base text-gray-700">{item.brief}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : enhancedLocation.pricing && (
            <div className="mb-6">
              <h4 className="font-medium mb-3 text-gray-800">Pricing</h4>
              <div className="overflow-hidden rounded-lg border">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Program</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Price</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {enhancedLocation.pricing.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm">{item.program}</td>
                        <td className="px-4 py-2 text-sm font-medium">${item.price}</td>
                        <td className="px-4 py-2 text-sm">{item.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Unit Economics */}
          {(enhancedLocation as any)?._detailedData?.pricing?.unitEconomics && (
            <div>
              <h4 className="font-medium mb-3 text-gray-800">Unit Economics</h4>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries((enhancedLocation as any)._detailedData.pricing.unitEconomics).map(([key, metric]: [string, any]) => (
                  <div 
                    key={key}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md cursor-pointer transition-all"
                    onClick={() => setSelectedPricingItem({type: 'unitEconomic', key})}
                  >
                    <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                    <div className="text-sm font-medium text-gray-700 mb-2">{key.toUpperCase()}</div>
                    <div className="text-xs text-gray-600">{metric.brief}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Enhanced display for Ashburn location
  return (
    <div className="space-y-8 pb-8">
      {/* Section 1: Pricing Strategy Overview */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Pricing Strategy & Tiers</h2>
        {pricingTiers.length > 0 && <PricingTiersList tiers={pricingTiers} />}
      </div>

      {/* Section 2: Financial Performance Dashboard */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Financial Projections</h2>
        
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <MetricsCard
            title="Break-even"
            value="Month 8"
            subtitle="May 2026"
            trend="up"
            trendValue="On track"
          />
          <MetricsCard
            title="Target Students"
            value="400"
            subtitle="by May 2026"
            trend="up"
            trendValue="From 100 start"
          />
          <MetricsCard
            title="Avg Revenue/Student"
            value="$148"
            subtitle="per month"
            trend="neutral"
            trendValue="Market competitive"
          />
          <MetricsCard
            title="Initial Investment"
            value="$500k"
            subtitle="CapEx + Working Capital"
            trend="neutral"
            trendValue="~3 year payback"
          />
        </div>

        {/* Charts */}
        {chartData && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue & Profitability Projection</h3>
              <RevenueProjectionChart data={chartData.revenueChart} />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Enrollment Growth</h3>
                <EnrollmentGrowthChart data={chartData.enrollmentChart} />
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cash Flow Analysis</h3>
                <CashFlowChart data={chartData.cashFlowChart} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Structure Breakdown</h3>
              <CostBreakdownChart data={chartData.costBreakdown} />
            </div>
          </div>
        )}
      </div>

      {/* Section 3: Competitive Positioning */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Competitive Analysis</h2>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Price vs. Value Positioning</h3>
          <p className="text-sm text-gray-600 mb-4">
            DDGA Ashburn positioned as premium offering with superior value through Olympic brand, 
            state-of-the-art facility, and comprehensive program offerings.
          </p>
          {competitors.length > 0 && <CompetitivePosChart data={competitors} />}
        </div>
      </div>

      {/* Section 4: Unit Economics Deep Dive */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Unit Economics Analysis</h2>
        
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">LTV/CAC Ratio</h3>
            <LTVCACGauge ltv={980} cac={120} />
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Customer Acquisition Cost</span>
                <span className="font-semibold">$120</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Average Revenue Per User</span>
                <span className="font-semibold">$148/mo</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Lifetime Value</span>
                <span className="font-semibold">$980</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Payback Period</span>
                <span className="font-semibold">0.8 months</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Monthly Retention</span>
                <span className="font-semibold">90%</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Discount Framework</h3>
            <div className="space-y-3">
              {discounts.slice(0, 4).map((discount, idx) => (
                <div key={idx} className="pb-3 border-b border-gray-100 last:border-0">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{discount.type}</div>
                      <div className="text-xs text-gray-600 mt-1">{discount.impact}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}