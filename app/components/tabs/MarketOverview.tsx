"use client"

import type { Location } from "../../data/locations"

interface MarketOverviewProps {
  location: Location
}

export default function MarketOverview({ location }: MarketOverviewProps) {
  const enhancedLocation = location as any

  return (
    <div className="space-y-6 text-xl pb-8">
      {/* Executive Summary */}
      {enhancedLocation.executive_summary && (
        <div> 
          <h4 className="font-semibold mb-3">Market Overview</h4>
          <div className="grid grid-cols-2 gap-4 text-base">
            {enhancedLocation.executive_summary.market_opportunity && (
              <div>
                <span className="text-gray-600">Children in Trade Area:</span>
                <span className="ml-2 font-medium">{enhancedLocation.executive_summary.market_opportunity.children_in_trade_area.toLocaleString()}</span>
              </div>
            )}
            {enhancedLocation.executive_summary.demographics?.median_household_income && (
              <div>
                <span className="text-gray-600">Median Income:</span>
                <span className="ml-2 font-medium">{enhancedLocation.executive_summary.demographics.median_household_income}</span>
              </div>
            )}
            {enhancedLocation.executive_summary.pricing_strategy?.membership_range && (
              <div>
                <span className="text-gray-600">Pricing Range:</span>
                <span className="ml-2 font-medium">{enhancedLocation.executive_summary.pricing_strategy.membership_range}</span>
              </div>
            )}
            {enhancedLocation.executive_summary.location_advantages?.traffic_count && (
              <div>
                <span className="text-gray-600">Daily Traffic:</span>
                <span className="ml-2 font-medium">{enhancedLocation.executive_summary.location_advantages.traffic_count}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Market Demographics */}
      {enhancedLocation.market_demographics && (
        <div>
          <h3 className="font-semibold mb-3">Market Demographics</h3>
          <div className="grid grid-cols-2 gap-4">
            {enhancedLocation.market_demographics.population_data && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h4 className="font-medium text-blue-800 mb-2">Population Data</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  {enhancedLocation.market_demographics.population_data["5_mile_radius"] && (
                    <div>5-mile radius: {enhancedLocation.market_demographics.population_data["5_mile_radius"].toLocaleString()}</div>
                  )}
                  {enhancedLocation.market_demographics.population_data["7_mile_children_0_14"] && (
                    <div>Children 0-14: {enhancedLocation.market_demographics.population_data["7_mile_children_0_14"].toLocaleString()}</div>
                  )}
                  {enhancedLocation.market_demographics.population_data.population_percentage && (
                    <div>Child percentage: {enhancedLocation.market_demographics.population_data.population_percentage}</div>
                  )}
                </div>
              </div>
            )}
            {enhancedLocation.market_demographics.income_spending && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <h4 className="font-medium text-green-800 mb-2">Income & Spending</h4>
                <div className="text-sm text-green-700 space-y-1">
                  {enhancedLocation.market_demographics.income_spending.ashburn_median_income && (
                    <div>Median Income: {enhancedLocation.market_demographics.income_spending.ashburn_median_income}</div>
                  )}
                  {enhancedLocation.market_demographics.income_spending.recreation_spending && (
                    <div>Recreation Spending: {enhancedLocation.market_demographics.income_spending.recreation_spending}</div>
                  )}
                  {enhancedLocation.market_demographics.income_spending.poverty_rate && (
                    <div>Poverty Rate: {enhancedLocation.market_demographics.income_spending.poverty_rate}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}