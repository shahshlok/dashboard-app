"use client"

import { useState } from "react"
import type { Location } from "../data/locations"
import { goNoGoScore } from "../utils/goNoGoScore"

interface TileCardProps {
  location: Location
  onClick: () => void
}

export default function TileCard({ location, onClick }: TileCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const isActive = location.status === "Active"
  const isPlanned = location.status === "Planned"
  
  // Calculate score for planned locations
  const scoreResult = isPlanned ? goNoGoScore(location) : null
  
  const displayNumber = isActive ? location.students : (isPlanned ? scoreResult?.totalScore ?? 0 : location.targetStudents)
  const numberLabel = isActive ? "Students" : (isPlanned ? "Viability Score" : "Target Students")

  // Generate SVG sparkline
  const sparklinePoints = location.sparklineData
    .map((value, index) => {
      const x = (index / (location.sparklineData.length - 1)) * 80
      const maxValue = Math.max(...location.sparklineData)
      const y = 24 - (value / maxValue) * 24
      return `${x},${y}`
    })
    .join(" ")

  // Extract key metrics from strategy data
  const getKeyMetrics = () => {
    if (location.executive_summary) {
      return {
        childrenInArea: location.executive_summary.market_opportunity?.children_in_trade_area?.toLocaleString() || 'N/A',
        tradeRadius: location.executive_summary.market_opportunity?.trade_area_radius || 'N/A',
        medianIncome: location.executive_summary.demographics?.median_household_income || 'N/A',
        ltv: location.executive_summary.pricing_strategy?.lifetime_value || `$${location.ltv}`,
        trafficCount: location.executive_summary.location_advantages?.traffic_count || 'N/A'
      }
    }
    return {
      childrenInArea: 'N/A',
      tradeRadius: 'N/A', 
      medianIncome: 'N/A',
      ltv: `$${location.ltv}`,
      trafficCount: 'N/A'
    }
  }

  const metrics = getKeyMetrics()

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bg-white rounded-xl shadow-sm border cursor-pointer transition-all duration-300 overflow-hidden ${
        isHovered ? "shadow-xl -translate-y-1 border-gray-300" : "hover:shadow-md"
      }`}
    >
      {/* Header ribbon with gradient */}
      <div className={`h-3 rounded-t-xl bg-gradient-to-r ${
        isActive 
          ? "from-emerald-500 to-emerald-600" 
          : isPlanned && scoreResult?.riskLevel === "Exceptional"
            ? "from-purple-500 to-purple-600"
            : isPlanned && scoreResult?.riskLevel === "Strong"
              ? "from-green-500 to-green-600"
              : isPlanned && scoreResult?.riskLevel === "Viable"
                ? "from-yellow-500 to-yellow-600"
                : isPlanned && scoreResult?.riskLevel === "High-Risk"
                  ? "from-orange-500 to-orange-600"
                  : isPlanned && scoreResult?.riskLevel === "Avoid"
                    ? "from-red-500 to-red-600"
                    : "from-slate-400 to-slate-500"
      }`} />

      <div className="p-5">
        {/* Location name and status */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 text-lg">{location.name}</h3>
          <div className="flex items-center gap-2">
            {isPlanned ? (
              <div 
                className={`px-3 py-1 rounded-full text-xs font-bold cursor-help relative group ${
                  scoreResult?.riskLevel === "Exceptional" 
                    ? "bg-purple-100 text-purple-800"
                    : scoreResult?.riskLevel === "Strong"
                      ? "bg-green-100 text-green-800"
                      : scoreResult?.riskLevel === "Viable"
                        ? "bg-yellow-100 text-yellow-800"
                        : scoreResult?.riskLevel === "High-Risk"
                          ? "bg-orange-100 text-orange-800"
                          : scoreResult?.riskLevel === "Avoid"
                            ? "bg-red-100 text-red-800"
                            : "bg-slate-100 text-slate-600"
                }`}
                title={scoreResult?.explanation}
              >
                {scoreResult?.riskLevel || "N/A"}
                {scoreResult && (
                  <div className="invisible group-hover:visible absolute bottom-full right-0 mb-2 w-80 p-4 bg-white border border-gray-200 text-gray-900 text-xs rounded-lg shadow-xl z-20">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                      <div className="font-bold text-sm">{scoreResult.riskLevel}</div>
                      <div className="text-xs text-gray-500">{Math.round(scoreResult.totalScore)}/100</div>
                    </div>

                    {/* 1. Performance & Unit Economics */}
                    <div className="mb-3">
                      <div className="font-semibold text-xs text-gray-700 mb-2">Performance & Unit Economics</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div><span className="text-gray-500">CAC:</span> <span className="font-medium">${location.cac}</span></div>
                        <div><span className="text-gray-500">LTV:</span> <span className="font-medium">${location.ltv}</span></div>
                        <div><span className="text-gray-500">Capacity:</span> <span className="font-medium">{location.students || 0} / {location.targetStudents || 'TBD'}</span></div>
                        <div><span className="text-gray-500">Break-even:</span> <span className="font-medium">
                          {location.executive_summary?.pricing_strategy?.payback_period || '2-3 months'}
                        </span></div>
                      </div>
                    </div>

                    {/* 2. Market Profile */}
                    <div className="mb-3">
                      <div className="font-semibold text-xs text-gray-700 mb-2">Market Profile</div>
                      <div className="space-y-1 text-xs">
                        <div><span className="text-gray-500">Trade Area:</span> <span className="font-medium">
                          {location.executive_summary?.market_opportunity?.trade_area_radius || '7 miles'}
                        </span></div>
                        <div><span className="text-gray-500">Children 0-14:</span> <span className="font-medium">
                          {(location.executive_summary?.market_opportunity?.children_in_trade_area || 
                            location.market_demographics?.population_data?.["7_mile_children_0_14"] || 0).toLocaleString()}
                          {location.market_demographics?.population_data?.population_percentage && 
                            ` (${location.market_demographics.population_data.population_percentage})`}
                        </span></div>
                        <div><span className="text-gray-500">Household Type:</span> <span className="font-medium">
                          {location.market_demographics?.household_composition?.family_formation || 
                           'High family formation rates'}
                        </span></div>
                      </div>
                    </div>

                    {/* 3. Financial Assumptions */}
                    <div className="mb-3">
                      <div className="font-semibold text-xs text-gray-700 mb-2">Financial Assumptions</div>
                      <div className="space-y-1 text-xs">
                        <div><span className="text-gray-500">Pricing:</span> <span className="font-medium">
                          {(location.executive_summary?.pricing_strategy?.membership_range || 'TBD')
                            .toString().replace(/roughly from |per month/g, '').trim()}
                        </span></div>
                        <div><span className="text-gray-500">HH Income:</span> <span className="font-medium">
                          {(location.executive_summary?.demographics?.median_household_income || 
                            location.market_demographics?.income_spending?.ashburn_median_income || 'N/A')
                            .toString().replace(/approximately |~|\(ACS.*?\)/g, '').trim()}
                        </span></div>
                        <div><span className="text-gray-500">Lease Rate:</span> <span className="font-medium">
                          ${location.real_estate_evaluation?.lease_terms?.base_rent || location.leasePerSqFt || 'TBD'}/sqft
                          {location.real_estate_evaluation?.lease_terms?.nnn_estimate && 
                            ` (NNN ${location.real_estate_evaluation.lease_terms.nnn_estimate})`}
                        </span></div>
                      </div>
                    </div>

                    {/* 4. Site Viability Drivers */}
                    <div className="mb-3">
                      <div className="font-semibold text-xs text-gray-700 mb-2">Site Viability Drivers</div>
                      <div className="space-y-1 text-xs">
                        <div><span className="text-gray-500">Daily Traffic:</span> <span className="font-medium">
                          {(location.executive_summary?.location_advantages?.traffic_count || 
                            location.real_estate_evaluation?.traffic_data?.route_7 || 'N/A')
                            .toString().replace(/~|over |nearby/g, '').trim()}
                        </span></div>
                        <div><span className="text-gray-500">Competitors:</span> <span className="font-medium">
                          {(location.competitor_analysis?.direct_competitors || []).length} within 7 miles
                        </span></div>
                        <div><span className="text-gray-500">Seasonality:</span> <span className="font-medium">
                          {location.seasonal_considerations?.summer_challenge?.clarksburg_data || 
                           '~25% summer enrollment drop'}
                        </span></div>
                      </div>
                    </div>

                    {/* 5. Quick Flags & Next Steps */}
                    <div className="pt-2 border-t border-gray-100">
                      <div className="space-y-2 text-xs">
                        <div>
                          <span className="text-red-600 font-medium">Risk:</span> 
                          <span className="ml-1">
                            {scoreResult.breakdown.financialViability.rentRatio > 25 ? 
                              'High rent-to-revenue ratio' : 
                              'Competitive market dynamics'}
                          </span>
                        </div>
                        <div>
                          <span className="text-green-600 font-medium">Opportunity:</span> 
                          <span className="ml-1">
                            {location.executive_summary?.competition_gap?.unique_offering?.includes('no competitor') ?
                              'First-mover advantage in trade area' :
                              'Premium demographic targeting'}
                          </span>
                        </div>
                        <div className="pt-2">
                          <button className="w-full bg-gray-900 text-white px-3 py-2 rounded-md text-xs font-medium hover:bg-gray-800 transition-colors">
                            View Full Analysis →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className={`w-2 h-2 rounded-full ${
                  isActive ? "bg-emerald-500" : "bg-slate-400"
                }`} />
                <span className={`text-xs font-medium ${
                  isActive ? "text-emerald-700" : "text-slate-600"
                }`}>
                  {location.status}
                </span>
              </>
            )}
          </div>
        </div>

{isPlanned ? (
          /* Planned Location Layout - Key Market Metrics */
          <div className="space-y-4">
            {/* Market Size - Primary focal point */}
            <div className="text-center pb-4 border-b border-gray-100">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {(location.executive_summary?.market_opportunity?.children_in_trade_area || 
                  location.market_demographics?.population_data?.["7_mile_children_0_14"] || 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Children in Trade Area</div>
            </div>

            {/* Key Market Indicators - Grid */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              {/* Spending Power */}
              <div>
                <div className="text-xs text-gray-500 mb-1">Median Income</div>
                <div className="font-semibold text-gray-900">
                  {(location.executive_summary?.demographics?.median_household_income || 
                    location.market_demographics?.income_spending?.ashburn_median_income || 'N/A')
                    .toString().replace(/approximately |~|\(ACS.*?\)/g, '').trim()}
                </div>
              </div>

              {/* Revenue Potential */}
              <div>
                <div className="text-xs text-gray-500 mb-1">Pricing Range</div>
                <div className="font-semibold text-gray-900">
                  {(location.executive_summary?.pricing_strategy?.membership_range || 'N/A')
                    .toString().replace(/roughly from |per month/g, '').trim()}
                </div>
              </div>

              {/* Location Quality */}
              <div className="col-span-2">
                <div className="text-xs text-gray-500 mb-1">Daily Traffic</div>
                <div className="font-semibold text-gray-900">
                  {(location.executive_summary?.location_advantages?.traffic_count || 
                    location.real_estate_evaluation?.traffic_data?.route_7 || 'N/A')
                    .toString().replace(/~|over |nearby/g, '').trim()}
                </div>
              </div>
            </div>

            {/* Viability Score Bar */}
            {scoreResult && (
              <div className="pt-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs text-gray-500">Viability Score</div>
                  <div className="text-xs font-medium text-gray-700">
                    {Math.round(scoreResult.totalScore)}/100
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      scoreResult.riskLevel === "Exceptional" 
                        ? "bg-purple-500"
                        : scoreResult.riskLevel === "Strong"
                          ? "bg-green-500"
                          : scoreResult.riskLevel === "Viable"
                            ? "bg-yellow-500"
                            : scoreResult.riskLevel === "High-Risk"
                              ? "bg-orange-500"
                              : "bg-red-500"
                    }`}
                    style={{ width: `${Math.min(scoreResult.totalScore, 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Active Location Layout - Original Design */
          <>
            <div className="mb-5">
              <div className="flex items-baseline gap-2 mb-1">
                <div className="text-3xl font-bold text-gray-900">{displayNumber.toLocaleString()}</div>
                {location.targetStudents && (
                  <div className="text-sm text-gray-500">/ {location.targetStudents.toLocaleString()}</div>
                )}
              </div>
              <div className="text-sm font-medium text-gray-600">{numberLabel}</div>
              {/* Progress bar for active locations */}
              {location.targetStudents && (
                <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((location.students / location.targetStudents) * 100, 100)}%` }}
                  />
                </div>
              )}
            </div>

            {/* Enhanced sparkline with area fill */}
            <div className="mb-5">
              <div className="text-xs text-gray-500 mb-2">Growth Trend</div>
              <svg width="100%" height="28" className="w-full">
                <defs>
                  <linearGradient id={`gradient-${location.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                <polygon
                  points={`0,28 ${sparklinePoints} 80,28`}
                  fill={`url(#gradient-${location.id})`}
                />
                <polyline
                  points={sparklinePoints}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Base KPIs - always visible */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-gray-600 text-xs font-medium">CAC</div>
                <div className="font-bold text-gray-900">${location.cac}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-gray-600 text-xs font-medium">LTV</div>
                <div className="font-bold text-gray-900">{metrics.ltv}</div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Expanded section on hover */}
      <div className={`transition-all duration-300 overflow-hidden ${
        isHovered ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className="border-t border-gray-100 p-5 bg-gray-50 space-y-4">
          
          {isPlanned ? (
            /* Planned Location - Four Key Panels */
            <>
              {/* Four Quick Panels */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                
                {/* 1. Unit Economics */}
                <div>
                  <div className="font-semibold text-gray-800 mb-1">Unit Economics</div>
                  <div className="text-gray-700 space-y-1">
                    <div><span className="font-medium">${location.cac}</span> CAC</div>
                    <div><span className="font-medium">${location.ltv}</span> LTV</div>
                  </div>
                </div>

                {/* 2. Competitive Density */}
                <div>
                  <div className="font-semibold text-gray-800 mb-1">Competitive Density</div>
                  <div className="text-gray-700">
                    <span className="font-medium">{(location.competitor_analysis?.direct_competitors || []).length} centers</span> within 7 mi
                  </div>
                </div>

                {/* 3. Seasonality */}
                <div>
                  <div className="font-semibold text-gray-800 mb-1">Seasonality</div>
                  <div className="text-gray-700">
                    <span className="font-medium">–25%</span> summer dip
                  </div>
                </div>

                {/* 4. Risk & Opportunity */}
                <div>
                  <div className="font-semibold text-gray-800 mb-1">Risk & Opportunity</div>
                  <div className="text-gray-700 space-y-1">
                    <div className="text-xs">
                      <span className="text-red-600">Risk:</span> {scoreResult && scoreResult.breakdown.financialViability.rentRatio > 25 ? 'High lease costs' : 'Local after-school niche'}
                    </div>
                    <div className="text-xs">
                      <span className="text-green-600">Opp:</span> {location.executive_summary?.competition_gap?.unique_offering?.includes('no competitor') ? 'First-mover advantage' : 'Corporate pipeline'}
                    </div>
                  </div>
                </div>

              </div>
            </>
          ) : (
            /* Active Location - Original Market Insights */
            <>
              <div className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">Market Insights</div>
              
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Children in Trade Area</span>
                  <span className="font-semibold text-gray-900">{metrics.childrenInArea}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Trade Area Radius</span>
                  <span className="font-semibold text-gray-900">{metrics.tradeRadius}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Median HH Income</span>
                  <span className="font-semibold text-gray-900">{metrics.medianIncome}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Lease Rate</span>
                  <span className="font-semibold text-gray-900">${location.leasePerSqFt}/sq ft</span>
                </div>
                {metrics.trafficCount !== 'N/A' && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Daily Traffic</span>
                    <span className="font-semibold text-gray-900">{metrics.trafficCount}</span>
                  </div>
                )}
              </div>
            </>
          )}
          
          {/* Action indicator */}
          <div className="mt-4 flex items-center justify-center text-xs text-gray-500">
            <span>Click for detailed analysis</span>
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}