"use client"

import type { Location } from "../../data/locations"

interface CompetitionProps {
  location: Location
}

export default function Competition({ location }: CompetitionProps) {
  const enhancedLocation = location as any

  return (
    <div className="space-y-8 text-2xl pb-8">
      {/* Detailed Competitor Analysis */}
      {enhancedLocation.competitor_analysis?.direct_competitors ? (
        <div>
          <h3 className="font-semibold mb-4 text-2xl">Detailed Competitor Analysis</h3>
          <div className="space-y-6">
            {enhancedLocation.competitor_analysis.direct_competitors.map((competitor: any, index: number) => (
              <div key={index} className="border rounded-lg p-5 bg-white">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-medium text-xl">{competitor.name}</div>
                    <div className="text-base text-gray-600">{competitor.location} • {competitor.distance}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600 text-lg">{competitor.pricing.split(';')[0]}</div>
                  </div>
                </div>
                <div className="text-base text-gray-700 mb-3">
                  <strong>Focus:</strong> {competitor.focus}
                </div>
                <div className="text-sm text-green-700 bg-green-50 p-2 rounded">
                  <strong>Strengths:</strong> {competitor.strengths}
                </div>
              </div>
            ))}
            {enhancedLocation.competitor_analysis.market_insights && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h4 className="font-medium text-blue-800 mb-2">Market Insights</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <div><strong>Pricing Range:</strong> {enhancedLocation.competitor_analysis.market_insights.pricing_range}</div>
                  <div><strong>Market Gap:</strong> {enhancedLocation.competitor_analysis.market_insights.market_gap}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : enhancedLocation.competitors && (
        <div>
          <h3 className="font-semibold mb-3">Competitors</h3>
          <div className="space-y-2">
            {enhancedLocation.competitors.map((competitor: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{competitor.name}</div>
                  <div className="text-sm text-gray-600">{competitor.distance} miles away</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${competitor.price}/mo</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}