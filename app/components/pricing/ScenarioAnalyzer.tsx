"use client"

import { useState, useEffect } from 'react'
import { getFinancialProjections, getMetricsComparison, calculateSensitivity, type ScenarioData } from '../../utils/financialData'
import { MetricsCard } from '../charts/FinancialCharts'

interface ScenarioAnalyzerProps {
  onScenarioChange?: (scenario: 'conservative' | 'base' | 'aggressive') => void
}

export default function ScenarioAnalyzer({ onScenarioChange }: ScenarioAnalyzerProps) {
  const [selectedScenario, setSelectedScenario] = useState<'conservative' | 'base' | 'aggressive'>('base')
  const [priceAdjustment, setPriceAdjustment] = useState(0)
  const [retentionAdjustment, setRetentionAdjustment] = useState(0)
  const [scenarioData, setScenarioData] = useState<ScenarioData | null>(null)
  const [adjustedMetrics, setAdjustedMetrics] = useState<any>(null)

  useEffect(() => {
    const projections = getFinancialProjections()
    const data = projections[selectedScenario === 'base' ? 'baseCase' : selectedScenario]
    setScenarioData(data)
    
    if (priceAdjustment !== 0 || retentionAdjustment !== 0) {
      const adjusted = calculateSensitivity(data, priceAdjustment, retentionAdjustment)
      const lastMonth = adjusted[adjusted.length - 1]
      setAdjustedMetrics({
        revenue: lastMonth.revenue,
        ebitda: lastMonth.ebitda,
        enrollment: lastMonth.enrollment
      })
    } else {
      setAdjustedMetrics(null)
    }
  }, [selectedScenario, priceAdjustment, retentionAdjustment])

  const handleScenarioChange = (scenario: 'conservative' | 'base' | 'aggressive') => {
    setSelectedScenario(scenario)
    setPriceAdjustment(0)
    setRetentionAdjustment(0)
    if (onScenarioChange) {
      onScenarioChange(scenario)
    }
  }

  const metrics = getMetricsComparison()

  const getScenarioColor = (scenario: string) => {
    switch (scenario) {
      case 'conservative': return 'bg-yellow-50 border-yellow-300 text-yellow-700'
      case 'base': return 'bg-blue-50 border-blue-300 text-blue-700'
      case 'aggressive': return 'bg-green-50 border-green-300 text-green-700'
      default: return 'bg-gray-50 border-gray-300 text-gray-700'
    }
  }

  const getScenarioDescription = (scenario: string) => {
    switch (scenario) {
      case 'conservative': 
        return 'Slower ramp, lower retention (85%), higher marketing costs'
      case 'base': 
        return 'Moderate growth, 90% retention, standard costs'
      case 'aggressive': 
        return 'Fast ramp, high retention (95%), optimized costs'
      default: 
        return ''
    }
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b bg-gray-50">
        <h3 className="font-bold text-xl text-gray-900">Financial Scenario Analysis</h3>
        <p className="text-sm text-gray-600 mt-1">
          Compare projections and adjust key variables
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          {/* Scenario Selector */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Select Scenario</h4>
            <div className="space-y-2">
              {(['conservative', 'base', 'aggressive'] as const).map((scenario) => (
                <button
                  key={scenario}
                  onClick={() => handleScenarioChange(scenario)}
                  className={`w-full p-3 rounded-lg border-2 transition-all ${
                    selectedScenario === scenario
                      ? getScenarioColor(scenario) + ' border-opacity-100'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <div className="font-semibold capitalize">{scenario}</div>
                      <div className="text-xs mt-1 opacity-80">
                        {getScenarioDescription(scenario)}
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      selectedScenario === scenario
                        ? scenario === 'conservative' ? 'bg-yellow-500' :
                          scenario === 'base' ? 'bg-blue-500' :
                          'bg-green-500'
                        : 'bg-gray-300'
                    }`} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          {scenarioData && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Month 8 Projections {adjustedMetrics && '(Adjusted)'}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <MetricsCard
                  title="Enrollment"
                  value={adjustedMetrics?.enrollment || scenarioData.enrollmentAtM8}
                  subtitle="students"
                  trend={selectedScenario === 'aggressive' ? 'up' : selectedScenario === 'conservative' ? 'down' : 'neutral'}
                  trendValue={`Target: 400`}
                />
                <MetricsCard
                  title="Revenue"
                  value={`$${((adjustedMetrics?.revenue || scenarioData.revenueAtM8) / 1000).toFixed(0)}k`}
                  subtitle="monthly"
                  trend={selectedScenario === 'aggressive' ? 'up' : selectedScenario === 'conservative' ? 'down' : 'neutral'}
                  trendValue={`${selectedScenario === 'aggressive' ? '+23%' : selectedScenario === 'conservative' ? '-25%' : 'baseline'}`}
                />
                <MetricsCard
                  title="EBITDA"
                  value={`$${((adjustedMetrics?.ebitda || scenarioData.ebitdaAtM8) / 1000).toFixed(1)}k`}
                  subtitle={scenarioData.ebitdaAtM8 > 0 ? 'profitable' : 'loss'}
                  trend={scenarioData.ebitdaAtM8 > 0 ? 'up' : 'down'}
                  trendValue={scenarioData.breakevenMonth}
                />
                <MetricsCard
                  title="Cash Need"
                  value={`$${Math.abs(scenarioData.cumulativeCashAtM8 / 1000).toFixed(0)}k`}
                  subtitle="cumulative"
                  trend="neutral"
                  trendValue={scenarioData.paybackPeriod}
                />
              </div>
            </div>
          )}

          {/* Sensitivity Analysis */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Sensitivity Analysis</h4>
            <div className="space-y-4">
              {/* Price Adjustment */}
              <div>
                <label className="text-xs font-medium text-gray-600">
                  Price Adjustment: {priceAdjustment > 0 ? '+' : ''}{priceAdjustment}%
                </label>
                <input
                  type="range"
                  min="-20"
                  max="20"
                  value={priceAdjustment}
                  onChange={(e) => setPriceAdjustment(Number(e.target.value))}
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>-20%</span>
                  <span>0%</span>
                  <span>+20%</span>
                </div>
              </div>

              {/* Retention Adjustment */}
              <div>
                <label className="text-xs font-medium text-gray-600">
                  Retention Adjustment: {retentionAdjustment > 0 ? '+' : ''}{retentionAdjustment}%
                </label>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  value={retentionAdjustment}
                  onChange={(e) => setRetentionAdjustment(Number(e.target.value))}
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>-10%</span>
                  <span>0%</span>
                  <span>+10%</span>
                </div>
              </div>

              {/* Reset Button */}
              {(priceAdjustment !== 0 || retentionAdjustment !== 0) && (
                <button
                  onClick={() => {
                    setPriceAdjustment(0)
                    setRetentionAdjustment(0)
                  }}
                  className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
                >
                  Reset to Baseline
                </button>
              )}
            </div>
          </div>

          {/* Scenario Comparison Table */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">All Scenarios Comparison</h4>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full text-xs">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-gray-700">Metric</th>
                    <th className="px-3 py-2 text-right font-medium text-gray-700">Cons.</th>
                    <th className="px-3 py-2 text-right font-medium text-gray-700">Base</th>
                    <th className="px-3 py-2 text-right font-medium text-gray-700">Aggr.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-3 py-2 text-gray-600">Students</td>
                    <td className="px-3 py-2 text-right">{metrics.enrollment.conservative}</td>
                    <td className="px-3 py-2 text-right font-medium">{metrics.enrollment.base}</td>
                    <td className="px-3 py-2 text-right">{metrics.enrollment.aggressive}</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-gray-600">Revenue</td>
                    <td className="px-3 py-2 text-right">${(metrics.revenue.conservative / 1000).toFixed(0)}k</td>
                    <td className="px-3 py-2 text-right font-medium">${(metrics.revenue.base / 1000).toFixed(0)}k</td>
                    <td className="px-3 py-2 text-right">${(metrics.revenue.aggressive / 1000).toFixed(0)}k</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-gray-600">EBITDA</td>
                    <td className="px-3 py-2 text-right text-red-600">
                      ${(metrics.ebitda.conservative / 1000).toFixed(1)}k
                    </td>
                    <td className="px-3 py-2 text-right font-medium">
                      ${(metrics.ebitda.base / 1000).toFixed(1)}k
                    </td>
                    <td className="px-3 py-2 text-right text-green-600">
                      ${(metrics.ebitda.aggressive / 1000).toFixed(1)}k
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-gray-600">Break-even</td>
                    <td className="px-3 py-2 text-right text-xs">{metrics.breakeven.conservative}</td>
                    <td className="px-3 py-2 text-right text-xs font-medium">{metrics.breakeven.base}</td>
                    <td className="px-3 py-2 text-right text-xs">{metrics.breakeven.aggressive}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Key Assumptions */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Key Assumptions</h4>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Initial CapEx:</span>
                <span className="font-medium">$500,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Rent:</span>
                <span className="font-medium">$37,600</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Revenue/Student:</span>
                <span className="font-medium">$148</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Direct Cost Ratio:</span>
                <span className="font-medium">15% of revenue</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Target Enrollment:</span>
                <span className="font-medium">400 students</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}