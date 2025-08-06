"use client"

import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
import type { Location } from "../data/locations"
import { loadAshburnDetailedData, mergeAshburnData, type AshburnDetailedData } from "../utils/locationData"
import MapPane from "./MapPane"

interface LocationModalProps {
  location: Location | null
  isOpen: boolean
  onClose: () => void
}

export default function LocationModal({ location, isOpen, onClose }: LocationModalProps) {
  const [enhancedLocation, setEnhancedLocation] = useState<Location | null>(location)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSwotCategory, setSelectedSwotCategory] = useState<'strengths' | 'weaknesses' | 'opportunities' | 'threats' | null>(null)
  const [selectedPricingItem, setSelectedPricingItem] = useState<{type: 'membershipTier' | 'unitEconomic', index?: number, key?: string} | null>(null)

  // Utility function to render citations
  const renderCitation = (citationNumber: number | undefined, className: string = "text-xs text-gray-500 mt-1") => {
    if (!citationNumber || !enhancedLocation) return null;
    
    const detailedData = (enhancedLocation as any)._detailedData;
    const citationRef = detailedData?.citationReferences?.[citationNumber.toString()];
    
    if (!citationRef) return null;
    
    return (
      <div className={className}>
        <div className="flex items-start gap-1">
          <span className="text-gray-400">📖</span>
          <div className="flex-1">
            <div className="text-gray-600">{citationRef.source}</div>
            {citationRef.url ? (
              <a 
                href={citationRef.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline text-xs break-all"
              >
                {citationRef.title}
              </a>
            ) : citationRef.note ? (
              <span className="italic text-xs">{citationRef.note}</span>
            ) : (
              <span className="text-xs">{citationRef.title}</span>
            )}
          </div>
        </div>
      </div>
    );
  };


  // Load detailed data for Ashburn location
  useEffect(() => {
    if (!location || !isOpen) {
      setEnhancedLocation(location)
      return
    }

    if ((location.name || location.locationName) === "Ashburn VA") {
      setIsLoading(true)
      loadAshburnDetailedData().then(detailedData => {
        const merged = mergeAshburnData(location, detailedData)
        setEnhancedLocation(merged)
        setIsLoading(false)
      }).catch(error => {
        console.warn('Failed to load detailed Ashburn data:', error)
        setEnhancedLocation(location)
        setIsLoading(false)
      })
    } else {
      setEnhancedLocation(location)
    }
  }, [location, isOpen])

  if (!enhancedLocation) return null

  const capacityPercentage =
    enhancedLocation.status === "Active" ? Math.round((enhancedLocation.students / enhancedLocation.targetStudents) * 100) : 0

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto text-xl">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-[90vw] h-[90vh] bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="flex h-full">
                  {/* Left Panel - 70% */}
                  <div className="w-[70%] flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b">
                      <Dialog.Title className="text-xl font-semibold">
                        {enhancedLocation.name || enhancedLocation.locationName} - {enhancedLocation.status}
                        {isLoading && <span className="ml-2 text-sm text-gray-500">(Loading...)</span>}
                      </Dialog.Title>
                      <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100"
                        type="button"
                      >
                        <span className="sr-only">Close</span>
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xl">
                      <div>
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
                      </div>

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

                      {/* Real Estate */}
                      {enhancedLocation.real_estate_evaluation && (
                        <div>
                          <h3 className="font-semibold mb-3">Real Estate</h3>
                          <div className="grid grid-cols-2 gap-4">
                            {enhancedLocation.real_estate_evaluation.location_details && (
                              <div className="bg-gray-50 rounded-lg p-3">
                                <h4 className="font-medium mb-2">Location Details</h4>
                                <div className="text-sm space-y-1">
                                  {enhancedLocation.real_estate_evaluation.location_details.address && (
                                    <div><span className="text-gray-600">Address:</span> {enhancedLocation.real_estate_evaluation.location_details.address}</div>
                                  )}
                                  {enhancedLocation.real_estate_evaluation.location_details.square_footage && (
                                    <div><span className="text-gray-600">Size:</span> {enhancedLocation.real_estate_evaluation.location_details.square_footage.toLocaleString()} sq ft</div>
                                  )}
                                  {enhancedLocation.real_estate_evaluation.location_details.previous_tenant && (
                                    <div><span className="text-gray-600">Previous:</span> {enhancedLocation.real_estate_evaluation.location_details.previous_tenant}</div>
                                  )}
                                </div>
                              </div>
                            )}
                            {enhancedLocation.real_estate_evaluation.lease_terms && (
                              <div className="bg-gray-50 rounded-lg p-3">
                                <h4 className="font-medium mb-2">Lease Terms</h4>
                                <div className="text-sm space-y-1">
                                  {enhancedLocation.real_estate_evaluation.lease_terms.base_rent && 
                                    <div><span className="text-gray-600">Base Rent:</span> {enhancedLocation.real_estate_evaluation.lease_terms.base_rent}</div>
                                  }
                                  {enhancedLocation.real_estate_evaluation.lease_terms.escalator && 
                                    <div><span className="text-gray-600">Escalator:</span> {enhancedLocation.real_estate_evaluation.lease_terms.escalator}</div>
                                  }
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* SWOT Analysis */}
                      <div>
                        <h3 className="font-semibold mb-3">SWOT Analysis</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div 
                            className="bg-green-50 border border-green-200 rounded-lg p-3 cursor-pointer transition-all duration-300 ease-out hover:shadow-lg hover:shadow-green-200/50 hover:-translate-y-1 hover:scale-[1.02] hover:bg-green-100 hover:border-green-300"
                            onClick={() => setSelectedSwotCategory(selectedSwotCategory === 'strengths' ? null : 'strengths')}
                          >
                            <h4 className="font-medium text-green-800 mb-2">
                              Strengths
                            </h4>
                            <ul className="text-sm text-green-700 space-y-1">
                              {enhancedLocation.swot.strengths.map((item, index) => (
                                <li key={index}>
                                  • {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div 
                            className="bg-red-50 border border-red-200 rounded-lg p-3 cursor-pointer transition-all duration-300 ease-out hover:shadow-lg hover:shadow-red-200/50 hover:-translate-y-1 hover:scale-[1.02] hover:bg-red-100 hover:border-red-300"
                            onClick={() => setSelectedSwotCategory(selectedSwotCategory === 'weaknesses' ? null : 'weaknesses')}
                          >
                            <h4 className="font-medium text-red-800 mb-2">
                              Weaknesses
                            </h4>
                            <ul className="text-sm text-red-700 space-y-1">
                              {enhancedLocation.swot.weaknesses.map((item, index) => (
                                <li key={index}>
                                  • {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div 
                            className="bg-blue-50 border border-blue-200 rounded-lg p-3 cursor-pointer transition-all duration-300 ease-out hover:shadow-lg hover:shadow-blue-200/50 hover:-translate-y-1 hover:scale-[1.02] hover:bg-blue-100 hover:border-blue-300"
                            onClick={() => setSelectedSwotCategory(selectedSwotCategory === 'opportunities' ? null : 'opportunities')}
                          >
                            <h4 className="font-medium text-blue-800 mb-2">
                              Opportunities
                            </h4>
                            <ul className="text-sm text-blue-700 space-y-1">
                              {enhancedLocation.swot.opportunities.map((item, index) => (
                                <li key={index}>
                                  • {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div 
                            className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 cursor-pointer transition-all duration-300 ease-out hover:shadow-lg hover:shadow-yellow-200/50 hover:-translate-y-1 hover:scale-[1.02] hover:bg-yellow-100 hover:border-yellow-300"
                            onClick={() => setSelectedSwotCategory(selectedSwotCategory === 'threats' ? null : 'threats')}
                          >
                            <h4 className="font-medium text-yellow-800 mb-2">
                              Threats
                            </h4>
                            <ul className="text-sm text-yellow-700 space-y-1">
                              {enhancedLocation.swot.threats.map((item, index) => (
                                <li key={index}>
                                  • {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Pricing & Unit Economics */}
                      <div>
                        <h3 className="font-semibold mb-3">Pricing & Unit Economics</h3>
                        
                        {/* Membership Tiers */}
                        {(enhancedLocation as any)?._detailedData?.pricing?.membershipTiers ? (
                          <div className="mb-6">
                            <h4 className="font-medium mb-3 text-gray-800">Membership Tiers</h4>
                            <div className="overflow-hidden rounded-lg border">
                              <table className="w-full">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Program</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Price</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Duration</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Rationale</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                  {(enhancedLocation as any)._detailedData.pricing.membershipTiers.map((item, index) => (
                                    <tr 
                                      key={index}
                                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                                      onClick={() => setSelectedPricingItem({type: 'membershipTier', index})}
                                    >
                                      <td className="px-4 py-2 text-sm font-medium">{item.program}</td>
                                      <td className="px-4 py-2 text-sm font-semibold text-green-600">{item.price}</td>
                                      <td className="px-4 py-2 text-sm text-gray-600">{item.duration}</td>
                                      <td className="px-4 py-2 text-sm text-gray-700">{item.brief}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ) : (
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
                                  {enhancedLocation.pricing.map((item, index) => (
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

                      {/* Detailed Competitor Analysis */}
                      {enhancedLocation.competitor_analysis?.direct_competitors ? (
                        <div>
                          <h3 className="font-semibold mb-3">Detailed Competitor Analysis</h3>
                          <div className="space-y-4">
                            {enhancedLocation.competitor_analysis.direct_competitors.map((competitor, index) => (
                              <div key={index} className="border rounded-lg p-4 bg-white">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <div className="font-medium text-lg">{competitor.name}</div>
                                    <div className="text-sm text-gray-600">{competitor.location} • {competitor.distance}</div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-semibold text-green-600">{competitor.pricing.split(';')[0]}</div>
                                  </div>
                                </div>
                                <div className="text-sm text-gray-700 mb-2">
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
                      ) : (
                        <div>
                          <h3 className="font-semibold mb-3">Competitors</h3>
                          <div className="space-y-2">
                            {enhancedLocation.competitors.map((competitor, index) => (
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

                      {/* Actionable Recommendations */}
                      {enhancedLocation.actionable_recommendations ? (
                        <div>
                          <h3 className="font-semibold mb-3">Actionable Recommendations</h3>
                          <div className="space-y-4">
                            {enhancedLocation.actionable_recommendations
                              .sort((a, b) => a.priority - b.priority)
                              .map((rec, index) => (
                                <div key={index} className="border rounded-lg p-4 bg-white">
                                  <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                                          rec.priority === 1 ? 'bg-red-100 text-red-800' :
                                          rec.priority === 2 ? 'bg-orange-100 text-orange-800' :
                                          rec.priority === 3 ? 'bg-yellow-100 text-yellow-800' :
                                          'bg-gray-100 text-gray-800'
                                        }`}>
                                          Priority {rec.priority}
                                        </span>
                                        <span className="font-medium">{rec.action}</span>
                                      </div>
                                      <div className="text-sm text-gray-700 mb-2">{rec.description}</div>
                                      <div className="text-xs text-gray-600 mb-2">
                                        <strong>Owner:</strong> {rec.owner} • <strong>Timeline:</strong> {rec.timeline}
                                      </div>
                                      <div className="text-xs">
                                        <strong>KPIs:</strong>
                                        <ul className="mt-1 space-y-1">
                                          {rec.kpis.map((kpi, kpiIndex) => (
                                            <li key={kpiIndex} className="text-gray-600">• {kpi}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <h3 className="font-semibold mb-3">Action Plan Timeline</h3>
                          <div className="space-y-3">
                            {enhancedLocation.actionPlan.map((action, index) => (
                              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex-1">
                                  <div className="font-medium">{action.task}</div>
                                  <div className="text-sm text-gray-600">Owner: {action.owner}</div>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium">{action.weeks} weeks</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Panel - 30% */}
                  <div className="w-[30%] border-l">
                    {selectedPricingItem && (enhancedLocation?.name || enhancedLocation?.locationName) === "Ashburn VA" && (enhancedLocation as any)?._detailedData ? (
                      <div className="p-6 h-full overflow-y-auto">
                        <div className="mb-6">
                          <button 
                            onClick={() => setSelectedPricingItem(null)}
                            className="text-gray-400 hover:text-gray-600 float-right p-1 hover:bg-gray-100 rounded"
                          >
                            ✕
                          </button>
                          <div className="mb-4">
                            <h3 className="font-bold text-xl mb-1 text-gray-900">
                              {selectedPricingItem.type === 'membershipTier' 
                                ? `${(enhancedLocation as any)._detailedData.pricing.membershipTiers[selectedPricingItem.index!].program} Analysis`
                                : `${selectedPricingItem.key!.toUpperCase()} Breakdown`
                              }
                            </h3>
                            <p className="text-sm text-gray-600">
                              {selectedPricingItem.type === 'membershipTier' 
                                ? 'Detailed pricing methodology and rationale'
                                : 'Unit economics calculation and assumptions'
                              }
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          {(() => {
                            if (selectedPricingItem.type === 'membershipTier') {
                              const tier = (enhancedLocation as any)._detailedData.pricing.membershipTiers[selectedPricingItem.index!];
                              const detail = tier.detail;
                              
                              return (
                                <div className="space-y-6">
                                  {/* Summary */}
                                  <div className="bg-white border border-gray-200 rounded-lg p-5">
                                    <h4 className="font-semibold text-base text-gray-900 mb-3">Summary</h4>
                                    <p className="text-sm text-gray-700 leading-relaxed">{detail.summary}</p>
                                  </div>

                                  {/* Pricing Math */}
                                  {detail.pricingMath && (
                                    <div className="bg-white border border-gray-200 rounded-lg p-5">
                                      <h4 className="font-semibold text-base text-gray-900 mb-3">Pricing Breakdown</h4>
                                      <div className="grid grid-cols-2 gap-4 text-sm">
                                        {Object.entries(detail.pricingMath).map(([key, value]) => (
                                          <div key={key}>
                                            <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}:</span>
                                            <span className="ml-2 font-medium text-gray-900">{value}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Market Benchmarks */}
                                  {detail.marketBenchmarks && detail.marketBenchmarks.length > 0 && (
                                    <div className="bg-white border border-gray-200 rounded-lg p-5">
                                      <h4 className="font-semibold text-base text-gray-900 mb-3">Market Benchmarks</h4>
                                      <div className="space-y-3">
                                        {detail.marketBenchmarks.map((benchmark, idx) => (
                                          <div key={idx} className="flex justify-between items-start">
                                            <div className="flex-1">
                                              <div className="font-medium text-sm text-gray-900">{benchmark.competitor}</div>
                                              <div className="text-xs text-gray-600">{benchmark.note}</div>
                                            </div>
                                            <div className="font-semibold text-sm text-green-600">{benchmark.price}</div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Internal Benchmarks */}
                                  {detail.internalBenchmarks && detail.internalBenchmarks.length > 0 && (
                                    <div className="bg-white border border-gray-200 rounded-lg p-5">
                                      <h4 className="font-semibold text-base text-gray-900 mb-3">Internal Benchmarks</h4>
                                      <div className="space-y-3">
                                        {detail.internalBenchmarks.map((benchmark, idx) => (
                                          <div key={idx} className="flex justify-between items-start">
                                            <div className="flex-1">
                                              <div className="font-medium text-sm text-gray-900">{benchmark.location}</div>
                                              <div className="text-xs text-gray-600">{benchmark.metric}</div>
                                            </div>
                                            <div className="font-semibold text-sm text-blue-600">{benchmark.value}</div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Assumptions */}
                                  {detail.assumptions && detail.assumptions.length > 0 && (
                                    <div className="bg-white border border-gray-200 rounded-lg p-5">
                                      <h4 className="font-semibold text-base text-gray-900 mb-3">Key Assumptions</h4>
                                      <ul className="space-y-2">
                                        {detail.assumptions.map((assumption, idx) => (
                                          <li key={idx} className="text-sm text-gray-700 flex items-start">
                                            <span className="text-blue-500 mr-2 mt-1">•</span>
                                            <span>{assumption}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {/* Risk Mitigation */}
                                  {detail.riskMitigation && detail.riskMitigation.length > 0 && (
                                    <div className="bg-white border border-gray-200 rounded-lg p-5">
                                      <h4 className="font-semibold text-base text-gray-900 mb-3">Risk Mitigation</h4>
                                      <ul className="space-y-2">
                                        {detail.riskMitigation.map((risk, idx) => (
                                          <li key={idx} className="text-sm text-gray-700 flex items-start">
                                            <span className="text-orange-500 mr-2 mt-1">⚠</span>
                                            <span>{risk}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              );
                            } else if (selectedPricingItem.type === 'unitEconomic') {
                              const metric = (enhancedLocation as any)._detailedData.pricing.unitEconomics[selectedPricingItem.key!];
                              const detail = metric.detail;
                              
                              return (
                                <div className="space-y-6">
                                  {/* Value & Summary */}
                                  <div className="bg-white border border-gray-200 rounded-lg p-5">
                                    <div className="flex items-center justify-between mb-3">
                                      <h4 className="font-semibold text-base text-gray-900">Value</h4>
                                      <div className="text-2xl font-bold text-green-600">{metric.value}</div>
                                    </div>
                                    <p className="text-sm text-gray-700 leading-relaxed">{detail.summary}</p>
                                  </div>

                                  {/* Formula */}
                                  {detail.formula && (
                                    <div className="bg-white border border-gray-200 rounded-lg p-5">
                                      <h4 className="font-semibold text-base text-gray-900 mb-3">Calculation</h4>
                                      <div className="bg-gray-50 rounded p-3 font-mono text-sm text-gray-800">{detail.formula}</div>
                                    </div>
                                  )}

                                  {/* Mix (for ARPU) */}
                                  {detail.mix && (
                                    <div className="bg-white border border-gray-200 rounded-lg p-5">
                                      <h4 className="font-semibold text-base text-gray-900 mb-3">Tier Mix</h4>
                                      <div className="grid grid-cols-3 gap-4">
                                        {Object.entries(detail.mix).map(([tier, percentage]) => (
                                          <div key={tier} className="text-center">
                                            <div className="text-lg font-bold text-gray-900">{percentage}</div>
                                            <div className="text-xs text-gray-600 capitalize">{tier.replace(/([A-Z])/g, ' $1').toLowerCase()}</div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Assumptions */}
                                  {detail.assumptions && detail.assumptions.length > 0 && (
                                    <div className="bg-white border border-gray-200 rounded-lg p-5">
                                      <h4 className="font-semibold text-base text-gray-900 mb-3">Assumptions</h4>
                                      <ul className="space-y-2">
                                        {detail.assumptions.map((assumption, idx) => (
                                          <li key={idx} className="text-sm text-gray-700 flex items-start">
                                            <span className="text-blue-500 mr-2 mt-1">•</span>
                                            <span>{assumption}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              );
                            }
                          })()}
                        </div>
                      </div>
                    ) : selectedSwotCategory && (enhancedLocation?.name || enhancedLocation?.locationName) === "Ashburn VA" && (enhancedLocation as any)?._detailedData ? (
                      <div className="p-6 h-full overflow-y-auto">
                        <div className="mb-6">
                          <button 
                            onClick={() => setSelectedSwotCategory(null)}
                            className="text-gray-400 hover:text-gray-600 float-right p-1 hover:bg-gray-100 rounded"
                          >
                            ✕
                          </button>
                          <div className="mb-6">
                            <h3 className="font-bold text-xl mb-1 capitalize text-gray-900">
                              {selectedSwotCategory} Analysis
                            </h3>
                            <p className="text-sm text-gray-600">
                              Detailed insights and explanations
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          {(() => {
                            const detailedData = (enhancedLocation as any)._detailedData;
                            const swotCategoryData = detailedData?.swotAnalysis?.[selectedSwotCategory];
                            
                            if (swotCategoryData && Array.isArray(swotCategoryData)) {
                              return swotCategoryData.map((item, index) => (
                                <div key={index} className="p-6 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                                  <div className="flex items-start justify-between mb-3">
                                    <h4 className="font-semibold text-base text-gray-900 flex-1 pr-4">
                                      {item.title}
                                    </h4>
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ${
                                      selectedSwotCategory === 'strengths' ? 'bg-green-100 text-green-700' :
                                      selectedSwotCategory === 'weaknesses' ? 'bg-red-100 text-red-700' :
                                      selectedSwotCategory === 'opportunities' ? 'bg-blue-100 text-blue-700' :
                                      'bg-yellow-100 text-yellow-700'
                                    }`}>
                                      #{index + 1}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-700 leading-relaxed mb-3">
                                    {item.description}
                                  </p>
                                  {item.citation && (() => {
                                    const detailedData = (enhancedLocation as any)._detailedData;
                                    const citationRef = detailedData?.citationReferences?.[item.citation.toString()];
                                    
                                    if (citationRef) {
                                      return (
                                        <div className="mt-4 pt-3 border-t border-gray-100">
                                          <div className="text-xs text-gray-500">
                                            <div className="flex items-start gap-2">
                                              <span className="font-medium">Source:</span>
                                              <div className="flex-1">
                                                <div className="mb-1">{citationRef.source}</div>
                                                {citationRef.url ? (
                                                  <a 
                                                    href={citationRef.url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 underline break-all"
                                                  >
                                                    {citationRef.title}
                                                  </a>
                                                ) : citationRef.note ? (
                                                  <span className="italic">{citationRef.note}</span>
                                                ) : (
                                                  <span>{citationRef.title}</span>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    }
                                    
                                    return (
                                      <div className="mt-4 pt-3 border-t border-gray-100">
                                        <div className="text-xs text-gray-500 italic">
                                          <strong>Source:</strong> Citation {item.citation}
                                        </div>
                                      </div>
                                    );
                                  })()}
                                </div>
                              ));
                            }
                            
                            return (
                              <div className="text-center py-8">
                                <div className="text-gray-400 mb-2">
                                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                </div>
                                <p className="text-gray-500 text-sm">No detailed analysis available for this category.</p>
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    ) : selectedSwotCategory ? (
                      <div className="p-6 h-full overflow-y-auto">
                        <div className="mb-6">
                          <button 
                            onClick={() => setSelectedSwotCategory(null)}
                            className="text-gray-400 hover:text-gray-600 float-right p-1 hover:bg-gray-100 rounded"
                          >
                            ✕
                          </button>
                          <div className="mb-6">
                            <h3 className="font-bold text-xl mb-1 capitalize text-gray-900">
                              {selectedSwotCategory} Analysis
                            </h3>
                            <p className="text-sm text-gray-600">
                              Strategic insights for this location
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          {enhancedLocation.swot[selectedSwotCategory].map((item, index) => (
                            <div key={index} className="p-6 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                              <div className="flex items-start justify-between mb-3">
                                <h4 className="font-semibold text-base text-gray-900 flex-1 pr-4">
                                  {selectedSwotCategory.slice(0, -1)} #{index + 1}
                                </h4>
                                <span className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ${
                                  selectedSwotCategory === 'strengths' ? 'bg-green-100 text-green-700' :
                                  selectedSwotCategory === 'weaknesses' ? 'bg-red-100 text-red-700' :
                                  selectedSwotCategory === 'opportunities' ? 'bg-blue-100 text-blue-700' :
                                  'bg-yellow-100 text-yellow-700'
                                }`}>
                                  #{index + 1}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700 leading-relaxed">
                                {item}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : selectedPricingItem ? (
                      <div className="p-6 h-full overflow-y-auto">
                        <div className="mb-6">
                          <button 
                            onClick={() => setSelectedPricingItem(null)}
                            className="text-gray-400 hover:text-gray-600 float-right p-1 hover:bg-gray-100 rounded"
                          >
                            ✕
                          </button>
                          <div className="mb-4">
                            <h3 className="font-bold text-xl mb-1 text-gray-900">
                              Pricing Analysis
                            </h3>
                            <p className="text-sm text-gray-600">
                              Basic pricing information
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-center py-8">
                          <div className="text-gray-400 mb-2">
                            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                          </div>
                          <p className="text-gray-500 text-sm">Detailed pricing analysis available for Ashburn location.</p>
                        </div>
                      </div>
                    ) : (
                      <MapPane location={enhancedLocation} />
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
