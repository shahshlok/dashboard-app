"use client"

import { useState, useEffect } from "react"
import type { Location } from "../../data/locations"
import { 
  formatCompetitors, 
  getMarketInsights, 
  getCompetitionSummary 
} from "../../utils/competitionData"
import CompetitorCard from "../competition/CompetitorCard"
import MarketInsightsCard from "../competition/MarketInsightsCard"

interface CompetitionProps {
  location: Location
}

export default function Competition({ location }: CompetitionProps) {
  const enhancedLocation = location as any
  const [competitors, setCompetitors] = useState<any[]>([])
  const [marketInsights, setMarketInsights] = useState<any[]>([])
  const [competitionSummary, setCompetitionSummary] = useState<any>(null)
  const [filterType, setFilterType] = useState<string>("all")

  useEffect(() => {
    // Only load data from JSON for Ashburn location
    if ((enhancedLocation?.name || enhancedLocation?.locationName) === "Ashburn VA") {
      const competitorData = formatCompetitors()
      setCompetitors(competitorData)
      
      const insights = getMarketInsights()
      setMarketInsights(insights)
      
      const summary = getCompetitionSummary()
      setCompetitionSummary(summary)
    }
  }, [enhancedLocation])

  const isAshburn = (enhancedLocation?.name || enhancedLocation?.locationName) === "Ashburn VA"

  // Filter competitors by type
  const filteredCompetitors = filterType === "all" 
    ? competitors 
    : competitors.filter(c => c.type.toLowerCase().includes(filterType.toLowerCase()))

  // Get unique competitor types for filter
  const competitorTypes = [...new Set(competitors.map(c => c.type))].sort()

  if (!isAshburn) {
    // Fallback to original simple display for non-Ashburn locations
    return (
      <div className="space-y-8 text-2xl pb-8">
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

  // Enhanced display for Ashburn location using JSON data
  return (
    <div className="space-y-8 pb-8">
      {/* Introduction */}
      {competitionSummary && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Competitor Landscape Analysis</h2>
          <p className="text-base text-gray-700 leading-relaxed">
            {competitionSummary.introduction}
          </p>
        </div>
      )}

      {/* Filter Buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-base font-medium text-gray-700">Filter by type:</span>
        <button
          onClick={() => setFilterType("all")}
          className={`px-4 py-2 rounded-lg text-base font-medium transition-colors ${
            filterType === "all" 
              ? "bg-blue-600 text-white" 
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All ({competitors.length})
        </button>
        {competitorTypes.map(type => (
          <button
            key={type}
            onClic
            ={() => setFilterType(type)}
            className={`px-4 py-2 rounded-lg text-base font-medium transition-colors ${
              filterType === type 
                ? "bg-blue-600 text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {type} ({competitors.filter(c => c.type === type).length})
          </button>
        ))}
      </div>

      {/* Competitors Grid */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          Direct Competitors & Alternatives
          <span className="ml-2 text-base font-normal text-gray-600">
            ({filteredCompetitors.length} {filterType !== "all" ? `${filterType} ` : ""}competitors within 10 miles)
          </span>
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCompetitors.map((competitor, index) => (
            <CompetitorCard key={index} {...competitor} />
          ))}
        </div>
      </div>

      {/* Market Insights */}
      {marketInsights.length > 0 && competitionSummary && (
        <MarketInsightsCard 
          insights={marketInsights}
          summary={competitionSummary.summary}
          conclusion={competitionSummary.conclusion}
        />
      )}

      {/* Sources Note */}
      {competitionSummary?.sourcesNote && (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="text-base font-medium text-gray-700 mb-2">Data Sources</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            {competitionSummary.sourcesNote}
          </p>
        </div>
      )}
    </div>
  )
}